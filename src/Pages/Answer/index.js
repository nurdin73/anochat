import React from "react";
import { Box, Text, Textarea, Button, Spinner } from "@chakra-ui/react";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { readOnce, writes } from "../../firebase";

const Answer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  React.useEffect(() => {
    async function get() {
      setLoading(true);
      const dataUser = await readOnce(`/users/${params.name}`);
      if (!dataUser) {
        navigate("/", { replace: true });
      } else {
        setUser(dataUser);
      }
      setLoading(false);
    }
    get();
  }, [params, navigate]);

  const handleAddQuestion = (value) => {
    setQuestion(value);
  };

  const handleSendQuestion = async () => {
    setLoadingButton(true);
    await writes(
      {
        question,
        createdDate: moment().format(),
      },
      `/answers/${params?.name}`
    );
    setLoadingButton(false);
    // setQuestion("");
    navigate("/sent", { replace: true, state: params.name });
  };

  if (loading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          h="100vh"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </>
    );
  }
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Box
          w="64"
          rounded="xl"
          mt={10}
          backgroundColor="whiteAlpha.300"
          p={5}
          textAlign="center"
        >
          <Text fontWeight="bold" mb={2} color="whiteAlpha.900">
            Questions for {user?.name}
          </Text>
          <Box bgColor="white" rounded="xl" p="2" mb="2">
            <Text color="blackAlpha.900" fontWeight="bold" fontSize="14">
              {user?.question}
            </Text>
          </Box>
          <Textarea
            rounded="xl"
            border="none"
            focusBorderColor="none"
            color="white"
            mb={2}
            textAlign="center"
            value={question}
            onChange={(e) => handleAddQuestion(e.target.value)}
          ></Textarea>
          {question.length > 0 && (
            <Button
              colorScheme="red"
              rounded="xl"
              w="100%"
              isLoading={loadingButton}
              onClick={() => handleSendQuestion()}
            >
              Send
            </Button>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Answer;
