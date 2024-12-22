import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledContainer from "./StyledContainer";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import TextInput from "./TextInput";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useWidth from "../hooks/useWidth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StyledModal from "./StyledModal";
import useLocation from "../data/useLocation";
import { useTranslation } from "react-i18next";
import ConfirmActionModal from "./ConfirmActionModal";
import { mapLocationFormToCreateLocationDto } from "../util/converters";

type AddLocationFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchLocations: () => void;
};

const locationSchema = z.object({
  name: z
    .string()
    .min(2, "addLocationForm.validation.nameTooShort")
    .max(64, "addLocationForm.validation.nameTooLong"),
  buildingNumber: z
    .string()
    .min(2, "addLocationForm.validation.buildingNumberTooShort")
    .max(16, "addLocationForm.validation.buildingNumberTooLong"),
  street: z
    .string()
    .min(2, "addLocationForm.validation.streetTooShort")
    .max(64, "addLocationForm.validation.streetTooLong"),
  city: z
    .string()
    .min(2, "addLocationForm.validation.cityTooShort")
    .max(64, "addLocationForm.validation.cityTooLong"),
  postalCode: z
    .string()
    .regex(
      /[0-9][0-9]-[0-9][0-9][0-9]/,
      "addLocationForm.validation.postalCodeWrongLength",
    ),
  rooms: z.array(
    z.object({
      roomNumber: z.string(),
      capacity: z.number(),
    }),
  ),
});

type RoomFormProps = {
  room: RoomForm;
  updateRoom: (newRoom: RoomForm) => void;
  deleteRoom: (roomId: string) => void;
};

function RoomForm(props: RoomFormProps) {
  const { t } = useTranslation();
  const width = useWidth();
  const [room, setRoom] = useState<RoomForm>(props.room);

  useEffect(
    function() {
      props.updateRoom(room);
    },
    [room],
  );

  return (
    <StyledContainer
      inner
      sx={{
        flexDirection: width > 600 ? "row" : "column",
        margin: "0.1rem",
        padding: "0.3rem",
      }}
    >
      <Box display={"flex"}>
        <TextField
          autoFocus
          value={room.roomNumber}
          onChange={function(e) {
            setRoom({
              ...room,
              roomNumber: e.target.value,
            });
          }}
          label={t("addLocationForm.addRoomForm.labels.roomNumber")}
          aria-label={t("addLocationForm.addRoomForm.ariaLabels.roomNumber")}
        ></TextField>
        <Typography marginX={1}></Typography>
        <TextField
          type="number"
          value={room.capacity}
          onChange={function(e) {
            setRoom({
              ...room,
              capacity: Number(e.target.value),
            });
          }}
          label={t("addLocationForm.addRoomForm.labels.capacity")}
          aria-label={t("addLocationForm.addRoomForm.ariaLabels.capacity")}
        ></TextField>
      </Box>
      <Typography flexGrow={1}></Typography>
      <Box display={"flex"}>
        <Tooltip
          title={t("addLocationForm.addRoomForm.removeRoomButtonTooltip")}
        >
          <Button
            aria-label={t(
              "addLocationForm.addRoomForm.ariaLabels.removeRoomButton",
            )}
            onClick={function() {
              props.deleteRoom(props.room.id);
            }}
          >
            <DeleteForeverIcon></DeleteForeverIcon>
          </Button>
        </Tooltip>
      </Box>
    </StyledContainer>
  );
}

export type LocationForm = z.infer<typeof locationSchema>;
type RoomForm = {
  roomNumber: string;
  capacity: number;
  id: string;
};

export default function AddLocationForm(props: AddLocationFormProps) {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<RoomForm[]>([]);
  const a = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      buildingNumber: "",
      street: "",
      city: "",
      postalCode: "",
      rooms: [],
    },
  });
  const { isFetching, createLocation } = useLocation();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<() => void>();

  const addRoom = function() {
    setRooms([
      ...rooms,
      {
        capacity: 1,
        id: crypto.randomUUID(),
        roomNumber: "",
      },
    ]);
    toast.success(t("addLocationForm.addRoomSuccess"));
  };

  const updateRoom = function(room: RoomForm) {
    setRooms(
      rooms.map(function(e) {
        return e.id === room.id ? room : e;
      }),
    );
  };

  const deleteRoom = function(roomId: string) {
    setRooms(
      rooms.filter(function(e) {
        return e.id !== roomId;
      }),
    );
    toast.success(t("addLocationForm.removeRoomSuccess"));
  };

  const submitLocation = async function() {
    setOpenConfirm(false);
    const success = await createLocation([
      mapLocationFormToCreateLocationDto({
        ...a.getValues(),
        rooms: rooms,
      }),
    ]);
    if (success) {
      props.setOpen(false);
      a.reset();
      props.fetchLocations();
      setRooms([]);
    }
  };

  const submit = a.handleSubmit(function() {
    setConfirmAction(function() {
      return function() {
        submitLocation();
      };
    });
    setOpenConfirm(true);
  });

  return (
    <StyledModal
      open={props.open}
      onClose={function() {
        props.setOpen(false);
      }}
    >
      <>
        <Typography variant="h4">{t("addLocationForm.pageHeading")}</Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <StyledContainer inner sx={{ paddingY: 3 }}>
              <Typography variant="h5">
                {t("addLocationForm.buildingDataHeading")}
              </Typography>
              <TextInput
                autoFocus
                name="name"
                label={t("addLocationForm.labels.name")}
                aria-label={t("addLocationForm.ariaLabels.name")}
              ></TextInput>
              <TextInput
                name="street"
                label={t("addLocationForm.labels.street")}
                aria-label={t("addLocationForm.ariaLabels.street")}
              ></TextInput>
              <TextInput
                name="buildingNumber"
                label={t("addLocationForm.labels.buildingNumber")}
                aria-label={t("addLocationForm.ariaLabels.buildingNumber")}
              ></TextInput>
              <Box display={"flex"} width={"100%"}>
                <TextInput
                  name="postalCode"
                  label={t("addLocationForm.labels.postalCode")}
                  aria-label={t("addLocationForm.ariaLabels.postalCode")}
                ></TextInput>
                <Typography marginX={2}></Typography>
                <TextInput
                  name="city"
                  label={t("addLocationForm.labels.city")}
                  aria-label={t("addLocationForm.ariaLabels.city")}
                ></TextInput>
              </Box>
            </StyledContainer>
            <StyledContainer inner sx={{ paddingY: 1 }}>
              <Typography variant="h5">
                {t("addLocationForm.roomsDataHeading")}
              </Typography>
              <StyledContainer
                sx={{ paddingY: 3, paddingTop: 6, position: "relative" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <Tooltip title={t("addLocationForm.addRoomButtonTooltip")}>
                    <Button
                      onClick={addRoom}
                      aria-label={t("addLocationForm.ariaLabels.addRoomButton")}
                    >
                      <AddIcon></AddIcon>
                    </Button>
                  </Tooltip>
                </Box>
                {rooms.length > 0 ? (
                  rooms.map(function(e) {
                    return (
                      <RoomForm
                        room={e}
                        deleteRoom={function() {
                          setConfirmAction(function() {
                            return function() {
                              deleteRoom(e.id);
                            };
                          });
                          setOpenConfirm(true);
                        }}
                        updateRoom={updateRoom}
                      ></RoomForm>
                    );
                  })
                ) : (
                  <Typography>{t("addLocationForm.noRooms")}</Typography>
                )}
              </StyledContainer>
            </StyledContainer>
            <Tooltip title={t("addLocationForm.submitButtonTooltip")}>
              <Button
                type="submit"
                aria-label={t("addLocationForm.ariaLabels.submitButton")}
              >
                {isFetching ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  t("addLocationForm.submitButtonText")
                )}
              </Button>
            </Tooltip>
          </Form>
        </FormProvider>
        <ConfirmActionModal
          open={openConfirm}
          onClose={function() {
            setOpenConfirm(false);
          }}
          confirmAction={confirmAction as () => void}
        ></ConfirmActionModal>
      </>
    </StyledModal>
  );
}
