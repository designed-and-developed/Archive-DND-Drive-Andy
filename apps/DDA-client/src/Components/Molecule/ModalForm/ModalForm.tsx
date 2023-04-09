import {
  Button,
  Text,
  Group,
  Modal,
  TextInput,
  MultiSelect,
  SelectItem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  useCreateFileMutation,
  useFindAllTagLazyQuery,
} from "../../../generated/graphql";
import Cookies from "js-cookie";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconUpload, IconFileDescription, IconX } from "@tabler/icons-react";
import AWS from "aws-sdk";
import { notifications } from "@mantine/notifications";
import { useStyles } from "./styles";
import * as constants from "../../../@constants/constants";

type MFtype = {
  opened: boolean;
  close: () => void;
};

const ModalForm = (
  { opened, close }: MFtype,
  props: Partial<DropzoneProps>
) => {
  const [filename, setFilename] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const [file, setFile] = useState<File | null>();
  const { classes } = useStyles();

  const [
    executeFindAllTagsQuery,
    { data: tagsData, loading: tagsLoading, error: tagsError },
  ] = useFindAllTagLazyQuery();

  const [
    executeCreateFileMutation,
    { data: fileData, loading: fileLoading, error: fileError },
  ] = useCreateFileMutation({
    variables: {
      createFileInput: {
        fileName: constants.DEFAULT_FILE,
        ownerName: Cookies.get("username") || constants.UNKNOWN_USER,
        awsUrl: constants.DEFAULT_URL,
      },
    },
  });

  let displayTagData: (SelectItem | string)[] = [];
  tagsData?.findAllTag.forEach((tag) => {
    if (tag) {
      displayTagData.push({ value: tag.id, label: tag.tagName });
    }
  });

  const handleDrop = (files: File[]) => {
    setFilename(files[0].name);
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!filename) {
      notifications.show({
        title: constants.ALERT_TEXT,
        message: "File name cannot be empty!",
        color: "red",
      });
      return;
    }

    if (!file) {
      notifications.show({
        title: constants.ALERT_TEXT,
        message: "Please upload at least 1 file.",
        color: "red",
      });
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      region: constants.REGION,
    });

    const params = {
      Bucket: constants.BUCKET_NAME,
      Key: file.name,
      Body: file,
    };

    try {
      const response = await s3.upload(params).promise();

      if (response) {
        const listUpdate = await executeCreateFileMutation({
          variables: {
            createFileInput: {
              fileName: filename,
              ownerName: Cookies.get("username") || constants.UNKNOWN_USER,
              awsUrl: response.Location,
              tagIds: selectedTags,
            },
          },
        });
        if (listUpdate) {
          // Requery for updated database

          // Close the modal
          close();
          // Reset filename state
          setFilename("");
          // Reset file to null
          setFile(null);
        }
        notifications.show({
          title: constants.ALERT_TEXT,
          message: "File Uploaded Successfully!",
          color: "green",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notifications.show({
        title: constants.ALERT_TEXT,
        message: "Error uploading file. Please try again later.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    executeFindAllTagsQuery();
  }, []);

  return (
    <Modal
      className={classes.modal}
      classNames={{ inner: classes.inner, content: classes.content }}
      opened={opened}
      onClose={close}
      title="Upload Document"
      centered
    >
      <Dropzone
        onDrop={handleDrop}
        multiple={false}
        onReject={(files) => console.log("rejected files", files)}
        accept={{
          "application/pdf": [], // Accepts PDF types Only
        }}
        {...props}
      >
        <Group className={classes.group}>
          <Dropzone.Accept>
            <IconUpload className={classes.iconUpload} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX className={classes.iconX} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileDescription className={classes.iconFileDesc}/>
          </Dropzone.Idle>

          <div>
            <Text className={classes.selectFileText}>
              Drag PDFs here or click to select files
            </Text>
            <Text className={classes.instructionText}>
              Attach a file, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <TextInput
        value={filename}
        placeholder="Your file name"
        label="Rename your file (Optional)"
        onChange={(e) => setFilename(e.target.value)}
      />
      <MultiSelect
        data={displayTagData}
        label="Category"
        placeholder="Select zero or many tags"
        onChange={(e) => setSelectedTags(e)}
      />
      <Button onClick={handleUpload} className={classes.button}>
        Upload File
      </Button>
    </Modal>
  );
};

export default ModalForm;
