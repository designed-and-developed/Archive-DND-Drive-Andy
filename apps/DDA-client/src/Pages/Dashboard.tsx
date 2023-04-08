import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalForm } from "../Components";

const Dashboard = () => {

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);


  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return (
    <Container size={1200} my={100}>
      <ModalForm opened={opened} close={close} />
      <Group position="center">
        <Button onClick={open}>Upload File</Button>
      </Group>
    </Container>
  );
};

export default Dashboard;