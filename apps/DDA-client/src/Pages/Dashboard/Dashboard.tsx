import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FilesTable, ModalForm } from "../../Components";
import { useFindFilesLazyQuery } from "../../generated/graphql";

const Dashboard = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [
    executeFindFilesQuery,
    { data: filesData, loading: filesLoading, error: filesError },
  ] = useFindFilesLazyQuery({
    variables: {
      tagIds: [],
    },
  });

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return (
    <Container size={1200} my={100}>
      <ModalForm
        opened={opened}
        close={close}
      />
      <Group position="center">
        <Button onClick={open}>Upload File</Button>
      </Group>
      <FilesTable
        opened={opened}
        findFiles={executeFindFilesQuery}
        filesData={filesData}
      />
    </Container>
  );
};

export default Dashboard;
