import { Center, rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    textAlign: "center"
  },
  detailText: {
    textAlign: "center",
    marginTop: rem(5),
    color: theme.colors.gray
  },
}));
