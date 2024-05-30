import { StackProps, VStack } from "@chakra-ui/react";
interface Props extends StackProps {
  children: any;
}

export default function Container({ children, ...props }: Props) {
  return (
    <VStack minH={"100vh"} w={"100%"} gap={0} {...props}>
      {children}
    </VStack>
  );
}
