import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group, Paper, Table, Title } from "@mantine/core";
import { useFindAllFileLazyQuery } from "../generated/graphql";
import { useDisclosure } from "@mantine/hooks";
import { ModalForm } from "../Components";

const Dashboard = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [
    executeFindAllFilesQuery,
    { data: filesData, loading: filesLoading, error: filesError },
  ] = useFindAllFileLazyQuery();

  const rows = filesData?.findAllFile.map((element) => (
    <tr key={element?.fileName}>
      <td>{element?.fileName}</td>
      <td>{"n/a"}</td>
      <td>{element?.ownerName}</td>
      <td>{element?.createdAt.slice(0, 10)}</td>
      <td>{element?.downloadCount}</td>
      <td>{"Delete ?"}</td>
    </tr>
  ));

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
    executeFindAllFilesQuery();
  }, []);

  return (
    <>
      <ModalForm opened={opened} close={close} />
      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>

      <Container size={1200} my={300}>
        <Paper shadow="xs" p="xl">
          <Title
            order={3}
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 400,
            })}
          >
            <b>Documents </b>/ All
          </Title>
          <Table my={50} verticalSpacing="md" highlightOnHover>
            <thead>
              <tr>
                <th style={{ paddingRight: "400px" }}>Name</th>
                <th>Category</th>
                <th>Uploader</th>
                <th>Created At</th>
                <th>Downloads</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
