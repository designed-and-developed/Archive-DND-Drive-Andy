import { Title } from "@mantine/core";

type formProp = {
  type: string;
};

const AuthTitle = ({ type }: formProp) => {
  return (
    <Title
      align="center"
      sx={(theme) => ({
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
      })}
    >
      DND Drive {type}
    </Title>
  );
};

export default AuthTitle;
