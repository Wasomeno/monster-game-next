export const config = {
  staleTime: 1000 * 60 * 5,
  cacheTIme: 1000 * 60 * 10,
};

export const configWithRefetch = {
  staleTime: 1000 * 60 * 5,
  cacheTIme: 1000 * 60 * 10,
  refetchInterval: 60000,
};
