import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const CardComponent = ({ title, text, textBtn, textBtn2, img }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={img}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{text}</Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup>
          <Button variant="solid" colorScheme="blue">
            {textBtn}
          </Button>
          <Button variant="ghost" colorScheme="blue">
            {textBtn2}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
