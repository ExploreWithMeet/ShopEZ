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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "@/types/schemas/auth";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const register = useMutation(
    trpc.auth.registerUser.mutationOptions({
      onSuccess: async (data) => {
        toast.success("Account Created Successfully!", {
          position: "top-center",
          description: () => `Welcome ${data.user.email}`,
        });
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
      onError: (err) => {
        toast.error(err.message, { position: "top-center" });
      },
    })
  );

  const signupForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const { username } = value;
      value = { ...value, username: username.toLowerCase() };
      register.mutate(value);
    },
  });

  return (
    <>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create your Account
          </CardTitle>
          <CardDescription className="text-center">
            Create An Account on Ecomm. Welcome!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signup-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await signupForm.handleSubmit();
            }}
          >
            <FieldGroup>
              <signupForm.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Domain Username
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="example:sss.com"
                        autoComplete="off"
                      />
                      {field.state.value.length >= 3 && (
                        <FieldDescription className="text-xs">
                          your shop:{" "}
                          <Link
                            href={`https://${field.state.value}.shopez.vercel.app`}
                          >
                            {field.state.value}.shopez.vercel.app
                          </Link>
                        </FieldDescription>
                      )}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <signupForm.Field
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
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <signupForm.Field
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
                        autoComplete="off"
                        type="password"
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
              form="signup-form"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <>
                  <Spinner /> Submitting...
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link prefetch href="/login">
                Login
              </Link>
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignUpForm;
