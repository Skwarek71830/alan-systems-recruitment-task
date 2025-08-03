import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import mockEventsData from "../mock/events.json";
import type { Event } from "../types/event";
import { EventGrid } from "./event-grid";
// Cast the imported JSON data to Event type (handling the desctription typo)
const mockEvents = mockEventsData as unknown as Event[];

describe("EventGrid", () => {
  describe("when loading", () => {
    it("should display loading skeletons", () => {
      render(<EventGrid isLoading={true} events={undefined} />);

      // Check if skeleton elements are rendered
      const skeletons = screen.getAllByTestId(/^skeleton-/);
      expect(skeletons).toHaveLength(9);
    });

    it("should not display any event cards when loading", () => {
      render(<EventGrid isLoading={true} events={mockEvents} />);

      // Should not render event cards when loading
      expect(screen.queryByTestId("event-card-1")).not.toBeInTheDocument();
      expect(screen.queryByTestId("event-card-2")).not.toBeInTheDocument();
      expect(screen.queryByTestId("event-card-3")).not.toBeInTheDocument();
    });

    it('should not display "no events" message when loading', () => {
      render(<EventGrid isLoading={true} events={[]} />);

      expect(
        screen.queryByText("Nie znaleziono żadnych wydarzeń.")
      ).not.toBeInTheDocument();
    });
  });

  describe("when no events are available", () => {
    it('should display "no events" message when events array is empty', () => {
      render(<EventGrid isLoading={false} events={[]} />);

      expect(
        screen.getByText("Nie znaleziono żadnych wydarzeń.")
      ).toBeInTheDocument();
    });

    it('should display "no events" message when events is undefined', () => {
      render(<EventGrid isLoading={false} events={undefined} />);

      expect(
        screen.getByText("Nie znaleziono żadnych wydarzeń.")
      ).toBeInTheDocument();
    });

    it("should not display loading skeletons when no events", () => {
      render(<EventGrid isLoading={false} events={[]} />);

      expect(screen.queryByTestId(/^skeleton-/)).not.toBeInTheDocument();
    });

    it("should not display any event cards when no events", () => {
      render(<EventGrid isLoading={false} events={[]} />);

      expect(screen.queryByTestId(/^event-card-/)).not.toBeInTheDocument();
    });
  });

  describe("when events are available", () => {
    it("should display all provided events", () => {
      render(<EventGrid isLoading={false} events={mockEvents} />);

      // Check if all event cards are rendered
      expect(screen.getByTestId("event-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("event-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("event-card-3")).toBeInTheDocument();

      // Check if event titles are displayed
      expect(screen.getByText("Maraton Warszawski 2025")).toBeInTheDocument();
      expect(screen.getByText("Festiwal Filmowy w Gdyni")).toBeInTheDocument();
      expect(
        screen.getByText("Konferencja Zdrowego Stylu Życia")
      ).toBeInTheDocument();
    });
  });
});
