import { TFunction } from "i18next";
import useAccountStore, { ParsedToken } from "../../../data/useAccountStore";
import { useTranslation } from "react-i18next";
import StyledContainer from "../../../components/StyledContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

function mapDataToTable(data: ParsedToken, t: TFunction) {
  return {
    [t("myProfile.personalData.dataTable.personal")]:
      `${data.given_name} ${data.family_name}`,
    [t("myProfile.personalData.dataTable.email")]: data.email,
    [t("myProfile.personalData.dataTable.role")]: data.authorities.reduce(
      //@ts-ignore
      function(a, c) {
        return `${a}, ${c}`;
      },
    ),
  };
}

export default function PersonalData() {
  const parsedToken = useAccountStore(function(store) {
    return store.parsedToken;
  });
  const { t } = useTranslation();

  const mapped = parsedToken && mapDataToTable(parsedToken, t);

  return (
    <StyledContainer inner>
      <Typography variant="h4">
        {t("myProfile.personalData.heading")}
      </Typography>
      {mapped && (
        <TableContainer>
          <Table>
            <TableBody>
              {Object.keys(mapped).map(function(e) {
                return (
                  <TableRow key={e}>
                    <TableCell>{e}</TableCell>
                    <TableCell>{mapped[e as keyof typeof mapped]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </StyledContainer>
  );
}
