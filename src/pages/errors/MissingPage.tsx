import { Button, Heading } from "@chakra-ui/react";
import Container from "../../components/wrapper/Container";

export default function MissingPage() {
  return (
    <Container justify={"center"} p={8}>
      <Heading>404 Not Found</Heading>
      <Button
        mt={4}
        className="btn-solid clicky"
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </Button>
    </Container>
  );
}
