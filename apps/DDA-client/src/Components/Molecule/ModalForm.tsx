import {
  Button,
  Text,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
  rem,
  MultiSelect,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  useCreateFileMutation,
  useFindAllTagLazyQuery,
} from "../../generated/graphql";
import Cookies from "js-cookie";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconUpload, IconFileDescription, IconX } from "@tabler/icons-react";
import AWS from "aws-sdk";
import { notifications } from "@mantine/notifications";

type MFtype = {
  opened: boolean;
  close: () => void;
};

const ModalForm = (
  { opened, close }: MFtype,
  props: Partial<DropzoneProps>
) => {
  const [filename, setFilename] = useState<any>("");
  const [selectedTags, setSelectedTags] = useState<any>("");
  const [file, setFile] = useState<any>(null);
  const theme = useMantineTheme();

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
        fileName: "Default.pdf",
        ownerName: Cookies.get("username") || "Unknown",
        awsUrl: "www.amazon.com",
      },
    },
  });

  let displayTagData: any[] = [];
  tagsData?.findAllTag.forEach((tag) => {
    displayTagData.push({ value: tag?.id, label: tag?.tagName });
  });

  const handleDrop = (files: any) => {
    setFilename(files[0].name);
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!filename) {
      notifications.show({
        title: "Alert",
        message: "File name cannot be empty!",
        color: "red",
      });
      return;
    }

    if (!file) {
      notifications.show({
        title: "Alert",
        message: "Please upload at least 1 file.",
        color: "red",
      });
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      region: "ap-southeast-2",
    });

    const params = {
      Bucket: "dda-drive",
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
              ownerName: Cookies.get("username") || "Unknown",
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
          title: "Alert",
          message: "File Uploaded Successfully!",
          color: "green",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notifications.show({
        title: "Alert",
        message: "Error uploading file. Please try again later.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    executeFindAllTagsQuery();
  }, []);

  return (
    <Group position="center">
      <Modal
        size="lg"
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
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileDescription size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag PDFs here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
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
        <Button fullWidth mt={25} size="md" onClick={handleUpload}>
          Upload File
        </Button>
      </Modal>
    </Group>
  );
};

export default ModalForm;
