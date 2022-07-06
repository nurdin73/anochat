import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Authenticated, Authorized, Guest } from "./Authenticated";
import Result from "./Pages/Result";
const Answer = React.lazy(() => import("./Pages/Answer"));
const Create = React.lazy(() => import("./Pages/Create"));
const Home = React.lazy(() => import("./Pages/Home"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Response = React.lazy(() => import("./Pages/Profile/Response"));
const Sent = React.lazy(() => import("./Pages/Sent"));

function App() {
  return (
    <>
      <React.Suspense fallback="loading">
        <Box w="100%" h="100vh" bgGradient="linear(to-b, red.500, orange.500)">
          <Router>
            <Routes>
              <Route
                path="/create"
                element={
                  <Authenticated>
                    <Create />
                  </Authenticated>
                }
              />
              <Route
                path="/profile"
                element={
                  <Authorized>
                    <Profile />
                  </Authorized>
                }
              />
              <Route
                path="/response"
                element={
                  <Authorized>
                    <Response />
                  </Authorized>
                }
              />
              <Route
                path="/sent"
                element={
                  <Guest>
                    <Sent />
                  </Guest>
                }
              />
              <Route
                path="/result"
                element={
                  <Authorized>
                    <Result />
                  </Authorized>
                }
              />
              <Route path="/:name" element={<Answer />} />
              <Route
                path="/"
                element={
                  <Authenticated>
                    <Home />
                  </Authenticated>
                }
              />
            </Routes>
          </Router>
        </Box>
      </React.Suspense>
    </>
  );
}

export default App;
