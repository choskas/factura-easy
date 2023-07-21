"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios, { AxiosError } from "axios";
import GoBack from "../commons/GoBack";
import { CustomerAddress } from "../create-customer/types";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants/regex";

type RegisterForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  lastName: string;
  mothersName: string;
  rfc: string;
  address: CustomerAddress;
};

const RegisterForm = () => {
  const form = useForm<RegisterForm>();
  const router = useRouter()
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    try{
      setIsDisabledButton(true)
    const result = await axios.post("/api/register", data);+
    router.push('/register/completed')
    } catch (error: any){
      toast({title: error.response.data.message, description: 'Regresa a inicio y trata de iniciar sesión'})

      return error
    } finally {
      setIsDisabledButton(false)
    }
  };
  const password = form.watch('password')
  return (
    <section className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-4 gap-[16px]">
            <div className="col-span-4 md:col-span-2">
              <FormField
                control={form.control}
                name="email"
                rules={{   required: {
                  value: true,
                  message: 'El campo es requerido.',
                },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'El email no es válido.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Email:</FormLabel>
                    <Controller
                      name="email"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input autoComplete="new-email" {...field} />}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                rules={{   required: {
                  value: true,
                  message: 'El campo es requerido.',
                },
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: 'La contraseña debe contener al menos 1 letra mayúscula, 1 minuscula, un número y 8 caracteres.',
                  },
                }}
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Contraseña:</FormLabel>
                    <Controller
                      name="password"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input autoComplete="new-password" type="password" {...field} />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'La contraseña no coincide.',
                }}
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Repite la contraseña:</FormLabel>
                    <Controller
                      name="passwordConfirm"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input type="password" autoComplete="repeat-password" {...field} />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-[24px] md:mb-0">
                    <FormLabel>Nombre:</FormLabel>
                    <Controller
                      name="name"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => <Input {...field} />}
                    />

                    <FormDescription className="text-red-500 dark:text-red-900">
                      {form.formState.errors.name && "El campo es requerido"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-4">
                <div className="col-span-4 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="md:mr-[16px] mb-[24px] md:mb-0">
                        <FormLabel>Apellido:</FormLabel>
                        <Controller
                          name="lastName"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.lastName &&
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
                    name="mothersName"
                    render={({ field }) => (
                      <FormItem className="mb-[24px] md:mb-0">
                        <FormLabel>Apellido Materno:</FormLabel>
                        <Controller
                          name="mothersName"
                          control={form.control}
                          rules={{ required: true }}
                          render={({ field }) => <Input {...field} />}
                        />

                        <FormDescription className="text-red-500 dark:text-red-900">
                          {form.formState.errors.mothersName &&
                            "El campo es requerido"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                          {form.formState.errors.address?.street &&
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
                          {form.formState.errors.address?.exterior &&
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
                          {form.formState.errors.address?.neighborhood &&
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
                          {form.formState.errors.address?.municipality &&
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
                          {form.formState.errors.address?.zip &&
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
                          {form.formState.errors.address?.state &&
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
              type="submit"
            >
              {isDisabledButton && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterForm;
