import { Table } from "@mantine/core";
import { useStyles } from "./styles";
import { FindAllTagQuery } from "../../../generated/graphql";

type TDtype = {
  tagsData: FindAllTagQuery | undefined;
  findFiles: (tagIds: any) => void;
};

const TagDisplay = ({ tagsData, findFiles }: TDtype) => {
  const { classes } = useStyles();

  let displayTagData: any[] = [];
  tagsData?.findAllTag.forEach((tag) => {
    if (tag) {
      displayTagData.push({ name: tag.tagName, id: tag.id });
    }
  });

  const handleTagClick = (tagId: string) => {
    findFiles({ variables: { tagIds: tagId } });
  };

  const rows = displayTagData.map((tag) => (
    <tr key={tag.name} id={tag.name}>
      <td onClick={() => handleTagClick(tag.id)}>{tag.name}</td>
    </tr>
  ));
  // Adds the all categories selector
  rows.unshift(
    <tr key="all">
      <td onClick={() => findFiles({ variables: { tagIds: [] } })}>All</td>
    </tr>
  );

  return (
    <Table verticalSpacing="sm" highlightOnHover>
      <thead>
        <tr>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TagDisplay;
