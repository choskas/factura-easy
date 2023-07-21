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
import { Customer } from "./types";
import { useToast } from "../ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import GoBack from "../commons/GoBack";
import { useSession } from "next-auth/react";
import axios from "axios";
import { TAX_REGIME } from "@/lib/constants/catalogs";
import CustomSelect from "../commons/custom-select";
import { useRouter } from "next/navigation";

const CreateNewCustomer = () => {
  const session = useSession();
  const form = useForm<Customer>();
  const { toast } = useToast();
  const { update } = useSession()
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [taxSystem, setTaxSystem] = useState("");
  const [isErrorTaxSystem, setIsErrorTaxSystem] = useState(false);

  const handleExtraErrors = () => {
    if (!taxSystem) {
      setIsErrorTaxSystem(true);
      return true;
    }
  };

  const resetForm = () => {
    form.reset({
      legal_name: "",
      tax_id: "",
      email: "",
      phone: "",
      address: {
        street: "",
        exterior: "",
        interior: "",
        neighborhood: "",
        city: "",
        municipality: "",
        zip: "",
        state: "",
        country: "",
      },
    });
    setTaxSystem("");
  };

  const onSubmit = async (values: Customer) => {
    try {
      setIsDisabledButton(true);
      const data = { ...values, tax_system: taxSystem };
      if (handleExtraErrors()) return;
      await axios.post("/api/clients", data);
      resetForm();
      update()
      startTransition(() => {
        router.refresh();
      });
      toast({ description: "Se ha añadido un nuevo cliente" });

    } catch (error: any) {
      let title = "Error de servidor.";
      if (error.response.data.message.includes("email")) {
        title = "El email no es válido";
      }
      if (error.response.data.message.includes("RFC")) {
        title = "El RFC no es válido";
      }
      if (error.response.data.message.includes("postal")) {
        title = "El código postal no es válido";
      }
      toast({ title });
      return error;
    } finally {
      setIsDisabledButton(false);
    }
  };

  return (
    <section className="w-full px-[32px]">
      <GoBack to="/dashboard" />
      <h2 className="font-title text-center my-[24px]">Nuevo cliente</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="col-span-4 md:col-span-2">
              <FormField
                control={form.control}
                name="legal_name"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Nombre legal:</FormLabel>
                    <Controller
                      name="legal_name"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.legal_name &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>RFC:</FormLabel>
                    <Controller
                      name="tax_id"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.legal_name &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tax_system"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel
                      className={
                        isErrorTaxSystem ? "text-red-500 dark:text-red-900" : ""
                      }
                    >
                      Clave de régimen fiscal:
                    </FormLabel>
                    <Controller
                      name="tax_system"
                      render={({ field }) => (
                        <CustomSelect
                          value={taxSystem}
                          options={TAX_REGIME}
                          onChange={(currentValue) => {
                            setIsErrorTaxSystem(false);
                            setTaxSystem(currentValue);
                          }}
                        />
                      )}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {isErrorTaxSystem && "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Correo electrónico:</FormLabel>
                    <Controller
                      name="email"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.legal_name &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Teléfono:</FormLabel>
                    <Controller
                      name="phone"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.legal_name &&
                        "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4 md:col-span-2">
              <div className="grid grid-cols-4">
                <div className="col-span-4 md:col-span-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem className="mb-[24px] md:mb-0">
                        <FormLabel>Calle:</FormLabel>
                        <Controller
                          name="address.street"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address.exterior"
                    render={({ field }) => (
                      <FormItem className="md:mr-[16px] mb-[24px] md:mb-0">
                        <FormLabel>Número exterior:</FormLabel>
                        <Controller
                          name="address.exterior"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.interior"
                    render={({ field }) => (
                      <FormItem className="md:mr-[16px] mb-[24px] md:mb-0">
                        <FormLabel>Número interior:</FormLabel>
                        <Controller
                          name="address.interior"
                          control={form.control}
                          render={({ field }) => <Input {...field} />}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address.neighborhood"
                    render={({ field }) => (
                      <FormItem className="mb-[24px] md:mb-0 mb-[24px] md:mb-0">
                        <FormLabel>Colonia:</FormLabel>
                        <Controller
                          name="address.neighborhood"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.municipality"
                    render={({ field }) => (
                      <FormItem className="mb-[24px] md:mb-0 mb-[24px] md:mb-0">
                        <FormLabel>Alcaldia o municipio:</FormLabel>
                        <Controller
                          name="address.municipality"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address.zip"
                    render={({ field }) => (
                      <FormItem className="md:mr-[16px mb-[24px] md:mb-0]">
                        <FormLabel>Código postal:</FormLabel>
                        <Controller
                          name="address.zip"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem className="mb-[24px] md:mb-0">
                        <FormLabel>Estado:</FormLabel>
                        <Controller
                          name="address.state"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.legal_name &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isDisabledButton}
              className="uppercase w-full mb-[24px]"
              onClick={handleExtraErrors}
              type="submit"
            >
              {isDisabledButton && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Guardar cliente
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateNewCustomer;
