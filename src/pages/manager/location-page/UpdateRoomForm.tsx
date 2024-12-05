import { z } from "zod";
import useRoom from "../../../data/useRoom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import StyledModal from "../../../components/StyledModal";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";

const updateRoomSchema = z.object({
  roomNumber: z.string(),
  capacity: z.number(),
});

type UpdateRoomFormType = z.infer<typeof updateRoomSchema>;

type UpdateRoomFormProps = {
  open: boolean;
  onClose: () => void;
  id: string | undefined;
};

export default function UpdateRoomForm(props: UpdateRoomFormProps) {
  const { t } = useTranslation();
  const { room, getRoom, changeRoomActive, isUpdating, updateRoom } = useRoom();
  const a = useForm<UpdateRoomFormType>({
    resolver: zodResolver(updateRoomSchema),
    values: {
      roomNumber: room?.roomNumber ?? "",
      capacity: room?.capacity ?? 1,
    },
  });

  const submit = a.handleSubmit(async function(data) {
    const result = await updateRoom(props.id ?? "", data);
    if (result) {
      props.onClose();
    }
  });

  useEffect(
    function() {
      if (props.open) {
        getRoom(props.id ?? "");
      }
    },
    [props.id],
  );

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4" marginBottom={4}>
          {t("updateRoomForm.pageHeading")}
        </Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              name="roomNumber"
              label={t("updateRoomForm.labels.roomNumber")}
              aria-label={t("updateRoomForm.ariaLabels.roomNumber")}
            ></TextInput>
            <TextInput
              type="number"
              name="capacity"
              label={t("updateRoomForm.labels.capacity")}
              aria-label={t("updateRoomForm.ariaLabels.capacity")}
            ></TextInput>
            <StyledSwitch
              aria-label={t("updateRoomForm.ariaLabels.active")}
              checked={room?.active ?? true}
              onChange={async function() {
                const result = await changeRoomActive(
                  props?.id ?? "",
                  room?.active ? false : true,
                );
                if (result) {
                  getRoom(props.id ?? "");
                }
              }}
            ></StyledSwitch>
            <Tooltip title={t("updateRoomForm.submitButtonTooltip")}>
              <Button type="submit">
                {isUpdating ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  t("updateRoomForm.submitButtonText")
                )}
              </Button>
            </Tooltip>
          </Form>
        </FormProvider>
      </>
    </StyledModal>
  );
}
