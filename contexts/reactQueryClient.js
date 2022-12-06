import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const invalidateQuery = (queryKey) =>
  queryClient.invalidateQueries(queryKey);
