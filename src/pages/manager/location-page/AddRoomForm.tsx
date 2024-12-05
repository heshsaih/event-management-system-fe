import { z } from "zod";
import StyledModal from "../../../components/StyledModal";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRoom from "../../../data/useRoom";
import Form from "../../../components/Form";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import TextInput from "../../../components/TextInput";
import { useTranslation } from "react-i18next";

export type AddRoomFormProps = {
  locationId: string;
  open: boolean;
  onClose: () => void;
};

const addRoomSchema = z.object({
  roomNumber: z.string(),
  capacity: z.number(),
});

type AddRoomSchema = z.infer<typeof addRoomSchema>;

export default function AddRoomForm(props: AddRoomFormProps) {
  const { t } = useTranslation();
  const { isCreating, createRoom } = useRoom();
  const a = useForm<AddRoomSchema>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      roomNumber: "",
      capacity: 1,
    },
  });

  const submit = a.handleSubmit(async function(data) {
    const result = await createRoom([
      {
        ...data,
        locationId: props.locationId,
      },
    ]);

    if (result) {
      props.onClose();
    }
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <FormProvider {...a}>
        <Form onSubmit={submit}>
          <Typography variant="h4">{t("addRoomForm.pageHeading")}</Typography>
          <TextInput
            aria-label={t("addRoomForm.ariaLabels.roomNumber")}
            name="roomNumber"
            label={t("addRoomForm.labels.roomNumber")}
          ></TextInput>
          <TextInput
            type="number"
            name="capacity"
            label={t("addRoomForm.labels.capacity")}
            aria-label={t("addRoomForm.ariaLabels.capacity")}
          ></TextInput>
          <Tooltip title={t("addRoomForm.submitButtonTooltip")}>
            <Button type="submit">
              {isCreating ? (
                <CircularProgress></CircularProgress>
              ) : (
                t("addRoomForm.submitButtonText")
              )}
            </Button>
          </Tooltip>
        </Form>
      </FormProvider>
    </StyledModal>
  );
}
