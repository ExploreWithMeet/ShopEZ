"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const trpc = useTRPC();
  const { isLoading, isError, data } = useQuery(
    trpc.categories.getMany.queryOptions()
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  return <div>{JSON.stringify(data)}</div>;
};

export default Home;
