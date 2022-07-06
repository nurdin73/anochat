import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { change, readOnce } from "../../firebase";
import Navbar from "./Navbar";

const Profile = () => {
  const host = window.location.host;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [questionSelected, setQuestionSelected] = React.useState(null);
  React.useEffect(() => {
    const checkProfile = JSON.parse(localStorage.getItem("dataProfile"));
    setUser(checkProfile);
    setQuestionSelected(checkProfile?.question);
  }, []);

  React.useEffect(() => {
    async function get() {
      setLoading(true);
      try {
        const req = await readOnce("questions");
        setQuestions(req);
        setLoading(false);
      } catch (error) {
        // setError(true);
        setLoading(false);
      }
    }
    get();
  }, []);

  const handleRandomQuestionSelect = () => {
    setLoading(true);
    let currentIndex = questions.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [questions[currentIndex], questions[randomIndex]] = [
        questions[randomIndex],
        questions[currentIndex],
      ];
    }
    setLoading(false);
    setQuestionSelected(questions[0]);
    change({ ...user, question: questions[0] }, `/users/${user?.id}`);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" h="100%" bgColor="white">
        <Box w="64" mt={10}>
          <Box
            bgGradient="linear(to-bl, red.500, orange.500)"
            rounded="xl"
            color="white"
            p={3}
            textAlign="center"
            mb={4}
          >
            <Text>Hi, {user?.name}</Text>
            {loading && <Spinner mt={3} />}
            <Text fontWeight="bold" my={3}>
              {questionSelected}
            </Text>
            <Button
              colorScheme="whiteAlpha"
              size="sm"
              isLoading={loading}
              onClick={() => handleRandomQuestionSelect()}
            >
              Shuffle
            </Button>
          </Box>
          <Box
            bgColor="red.100"
            rounded="xl"
            color="white"
            p={4}
            textAlign="center"
            mb={4}
          >
            <Text fontWeight="bold" color="blackAlpha.900">
              Step 1: Copy your link
            </Text>
            <Text
              fontWeight="bold"
              color="blackAlpha.700"
              textTransform="uppercase"
              my={3}
              fontSize={13}
            >
              {host + "/" + user?.id}
            </Text>
            <Button
              rounded="2xl"
              variant="outline"
              colorScheme="red"
              size="sm"
              onClick={() => handleCopyLink(host + "/" + user?.id)}
            >
              Copy link
            </Button>
          </Box>
          <Box
            bgColor="red.100"
            rounded="xl"
            color="white"
            p={4}
            textAlign="center"
            mb={4}
          >
            <Text fontWeight="bold" color="blackAlpha.900">
              Step 2: Share link on your media social
            </Text>
            <Button rounded="2xl" w="100%" mt={2} colorScheme="red" size="sm">
              Share!
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
