declare module "country-telephone-data" {
  export type TelephoneCountry = {
    name: string;
    iso2: string;
    dialCode: string;
    format?: string;
    hasAreaCodes?: boolean;
  };

  export const allCountries: TelephoneCountry[];
}
