import { Grid, Skeleton, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import useSWR from "swr";
import "../App.css";
import { EventCard } from "../components/event-card";
import { wait } from "../helpers/utils";
import mockEvents from "../mock/events.json"; // Import mock data
import type { Event } from "../types/event";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: events, isLoading } = useSWR("/events", async () => {
    await wait(1000); // Simulate API response delay
    //mock data from the mocks folder - normally it would be fetched from an API using "GET" method to the {API URL}/events endpoint - i would use the fetcher fn from utils.ts
    return mockEvents as unknown as Event[];
  });

  //create array of skeletons to display during loading state
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
      {events?.map((event) => (
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
