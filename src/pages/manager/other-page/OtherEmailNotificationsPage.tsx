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
import useEmailNotification from "../../../data/useEmailNotification";
import FilterParams from "../../../components/FilterParams";
import { Colors } from "../../../constants/styling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddEmailTemplateForm from "../../../components/AddEmailTemplateForm";

export default function OtherEmailNotificationsPage() {
  const { getAllTemplates, templates, options, isFetching } =
    useEmailNotification();
  const { t } = useTranslation();
  const [openAddTemplate, setOpenAddTemplate] = useState<boolean>(false);

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
      <Typography variant="h5">
        {t("otherEmailNotifPage.addTemplateHeading")}
      </Typography>
      <Tooltip title={t("otherEmailNotifPage.addTemplateButtonTooltip")}>
        <Button
          onClick={function() {
            setOpenAddTemplate(true);
          }}
        >
          {t("otherEmailNotifPage.addTemplateButtonText")}
        </Button>
      </Tooltip>
      <FilterParams callback={getAllTemplates}></FilterParams>
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
                      tabIndex={0}
                      title={
                        e.templateType === "GLOBAL"
                          ? t("otherEmailNotifPage.tableEntryGlobalTooltip")
                          : t("otherEmailNotifPage.tableEntryTooltip")
                      }
                    >
                      <TableRow hover={e.templateType !== "GLOBAL"}>
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
    </StyledContainer>
  );
}
