import {
  Box,
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
import AddIcon from "@mui/icons-material/Add";
import StyledContainer from "../../../components/StyledContainer";
import useEmailNotification from "../../../data/useEmailNotification";
import FilterParams from "../../../components/FilterParams";
import { Colors } from "../../../constants/styling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddEmailTemplateForm from "../../../components/AddEmailTemplateForm";
import UpdateEmailNotificationTemplate from "./UpdateEmailNotificationTemplate";

export default function OtherEmailNotificationsPage() {
  const { getAllTemplates, templates, options, isFetching } =
    useEmailNotification();
  const { t } = useTranslation();
  const [openAddTemplate, setOpenAddTemplate] = useState<boolean>(false);
  const [chosenTemplateId, setChosenTemplateId] = useState<string>();

  useEffect(function() {
    getAllTemplates();
  }, []);

  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: 2,
      }}
    >
      <Typography variant="h4">
        {t("otherEmailNotifPage.pageHeading")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <FilterParams callback={getAllTemplates}></FilterParams>
        <Box>
          <Tooltip title={t("otherEmailNotifPage.addTemplateButtonTooltip")}>
            <Button
              aria-label={t("otherEmailNotifPage.ariaLabels.addTemplateButton")}
              onClick={function() {
                setOpenAddTemplate(true);
              }}
            >
              <AddIcon></AddIcon>
            </Button>
          </Tooltip>
        </Box>
      </Box>
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && templates && templates.content.length === 0 && (
        <Typography>{t("otherEmailNotifPage.emptyTableMessage")}</Typography>
      )}
      <TableContainer>
        <Table>
          {!isFetching && templates && templates.content.length > 0 && (
            <>
              <TableHead>
                <TableCell>
                  {t("otherEmailNotifPage.columnsRow.name")}
                </TableCell>
                <TableCell>
                  {t("otherEmailNotifPage.columnsRow.templateType")}
                </TableCell>
                <TableCell>
                  {t("otherEmailNotifPage.columnsRow.createdAt")}
                </TableCell>
                <TableCell>
                  {t("otherEmailNotifPage.columnsRow.updatedAt")}
                </TableCell>
                <TableCell>
                  {t("otherEmailNotifPage.columnsRow.active")}
                </TableCell>
              </TableHead>
              <TableBody>
                {templates.content.map(function(e) {
                  return (
                    <Tooltip
                      title={t("otherEmailNotifPage.tableEntryTooltip")}
                      key={e.id}
                    >
                      <TableRow
                        tabIndex={0}
                        hover
                        onKeyUp={function(ev) {
                          if (ev.key === "Enter") {
                            setChosenTemplateId(e.id);
                          }
                        }}
                        onClick={function() {
                          setChosenTemplateId(e.id);
                        }}
                        aria-label={
                          t("otherEmailNotifPage.ariaLabels.tableEntry") +
                          e.name
                        }
                      >
                        <TableCell>{e.name}</TableCell>
                        <TableCell>{e.templateType}</TableCell>
                        <TableCell>
                          {e.createdAt.isValid()
                            ? e.createdAt.toDate().toLocaleString("pl-PL")
                            : t("otherEmailNotifPage.columnsRow.noCreatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.updatedAt.isValid()
                            ? e.updatedAt.toDate().toLocaleString("pl-PL")
                            : t("otherEmailNotifPage.columnsRow.noUpdatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.active
                            ? t("otherEmailNotifPage.columnsRow.yes")
                            : t("otherEmailNotifPage.columnsRow.no")}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })}
              </TableBody>
            </>
          )}
          <TablePagination
            count={templates?.totalElements ?? 10}
            rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
            onRowsPerPageChange={function(e) {
              const cast = Number(e.target.value);
              getAllTemplates({
                size: Number.isNaN(cast) ? 20 : cast,
              });
            }}
            onPageChange={function(_, page) {
              getAllTemplates({
                page: page,
              });
            }}
            page={options?.page ?? 0}
            rowsPerPage={options?.size ?? 20}
          ></TablePagination>
        </Table>
      </TableContainer>
      <AddEmailTemplateForm
        open={openAddTemplate}
        onClose={function() {
          setOpenAddTemplate(false);
          getAllTemplates();
        }}
      ></AddEmailTemplateForm>
      <UpdateEmailNotificationTemplate
        open={!!chosenTemplateId}
        onClose={function() {
          setChosenTemplateId(undefined);
          getAllTemplates();
        }}
        templateId={chosenTemplateId ?? ""}
      ></UpdateEmailNotificationTemplate>
    </StyledContainer>
  );
}
