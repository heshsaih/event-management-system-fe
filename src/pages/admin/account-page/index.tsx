import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StyledContainer from "../../../components/StyledContainer";
import { useParams } from "react-router-dom";
import useAccount, { Account } from "../../../data/useAccount";
import { useEffect, useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import { Colors } from "../../../constants/styling";
import { Role } from "../../../data/useAccountStore";
import StyledSwitch from "../../../components/StyledSwitch";
import ConfirmActionModal from "../../../components/ConfirmActionModal";

function mapToTable(data: Account, t: TFunction) {
  return {
    [t("accountPage.tableData.personalData")]:
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : t("accountPage.tableData.noInfo"),
    [t("accountPage.tableData.email")]:
      data.email ?? t("accountPage.tableData.noInfo"),
    [t("accountPage.tableData.accountType")]: data.accountType,
    [t("accountPage.tableData.externalId")]: data.externalId,
    [t("accountPage.tableData.lastSuccessfulLogin")]:
      data.lastSuccessfulLogin.isValid()
        ? data.lastSuccessfulLogin.toDate().toLocaleString("pl-PL")
        : t("accountsPage.tableData.noDate"),
    [t("accountsPage.tableData.createdAt")]: data.createdAt.isValid()
      ? data.createdAt.toDate().toLocaleString("pl-PL")
      : t("accountsPage.tableData.noDate"),
    [t("accountPage.tableData.updatedAt")]: data.updatedAt.isValid()
      ? data.updatedAt.toDate().toLocaleString("pl-PL")
      : t("accountsPage.tableData.noDate"),
    [t("accountsPage.tableData.active")]: data.active
      ? t("accountPage.tableData.yes")
      : t("accountsPage.tableData.no"),
  };
}

export default function AccountPage() {
  const { id } = useParams();

  const {
    account,
    getAccount,
    addRole,
    removeRole,
    changeActive,
    isFetching,
    isUpdating,
  } = useAccount();
  const { t } = useTranslation();
  const mappedAccount = account && mapToTable(account, t);

  useEffect(
    function() {
      if (id) {
        getAccount(id);
      }
    },
    [id],
  );
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const submitAdd = async function(role: Role) {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const result = await addRole(account!.id, role);
        if (result) {
          getAccount(id!);
        }
      };
    });
    setOpenConfirm(true);
  };

  const submitRemove = async function(role: Role) {
    setConfirmAction(function() {
      return async function() {
        setOpenConfirm(false);
        const result = await removeRole(account!.id, role);
        if (result) {
          getAccount(id!);
        }
      };
    });
    setOpenConfirm(true);
  };

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb navigateTo="/admin/accounts">
          {t("breadcrumbsLabels.accounts")}
        </Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.account")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">{t("accountPage.pageHeading")}</Typography>
      {(isFetching || isUpdating) && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && account && mappedAccount && (
        <StyledContainer inner>
          <Typography variant="h4">{t("accountPage.dataHeading")}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {Object.keys(mappedAccount).map(function(e) {
                  return (
                    <TableRow key={e}>
                      <TableCell>{e}</TableCell>
                      <TableCell>
                        {mappedAccount[e as keyof typeof mappedAccount]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <StyledContainer inner>
            <Typography variant="h4">
              {t("accountPage.rolesHeading")}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Nazwa roli</TableCell>
                  <TableCell>Czy posiadana?</TableCell>
                  <TableCell>Akcja</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{t("accountPage.participant")}</TableCell>
                    <TableCell>
                      {account.roles.includes(Role.PARTICIPANT)
                        ? t("accountPage.tableData.yes")
                        : t("accountPage.tableData.no")}
                    </TableCell>
                    <TableCell>
                      {account.roles.includes(Role.PARTICIPANT) ? (
                        <Tooltip
                          title={t("accountPage.removeRoleButtonTooltip")}
                        >
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.removeRoleButton",
                            )}
                            onClick={function() {
                              submitRemove(Role.PARTICIPANT);
                            }}
                          >
                            <RemoveIcon></RemoveIcon>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title={t("accountPage.addRoleButtonTooltip")}>
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.addRoleButton",
                            )}
                            onClick={function() {
                              submitAdd(Role.PARTICIPANT);
                            }}
                          >
                            <AddIcon></AddIcon>
                          </Button>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("accountPage.manager")}</TableCell>
                    <TableCell>
                      {account.roles.includes(Role.MANAGER)
                        ? t("accountPage.tableData.yes")
                        : t("accountPage.tableData.no")}
                    </TableCell>
                    <TableCell>
                      {account.roles.includes(Role.MANAGER) ? (
                        <Tooltip
                          title={t("accountPage.removeRoleButtonTooltip")}
                        >
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.removeRoleButton",
                            )}
                            onClick={function() {
                              submitRemove(Role.MANAGER);
                            }}
                          >
                            <RemoveIcon></RemoveIcon>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title={t("accountPage.addRoleButtonTooltip")}>
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.addRoleButton",
                            )}
                            onClick={function() {
                              submitAdd(Role.MANAGER);
                            }}
                          >
                            <AddIcon></AddIcon>
                          </Button>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{t("accountPage.admin")}</TableCell>
                    <TableCell>
                      {account.roles.includes(Role.ADMIN)
                        ? t("accountPage.tableData.yes")
                        : t("accountPage.tableData.no")}
                    </TableCell>
                    <TableCell>
                      {account.roles.includes(Role.ADMIN) ? (
                        <Tooltip
                          title={t("accountPage.removeRoleButtonTooltip")}
                        >
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.removeRoleButton",
                            )}
                            onClick={function() {
                              submitRemove(Role.ADMIN);
                            }}
                          >
                            <RemoveIcon></RemoveIcon>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title={t("accountPage.addRoleButtonTooltip")}>
                          <Button
                            aria-label={t(
                              "accountPage.ariaLabels.addRoleButton",
                            )}
                            onClick={function() {
                              submitAdd(Role.ADMIN);
                            }}
                          >
                            <AddIcon></AddIcon>
                          </Button>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <StyledContainer inner>
              <Typography variant="h4">
                {t("updateLocationForm.activeHeading")}
              </Typography>
              <StyledSwitch
                disabled={isUpdating}
                aria-label={t("updateLocationForm.ariaLabels.active")}
                checked={account.active}
                onChange={function() {
                  setConfirmAction(function() {
                    return async function() {
                      const result = await changeActive(
                        account.id,
                        !account.active,
                      );
                      if (result) {
                        getAccount(id!);
                      }
                    };
                  });
                  setOpenConfirm(true);
                }}
              ></StyledSwitch>
            </StyledContainer>
          </StyledContainer>
        </StyledContainer>
      )}
      <ConfirmActionModal
        open={openConfirm}
        onClose={function() {
          setOpenConfirm(false);
        }}
        confirmAction={confirmAction!}
      ></ConfirmActionModal>
    </StyledContainer>
  );
}
