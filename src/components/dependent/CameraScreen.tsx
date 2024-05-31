// CameraScreen.tsx
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import {
  bootstrapCameraKit,
  CameraKitSession,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";
import useCameraSession from "../../globalState/useCameraSession";
import useFilterList from "../../globalState/useFilterList";

let mediaStream: MediaStream | null = null;

export interface CameraScreenHandle {
  captureImage: () => void;
}

interface CameraScreenProps {}

const CameraScreen = forwardRef<CameraScreenHandle, CameraScreenProps>(
  (props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const apiToken = process.env.REACT_APP_API_KEY;
    const lensGroupId = process.env.REACT_APP_LENS_GROUP;
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
        await setCameraKitSource(session);
        setCameraSession(session);
        setFilterList(lenses);
      };

      init();
    }, [apiToken, lensGroupId, setFilterList, setCameraSession]);

    const setCameraKitSource = async (
      session: CameraKitSession,
      deviceId?: string
    ) => {
      if (mediaStream) {
        session.pause();
        mediaStream.getVideoTracks()[0].stop();
      }
      const videoConstraints = {
        audio: false,
        video: {
          deviceId,
        },
      };
      mediaStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      const source = createMediaStreamSource(mediaStream);
      await session.setSource(source);
      source.setTransform(Transform2D.MirrorX);
      session.play();
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

    useImperativeHandle(ref, () => ({
      captureImage,
    }));

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
                backgroundColor: "black",
              }}
            ></canvas>
          </Box>
          {/* <Button onClick={captureImage}>Capture Image</Button> */}
        </VStack>
      </Flex>
    );
  }
);

export default CameraScreen;
