import { create } from "zustand";

interface State {
  cameraSession: any;
}

interface Actions {
  setCameraSession: (newCameraSession: any) => void;
}

const useCameraSession = create<State & Actions>((set) => ({
  cameraSession: null,
  setCameraSession: (newCameraSession: any) =>
    set({ setCameraSession: newCameraSession }),
}));

export default useCameraSession;
