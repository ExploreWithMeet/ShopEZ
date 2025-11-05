import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="flex select-none items-center gap-2 self-center text-primary font-semibold text-3xl">
          ShopEZ PVT
        </h1>
        {children}
      </div>
    </div>
  );
}
