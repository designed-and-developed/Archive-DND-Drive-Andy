import { Title, Text, Anchor } from "@mantine/core";

type ATtype = {
  type: string;
  toggle: () => void;
};

const AuthTitle = ({ type, toggle }: ATtype) => {
  return (
    <>
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
    </>
  );
};

export default AuthTitle;
