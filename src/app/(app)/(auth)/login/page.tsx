import LoginForm from "@/components/forms/LoginForm";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  return <LoginForm />;
};

export default LoginPage;
