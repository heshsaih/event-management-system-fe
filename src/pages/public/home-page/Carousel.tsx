import { useEffect } from "react";
import useEventParticipant from "../../../data/useEventParticipant";
import { Carousel as LibCarousel } from "react-responsive-carousel";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Colors } from "../../../constants/styling";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const { isFetching, events, getAllEvents } = useEventParticipant();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(function() {
    getAllEvents();
  }, []);

  return (
    <>
      {isFetching ? (
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      ) : (
        <Box width={"100%"}>
          <LibCarousel
            infiniteLoop
            autoPlay
            showThumbs={false}
            showStatus={false}
            aria-label={t("carousel.ariaLabels.carousel")}
            labels={{
              leftArrow: t("carousel.ariaLabels.leftArrow"),
              rightArrow: t("carousel.ariaLabels.rightArrow"),
              item: t("carousel.ariaLabels.item"),
            }}
          >
            {events?.map(function(e) {
              return (
                <Card key={e.id}>
                  <CardActionArea disabled>
                    <CardMedia
                      component="img"
                      height={300}
                      src={`data:image/&;base64, ${e.image.data}`}
                      alt={t("carousel.imageAltText")}
                    ></CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {e.descriptionPl}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Tooltip title={t("carousel.showEventButtonTooltip")}>
                      <Button
                        aria-label={t("carousel.ariaLabels.showEventButton")}
                        sx={{ marginBottom: "2rem" }}
                        onClick={function() {
                          navigate(`/events/${e.id}`);
                        }}
                      >
                        {t("carousel.showEventButtonText")}
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
          </LibCarousel>
        </Box>
      )}
    </>
  );
}
