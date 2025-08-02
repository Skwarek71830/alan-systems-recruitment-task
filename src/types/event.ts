export interface Event {
  id: string;
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
