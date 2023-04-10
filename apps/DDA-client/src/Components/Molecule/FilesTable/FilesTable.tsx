import { Container, Paper, Table, Title } from "@mantine/core";
import { useEffect } from "react";

type DFTtype = {
  opened: boolean;
  findFiles: () => void;
  filesData: any;
};

const FilesTable = ({ opened, findFiles, filesData }: DFTtype) => {
 
  useEffect(() => {
    findFiles();
  }, [opened]);

  const rows = filesData?.findFiles.map((element: any) => (
    <tr key={element?.id}>
      <td>{element?.fileName}</td>
      <td>{element?.tagNames}</td>
      <td>{element?.ownerName}</td>
      <td>{element?.createdAt.slice(0, 10)}</td>
      <td>{element?.downloadCount}</td>
      <td>
        <a href={element?.awsUrl}>Download</a>
      </td>
      <td>{"Delete?"}</td>
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
              <th>Download</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default FilesTable;
