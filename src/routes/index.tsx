import { Grid } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <Grid container spacing={2}>
      {events?.map((event) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ width: "100%" }}
          key={event.id}
        >
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
}
