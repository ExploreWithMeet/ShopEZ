"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/types/schema";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = useMutation(
    trpc.auth.loginUser.mutationOptions({
      onSuccess: async (data) => {
        toast.success("Login Successful!", {
          position: "top-center",
          description: () => `Welcome! ${data.user.email}`,
        });

        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());

        router.push("/");
      },
      onError: (err) => {
        toast.error(err.message, { position: "top-center" });
      },
    })
  );

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      login.mutate(value);
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">Login</CardTitle>
        <CardDescription className="text-center">Welcome Back!</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await loginForm.handleSubmit();
          }}
        >
          <FieldGroup>
            <loginForm.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter Email..."
                      type="email"
                      autoComplete="email"
                      disabled={login.isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <loginForm.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter Password..."
                      type="password"
                      autoComplete="current-password"
                      disabled={login.isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button
            type="submit"
            form="login-form"
            disabled={login.isPending}
            className="w-full"
          >
            {login.isPending ? (
              <>
                <Spinner /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <Button type="button" variant="outline" asChild className="w-full">
            <Link prefetch href="/signup">
              Sign Up
            </Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
