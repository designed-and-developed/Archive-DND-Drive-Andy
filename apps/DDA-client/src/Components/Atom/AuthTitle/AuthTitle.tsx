import { Title, Text, Anchor } from "@mantine/core";
import { useStyles } from "./styles";

type ATtype = {
  type: string;
  toggle: () => void;
};

const AuthTitle = ({ type, toggle }: ATtype) => {
  const { classes } = useStyles();

  return (
    <>
      <Title
        align="center"
        className={classes.title}
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
    </>
  );
};

export default AuthTitle;
