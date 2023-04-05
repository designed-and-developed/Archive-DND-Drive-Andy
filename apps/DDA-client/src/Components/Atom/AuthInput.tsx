import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";

type AItype = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setUsername: (e: any) => void;
  setPassword: (e: any) => void;
  type: string;
};

const AuthInput = ({
  handleSubmit,
  setUsername,
  setPassword,
  type,
}: AItype) => {
  return (
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
          {type === "Register" ? "Signup" : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default AuthInput;
