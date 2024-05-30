import { create } from "zustand";

interface State {
  filterList: any[];
}

interface Actions {
  setFilterList: (newFilterList: any[]) => void;
}

const useFilterList = create<State & Actions>((set) => ({
  filterList: [],
  setFilterList: (newFilterList) => set({ filterList: newFilterList }),
}));

export default useFilterList;
