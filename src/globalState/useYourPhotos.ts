import { create } from "zustand";

interface State {
  yourPhotos: any[];
}

interface Actions {
  setYourPhotos: (newYourPhotos: any[]) => void;
}

const useYourPhotos = create<State & Actions>((set) => ({
  yourPhotos: [
    { id: 1, url: "./images/gear5.jpg" },
    { id: 2, url: "https://via.placeholder.com/180" },
    { id: 3, url: "https://via.placeholder.com/180" },
    null,
    null,
    null,
    null,
    null,
  ],
  setYourPhotos: (newYourPhotos) => set({ yourPhotos: newYourPhotos }),
}));

export default useYourPhotos;
