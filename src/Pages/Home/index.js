import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <React.Fragment>
      <Box display="flex" h="100vh" justifyContent="center" alignItems="center">
        <Box
          w="64"
          rounded="3xl"
          backgroundColor="whiteAlpha.300"
          p={5}
          textAlign="center"
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            mb={5}
            color="whiteAlpha.900"
            fontFamily="sans-serif"
          >
            AnoChat
          </Text>
          <Text fontWeight="bold" mb="14" color="whiteAlpha.900">
            Get anonymous messages on Social media
          </Text>
          <Button rounded="full" w="100%" fontWeight="bold">
            <Link to="/create">Get Questions!</Link>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Home;
