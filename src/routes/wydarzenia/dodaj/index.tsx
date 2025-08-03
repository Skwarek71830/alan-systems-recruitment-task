import { zodResolver } from "@hookform/resolvers/zod";
import Add from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { eventTypeTranslationMapping } from "../../../types/event";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Zod validation schema
const eventDraftSchema = z.object({
  title: z
    .string()
    .min(3, "Tytuł musi mieć co najmniej 3 znaki")
    .max(100, "Tytuł nie może być dłuższy niż 100 znaków"),
  date: z.string().min(1, "Data jest wymagana"),
  desctription: z
    .string()
    .min(10, "Opis musi mieć co najmniej 10 znaków")
    .max(1000, "Opis nie może być dłuższy niż 1000 znaków"),
  image: z.instanceof(FileList).refine(
    (fileList) => {
      if (!fileList) return false;
      const files = Array.from(fileList);
      return files.every((file) => ALLOWED_MIME_TYPES.includes(file.type));
    },
    {
      message: "Wybierz poprawny format obrazu (JPG, PNG, WEBP)",
    }
  ),
  type: z.enum(["sport", "culture", "health"], {
    error: "Wybierz poprawny typ wydarzenia",
  }),
  phone: z
    .string()
    .min(9, "Numer telefonu musi mieć co najmniej 9 znaków")
    .regex(/^\+?[0-9\s\-()]+$/, "Podaj poprawny numer telefonu"),
  email: z.email("Podaj poprawny adres email"),
  location: z
    .string()
    .min(5, "Lokalizacja musi mieć co najmniej 5 znaków")
    .max(200, "Lokalizacja nie może być dłuższa niż 200 znaków"),
});

type EventDraftForm = z.infer<typeof eventDraftSchema>;

export const Route = createFileRoute("/wydarzenia/dodaj/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventDraftForm>({
    resolver: zodResolver(eventDraftSchema),
    defaultValues: {
      title: "",
      date: "",
      desctription: "",
      image: undefined,
      type: undefined,
      phone: "",
      email: "",
      location: "",
    },
  });

  const onSubmit = async (data: EventDraftForm) => {
    try {
      // Simulate API call
      console.log("Dodawanie wydarzenia:", data);

      // Here you would normally send the data to your API
      // const response = await fetch('/event/add', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //if response is 200 - proceed - if not - handle error

      // Navigate back to home page after successful submission
      navigate({ to: "/" });
    } catch (error) {
      console.error("Błąd podczas dodawania wydarzenia:", error);
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      {/* Back Button */}
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

      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            Dodaj nowe wydarzenie
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              {...register("title")}
              label='Tytuł wydarzenia'
              variant='outlined'
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              required
            />

            <TextField
              {...register("date")}
              label='Data i godzina'
              type='datetime-local'
              variant='outlined'
              fullWidth
              error={!!errors.date}
              helperText={errors.date?.message}
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type} required>
                  <InputLabel>Typ wydarzenia</InputLabel>
                  <Select
                    {...field}
                    label='Typ wydarzenia'
                    sx={{ textAlign: "left" }}
                    value={field.value || ""}
                  >
                    {Object.entries(eventTypeTranslationMapping).map(
                      ([key, label]) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.type && (
                    <FormHelperText>{errors.type.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <TextField
              {...register("desctription")}
              label='Opis wydarzenia'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              error={!!errors.desctription}
              helperText={errors.desctription?.message}
              required
            />

            <TextField
              {...register("image")}
              label='Obraz wydarzenia'
              type='file'
              variant='outlined'
              fullWidth
              error={!!errors.image}
              helperText={
                errors.image?.message || "Wybierz plik obrazu (JPG, PNG, WEBP)"
              }
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  accept: ALLOWED_MIME_TYPES.join(", "),
                },
              }}
            />

            <TextField
              {...register("phone")}
              label='Numer telefonu'
              variant='outlined'
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              placeholder='+48 123 456 789'
              required
            />

            <TextField
              {...register("email")}
              label='Adres email'
              type='email'
              variant='outlined'
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder='kontakt@wydarzenie.pl'
              required
            />

            <TextField
              {...register("location")}
              label='Lokalizacja'
              variant='outlined'
              fullWidth
              error={!!errors.location}
              helperText={errors.location?.message}
              placeholder='ul. Przykładowa 123, 00-000 Warszawa'
              required
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                type='button'
                variant='outlined'
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Wyczyść formularz
              </Button>
              <Button
                type='submit'
                variant='contained'
                startIcon={<Add />}
                disabled={isSubmitting}
                sx={{ minWidth: 150 }}
              >
                {isSubmitting ? "Dodawanie..." : "Dodaj wydarzenie"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
