import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { Styling } from "../constants/styling";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import TextInput from "./TextInput";
import ControlledAutocomplete, {
  AutocompleteOption,
} from "./ControlledAutocomplete";
import ControlledSwitch from "./ControlledSwitch";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

export type FilterOptions = {
  phrase?: string;
  page?: number;
  size?: number;
  direction?: "asc" | "desc";
  showInactive?: boolean;
  orderBy?: "name" | "createdAt" | "updatedAt" | "firstName";
};

const filterSchema = z.object({
  phrase: z.string().optional(),
  direction: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
  showInactive: z.boolean().optional(),
  orderBy: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
});

type FilterParamsType = z.infer<typeof filterSchema>;

type FilterParamsProps = {
  callback: (options: FilterOptions) => void;
};

const directionOptions = function(t: TFunction): AutocompleteOption[] {
  return [
    {
      label: t("filterParams.directionOptions.asc"),
      value: "asc",
    },
    {
      label: t("filterParams.directionOptions.desc"),
      value: "desc",
    },
  ];
};

const orderByOptions = function(t: TFunction): AutocompleteOption[] {
  return [
    {
      label: t("filterParams.orderByOptions.name"),
      value: "name",
    },
    {
      label: t("filterParams.orderByOptions.createdAt"),
      value: "createdAt",
    },
    {
      label: t("filterParams.orderByOptions.updatedAt"),
      value: "updatedAt",
    },
  ];
};
export default function FilterParams(props: FilterParamsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const a = useForm<FilterParamsType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      phrase: "",
      direction: directionOptions(t)[0],
      showInactive: true,
      orderBy: orderByOptions(t)[0],
    },
  });

  const openAccordion = function() {
    setOpen(true);
  };

  const closeAccordion = function() {
    setOpen(false);
  };

  const submit = a.handleSubmit(function(data) {
    props.callback({
      ...data,
      orderBy: data.orderBy.value as unknown as FilterOptions["orderBy"],
      direction: data.direction.value as unknown as FilterOptions["direction"],
    });
    closeAccordion();
  });

  return (
    <Accordion
      sx={{
        boxShadow: 0,
        "&:before": { display: "none" },
        width: "100%",
        borderRadius: Styling.BORDER_RADIUS,
      }}
      expanded={open}
      onChange={open ? closeAccordion : openAccordion}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
        <Tooltip title={t("filterParams.componentHeadingTooltip")}>
          <Typography variant="h5">
            {t("filterParams.componentHeadingText")}
          </Typography>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput
              aria-label={t("filterParams.ariaLabels.phrase")}
              label={t("filterParams.labels.phrase")}
              name="phrase"
            ></TextInput>
            <ControlledAutocomplete
              createable={false}
              async={false}
              options={orderByOptions(t)}
              name="orderBy"
              aria-label={t("filterParams.ariaLabels.orderBy")}
              label={t("filterParams.labels.orderBy")}
            ></ControlledAutocomplete>
            <ControlledAutocomplete
              createable={false}
              async={false}
              options={directionOptions(t)}
              name="direction"
              label={t("filterParams.labels.direction")}
              aria-label={t("filterParams.ariaLabels.direction")}
            ></ControlledAutocomplete>
            <ControlledSwitch
              aria-label={t("filterParams.ariaLabels.showInactive")}
              name="showInactive"
              label={t("filterParams.labels.showInactive")}
            ></ControlledSwitch>
            <Tooltip title={t("filterParams.submitButtonTooltip")}>
              <Button type="submit">
                {t("filterParams.submitButtonText")}
              </Button>
            </Tooltip>
          </Form>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}
