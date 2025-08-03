export interface Event extends EventDraft {
  id: string;
}

// EventDraft type - Event without id
export interface EventDraft {
  title: string;
  date: Date;
  description: string;
  image: string;
  type: EventType;
  phone: string;
  email: string;
  location: string;
}

export type EventType = "sport" | "culture" | "health";

export const eventTypeTranslationMapping: Record<EventType, string> = {
  sport: "Sport",
  culture: "Kultura",
  health: "Zdrowie",
};
