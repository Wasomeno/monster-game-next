import { create } from "zustand";

const loadingStore = create((set) => ({
  loading: false,
  text: "",
  toggleLoading: (text) => {
    set((state) => ({ loading: !state.loading, text: text }));
  },
}));

const toastStore = create((set) => ({
  show: false,
  loading: false,
  text: "",
  condition: "",
  success: (text) => {
    set(() => ({ show: true, text: text, condition: "success" }));
    setTimeout(() => set(() => ({ show: false, text: "", condition: "" })));
  },
  error: (text) => {
    set(() => ({ show: true, text: text, condition: "error" }));
    setTimeout(
      () => set(() => ({ show: false, text: "", condition: "" })),
      3000
    );
  },
  success: (text) => {
    set(() => ({ show: true, text: text, condition: "success" }));
    setTimeout(
      () => set(() => ({ show: false, text: "", condition: "" })),
      3000
    );
  },
  loading: (text) => {
    set(() => ({
      show: true,
      text: text,
      condition: "loading",
      loading: true,
    }));
  },
}));

export const useLoading = () => {
  return loadingStore((state) => state.toggleLoading);
};

export const useToast = () => {
  const success = toastStore((state) => state.success);
  const error = toastStore((state) => state.error);

  return [success, error];
};

export const useToastDetails = () => {
  const show = toastStore((state) => state.show);
  const condition = toastStore((state) => state.condition);
  const text = toastStore((state) => state.text);
  const loading = toastStore((state) => state.loading);

  return [show, text, condition, loading];
};

export const useLoadingDetails = () => {
  const loading = loadingStore((state) => state.loading);
  const text = loadingStore((state) => state.text);

  return [loading, text];
};
