import React, { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "../../generated/graphql";
import { useToggle } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [type, toggle] = useToggle(["Login", "Register"]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    }
  }, [registerData]);

  useEffect(() => {
    if (loginError && !loginData?.login.access_token) {
      notifications.show({
        title: "Alert",
        message: "Credentials incorrect. Please check username or password.",
        color: "red",
      });
    } else if (loginData?.login.access_token) {
      // Logs in the user, redirects to the dashboard
      navigate("/dashboard");
    }
  }, [loginData, loginError]);

  return (
    <Container size={600} my={300}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        DND Drive {type}
      </Title>
      <Text color="dimmed" size="m" align="center" mt={5}>
        {type === "Register"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Anchor size="sm" component="button" onClick={() => toggle()}>
          {type === "Register" ? "Login" : "Register"}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={50} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            size="lg"
            label="Username"
            name="username"
            placeholder="cool_user_name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordInput
            size="lg"
            pt={10}
            label="Password"
            name="password"
            placeholder="your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Button fullWidth mt={50} size="lg" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
