import { create } from "zustand";

interface State {
  activeFrame: number;
}

interface Actions {
  setActiveFrame: (newActiveFrame: number) => void;
}

const useActiveFrame = create<State & Actions>((set) => ({
  activeFrame: 0,
  setActiveFrame: (newActiveFrame: number) =>
    set({ activeFrame: newActiveFrame }),
}));

export default useActiveFrame;
