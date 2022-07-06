import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { destroy } from "../../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("dataProfile"));
    localStorage.removeItem("dataProfile");
    destroy(`/users/${user?.id}`);
    destroy(`/answers/${user?.id}`);
    navigate("/", { replace: true });
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        bgColor="white"
        p={2}
      >
        <Button
          variant="link"
          size="xs"
          color="blackAlpha.700"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {location.pathname === "/response" && (
            <Link to="/profile">Profile</Link>
          )}
          {location.pathname === "/profile" && (
            <Link to="/response">Response</Link>
          )}
        </Button>
        <Button size="xs" colorScheme="red" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Box>
      <hr />
    </>
  );
};

export default Navbar;
