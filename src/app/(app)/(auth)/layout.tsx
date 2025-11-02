import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center  text-primary font-bold text-3xl"
        >
          ShopEZ PVT.
        </a>
        {children}
      </div>
    </div>
  );
}
