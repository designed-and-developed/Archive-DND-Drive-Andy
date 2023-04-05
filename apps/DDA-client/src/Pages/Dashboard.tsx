import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Table, Title } from "@mantine/core";
import { useFindAllFileLazyQuery } from "../generated/graphql";

const Dashboard = () => {
  const navigate = useNavigate();
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
    <Container size={1500} my={300}>
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
              <th style={{ paddingRight: "500px" }}>Name</th>
              <th>Category</th>
              <th>Uploaded By</th>
              <th>Created At</th>
              <th>Download Count</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Dashboard;
