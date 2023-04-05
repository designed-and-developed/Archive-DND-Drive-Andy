import React, { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "../../generated/graphql";
import { useToggle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { AuthInput, AuthTitle } from "../Atom";
import Cookies from "js-cookie";

const AuthForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, toggle] = useToggle(["Login", "Register"]);

  const navigate = useNavigate();

  const [
    executeRegisterMutation,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useCreateUserMutation({
    variables: {
      userInput: {
        username: username,
        password: password,
      },
    },
  });

  const [
    executeLoginMutation,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useLoginMutation({
    variables: {
      userInput: {
        username: username,
        password: password,
      },
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type == "Login") {
      if (username && password) executeLoginMutation();
    }
    if (type == "Register") {
      if (username && password) executeRegisterMutation();
    }
  };

  useEffect(() => {
    if (registerData?.createUser.success == false) {
      notifications.show({
        title: "Alert",
        message: "User already registered. Please use another username.",
        color: "red",
      });
    } else if (registerData?.createUser.success == true) {
      notifications.show({
        title: "Alert",
        message: "User successfully registered!",
        color: "green",
      });
      toggle();
    }
  }, [registerData]);

  useEffect(() => {
    if (Cookies.get("username")) navigate("/dashboard");
    if (loginData && loginData?.login == null) {
      notifications.show({
        title: "Alert",
        message: "Credentials incorrect. Please check username or password.",
        color: "red",
      });
    } else if (loginData?.login.access_token) {
      // Creates a login cookie
      Cookies.set("username", username, { expires: 7 });
      // Logs in the user, redirects to the dashboard
      navigate("/dashboard");
    }
  }, [loginData, loginError]);

  return (
    <Container size={600} my={300}>
      <AuthTitle type={type} toggle={toggle} />
      <AuthInput
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
        type={type}
      />
    </Container>
  );
};

export default AuthForm;
