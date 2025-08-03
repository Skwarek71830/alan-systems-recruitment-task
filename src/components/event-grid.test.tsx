import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import mockEventsData from "../mock/events.json";
import type { Event } from "../types/event";
import { EventGrid } from "./event-grid";

// Mock the TanStack Router Link component - prevent error when it appears in dom during tests
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a {...props} href='/'>
      {children}
    </a>
  ),
}));

// Cast the imported JSON data to Event type
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

      // Check if all event cards are rendered by mapping through mock events
      mockEvents.forEach((_, index) => {
        expect(screen.getByTestId(`event-card-${index}`)).toBeInTheDocument();
      });

      // Check if all event titles are displayed by mapping through mock events
      mockEvents.forEach((event) => {
        expect(screen.getByText(event.title)).toBeInTheDocument();
      });
    });

    it("should not display loading skeletons when events are available", () => {
      render(<EventGrid isLoading={false} events={mockEvents} />);

      expect(screen.queryByTestId(/^skeleton-/)).not.toBeInTheDocument();
    });

    it('should not display "no events" message when events are available', () => {
      render(<EventGrid isLoading={false} events={mockEvents} />);

      expect(
        screen.queryByText("Nie znaleziono żadnych wydarzeń.")
      ).not.toBeInTheDocument();
    });
  });
});
