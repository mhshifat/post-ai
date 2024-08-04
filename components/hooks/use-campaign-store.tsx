import { create } from 'zustand'

interface CampaignStoreState {
  selectedCustomers: string[];
  setSelectedCustomers: (values: string[]) => void;
  selectedCampaign: string | null;
  setSelectedCampaign: (value: string | null) => void;
  reset: number;
  setReset: () => void;
}

export const useCampaignStore = create<CampaignStoreState>((set) => ({
  selectedCustomers: [],
  setSelectedCustomers: (values: string[]) => set({
    selectedCustomers: values
  }),
  selectedCampaign: null,
  setSelectedCampaign: (value: string | null) => set((state) => ({
    selectedCampaign: value === state.selectedCampaign ? null : value
  })),
  reset: 0,
  setReset: () => set((state) => ({
    reset: state.reset + 1
  })),
}))