import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FilesTable, ModalForm } from "../../Components";
import {
  useFindAllTagLazyQuery,
  useFindFilesLazyQuery,
} from "../../generated/graphql";

const Dashboard = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

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

  let displayTagData: any[] = [];
  tagsData?.findAllTag.forEach((tag) => {
    if (tag) {
      displayTagData.push({ name: tag.tagName, id: tag.id });
    }
  });

  const handleTagClick = (tagId: string) => {
    executeFindFilesQuery({ variables: { tagIds: tagId } });
  };

  const rows = displayTagData.map((tag) => (
    <tr key={tag.name} id={tag.name}>
      <td onClick={() => handleTagClick(tag.id)}>{tag.name}</td>
    </tr>
  ));

  useEffect(() => {
    if (!Cookies.get("username")) navigate("/");
  }, []);

  return (
    <Container size={1300} my={100}>
      <ModalForm
        opened={opened}
        close={close}
        findAllTags={executeFindAllTagsQuery}
        tagsData={tagsData}
      />
      <Flex
        gap="lg"
        justify="centre"
        align="flex-start"
        direction="row"
        wrap="nowrap"
      >
        <FilesTable
          opened={opened}
          findFiles={executeFindFilesQuery}
          filesData={filesData}
        />
        <Group position="center">
          <Table my={10} verticalSpacing="sm" highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Button onClick={open}>Upload File</Button>
        </Group>
      </Flex>
    </Container>
  );
};

export default Dashboard;
