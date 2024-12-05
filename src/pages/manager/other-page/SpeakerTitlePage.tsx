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
import { useSpeakerTitle } from "../../../data/useSpeakerTitle";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/styling";
import UpdateOtherParamForm from "./UpdateOtherParamForm";
import FilterParams from "../../../components/FilterParams";
import { useTranslation } from "react-i18next";

const speakerTitleSchema = z.object({
  name: z.string(),
});

export type SpeakerTitleForm = z.infer<typeof speakerTitleSchema>;

export default function SpeakerTitlePage() {
  const {
    speakers,
    isFetching,
    getAllSpeakerTitles,
    createSpeakerTitle,
    isCreating,
    params,
    getSpeakerTitle,
    updateSpeakerTitle,
    isUpdating,
    isFetchingSingle,
    changeSpeakerTitleActive,
  } = useSpeakerTitle();
  const [speakerTitleId, setSpeakerTitleId] = useState<string>();
  const { t } = useTranslation();
  const a = useForm<SpeakerTitleForm>({
    resolver: zodResolver(speakerTitleSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(function() {
    getAllSpeakerTitles();
  }, []);

  const submit = a.handleSubmit(async function(data) {
    const success = await createSpeakerTitle([data]);
    if (success) {
      getAllSpeakerTitles();
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
      <Typography variant="h4">{t("speakerTitlePage.pageHeading")}</Typography>
      <Typography variant="h5">
        {t("speakerTitlePage.addSpeakerTitleHeading")}
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
            label={t("speakerTitlePage.labels.speakerTitleName")}
            aria-label={t("speakerTitlePage.ariaLabels.speakerTitleName")}
          ></TextInput>
          <Typography flexGrow={1}></Typography>
          <Tooltip
            title={t("speakerTitlePage.addNewSpeakerTitleButtonTooltip")}
          >
            <Button
              type="submit"
              aria-label={t(
                "speakerTitlePage.ariaLabels.addNewSpeakerTitleButton",
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
      <FilterParams callback={getAllSpeakerTitles}></FilterParams>
      {isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      {!isFetching && speakers && speakers.length === 0 && (
        <Typography>{t("speakerTitlePage.noSpeakerTitles")}</Typography>
      )}
      <TableContainer>
        <Table>
          {!isFetching && speakers && speakers.length > 0 && (
            <>
              <TableHead>
                <TableCell>{t("speakerTitlePage.tableColumns.name")}</TableCell>
                <TableCell>
                  {t("speakerTitlePage.tableColumns.createdAt")}
                </TableCell>
                <TableCell>
                  {t("speakerTitlePage.tableColumns.updatedAt")}
                </TableCell>
                <TableCell>
                  {t("speakerTitlePage.tableColumns.active")}
                </TableCell>
              </TableHead>
              <TableBody>
                {speakers.map(function(e) {
                  return (
                    <Tooltip
                      tabIndex={0}
                      title={t("speakerTitlePage.speakerTitleRowTooltip")}
                      onClick={function() {
                        setSpeakerTitleId(e.id);
                      }}
                      onKeyUp={function(ev) {
                        if (ev.key === "Enter") {
                          setSpeakerTitleId(e.id);
                        }
                      }}
                    >
                      <TableRow hover>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {e.createdAt.isValid()
                            ? e.createdAt.toDate().toLocaleString("pl-PL")
                            : t("speakerTitlePage.onCreatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.updatedAt.isValid()
                            ? e.updatedAt.toDate().toLocaleString("pl-PL")
                            : t("speakerTitlePage.noUpdatedAt")}
                        </TableCell>
                        <TableCell>
                          {e.active
                            ? t("speakerTitlePage.yes")
                            : t("speakerTitlePage.no")}
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
              getAllSpeakerTitles({
                size: Number.isNaN(cast) ? 20 : cast,
              });
            }}
            onPageChange={function(_, page) {
              getAllSpeakerTitles({
                page: page,
              });
            }}
            page={params?.page ?? 0}
            rowsPerPage={params?.size ?? 20}
          ></TablePagination>
        </Table>
      </TableContainer>
      <UpdateOtherParamForm
        changeActive={changeSpeakerTitleActive}
        isFetching={isFetchingSingle}
        heading={t("speakerTitlePage.updateFormHeading")}
        open={!!speakerTitleId}
        paramId={speakerTitleId}
        close={function() {
          setSpeakerTitleId(undefined);
        }}
        get={getSpeakerTitle}
        update={updateSpeakerTitle}
        getAll={getAllSpeakerTitles}
        isUpdating={isUpdating}
      ></UpdateOtherParamForm>
    </StyledContainer>
  );
}
