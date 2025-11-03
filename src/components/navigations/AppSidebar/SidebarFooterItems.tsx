import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarUser from "./SidebarUser";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarFooterItems = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.auth.session.queryOptions()
  );

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 min-w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Button className="destructive" disabled>
        Profile Error
      </Button>
    );
  }

  return (
    <>
      {data?.user ? (
        <SidebarUser
          user={{
            username: `${data.user.username}`,
            email: `${data.user.email}`,
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
