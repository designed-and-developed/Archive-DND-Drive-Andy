import { Button, FileInput, Modal, Select, TextInput } from "@mantine/core";

type MFtype = {
  opened: boolean;
  close: () => void;
};

const ModalForm = ({ opened, close }: MFtype) => {
  return (
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
      />
      <TextInput placeholder="File name" label="Rename your file (Optional)" />
      <Select
        label="Select Category"
        placeholder="Pick one"
        data={[
          { value: "react", label: "React" },
          { value: "ng", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "vue", label: "Vue" },
        ]}
      />
      <Button fullWidth mt={25} size="md" type="submit">
        Upload File
      </Button>
    </Modal>
  );
};

export default ModalForm;
