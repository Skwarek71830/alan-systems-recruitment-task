import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import useSWR from "swr";
import "../App.css";
import { EventGrid } from "../components/event-grid";
import { wait } from "../helpers/utils";
import mockEvents from "../mock/events.json"; // Import mock data
import type { Event } from "../types/event";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: events, isLoading } = useSWR("/events", async () => {
    await wait(1000); // Simulate API response delay
    //mock data from the mocks folder - normally it would be fetched from an API using "GET" method to the {API URL}/events endpoint - i would use the fetcher fn from helpers/utils.ts
    return mockEvents as unknown as Event[];
  });

  return (
    <div>
      <EventGrid events={events} isLoading={isLoading} />
      <Link to='/wydarzenia/dodaj' style={{ textDecoration: "none" }}>
        <Fab
          color='primary'
          aria-label='dodaj wydarzenie'
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          variant='extended'
        >
          <Add sx={{ mr: 1 }} /> Dodaj wydarzenie
        </Fab>
      </Link>
    </div>
  );
}
