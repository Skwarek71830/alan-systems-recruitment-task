import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import useSWR from "swr";
import EventCard from "../../components/event-card";
import { wait } from "../../helpers/utils";
import mockEvents from "../../mock/events.json"; // Import mock data
import type { Event } from "../../types/event";
export const Route = createFileRoute("/wydarzenia/$eventId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { eventId } = Route.useParams();

  const { data: event, isLoading } = useSWR(`/events/${eventId}`, async () => {
    await wait(1000); // Simulate API response delay
    //mock data from the mocks folder - normally it would be fetched from an API using "GET" method to the {API URL}/events endpoint - i would use the fetcher fn from utils.ts
    return mockEvents.find((event) => event.id === eventId) as
      | Event
      | undefined;
  });

  if (isLoading) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='50vh'
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='50vh'
        >
          <Typography variant='h6' color='text.secondary'>
            Nie znaleziono wydarzenia
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to='/'
          startIcon={<ArrowBack />}
          variant='outlined'
          sx={{ mb: 2 }}
        >
          Powrót do listy wydarzeń
        </Button>
      </Box>
      <EventCard event={event} standalone />
    </Container>
  );
}
