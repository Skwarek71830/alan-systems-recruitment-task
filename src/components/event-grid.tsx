import { Grid, Skeleton, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import type { Event } from "../types/event";
import { EventCard } from "./event-card";

interface EventGridProps {
  events?: Event[];
  isLoading: boolean;
}

export function EventGrid({ events, isLoading }: Readonly<EventGridProps>) {
  // Create array of skeletons to display during loading state
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index + 1);

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {skeletonArray.map((index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ width: "100%" }}
            key={index}
          >
            <Skeleton
              variant='rectangular'
              width='100%'
              height={500}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h6' align='center'>
            Nie znaleziono żadnych wydarzeń.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ width: "100%" }}
          key={event.id}
        >
          <Link
            to='/wydarzenia/$eventId'
            params={{ eventId: event.id }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <EventCard event={event} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default EventGrid;
