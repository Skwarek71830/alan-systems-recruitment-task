import {
  CalendarToday,
  DirectionsRun,
  Email,
  LocalHospital,
  LocationOn,
  Palette,
  Phone,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  eventTypeTranslationMapping,
  type Event,
  type EventType,
} from "../types/event";

interface EventCardProps {
  event: Event;
}

// Icon mapper for event types
const eventTypeIconMapper: Record<EventType, React.ReactElement> = {
  sport: <DirectionsRun />,
  culture: <Palette />,
  health: <LocalHospital />,
};

// Color mapper for event types
const eventTypeColorMapper: Record<
  EventType,
  "primary" | "secondary" | "success"
> = {
  sport: "primary",
  culture: "secondary",
  health: "success",
};

export function EventCard({ event }: Readonly<EventCardProps>) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        height: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        textAlign: "left",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component='img'
          height='250'
          image={event.image}
          alt={event.title}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
          }}
        >
          <Chip
            icon={eventTypeIconMapper[event.type]}
            label={eventTypeTranslationMapping[event.type]}
            color={eventTypeColorMapper[event.type]}
            size='small'
          />
        </Box>
      </Box>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant='h6'
          component='h2'
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {event.title}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
            <CalendarToday fontSize='small' />
            <Typography variant='body2' color='text.secondary'>
              {formatDate(event.date)}
            </Typography>
          </Box>
          <Typography variant='body2'>{event.description}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              component='a'
              href={`tel:${event.phone}`}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 1,
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                gap: 1,
              }}
            >
              <Phone fontSize='small' />
              <Typography variant='body2' color='text.secondary'>
                {event.phone}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              component='a'
              href={`mailto:${event.email}`}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 1,
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                gap: 1,
              }}
            >
              <Email fontSize='small' />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {event.email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <LocationOn fontSize='small' />
              <Typography variant='body2' color='text.secondary'>
                {event.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EventCard;
