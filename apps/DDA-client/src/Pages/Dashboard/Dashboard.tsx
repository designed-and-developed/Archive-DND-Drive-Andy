import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FilesTable, ModalForm, TagDisplay } from "../../Components";
import {
  useFindAllTagLazyQuery,
  useFindFilesLazyQuery,
} from "../../generated/graphql";
import { useStyles } from "./styles";
import { ClassNames } from "@emotion/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

  const [
    executeFindAllTagsQuery,
    { data: tagsData, loading: tagsLoading, error: tagsError },
  ] = useFindAllTagLazyQuery();

  const [
    executeFindFilesQuery,
    { data: filesData, loading: filesLoading, error: filesError },
  ] = useFindFilesLazyQuery({
    variables: {
      tagIds: [],
    },
  });

  const handleLogout = () => {
    Cookies.remove("username");
    Cookies.remove("userId");
    navigate("/");
  };

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return (
    <div className={classes.pageContainer}>
      <ModalForm
        opened={opened}
        close={close}
        findAllTags={executeFindAllTagsQuery}
        tagsData={tagsData}
      />

      
      <Button onClick={handleLogout} className={classes.button}>Logout</Button>
      <h1 className={classes.title}>DND Drive</h1>

      <div className={classes.flexContainer}>
        <FilesTable
          opened={opened}
          findFiles={executeFindFilesQuery}
          filesData={filesData}
        />
        <Group position="center">
          <TagDisplay tagsData={tagsData} findFiles={executeFindFilesQuery} />
          <Button onClick={open} fullWidth>
            Upload File
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default Dashboard;
