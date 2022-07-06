import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { readAll } from "../../firebase";
const Sent = () => {
  const location = useLocation();
  const [totaluser, setTotalUser] = React.useState(0);
  React.useEffect(() => {
    readAll("/users", (data) => {
      setTotalUser(data.length);
    });
  }, []);

  return (
    <React.Fragment>
      <Box display={"flex"} justifyContent="center">
        <Box
          w="64"
          rounded="xl"
          mt={10}
          backgroundColor="whiteAlpha.300"
          p={5}
          textAlign="center"
        >
          <CheckIcon
            h={75}
            bgColor="white"
            w={75}
            rounded="full"
            color="red"
            p="4"
          />
          <Text fontWeight="bold" color="white">
            Sent!
          </Text>
          <Text fontSize={13} mt="2" fontWeight="bold" color="white">
            {totaluser} people just tapped the button
          </Text>
          <Button mt={3} rounded="3xl">
            <Link to="/create" replace>
              Get your own messages!
            </Link>
          </Button>
          <Button variant="link" color="white" fontSize={14} mt="3">
            <Link to={`/${location.state}`}>Send another messages!</Link>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Sent;
