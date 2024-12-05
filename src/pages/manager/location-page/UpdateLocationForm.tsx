import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import useLocation, { Location } from "../../../data/useLocation";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { Colors } from "../../../constants/styling";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";

const updateLocationSchema = z.object({
  name: z.string(),
  street: z.string(),
  buildingNumber: z.string(),
  postalCode: z.string(),
  city: z.string(),
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

  useEffect(function() {
    props.getLocation(props.location?.id ?? "");
  }, []);

  const submit = a.handleSubmit(async function(data) {
    const result = await updateLocation(props.location?.id ?? "", data);

    if (result) {
      props.onCancel();
    }
  });

  return (
    <>
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
            <StyledSwitch
              aria-label={t("updateLocationForm.ariaLabels.active")}
              checked={props.location?.active ?? true}
              onChange={async function() {
                const result = await changeLocationActive(
                  props.location?.id ?? "",
                  props.location?.active ? false : true,
                );
                if (result) {
                  props.getLocation(props.location?.id ?? "");
                }
              }}
            ></StyledSwitch>
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
    </>
  );
}
