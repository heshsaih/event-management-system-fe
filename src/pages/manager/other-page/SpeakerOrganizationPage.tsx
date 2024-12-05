import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import AddIcon from "@mui/icons-material/Add";
import { useOrganization } from "../../../data/useOrganization";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/styling";
import UpdateOtherParamForm from "./UpdateOtherParamForm";
import FilterParams from "../../../components/FilterParams";
import { useTranslation } from "react-i18next";

const speakerOrganizationSchema = z.object({
  name: z.string(),
});

export type SpeakerOrganizationForm = z.infer<typeof speakerOrganizationSchema>;

export default function SpeakerOrganizationPage() {
  const {
    organizations,
    isFetching,
    getAllOrganizations,
    createOrganization,
    params,
    getOrganization,
    updateOrganization,
    isUpdating,
    isCreating,
    isFetchingSingle,
    changeOrganizationActive,
  } = useOrganization();
  const { t } = useTranslation();
  const [organizationId, setOrganizationId] = useState<string>();
  const a = useForm<SpeakerOrganizationForm>({
    resolver: zodResolver(speakerOrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(function() {
    getAllOrganizations();
  }, []);

  const submit = a.handleSubmit(async function(data) {
    const success = await createOrganization([data]);
    if (success) {
      getAllOrganizations();
      a.reset();
    }
  });

  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: 2,
      }}
    >
      <Typography variant="h4">{t("organizationPage.pageHeading")}</Typography>
      <Typography variant="h5">
        {t("organizationPage.addOrganizationHeading")}
      </Typography>
      <FormProvider {...a}>
        <Form
          onSubmit={submit}
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            size="small"
            name="name"
            label={t("organizationPage.labels.organizationName")}
            aria-label={t("organizationPage.ariaLabels.organizationName")}
          ></TextInput>
          <Typography flexGrow={1}></Typography>
          <Tooltip
            title={t("organizationPage.addNewOrganizationButtonTooltip")}
          >
            <Button
              type="submit"
              aria-label={t(
                "organizationPage.ariaLabels.addOrganizationButton",
              )}
            >
              {isCreating ? (
                <CircularProgress></CircularProgress>
              ) : (
                <AddIcon></AddIcon>
              )}
            </Button>
          </Tooltip>
        </Form>
      </FormProvider>
      <FilterParams callback={getAllOrganizations}></FilterParams>
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && organizations && organizations.length === 0 && (
        <Typography>{t("organizationPage.noOrganizations")}</Typography>
      )}
      <TableContainer>
        <Table>
          {!isFetching && organizations && organizations.length > 0 && (
            <>
              <TableHead>
                <TableCell>{t("organizationPage.tableColumns.name")}</TableCell>
                <TableCell>
                  {t("organizationPage.tableColumns.createdAt")}
                </TableCell>
                <TableCell>
                  {t("organizationPage.tableColumns.updatedAt")}
                </TableCell>
                <TableCell>
                  {t("organizationPage.tableColumns.active")}
                </TableCell>
              </TableHead>
              <TableBody>
                {organizations.map(function(e) {
                  return (
                    <Tooltip
                      tabIndex={0}
                      title={t("organizationPage.organizationRowTooltip")}
                      onClick={function() {
                        setOrganizationId(e.id);
                      }}
                      onKeyUp={function(ev) {
                        if (ev.key === "Enter") {
                          setOrganizationId(e.id);
                        }
                      }}
                    >
                      <TableRow hover>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {e.createdAt.isValid()
                            ? e.createdAt.toDate().toLocaleString("pl-PL")
                            : t("organizationPage.onCreatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.updatedAt.isValid()
                            ? e.updatedAt.toDate().toLocaleString("pl-PL")
                            : t("organizationPage.noUpdatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.active
                            ? t("organizationPage.yes")
                            : t("organizationPage.no")}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })}
              </TableBody>
            </>
          )}
          <TablePagination
            count={10}
            rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
            onRowsPerPageChange={function(e) {
              const cast = Number(e.target.value);
              getAllOrganizations({
                size: Number.isNaN(cast) ? 20 : cast,
              });
            }}
            onPageChange={function(_, page) {
              getAllOrganizations({
                page: page,
              });
            }}
            page={params?.page ?? 0}
            rowsPerPage={params?.size ?? 20}
          ></TablePagination>
        </Table>
      </TableContainer>
      <UpdateOtherParamForm
        changeActive={changeOrganizationActive}
        isFetching={isFetchingSingle}
        heading={t("organizationPage.updateFormHeading")}
        open={!!organizationId}
        paramId={organizationId}
        close={function() {
          setOrganizationId(undefined);
        }}
        get={getOrganization}
        update={updateOrganization}
        getAll={getAllOrganizations}
        isUpdating={isUpdating}
      ></UpdateOtherParamForm>
    </StyledContainer>
  );
}
