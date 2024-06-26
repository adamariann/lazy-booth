import { create } from "zustand";

interface State {
  cameraList: any;
}

interface Actions {
  setCameraList: (newCameraList: any) => void;
}

const useCameraList = create<State & Actions>((set) => ({
  cameraList: false,
  setCameraList: (newCameraList: any) => set({ cameraList: newCameraList }),
}));

export default useCameraList;
