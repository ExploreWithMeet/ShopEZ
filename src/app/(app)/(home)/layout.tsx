import Topbar from "@/components/navigations/Topbar";
import { TopbarSkeleton } from "@/components/navigations/TopbarSkeleton";
import SearchAndFilters from "@/components/search-and-filters";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  prefetch(trpc.auth.session.queryOptions());
  return (
    <div className="grid w-full min-h-screen">
      <HydrateClient>
        <Suspense fallback={<TopbarSkeleton />}>
          <Topbar />
          <SearchAndFilters />
        </Suspense>
        <div>{children}</div>
      </HydrateClient>
    </div>
  );
}
