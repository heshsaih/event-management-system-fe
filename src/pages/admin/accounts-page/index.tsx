import {
  Box,
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
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import FilterParams from "../../../components/FilterParams";
import { Colors } from "../../../constants/styling";
import useAccount, { Account } from "../../../data/useAccount";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TFunction } from "i18next";
import { useEffect } from "react";

function mapAccountsToTable(data: Account, t: TFunction) {
  return {
    id: data.id,
    [t("accountsPage.tableData.personalData")]:
      `${data.firstName} ${data.lastName}`,
    [t("accountsPage.tableData.lastSuccessfulLogin")]:
      data.lastSuccessfulLogin.isValid()
        ? data.lastSuccessfulLogin.toDate().toLocaleString("pl-PL")
        : t("accountsPage.tableData.noDate"),
    [t("accountsPage.tableData.createdAt")]: data.createdAt.isValid()
      ? data.createdAt.toDate().toLocaleString("pl-PL")
      : t("accountsPage.tableData.noDate"),
    [t("accountsPage.tableData.updatedAt")]: data.updatedAt.isValid()
      ? data.updatedAt.toDate().toLocaleString("pl-PL")
      : t("accountsPage.tableData.noDate"),
    [t("accountsPage.tableData.active")]: data.active
      ? t("accountsPage.tableData.yes")
      : t("accountsPage.tableData.no"),
  };
}

export default function UsersPage() {
  const { isFetching, accounts, getAllAccounts, params } = useAccount();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mappedAccounts = accounts && accounts.content.map(function (e) {
    return mapAccountsToTable(e, t);
  });

  useEffect(function () {
    getAllAccounts();
  }, []);

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.accounts")}
        </Breadcrumb>
        <Breadcrumb disabled navigateTo="#">
          {t("breadcrumbsLabels.account")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3" marginBottom={4}>
        {t("accountsPage.pageHeading")}
      </Typography>
      <StyledContainer
        sx={{
          paddingTop: 0,
        }}
      >
        <Box width={"100%"} display={"flex"}>
          <Box flexGrow={1}>
            <FilterParams callback={getAllAccounts}></FilterParams>
          </Box>
        </Box>
        <TableContainer>
          {isFetching && (
            <StyledContainer inner sx={{ padding: "0" }}>
              <CircularProgress
                size={"3rem"}
                sx={{ color: Colors.RED }}
              ></CircularProgress>
            </StyledContainer>
          )}
          <Table>
            {!isFetching && mappedAccounts && mappedAccounts.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mappedAccounts[0]).map(function (e) {
                    if (e === "id") return;
                    return <TableCell>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {mappedAccounts.map(function (e) {
                    return (
                      <Tooltip
                        title={t("accountsPage.accountTableEntryTooltip")}
                      >
                        <TableRow
                          tabIndex={0}
                          onKeyUp={function (ev) {
                            if (ev.key === "Enter") {
                              navigate(`/admin/users/${e.id}`);
                            }
                          }}
                          onClick={function () {
                            navigate(`/admin/users/${e.id}`);
                          }}
                          hover
                          aria-label={
                            t("accountsPage.ariaLabels.tableEntry") +
                            e[t("accountsPage.tableData.personalData")]
                          }
                        >
                          {Object.keys(e).map(function (val) {
                            if (val === "id") return;
                            return (
                              <TableCell>{e[val as keyof typeof e]}</TableCell>
                            );
                          })}
                        </TableRow>
                      </Tooltip>
                    );
                  })}
                </TableBody>
              </>
            )}
            <TablePagination
              count={accounts?.totalElements ?? 10}
              rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
              onRowsPerPageChange={function (e) {
                const cast = Number(e.target.value);
                getAllAccounts({
                  size: Number.isNaN(cast) ? 20 : cast,
                });
              }}
              onPageChange={function (_, page) {
                getAllAccounts({
                  page: page,
                });
              }}
              page={params?.page ?? 0}
              rowsPerPage={params?.size ?? 20}
            ></TablePagination>
          </Table>
        </TableContainer>
      </StyledContainer>
    </StyledContainer>
  );
}
