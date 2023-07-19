"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../ui/use-toast";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import GoBack from "../../commons/GoBack";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Product } from "./types";
import { Checkbox } from "../../ui/checkbox";

const CreateNewProduct = () => {
  const form = useForm<Product>();
  const { toast } = useToast();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [taxIncluded, setTaxIncluded] = useState(false)
  const onSubmit = async (values: Product) => {
    try {
      const {tax_included, ...result} = values
      setIsDisabledButton(true);
      await axios.post('/api/product', {...result, taxIncluded})
      form.reset({sku: '', price: '', product_key: '', tax_included: false, description: ''})
      setTaxIncluded(false)
      toast({ description: "Se ha añadido un nuevo producto" });
    } catch (error: any) {
      toast({title: error.response.data.message})
      return error;
    } finally {
      setIsDisabledButton(false);
    }
  };

  return (
    <section className="w-full px-[32px]">
      <GoBack />
      <h2 className="font-title text-center my-[24px]">Nuevo producto</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="col-span-4 md:col-span-2">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>SKU:</FormLabel>
                    <Controller

                      name="sku"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.sku && "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Precio:</FormLabel>
                    <Controller
                      name="price"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.price && "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_key"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Clave de producto:</FormLabel>
                    <Controller
                      name="product_key"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />
                    <FormDescription>
                      {" "}
                      Si no conoces la clave de tu producto, puedes buscarla{" "}
                      <a
                        href="http://pys.sat.gob.mx/PyS/catPyS.aspx"
                        target="_blank"
                        className="text-blue-300"
                      >
                        aquí.
                      </a>
                    </FormDescription>
                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.product_key &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax_included"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <Controller
                      name="tax_included"
                      control={form.control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="iva" checked={taxIncluded}  onCheckedChange={(e: boolean) => setTaxIncluded(e)} />
                          <label
                            htmlFor="iva"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Incluir IVA
                          </label>
                        </div>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Descripción:</FormLabel>
                    <Controller
                      name="description"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.description &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isDisabledButton}
              className="uppercase w-full mb-[24px]"
              type="submit"
            >
              {isDisabledButton && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Guardar producto
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateNewProduct;
