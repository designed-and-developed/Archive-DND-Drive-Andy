import { Container, Paper, Table, Title, rem } from "@mantine/core";
import { useEffect } from "react";
import {
  FindFilesQuery,
  useDeleteFileMutation,
  useUpdateDownloadCountByFileMutation,
} from "../../../generated/graphql";
import { notifications } from "@mantine/notifications";
import * as constants from "../../../@constants/constants";
import Cookies from "js-cookie";

type DFTtype = {
  opened: boolean;
  findFiles: () => void;
  filesData: FindFilesQuery | undefined;
};

const FilesTable = ({ opened, findFiles, filesData }: DFTtype) => {
  useEffect(() => {
    findFiles();
  }, [opened]);

  const [
    executeUpdateDownloadCount,
    { data: tagsData, loading: tagsLoading, error: tagsError },
  ] = useUpdateDownloadCountByFileMutation({
    onCompleted: () => {
      findFiles();
    },
  });

  const [
    executeDeleteFile,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useDeleteFileMutation({
    onCompleted: () => {
      findFiles();
    },
  });

  const handleIncrementDownload = (fileId: string) => {
    executeUpdateDownloadCount({
      variables: {
        fileId: fileId,
      },
    });
    notifications.show({
      title: constants.ALERT_TEXT,
      message: "File Download Started!",
      color: "green",
    });
  };

  const handleDelete = async (fileId: string) => {
    const deleteResponse = await executeDeleteFile({
      variables: {
        fileId: fileId,
        userId: Cookies.get("userId") || "",
      },
    });
    if (deleteResponse) {
      if (deleteResponse.data?.deleteFile.success == true) {
        notifications.show({
          title: constants.ALERT_TEXT,
          message: "File Deleted!",
          color: "green",
        });
      }
      if (deleteResponse.data?.deleteFile.success == false) {
        notifications.show({
          title: constants.ALERT_TEXT,
          message: "You can only delete your own file!",
          color: "red",
        });
      }
    }
  };

  const rows = filesData?.findFiles.map((element: any) => (
    <tr key={element?.id}>
      <td>{element?.fileName}</td>
      <td>{element?.tagNames}</td>
      <td>{element?.ownerName}</td>
      <td>{element?.createdAt.slice(0, 10)}</td>
      <td>{element?.downloadCount}</td>
      <td>
        <a
          href={element?.awsUrl}
          onClick={() => handleIncrementDownload(element.id)}
        >
          Download
        </a>
      </td>
      <td>
        <a href="#" onClick={() => handleDelete(element.id)}>Delete?</a>
      </td>
    </tr>
  ));

  return (
    <div>
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
        <Table my={30} verticalSpacing="md">
          <thead>
            <tr>
              <th style={{ paddingRight: "300px" }}>Name</th>
              <th style={{ paddingRight: "100px" }}>Category</th>
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
    </div>
  );
};

export default FilesTable;
