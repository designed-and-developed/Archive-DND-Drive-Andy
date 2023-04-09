import { rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  paper: {
    padding: rem(45),
    marginTop: rem(30),
  },
  label: {
    fontSize: "1.2rem",
    marginTop: "15px"
  },
  button: {
    width: "100%",
    marginTop: rem(50),
    fontSize: "1rem"
  }
}));
