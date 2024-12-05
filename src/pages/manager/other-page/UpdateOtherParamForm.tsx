import { z } from "zod";
import {
  Organization,
  UpdateOrganizationDto,
} from "../../../data/useOrganization";
import {
  SessionType,
  UpdateSessionTypeDto,
} from "../../../data/useSessionType";
import {
  SpeakerTitle,
  UpdateSpeakerTitleDto,
} from "../../../data/useSpeakerTitle";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import StyledModal from "../../../components/StyledModal";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import TextInput from "../../../components/TextInput";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/styling";
import StyledSwitch from "../../../components/StyledSwitch";
import { useTranslation } from "react-i18next";

const updateOtherParamForm = z.object({
  name: z.string(),
});

type UpdateOtherParamFormType = z.infer<typeof updateOtherParamForm>;

type UpdateOtherParamFormProps = {
  open: boolean;
  paramId: string | undefined;
  get: (
    id: string,
  ) =>
    | Promise<SpeakerTitle | undefined>
    | Promise<Organization | undefined>
    | Promise<SessionType | undefined>;
  update:
  | ((id: string, data: UpdateSpeakerTitleDto) => Promise<boolean>)
  | ((id: string, data: UpdateOrganizationDto) => Promise<boolean>)
  | ((id: string, data: UpdateSessionTypeDto) => Promise<boolean>);
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

  const submit = a.handleSubmit(async function(data) {
    const result = await props.update(props.paramId ?? "", data);
    if (result) {
      getOtherParam();
    }
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
              onChange={async function() {
                const result = await props.changeActive(
                  param?.id ?? "",
                  !param?.active,
                );
                if (result) {
                  getOtherParam();
                }
              }}
            ></StyledSwitch>
          </>
        )}
      </>
    </StyledModal>
  );
}
