import { rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  group: {
    minHeight: rem(220),
    pointerEvents: "none",
  },
  iconUpload: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },
}));
