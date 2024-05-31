import { create } from "zustand";

interface State {
  yourPhotos: any[];
}

interface Actions {
  setYourPhotos: (newYourPhotos: any[]) => void;
}

const useYourPhotos = create<State & Actions>((set) => ({
  yourPhotos: ["./images/gear5.jpg", null, null, null, null, null, null, null],
  setYourPhotos: (newYourPhotos) => set({ yourPhotos: newYourPhotos }),
}));

export default useYourPhotos;
