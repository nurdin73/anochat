import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { readAll } from "../../firebase";

const Response = () => {
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("dataProfile"));
    readAll(`/answers/${user?.id}`, (data) => {
      setAnswers(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center">
        <Box w="64" mt={7}>
          <Grid gap={4} templateColumns="repeat(3, 1fr)">
            {answers.map((answer) => {
              return (
                <Link to={`/result`} state={answer.data} key={answer.key}>
                  <GridItem
                    w="100%"
                    h="14"
                    bg="whiteAlpha.400"
                    rounded="md"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ChatIcon color="whiteAlpha.700" />
                  </GridItem>
                </Link>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Response;
