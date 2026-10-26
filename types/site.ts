export type ConfirmationStatus = "confirmed" | "needs-confirmation";

export type PostalAddress = {
  street: string;
  additional: string | null;
  postalCode: string;
  city: string;
  region: string;
  country: string;
};

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Horaires structurés (schema.org `OpeningHoursSpecification`), heures au format `HH:MM`. */
export type OpeningHoursSpec = {
  days: DayOfWeek[];
  opens: string;
  closes: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  legalForm: string | null;
  tagline: string;
  description: string;
  url: string;
  urlStatus: ConfirmationStatus;
  phone: string;
  phoneHref: string;
  phoneStatus: ConfirmationStatus;
  email: string | null;
  address: PostalAddress;
  addressStatus: ConfirmationStatus;
  geo: GeoCoordinates | null;
  foundedYear: number | null;
  foundedYearStatus: ConfirmationStatus;
  openingHours: string | null;
  openingHoursSpec: OpeningHoursSpec[];
  siren: string | null;
  siret: string | null;
  vatNumber: string | null;
};
