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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<LoginForm>();
  const router = useRouter();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const onSubmit = async (data: LoginForm) => {
    try {
      setIsDisabledButton(true)
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!response?.ok)
        return toast({ title: "El email o la contraseña son incorrectos." });
      router.push("/dashboard");
    } catch (error) {
      toast({title: "EL usuario o contraseña son incorrectos."})
      return;
    } finally {
      setIsDisabledButton(false)
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-[24px] md:mb-0">
              <FormLabel>Email:</FormLabel>
              <Controller
                name="email"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input autoComplete="email" {...field} />
                )}
              />

              <FormDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.email && "El campo es requerido"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-[24px] md:mb-0">
              <FormLabel>Contraseña:</FormLabel>
              <Controller
                name="password"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input autoComplete="password" type="password" {...field} />
                )}
              />

              <FormDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.password && "El campo es requerido"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isDisabledButton}
          className="uppercase w-full my-[24px]"
          type="submit"
        >
          {isDisabledButton && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Entrar
        </Button>
      </form>
      <section className="my-[24px] flex flex-col items-center">
      <p className="font-description">
        ¿Olvidaste tu contraseña? Recupérala aquí
      </p>
      <p className="font-description">
       ¿No tienes cuenta? Registrate <Link className="text-blue-400" href='/register'>aqui. </Link>
      </p>
      </section>
    </Form>
  );
};

export default LoginForm;
