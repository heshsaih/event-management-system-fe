import {
  Box,
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
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StyledContainer from "../../../components/StyledContainer";
import useLocation, { Location } from "../../../data/useLocation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Room } from "../../../data/useRoom";
import UpdateRoomForm from "./UpdateRoomForm";
import { Colors } from "../../../constants/styling";
import UpdateLocationForm from "./UpdateLocationForm";
import AddRoomForm from "./AddRoomForm";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import StyledBreadcrumbs from "../../../components/StyledBreadcrumbs";
import Breadcrumb from "../../../components/Breadcrumb";
import toast from "react-hot-toast";

function mapLocationData(data: Location | undefined, t: TFunction) {
  return {
    [t("locationPage.locationData.name")]: data?.name,
    [t("locationPage.locationData.address")]:
      `${data?.street} ${data?.buildingNumber}, ${data?.postalCode} ${data?.city}`,
    [t("locationPage.locationData.createdAt")]: data?.createdAt.isValid()
      ? data?.createdAt.toDate().toLocaleString("pl-PL")
      : t("locationPage.locationData.noCreatedAt"),
    [t("locationPage.locationData.updatedAt")]: data?.updatedAt.isValid()
      ? data?.updatedAt.toDate().toLocaleString("pl-PL")
      : t("locationPage.locationData.noUpdatedAt"),
    [t("locationPage.locationData.active")]: data?.active
      ? t("locationPage.locationData.yes")
      : t("locationPage.locationData.no"),
  };
}

function mapRoomData(data: Room, t: TFunction) {
  return {
    [t("locationPage.locationData.id")]: data.id,
    [t("locationPage.roomData.roomNumber")]: data.roomNumber,
    [t("locationPage.roomData.capacity")]: data.capacity,
    [t("locationPage.roomData.createdAt")]: data.createdAt.isValid()
      ? data.createdAt.toDate().toLocaleString("pl-PL")
      : t("locationPage.roomData.noCreatedAt"),
    [t("locationPage.roomData.updatedAt")]: data.updatedAt.isValid()
      ? data.updatedAt.toDate().toLocaleString("pl-PL")
      : t("locationPage.roomData.noUpdatedAt"),
    [t("locationPage.roomData.active")]: data.active
      ? t("locationPage.roomData.yes")
      : t("locationPage.roomData.no"),
    [t("locationPage.roomData.options")]: "",
  };
}

export default function LocationPage() {
  const { t } = useTranslation();
  const { isFetching, getLocation, location } = useLocation();
  const [chosenRoom, setChosenRoom] = useState<string>();
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(function() {
    getLocation(id ?? "");
  }, []);

  const data = mapLocationData(location, t);
  const rooms = location?.rooms.map(function(e) {
    return mapRoomData(e, t);
  });

  return (
    <StyledContainer
      sx={{
        paddingTop: 0,
      }}
    >
      <StyledBreadcrumbs>
        <Breadcrumb navigateTo="/">{t("breadcrumbsLabels.home")}</Breadcrumb>
        <Breadcrumb navigateTo="/manager/locations">
          {t("breadcrumbsLabels.locations")}
        </Breadcrumb>
        <Breadcrumb current navigateTo="#">
          {t("breadcrumbsLabels.location")}
        </Breadcrumb>
      </StyledBreadcrumbs>
      <Typography variant="h3">{t("locationPage.pageHeading")}</Typography>
      <StyledContainer inner>
        <Typography variant="h4">
          {t("locationPage.locationDataHeading")}
        </Typography>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {location && !editingMode && (
          <>
            <TableContainer>
              <Table>
                {location && (
                  <TableBody>
                    {Object.keys(data).map(function(e) {
                      return (
                        <TableRow>
                          <TableCell>{e}</TableCell>
                          <TableCell>{data[e as keyof typeof data]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Tooltip title={t("locationPage.editLocationButtonTooltip")}>
              <Button
                aria-label={t("locationPage.ariaLabels.editLocationButton")}
                onClick={function() {
                  setEditingMode(true);
                }}
              >
                {t("locationPage.editLocationButtonText")}
              </Button>
            </Tooltip>
          </>
        )}
        {location && editingMode && (
          <UpdateLocationForm
            getLocation={getLocation}
            location={location}
            onCancel={function() {
              getLocation(id ?? "");
              setEditingMode(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          ></UpdateLocationForm>
        )}
        <Typography marginTop={5} variant="h4">
          {t("locationPage.roomsDataHeading")}
        </Typography>
        {isFetching && (
          <CircularProgress
            size={"3rem"}
            sx={{ color: Colors.RED }}
          ></CircularProgress>
        )}
        {!isFetching && rooms && rooms.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  {Object.keys(rooms[0]).map(function(e) {
                    return <TableCell>{e}</TableCell>;
                  })}
                </TableHead>
                <TableBody>
                  {rooms.map(function(e) {
                    return (
                      <TableRow>
                        {Object.keys(e).map(function(val) {
                          if (val === t("locationPage.roomData.options")) {
                            return (
                              <TableCell>
                                <Box>
                                  <Tooltip
                                    title={t(
                                      "locationPage.updateRoomButtonTooltip",
                                    )}
                                  >
                                    <Button
                                      onClick={function() {
                                        setChosenRoom(
                                          e[
                                          t("locationPage.locationData.id")
                                          ] as string,
                                        );
                                      }}
                                      aria-label={t(
                                        "locationPage.ariaLabels.updateRoomButton",
                                      )}
                                    >
                                      <EditIcon></EditIcon>
                                    </Button>
                                  </Tooltip>
                                  <Tooltip
                                    title={t("locationPage.copyButtonTooltip")}
                                  >
                                    <Button
                                      onClick={function() {
                                        window.navigator.clipboard
                                          .writeText(
                                            e[
                                            t("locationPage.locationData.id")
                                            ] as string,
                                          )
                                          .then(function() {
                                            toast.success(
                                              t("locationPage.copySuccess"),
                                            );
                                          });
                                      }}
                                      aria-label={t(
                                        "locationPage.ariaLabels.copyButton",
                                      )}
                                    >
                                      <ContentCopyIcon></ContentCopyIcon>
                                    </Button>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell>{e[val as keyof typeof e]}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {!isFetching && rooms && rooms.length === 0 && (
          <Typography>{t("locationPage.locationHasNoRooms")}</Typography>
        )}
        <Tooltip title={t("locationPage.addRoomButtonTooltip")}>
          <Button
            aria-label={t("locationPage.ariaLabels.addRoomButton")}
            onClick={function() {
              setOpen(true);
            }}
          >
            {t("locationPage.addRoomButtonText")}
          </Button>
        </Tooltip>
        <UpdateRoomForm
          id={chosenRoom}
          open={!!chosenRoom}
          onClose={function() {
            getLocation(id ?? "");
            setChosenRoom(undefined);
          }}
        ></UpdateRoomForm>
        <AddRoomForm
          open={open}
          onClose={function() {
            getLocation(id ?? "");
            setOpen(false);
          }}
          locationId={id ?? ""}
        ></AddRoomForm>
      </StyledContainer>
    </StyledContainer>
  );
}
