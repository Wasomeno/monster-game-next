import create from "zustand";

export const dailyShopModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const dailyTradeModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const missionsModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const dungeonModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const nurseryModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const smelterModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const altarModalStores = create((set) => ({
  show: false,
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
}));

export const rewardsModalStores = create((set) => ({
  show: false,
  rewards: [],
  toggleShow: () => {
    set((state) => ({ show: !state.show }));
  },
  setRewards: (rewards) => {
    set(() => ({ rewards: rewards }));
  },
}));
