import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { readOnce } from "../../firebase";

const Result = () => {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("dataProfile"));
    readOnce(`/users/${profile.id}`).then((res) => {
      setUser(res);
    });
  }, []);
  return (
    <React.Fragment>
      <Box display={"flex"} justifyContent="center">
        <Box
          w="64"
          rounded="xl"
          mt={10}
          backgroundColor="whiteAlpha.400"
          p={5}
          textAlign="center"
        >
          <Text fontWeight="bold" color="white">
            {user?.question}
          </Text>
          <Box
            rounded="xl"
            p={5}
            textAlign="center"
            backgroundColor="whiteAlpha.800"
            mt={4}
          >
            <Text fontWeight="bold">{location.state?.question}</Text>
          </Box>
          <Button
            mt="4"
            fontSize={14}
            color="white"
            variant="link"
            w="100%"
            rounded={"xl"}
          >
            <Link to="/response" replace>
              Back
            </Link>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Result;
