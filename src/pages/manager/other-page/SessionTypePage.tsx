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
import { useSessionType } from "../../../data/useSessionType";
import { Colors } from "../../../constants/styling";
import UpdateOtherParamForm from "./UpdateOtherParamForm";
import { useEffect, useState } from "react";
import FilterParams from "../../../components/FilterParams";
import { useTranslation } from "react-i18next";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

const sessionTypeSchema = z.object({
  name: z
    .string()
    .min(2, "otherPage.validation.sessionTypeNameTooShort")
    .max(64, "otherPage.validation.sessionTypeNameTooLong"),
});

export type SessionTypeForm = z.infer<typeof sessionTypeSchema>;

export default function SessionTypePage() {
  const {
    sessionTypes,
    isFetching,
    getAllSessionTypes,
    createSessionType,
    isCreating,
    params,
    getSessionType,
    updateSessionType,
    isUpdating,
    isFetchingSingle,
    changeSessionTypeActive,
  } = useSessionType();
  const a = useForm<SessionTypeForm>({
    resolver: zodResolver(sessionTypeSchema),
    defaultValues: {
      name: "",
    },
  });
  const [sessionTypeId, setSessionTypeId] = useState<string>();
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const submit = a.handleSubmit(function() {
    setOpenConfirm(true);
  });

  useEffect(function() {
    getAllSessionTypes();
  }, []);

  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: 2,
      }}
    >
      <Typography variant="h4">{t("sessionTypePage.pageHeading")}</Typography>
      <Typography variant="h5">
        {t("sessionTypePage.addSessionTypeHeading")}
      </Typography>
      <FormProvider {...a}>
        <Form
          onSubmit={submit}
          style={{
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <TextInput
            size="small"
            name="name"
            label={t("sessionTypePage.labels.sessionTypeName")}
            aria-label={t("sessionTypePage.ariaLabels.sessionTypeName")}
          ></TextInput>
          <Typography flexGrow={1}></Typography>
          <Tooltip title={t("sessionTypePage.addNewSessionTypeButtonTooltip")}>
            <Button
              type="submit"
              aria-label={t(
                "sessionTypePage.ariaLabels.addNewSessionTypeButton",
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
      <FilterParams callback={getAllSessionTypes}></FilterParams>
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && sessionTypes && sessionTypes.content.length === 0 && (
        <Typography>{t("sessionTypePage.noSessionTypes")}</Typography>
      )}
      <TableContainer>
        <Table>
          {!isFetching && sessionTypes && sessionTypes.content.length > 0 && (
            <>
              <TableHead>
                <TableCell>{t("sessionTypePage.tableColumns.name")}</TableCell>
                <TableCell>
                  {t("sessionTypePage.tableColumns.createdAt")}
                </TableCell>
                <TableCell>
                  {t("sessionTypePage.tableColumns.updatedAt")}
                </TableCell>
                <TableCell>
                  {t("sessionTypePage.tableColumns.active")}
                </TableCell>
              </TableHead>
              <TableBody>
                {sessionTypes.content.map(function(e) {
                  return (
                    <Tooltip
                      key={e.id}
                      title={t("sessionTypePage.sessionTypeRowTooltip")}
                    >
                      <TableRow
                        tabIndex={0}
                        onClick={function() {
                          setSessionTypeId(e.id);
                        }}
                        onKeyUp={function(ev) {
                          if (ev.key === "Enter") {
                            setSessionTypeId(e.id);
                          }
                        }}
                        hover
                        aria-label={t("sessionTypePage.ariaLabels.tableEntry") + e.name}
                      >
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {e.createdAt.isValid()
                            ? e.createdAt.toDate().toLocaleString("pl-PL")
                            : t("sessionTypePage.onCreatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.updatedAt.isValid()
                            ? e.updatedAt.toDate().toLocaleString("pl-PL")
                            : t("sessionTypePage.noUpdatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.active
                            ? t("sessionTypePage.yes")
                            : t("sessionTypePage.no")}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })}
              </TableBody>
            </>
          )}
          <TablePagination
            count={sessionTypes?.totalElements ?? 10}
            rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
            onRowsPerPageChange={function(e) {
              const cast = Number(e.target.value);
              getAllSessionTypes({
                size: Number.isNaN(cast) ? 20 : cast,
              });
            }}
            onPageChange={function(_, page) {
              getAllSessionTypes({
                page: page,
              });
            }}
            page={params?.page ?? 0}
            rowsPerPage={params?.size ?? 20}
          ></TablePagination>
        </Table>
      </TableContainer>
      <UpdateOtherParamForm
        changeActive={changeSessionTypeActive}
        isFetching={isFetchingSingle}
        heading={t("sessionTypePage.updateFormHeading")}
        open={!!sessionTypeId}
        paramId={sessionTypeId}
        close={function() {
          setSessionTypeId(undefined);
        }}
        get={getSessionType}
        update={updateSessionType}
        getAll={getAllSessionTypes}
        isUpdating={isUpdating}
      ></UpdateOtherParamForm>
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={async function() {
          setOpenConfirm(false);
          const success = await createSessionType([a.getValues()]);
          if (success) {
            getAllSessionTypes();
            a.reset();
          }
        }}
      ></ConfirmActionModal>
    </StyledContainer>
  );
}
