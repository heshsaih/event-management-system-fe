import { z } from "zod";
import useRoom from "../../../data/useRoom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import StyledModal from "../../../components/StyledModal";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import { useTranslation } from "react-i18next";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import ChangeActiveSwitch from "../../../components/ChangeActiveSwitch";

const updateRoomSchema = z.object({
  roomNumber: z
    .string()
    .min(2, "updateRoomForm.validation.roomNumberTooShort")
    .max(16, "updateRoomForm.validation.roomNumberTooLong"),
  capacity: z.number().min(1, "updateRoomForm.validation.capacityTooLow"),
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
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();

  const submit = a.handleSubmit(function () {
    setConfirmAction(function () {
      return async function () {
        setOpenConfirm(false);
        await updateRoom(props.id ?? "", a.getValues());
      };
    });
    setOpenConfirm(true);
  });

  useEffect(
    function () {
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
        <Typography variant="h5">
          {t("updateRoomForm.updateDataHeading")}
        </Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              autoFocus
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
        <Typography variant="h5"></Typography>
        <ChangeActiveSwitch
          heading={t("updateRoomForm.activeHeading")}
          value={room?.active ?? true}
          onChange={function () {
            setConfirmAction(function () {
              return async function () {
                setOpenConfirm(false);
                const result = await changeRoomActive(
                  props?.id ?? "",
                  room?.active ? false : true,
                );
                if (result) {
                  getRoom(props.id ?? "");
                }
              };
            });
            setOpenConfirm(true);
          }}
        ></ChangeActiveSwitch>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function () {
            setOpenConfirm(false);
          }}
          confirmAction={confirmAction as () => void}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
