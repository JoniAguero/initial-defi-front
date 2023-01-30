import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export const CardComponent = ({
  title,
  text,
  textBtn,
  textBtn2,
  img,
  balance,
  handleStakeTokens,
  handleUnstakeTokens,
}) => {
  const [valueStake, setValueStake] = useState(1);
  console.log(balance);
  const isBrowser = () => typeof window !== "undefined" && window.web3.utils;

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
          {title === "Stacking" && (
            <FormControl>
              <FormLabel>Stake Tokens</FormLabel>
              <NumberInput
                max={50}
                min={1}
                value={valueStake}
                onChange={(value) => setValueStake(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {title === "Stacking" && (
                <Stack mt="2">
                  {isBrowser() && (
                    <Text fontSize="lg">
                      Balance: {window.web3.utils.fromWei(balance, "Ether")}
                    </Text>
                  )}
                </Stack>
              )}
            </FormControl>
          )}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => handleStakeTokens(valueStake)}
          >
            {title === "Stacking" ? textBtn : "Get Rewards"}
          </Button>

          {title === "Stacking" && (
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleUnstakeTokens}
            >
              {textBtn2}
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
