import { Button, Container, Group, Paper, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import { useDisclosure, useForceUpdate } from "@mantine/hooks";
import { useFindAllFileLazyQuery } from "../../generated/graphql";

const DisplayFileTable = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [
    executeFindAllFilesQuery,
    { data: filesData, loading: filesLoading, error: filesError },
  ] = useFindAllFileLazyQuery();

  useEffect(() => {
    executeFindAllFilesQuery();
  }, []);

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
      <ModalForm opened={opened} close={close} />
      <Group position="center">
        <Button onClick={open}>Upload File</Button>
      </Group>
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
