import {
  Button,
  FileInput,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useCreateFileMutation } from "../../generated/graphql";
import Cookies from "js-cookie";

type MFtype = {
  opened: boolean;
  close: () => void;
};

const ModalForm = ({ opened, close }: MFtype) => {
  const [filename, setFilename] = useState<any>("");

  const [
    executeCreateFileMutation,
    { data: fileData, loading: fileLoading, error: fileError },
  ] = useCreateFileMutation({
    variables: {
      createFileInput: {
        fileName: filename,
        ownerName: Cookies.get("username") || "Unknown",
      },
    },
  });

  useEffect(() => {
    console.log(filename);
  }, [filename]);

  return (
    <Group position="center">
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        title="Upload Document"
        centered
      >
        <FileInput
          label="Upload files"
          placeholder="Only PDFs allowed"
          accept="application/pdf"
          onChange={(e) => setFilename(e?.name)}
        />
        <TextInput
          value={filename}
          placeholder="Your file name"
          label="Rename your file (Optional)"
          onChange={(e) => setFilename(e.target.value)}
        />
        <Select
          label="Select Category"
          placeholder="Pick one"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "vue", label: "Vue" },
          ]}
        />
        <Button fullWidth mt={25} size="md" type="submit">
          Upload File
        </Button>
      </Modal>
    </Group>
  );
};

export default ModalForm;
