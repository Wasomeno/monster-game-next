import { invalidateQuery } from "contexts/reactQueryClient";
import { useLoading, useToast } from "stores/stores";

export function mutationSideEfffects(mutationText, invalidateQueryKeys) {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading(mutationText),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess(mutationText + " " + "Success");
      invalidateQueryKeys?.forEach((queryKey) => {
        invalidateQuery(queryKey);
      });
    },
    onError: (error) => toastError(error.reason),
  };
}
