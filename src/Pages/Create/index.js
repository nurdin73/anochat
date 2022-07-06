import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, Input, useDisclosure } from "@chakra-ui/react";
import { write } from "../../firebase";
import AlertCustom from "../../Components/AlertCustom";
import { makeid } from "../../helper";
import moment from "moment";

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const handleSave = async () => {
    if (name.trim().length === 0) {
      setMessage("Name is required");
      setTitle("Warning");
      onOpen();
      return;
    }
    const id = makeid(5);
    const data = {
      name,
      createdDate: moment().format(),
      question: "Send me anonymous messages!",
    };
    setLoading(true);
    await write(data, `/users/${id}`);
    localStorage.setItem(
      "dataProfile",
      JSON.stringify({
        id,
        ...data,
      })
    );
    setLoading(false);
    navigate("/profile", { replace: true });
  };

  const handleChangeInput = (val) => {
    setName(val);
  };

  const handleBack = () => {
    setName("");
    navigate("/", { replace: true });
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Box
          w="64"
          rounded="3xl"
          mt={10}
          backgroundColor="whiteAlpha.300"
          p={5}
          textAlign="center"
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            mb={2}
            color="whiteAlpha.900"
            fontFamily="sans-serif"
          >
            AnoChat
          </Text>
          <Text fontWeight="bold" mb={2} color="whiteAlpha.900">
            What's your name?
          </Text>
          <Input
            rounded="full"
            textAlign={"center"}
            border={0}
            color="whiteAlpha.900"
            focusBorderColor="none"
            mb={3}
            placeholder="John doe"
            colorScheme="whiteAlpha"
            onChange={(e) => handleChangeInput(e.target.value)}
          />
          <Button
            mb={2}
            rounded="full"
            colorScheme="red"
            w="100%"
            fontWeight="bold"
            onClick={() => handleSave()}
            isLoading={loading}
          >
            Save
          </Button>
          <Button
            onClick={() => handleBack()}
            rounded="full"
            w="100%"
            fontWeight="bold"
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <AlertCustom
        onClose={onClose}
        isOpen={isOpen}
        message={message}
        actionButton="Close"
        callback={onClose}
        title={title}
      />
    </React.Fragment>
  );
};

export default Create;
