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
        className={classes.title}
      >
        DND Drive {type}
      </Title>
      <Text className={classes.detailText}>
        {type === "Register"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Anchor component="button" onClick={() => toggle()}>
          {type === "Register" ? "Login" : "Register"}
        </Anchor>
      </Text>
    </>
  );
};

export default AuthTitle;
