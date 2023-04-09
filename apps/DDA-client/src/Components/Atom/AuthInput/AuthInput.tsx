import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useStyles } from "./styles";

type AItype = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setUsername: (e: string) => void;
  setPassword: (e: string) => void;
  type: string;
};

const AuthInput = ({
  handleSubmit,
  setUsername,
  setPassword,
  type,
}: AItype) => {
  const { classes } = useStyles();
  return (
    <Paper withBorder shadow="md" className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextInput
        classNames={{label: classes.label}}
          label="Username"
          name="username"
          placeholder="cool_user_name"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          classNames={{label: classes.label}}
          label="Password"
          name="password"
          placeholder="your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className={classes.button} type="submit">
          {type === "Register" ? "Signup" : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default AuthInput;
