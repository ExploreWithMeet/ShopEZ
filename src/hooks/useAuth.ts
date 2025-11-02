import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  const user = session.data?.user;
  return { session, user };
}
