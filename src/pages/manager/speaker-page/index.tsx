import {
    Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import useSpeaker, { Speaker } from "../../../data/useSpeaker";
import { Colors } from "../../../constants/styling";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UpdateSpeakerForm from "./UpdateSpeakerForm";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import toast from "react-hot-toast";

function mapToColumns(data: Speaker | undefined, t: TFunction) {
  let backupEmail;
  let organization;
  if (data?.backupEmail && data.backupEmail.length > 0) {
    backupEmail = data.backupEmail;
  } else {
    backupEmail = t("speakerPage.columnRows.none");
  }

  if (data?.organizationName && data.organizationName.name.length > 0) {
    organization = data.organizationName.name;
  } else {
    organization = t("speakerPage.columnRows.none");
  }

  return {
    [t("speakerPage.columnRows.id")]: data?.id,
    [t("speakerPage.columnRows.personalData")]:
      `${data?.titleName?.name ?? ""} ${data?.firstName} ${data?.lastName}`,
    [t("speakerPage.columnRows.email")]: data?.email,
    [t("speakerPage.columnRows.backupEmail")]: backupEmail,
    [t("speakerPage.columnRows.organization")]: organization,
    [t("speakerPage.columnRows.createdAt")]: data?.createdAt.isValid()
      ? data.createdAt.toDate().toLocaleString("pl-PL")
      : [t("speakerPage.columnRows.noCreatedAt")],
    [t("speakerPage.columnRows.updatedAt")]: data?.updatedAt.isValid()
      ? data.updatedAt.toDate().toLocaleString("pl-PL")
      : t("speakerPage.columnRows.noUpdatedAt"),
    [t("speakerPage.columnRows.active")]: data?.active
      ? t("speakerPage.columnRows.yes")
      : t("speakerPage.columnRows.no"),
  };
}
export default function SpeakerPage() {
  const {t} = useTranslation();
  const { isFetching, speaker, getSpeaker } = useSpeaker();
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const { id } = useParams();

  const columns = mapToColumns(speaker, t);

  useEffect(
    function() {
      getSpeaker(id ?? "");
    },
    [id],
  );

  return (
    <StyledContainer sx={{
      paddingTop: 0
    }}>
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb navigateTo="/manager/speakers">
          {t("breadcrumbsLabels.speakers")}
        </Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.speaker")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">{t("speakerPage.pageHeading")}</Typography>
      <StyledContainer inner>
        <Typography variant={"h4"}>{t("speakerPage.dataHeading")}</Typography>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {speaker && !editingMode && (
          <>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.keys(columns).map(function(e) {
                    return (
                      <TableRow key={e}>
                        <TableCell>{e}</TableCell>
                        <TableCell>
                          {columns[e as keyof typeof columns]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
            <Tooltip title={t("speakerPage.updateSpeakerButtonTooltip")}>
              <Button
                aria-label={t("speakerPage.ariaLabels.updateSpeakerButton")}
                onClick={function() {
                  setEditingMode(true);
                }}
              >
                {t("speakerPage.updateSpeakerButtonText")}
              </Button>
            </Tooltip>
            <Tooltip title={t("speakerPage.copyButtonTooltip")}>
              <Button 
                aria-label={t("speakerPage.ariaLabels.copyButton")}
                onClick={function () {
                  window.navigator.clipboard.writeText(speaker.id).then(function () {
                    toast.success(t("speakerPage.copySuccess"))
                  });
                }}
              >
                {t("speakerPage.copyButtonText")}
              </Button>
            </Tooltip>
            </Box>
          </>
        )}
        {speaker && editingMode && (
          <UpdateSpeakerForm
            refresh={function() {
              getSpeaker(id ?? "");
            }}
            speaker={speaker}
            onCancel={function() {
              setEditingMode(false);
            }}
          ></UpdateSpeakerForm>
        )}
      </StyledContainer>
    </StyledContainer>
  );
}
