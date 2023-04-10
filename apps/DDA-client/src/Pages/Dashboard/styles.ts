import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-around",
    gap: "100px",
    marginRight: "180px",
    marginLeft: "180px",
  },
  button: {
    width: "100px",
    alignSelf: "end",
    marginRight: "50px",
    marginBottom: "30px",
  },
  title: {
    fontFamily: theme.fontFamily,
    marginBottom: "50px"
  },
  filesTable: {
    flexGrow: 1,
  },
}));
