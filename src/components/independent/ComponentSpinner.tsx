import { Spinner, StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {}

export default function ComponentSpinner({ ...props }: Props) {
  return (
    <VStack minH={"200px"} w={"100%"} justify={"center"} flex={1} {...props}>
      <Spinner />
    </VStack>
  );
}
