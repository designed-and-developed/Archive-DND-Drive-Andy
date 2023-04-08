import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalForm } from "../Components";
import { useFindAllFileLazyQuery } from "../generated/graphql";

const Dashboard = () => {

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [
    executeFindAllFilesQuery,
    { data: filesData, loading: filesLoading, error: filesError },
  ] = useFindAllFileLazyQuery();

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return (
    <Container size={1200} my={100}>
      <ModalForm opened={opened} close={close} findAllFiles={executeFindAllFilesQuery}/>
      <Group position="center">
        <Button onClick={open}>Upload File</Button>
      </Group>
    </Container>
  );
};

export default Dashboard;
