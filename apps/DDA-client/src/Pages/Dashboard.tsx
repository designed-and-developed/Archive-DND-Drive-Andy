import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group } from "@mantine/core";
import { useFindAllFileLazyQuery } from "../generated/graphql";
import { useDisclosure } from "@mantine/hooks";
import { DisplayFileTable, ModalForm } from "../Components";

const Dashboard = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);


  return (
    <Container size={1200} my={100}>
      
      <DisplayFileTable />
    </Container>
  );
};

export default Dashboard;
