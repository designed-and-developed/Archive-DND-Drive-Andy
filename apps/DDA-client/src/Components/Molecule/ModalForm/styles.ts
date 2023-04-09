import { rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  group: {
    minHeight: rem(220),
    pointerEvents: "none",
    justifyContent: "center"
  },
  iconUpload: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    width: "3.2rem",
    stroke: "1.5"
  },
  iconX: {
    color: theme.colors.red[theme.colorScheme === "dark" ? 4 : 6],
    width: "3.2rem",
    stroke: "1.5"
  },
  iconFileDesc: {
    width: "2rem",
    stroke: "1.5"
  },
  selectFileText: {
    fontSize: "1.25rem"
  },
  instructionText: {
    fontSize: "0.9rem",
    color: theme.colors.gray
  },
  modal: {
    fontFamily: theme.fontFamily
  },
  inner: {
    paddingInlineStart: 0,
  },
  content: {
    flexBasis: rem(550)
  },
  button: {
    width: "100%",
    marginTop: rem(25),
    fontSize: "1rem"
  },
}));
