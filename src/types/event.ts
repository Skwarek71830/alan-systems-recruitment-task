export interface Event {
  id: string;
  title: string;
  date: Date;
  desctription: string;
  image: string;
  type: EventType;
}

export type EventType = "sport" | "culture" | "health";

export const eventTypeTranslationMapping: Record<EventType, string> = {
  sport: "Sport",
  culture: "Kultura",
  health: "Zdrowie",
};
