import { Box, Button, Flex, HStack, Select, VStack } from "@chakra-ui/react";
import {
  bootstrapCameraKit,
  CameraKitSession,
  createMediaStreamSource,
  Lens,
  Transform2D,
} from "@snap/camera-kit";
import { useEffect, useRef, useState } from "react";
import useFilterList from "../../globalState/useFilterList";
import useCameraSession from "../../globalState/useCameraSession";

let mediaStream: MediaStream | null = null;

export default function CameraScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiToken = process.env.REACT_APP_API_KEY;
  const lensGroupId = process.env.REACT_APP_LENS_GROUP;
  const cameraSelectRef = useRef<HTMLSelectElement>(null);
  const lensSelectRef = useRef<HTMLSelectElement>(null);
  // const [session, setSession] = useState<CameraKitSession | null>(null);
  const { setFilterList } = useFilterList();
  const { cameraSession, setCameraSession } = useCameraSession();

  useEffect(() => {
    const init = async () => {
      const cameraKit = await bootstrapCameraKit({
        apiToken: apiToken as string,
      });

      const session = await cameraKit.createSession();
      const output = session?.output.live;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.replaceWith(output);
      }
      const { lenses } = await cameraKit.lensRepository.loadLensGroups([
        lensGroupId as string,
      ]);
      // session.applyLens(lenses[0]);
      await setCameraKitSource(session);
      await attachCamerasToSelect(session);
      setFilterList(lenses);
      setCameraSession(session);
      console.log("session", session);
    };

    init();
  }, []);

  const setCameraKitSource = async (
    session: CameraKitSession,
    deviceId?: string
  ) => {
    if (mediaStream) {
      session.pause();
      mediaStream.getVideoTracks()[0].stop();
    }
    const videoConstraints = {
      Audio: false,
      video: {
        deviceId,
        // width: { ideal: 3840 },
        // height: { ideal: 2160 },
      },
    };
    mediaStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
    const source = createMediaStreamSource(mediaStream);
    await session.setSource(source);
    source.setTransform(Transform2D.MirrorX);
    session.play();
  };

  const attachCamerasToSelect = async (session: CameraKitSession) => {
    cameraSelectRef.current!.innerHTML = "";
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(({ kind }) => kind === "videoinput");

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.text = camera.label;
      cameraSelectRef.current!.appendChild(option);
    });

    cameraSelectRef.current!.addEventListener("change", (event) => {
      const deviceId = (event.target as HTMLSelectElement)?.selectedOptions[0]
        ?.value;
      if (deviceId) {
        setCameraKitSource(session, deviceId);
      }
    });
  };

  const attachLensesToSelect = async (lenses: Lens[]) => {
    // lenses.forEach((lens) => {
    //   const option = document.createElement("option");
    //   option.value = lens.id;
    //   option.text = lens.name;
    //   lensSelectRef.current!.appendChild(option);
    // });
    // console.log("Lenses", lenses);
    // lensSelectRef.current!.addEventListener("change", (event) => {
    //   const lensId = (event.target as HTMLSelectElement)?.selectedOptions[0]
    //     ?.value;
    //   if (lensId) {
    //     const lens = lenses.find((lens) => lens.id === lensId);
    //     if (lens) session.applyLens(lens);
    //   }
    // });
  };

  const captureImage = async () => {
    if (!cameraSession || !canvasRef.current) return;
    cameraSession.pause();
    const videoTrack = mediaStream?.getVideoTracks()[0];
    const settings = videoTrack?.getSettings();
    canvasRef.current.width = settings?.width || 0;
    canvasRef.current.height = settings?.height || 0;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(
        cameraSession.output.live,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    const imageDataUrl = canvasRef.current.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "captured-image.png";
    link.click();
    cameraSession.play();
  };

  return (
    <Flex
      className="container"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack>
        <Box
          width={"640px"}
          height={"480px"}
          bg="gray.100"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
        >
          <canvas
            ref={canvasRef}
            id="canvas-container"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "red",
            }}
          ></canvas>
        </Box>
        <HStack>
          <Select ref={cameraSelectRef} className="styled-select"></Select>
          <Select ref={lensSelectRef} className="styled-select"></Select>
        </HStack>
        <Button onClick={captureImage}>Capture Image</Button>
      </VStack>
    </Flex>
  );
}
