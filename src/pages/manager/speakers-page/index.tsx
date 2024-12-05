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
import StyledContainer from "../../../components/StyledContainer";
import AddIcon from "@mui/icons-material/Add";
import AddSpeakerForm from "../../../components/AddSpeakerForm";
import { useEffect, useState } from "react";
import useSpeaker, { SpeakerBrief } from "../../../data/useSpeaker";
import FilterParams from "../../../components/FilterParams";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/styling";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

function mapToColumns(speaker: SpeakerBrief, t: TFunction) {
  return {
    id: speaker.id,
    [t("speakersPage.tableColumns.personalData")]:
      `${speaker.titleName} ${speaker.firstName} ${speaker.lastName}`,
    [t("speakersPage.tableColumns.active")]: speaker.active
      ? t("speakersPage.tableColumns.yes")
      : t("speakersPage.tableColumns.no"),
    [t("speakersPage.tableColumns.createdAt")]: speaker.createdAt.isValid()
      ? speaker.createdAt.toDate().toLocaleString("pl-PL")
      : t("speakersPage.tableColumns.noCreatedAt"),
    [t("speakersPage.tableColumns.updatedAt")]: speaker.updatedAt.isValid()
      ? speaker.updatedAt.toDate().toLocaleString("pl-PL")
      : t("speakersPage.tableColumns.noUpdatedAt"),
  };
}

export default function SpeakersPage() {
  const [open, setOpen] = useState<boolean>(false);
  const { isFetching, speakers, getAllSpeakers, params } = useSpeaker();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mappedSpeakers = speakers && speakers.map(function (e) {
    return mapToColumns(e, t);
  });

  useEffect(function() {
    getAllSpeakers();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h3" marginBottom={4}>
        {t("speakersPage.pageHeading")}
      </Typography>
      <StyledContainer
        sx={{
          paddingTop: 0,
        }}
      >
        <Box width={"100%"} display={"flex"}>
          <Box flexGrow={1}>
            <FilterParams callback={getAllSpeakers}></FilterParams>
          </Box>
          <Box>
            <Tooltip title={t("speakersPage.addSpeakerButtonTooltip")}>
              <Button
                aria-label={t("speakersPage.ariaLabels.addSpeakerButton")}
                onClick={function() {
                  setOpen(true);
                }}
              >
                <AddIcon></AddIcon>
              </Button>
            </Tooltip>
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
            {!isFetching && mappedSpeakers && mappedSpeakers.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mappedSpeakers[0]).map(function(e) {
                    if (e === "id") return;
                    return <TableCell>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {mappedSpeakers.map(function(e) {
                    return (
                      <Tooltip
                        tabIndex={0}
                        onKeyUp={function(ev) {
                          if (ev.key === "Enter") {
                            navigate(`/manager/speakers/${e.id}`);
                          }
                        }}
                        onClick={function() {
                          navigate(`/manager/speakers/${e.id}`);
                        }}
                        title={t("speakersPage.speakerTableEntryTooltip")}
                      >
                        <TableRow hover>
                          {Object.keys(e).map(function(val) {
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
              count={10}
              rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
              onRowsPerPageChange={function(e) {
                const cast = Number(e.target.value);
                getAllSpeakers({
                  size: Number.isNaN(cast) ? 20 : cast,
                });
              }}
              onPageChange={function(_, page) {
                getAllSpeakers({
                  page: page,
                });
              }}
              page={params?.page ?? 0}
              rowsPerPage={params?.size ?? 20}
            ></TablePagination>
          </Table>
        </TableContainer>
      </StyledContainer>
      <AddSpeakerForm
        open={open}
        onClose={function() {
          setOpen(false);
          getAllSpeakers();
        }}
      ></AddSpeakerForm>
    </StyledContainer>
  );
}
