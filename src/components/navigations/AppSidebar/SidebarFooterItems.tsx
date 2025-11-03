import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarUser from "./SidebarUser";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const SidebarFooterItems = () => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <>
      {session.data?.user ? (
        <SidebarUser
          user={{
            username: `${session.data.user.username}`,
            email: `${session.data.user.email}`,
            avatar: "",
          }}
        />
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </>
  );
};

export default SidebarFooterItems;
