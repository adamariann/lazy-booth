import { CameraKitSession } from "@snap/camera-kit/.";
import { create } from "zustand";

interface State {
  cameraSession: CameraKitSession | null;
}

interface Actions {
  setCameraSession: (newCameraSession: any) => void;
}

const useCameraSession = create<State & Actions>((set) => ({
  cameraSession: null,
  setCameraSession: (newCameraSession: any) =>
    set({ cameraSession: newCameraSession }),
}));

export default useCameraSession;
