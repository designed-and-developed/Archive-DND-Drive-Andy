import { Container, Paper, Table, Title } from "@mantine/core";
import { useEffect } from "react";

type DFTtype = {
  opened: boolean;
  findAllFiles: () => void;
  filesData: any;
};


const DisplayFileTable = ({ opened, findAllFiles, filesData }: DFTtype,) => {

  useEffect(() => {
    findAllFiles();
    console.log(filesData)
  }, [opened]);

  const rows = filesData?.findAllFile.map((element: any) => (
    <tr key={element?.id}>
      <td>{element?.fileName}</td>
      <td>{"n/a"}</td>
      <td>{element?.ownerName}</td>
      <td>{element?.createdAt.slice(0, 10)}</td>
      <td>{element?.downloadCount}</td>
      <td>{"Delete ?"}</td>
    </tr>
  ));

  return (
    <Container size={1200} my={100}>
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
  );
};

export default DisplayFileTable;
