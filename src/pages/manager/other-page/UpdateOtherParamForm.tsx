import { z } from "zod";
import { Organization } from "../../../data/useOrganization";
import { SessionType } from "../../../data/useSessionType";
import { SpeakerTitle } from "../../../data/useSpeakerTitle";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import StyledModal from "../../../components/StyledModal";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import TextInput from "../../../components/TextInput";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/styling";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";
import { OtherParam, UpdateOtherParamDto } from "../../../types";
import ConfirmActionModal from "../../../components/ConfirmActionModal";
import StyledContainer from "../../../components/StyledContainer";
import toast from "react-hot-toast";

const updateOtherParamForm = z.object({
  name: z
    .string()
    .min(2, "updateOtherParamForm.validation.nameTooShort")
    .max(64, "updateOtherParamForm.validation.nameTooLong"),
});

type UpdateOtherParamFormType = z.infer<typeof updateOtherParamForm>;

type UpdateOtherParamFormProps = {
  open: boolean;
  paramId: string | undefined;
  get: (id: string) => Promise<OtherParam | undefined>;
  update: (id: string, data: UpdateOtherParamDto) => Promise<boolean>;
  changeActive: (id: string, active: boolean) => Promise<boolean>;
  close: () => void;
  getAll: () => void;
  isUpdating: boolean;
  heading: string;
  isFetching: boolean;
};

export default function UpdateOtherParamForm(props: UpdateOtherParamFormProps) {
  const [param, setParam] = useState<
    SpeakerTitle | Organization | SessionType
  >();
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();

  const getOtherParam = async function() {
    if (props.paramId) {
      const result = await props.get(props.paramId);
      if (result) {
        setParam(result);
      }
    }
  };

  useEffect(
    function() {
      getOtherParam();
    },
    [props.paramId],
  );

  const a = useForm<UpdateOtherParamFormType>({
    resolver: zodResolver(updateOtherParamForm),
    values: {
      name: param?.name ?? "",
    },
  });

  const submit = a.handleSubmit(function() {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const result = await props.update(props.paramId ?? "", a.getValues());
        if (result) {
          getOtherParam();
        }
      };
    });
    setOpenConfirm(true);
  });

  return (
    <StyledModal
      open={props.open}
      onClose={function() {
        setParam(undefined);
        props.getAll();
        props.close();
      }}
    >
      <>
        <Typography variant="h4">{props.heading}</Typography>
        <StyledContainer
          inner
          sx={{
            paddingY: "1rem",
          }}
        >
          <Typography variant="h5">
            {t("updateOtherParamForm.idHeading")}
          </Typography>
          <Typography>{param?.id}</Typography>
          <Tooltip title={t("updateOtherParamForm.copyButtonTooltip")}>
            <Button
              aria-label={t("updateOtherParamForm.ariaLabels.copyButton")}
              onClick={function() {
                window.navigator.clipboard
                  .writeText(param?.id ?? "")
                  .then(function() {
                    toast.success(t("updateOtherParamForm.copySuccess"));
                  });
              }}
            >
              {t("updateOtherParamForm.copyButtonText")}
            </Button>
          </Tooltip>
        </StyledContainer>
        <Typography variant="h5">
          {t("updateOtherParamForm.dataHeading")}
        </Typography>
        {props.isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!props.isFetching && (
          <>
            <FormProvider {...a}>
              <Form onSubmit={submit}>
                <TextInput
                  autoFocus
                  name="name"
                  label={t("updateOtherParamForm.labels.name")}
                  aria-label={t("updateOtherParamForm.ariaLabels.name")}
                ></TextInput>
                <Tooltip title={t("updateOtherParamForm.submitButtonTooltip")}>
                  <Button
                    type="submit"
                    aria-label={t(
                      "updateOtherParamForm.ariaLabels.submitButton",
                    )}
                  >
                    {props.isUpdating ? (
                      <CircularProgress></CircularProgress>
                    ) : (
                      t("updateOtherParamForm.submitButtonText")
                    )}
                  </Button>
                </Tooltip>
              </Form>
            </FormProvider>
            <Typography variant="h5">
              {t("updateOtherParamForm.activeHeading")}
            </Typography>
            <StyledSwitch
              checked={param?.active ?? true}
              onChange={function() {
                setConfirmAction(function() {
                  setOpenConfirm(false);
                  return async function() {
                    const result = await props.changeActive(
                      param?.id ?? "",
                      !param?.active,
                    );
                    if (result) {
                      getOtherParam();
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
    </StyledModal>
  );
}
