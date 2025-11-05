import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import TopbarUserMenu from "./TopbarUserMenu";
import Link from "next/link";
import { TopbarEndItemSkeleton } from "./TopbarSkeleton";

const TopbarEndItems = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.auth.session.queryOptions()
  );

  if (isLoading) {
    return <TopbarEndItemSkeleton />;
  }

  if (isError) {
    return <div className="text-md">Error Getting Profile...</div>;
  }

  if (data.user) {
    return (
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="text-sm font-medium rounded-md shadow-sm"
          asChild
        >
          <Link href="/admin" prefetch={false}>
            Dashboard
          </Link>
        </Button>
        <TopbarUserMenu
          userName={data.user.username}
          userEmail={data.user.email}
          userAvatar={data.user.image}
          key="user-menu"
        />
      </div>
    );
  }

  if (!data.user)
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Sign Up
        </Button>
        <Button
          size="sm"
          className="text-sm font-medium rounded-md shadow-sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Login
        </Button>
      </div>
    );
};

export default TopbarEndItems;
