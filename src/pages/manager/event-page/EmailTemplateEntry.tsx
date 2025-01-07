import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { EmailTemplate } from "../../../data/useEmailNotification";
import { Colors } from "../../../constants/styling";
import { useTranslation } from "react-i18next";

type EmailTemplateEntryProps = {
  title: string;
  templateId: string | null;
  template: EmailTemplate | undefined;
  isFetching: boolean;
};

export default function EmailTemplateEntry(props: EmailTemplateEntryProps) {
  const { t } = useTranslation();

  const isSurvey =
    props.title === t("eventPageManager.eventTemplates.surveyTemplateTitle");

  return (
    <StyledContainer
      inner
      sx={{
        paddingTop: "0",
      }}
    >
      {props.isFetching && (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      )}
      <Typography variant="h5">{props.title}</Typography>
      {!props.isFetching &&
        (props.templateId === null ? (
          <Typography>
            {isSurvey
              ? t(
                "eventPageManager.eventTemplates.eventTemplateEntry.noTemplate",
              )
              : t(
                "eventPageManager.eventTemplates.eventTemplateEntry.defaultValue",
              )}
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {t(
                      "eventPageManager.eventTemplates.eventTemplateEntry.table.name",
                    )}
                  </TableCell>
                  <TableCell>{props.template?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t(
                      "eventPageManager.eventTemplates.eventTemplateEntry.table.subject",
                    )}
                  </TableCell>
                  <TableCell>{props.template?.subject}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t(
                      "eventPageManager.eventTemplates.eventTemplateEntry.table.contentPrefix",
                    )}
                  </TableCell>
                  <TableCell>{props.template?.contentPrefix}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t(
                      "eventPageManager.eventTemplates.eventTemplateEntry.table.contentSuffix",
                    )}
                  </TableCell>
                  <TableCell>{props.template?.contentSuffix}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
    </StyledContainer>
  );
}
