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
import { useEffect, useState } from "react";
import AddLocationForm from "../../../components/AddLocationForm";
import useLocation, { LocationBrief } from "../../../data/useLocation";
import FilterParams from "../../../components/FilterParams";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/styling";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../components/Breadcrumb";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";

function mapToColums(location: LocationBrief, t: TFunction) {
  return {
    id: location.id,
    [t("locationsPage.locationDataColumns.name")]: location.name,
    [t("locationsPage.locationDataColumns.address")]:
      `${location.street} ${location.buildingNumber}, ${location.postalCode} ${location.city}`,
    [t("locationsPage.locationDataColumns.active")]: location.active
      ? t("locationsPage.locationDataColumns.yes")
      : t("locationsPage.locationDataColumns.no"),
    [t("locationsPage.locationDataColumns.createdAt")]:
      location.createdAt.isValid()
        ? location.createdAt.toDate().toLocaleString("pl-PL")
        : t("locationsPage.locationDataColumns.noCreatedAt"),
    [t("locationsPage.locationDataColumns.updatedAt")]:
      location.updatedAt.isValid()
        ? location.updatedAt.toDate().toLocaleString("pl-PL")
        : t("locationsPage.locationDataColumns.noUpdatedAt"),
  };
}

export default function LocationsPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const { params, isFetching, locations, getAllLocations } = useLocation();
  const navigate = useNavigate();

  useEffect(function() {
    getAllLocations();
  }, []);

  const mappedLocations =
    locations &&
    locations.content.map(function(e) {
      return mapToColums(e, t);
    });

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.locations")}
        </Breadcrumb>
        <Breadcrumb disabled navigateTo="#">
          {t("breadcrumbsLabels.location")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3" marginBottom={4}>
        {t("locationsPage.pageHeading")}
      </Typography>
      <StyledContainer
        sx={{
          paddingTop: "0",
        }}
      >
        <Box width={"100%"} display={"flex"}>
          <Box flexGrow={1}>
            <FilterParams callback={getAllLocations}></FilterParams>
          </Box>
          <Box>
            <Tooltip title={t("locationsPage.addLocationButtonTooltip")}>
              <Button
                aria-label={t("locationsPage.ariaLabels.addLocationButton")}
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
            {!isFetching && mappedLocations && mappedLocations.length > 0 && (
              <>
                <TableHead>
                  {Object.keys(mappedLocations[0]).map(function(e) {
                    if (e === "id") return;
                    return <TableCell key={e}>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {mappedLocations.map(function(e) {
                    return (
                      <Tooltip
                        key={e.id}
                        title={t("locationsPage.tableEntryTooltip")}
                      >
                        <TableRow
                          tabIndex={0}
                          onKeyUp={function(ev) {
                            if (ev.key === "Enter") {
                              navigate(`/manager/locations/${e.id}`);
                            }
                          }}
                          hover
                          onClick={function() {
                            navigate(`/manager/locations/${e.id}`);
                          }}
                          aria-label={
                            t("locationsPage.ariaLabels.tableEntry") +
                            e[t("locationsPage.locationDataColumns.name")]
                          }
                        >
                          {Object.keys(e).map(function(val) {
                            if (val === "id") return;
                            return (
                              <TableCell key={val}>
                                {e[val as keyof typeof e]}
                              </TableCell>
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
              count={locations?.totalElements ?? 10}
              rowsPerPageOptions={[1, 2, 5, 10, 20, 50]}
              onRowsPerPageChange={function(e) {
                const cast = Number(e.target.value);
                getAllLocations({
                  size: Number.isNaN(cast) ? 20 : cast,
                });
              }}
              onPageChange={function(_, page) {
                getAllLocations({
                  page: page,
                });
              }}
              page={params?.page ?? 0}
              rowsPerPage={params?.size ?? 20}
            ></TablePagination>
          </Table>
        </TableContainer>
      </StyledContainer>
      <AddLocationForm
        open={open}
        setOpen={setOpen}
        fetchLocations={getAllLocations}
      ></AddLocationForm>
    </StyledContainer>
  );
}
