export type ConfirmationStatus = "confirmed" | "needs-confirmation";

export type PostalAddress = {
  street: string;
  additional: string | null;
  postalCode: string;
  city: string;
  region: string;
  country: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
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
  foundedYear: number | null;
  foundedYearStatus: ConfirmationStatus;
  openingHours: string | null;
  siret: string | null;
  vatNumber: string | null;
};
