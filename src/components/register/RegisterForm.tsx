"use client";
import { signIn } from 'next-auth/react';
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
import axios from 'axios';

type RegisterForm = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  
  const form = useForm<RegisterForm>();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    const result = await axios.post('/api/user', data)

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
                  <Input autoComplete="new-email" {...field} />
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
                  <Input
                    autoComplete="new-password"
                    type="password"
                    {...field}
                  />
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
          Continuar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
