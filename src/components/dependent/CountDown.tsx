import { Text, TextProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import formatDurationNumeric from "../../lib/FormatDurationNumeric";

interface Props extends TextProps {
  initialSeconds: number;
  onFinished?: Function;
  format?: "hour" | "minute" | "second";
}

export default function CountDown({
  initialSeconds,
  format,
  onFinished,
  ...props
}: Props) {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds === 0 && onFinished) {
      onFinished();
    }
  }, [seconds, onFinished]);

  return (
    <Text fontSize={20} fontWeight={600} textAlign={"center"} {...props}>
      {formatDurationNumeric(seconds, format)}
    </Text>
  );
}
