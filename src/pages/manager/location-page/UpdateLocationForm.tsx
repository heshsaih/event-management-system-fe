import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import useLocation, { Location } from "../../../data/useLocation";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/styling";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

const updateLocationSchema = z.object({
  name: z
    .string()
    .min(2, "updateLocationForm.validation.nameTooShort")
    .max(64, "updateLocationForm.validation.nameTooLong"),
  street: z
    .string()
    .min(2, "updateLocationForm.validation.streetTooShort")
    .max(64, "updateLocationForm.validation.streetTooLong"),
  buildingNumber: z
    .string()
    .min(2, "updateLocationForm.validation.buildingNumberTooShort")
    .max(16, "updateLocationForm.validation.buildingNumberTooLong"),
  postalCode: z
    .string()
    .regex(
      /[0-9][0-9]-[0-9][0-9][0-9]/,
      "updateLocationForm.validation.postalCodeWrongLength",
    ),
  city: z
    .string()
    .min(2, "updateLocationForm.validation.cityTooShort")
    .max(64, "updateLocationForm.validation.cityTooLong"),
});

type LocationSchema = z.infer<typeof updateLocationSchema>;
type UpdateLocationFormProps = {
  location: Location | undefined;
  onCancel: () => void;
  getLocation: (id: string) => void;
};

export default function UpdateLocationForm(props: UpdateLocationFormProps) {
  const { isUpdating, updateLocation, isFetching, changeLocationActive } =
    useLocation();
  const { t } = useTranslation();
  const a = useForm<LocationSchema>({
    resolver: zodResolver(updateLocationSchema),
    defaultValues: {
      name: props.location?.name ?? "",
      street: props.location?.street ?? "",
      buildingNumber: props.location?.buildingNumber ?? "",
      postalCode: props.location?.postalCode ?? "",
      city: props.location?.city ?? "",
    },
  });
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();

  useEffect(function() {
    props.getLocation(props.location?.id ?? "");
  }, []);

  const submit = a.handleSubmit(function() {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const result = await updateLocation(
          props.location?.id ?? "",
          a.getValues(),
        );

        if (result) {
          props.getLocation(props.location?.id ?? "");
        }
      };
    });
    setOpenConfirm(true);
  });

  return (
    <>
      <Typography variant="h5">
        {t("updateLocationForm.updateDataHeading")}
      </Typography>
      {isFetching && (
        <CircularProgress
          sx={{ color: Colors.RED }}
          size={"3rem"}
        ></CircularProgress>
      )}
      {!isFetching && (
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              name="name"
              aria-label={t("updateLocationForm.ariaLabels.name")}
              label={t("updateLocationForm.labels.name")}
            ></TextInput>
            <TextInput
              name="street"
              aria-label={t("updateLocationForm.ariaLabels.street")}
              label={t("updateLocationForm.labels.street")}
            ></TextInput>
            <TextInput
              name="buildingNumber"
              aria-label={t("updateLocationForm.ariaLabels.buildingNumber")}
              label={t("updateLocationForm.labels.buildingNumber")}
            ></TextInput>
            <TextInput
              name="postalCode"
              aria-label={t("updateLocationForm.ariaLabels.postalCode")}
              label={t("updateLocationForm.labels.postalCode")}
            ></TextInput>
            <TextInput
              name="city"
              aria-label={t("updateLocationForm.ariaLabels.city")}
              label={t("updateLocationForm.labels.city")}
            ></TextInput>
            <Box>
              <Tooltip title={t("updateLocationForm.submitButtonTooltip")}>
                <Button
                  type="submit"
                  aria-label={t("updateLocationForm.ariaLabels.submitButton")}
                >
                  {isUpdating ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    t("updateLocationForm.submitButtonText")
                  )}
                </Button>
              </Tooltip>
              <Tooltip title={t("updateLocationForm.cancelButtonTooltip")}>
                <Button
                  aria-label={t("updateLocationForm.ariaLabels.cancelButton")}
                  onClick={props.onCancel}
                >
                  {t("updateLocationForm.cancelButtonText")}
                </Button>
              </Tooltip>
            </Box>
          </Form>
        </FormProvider>
      )}
      {!isFetching && (
        <>
          <Typography variant="h5">
            {t("updateLocationForm.activeHeading")}
          </Typography>
          <StyledSwitch
            aria-label={t("updateLocationForm.ariaLabels.active")}
            checked={props.location?.active ?? true}
            onChange={function() {
              setConfirmAction(function() {
                return async function() {
                  setOpenConfirm(false);
                  const result = await changeLocationActive(
                    props.location?.id ?? "",
                    props.location?.active ? false : true,
                  );
                  if (result) {
                    props.getLocation(props.location?.id ?? "");
                  }
                };
              });
              setOpenConfirm(true);
            }}
          ></StyledSwitch>
        </>
      )}
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={confirmAction as () => void}
      ></ConfirmActionModal>
    </>
  );
}
