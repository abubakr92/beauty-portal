"use client";

import { allCountries, type TelephoneCountry } from "country-telephone-data";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PhoneNumberField.module.css";

const countries = [...allCountries].sort((first, second) =>
  first.name.localeCompare(second.name),
);
const defaultCountry =
  countries.find((country) => country.iso2 === "ca") ?? countries[0];

export default function PhoneNumberField() {
  const [selectedCountry, setSelectedCountry] =
    useState<TelephoneCountry>(defaultCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(normalizedQuery) ||
        country.iso2.includes(normalizedQuery) ||
        country.dialCode.includes(normalizedQuery.replace("+", "")),
    );
  }, [query]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [isOpen]);

  function selectCountry(country: TelephoneCountry) {
    setSelectedCountry(country);
    setIsOpen(false);
    setQuery("");
  }

  return (
    <div className={styles.field} ref={rootRef}>
      <label htmlFor="community-phone">
        Phone Number <small>(Optional)</small>
      </label>

      <div className={styles.phoneControl}>
        <button
          className={styles.countryButton}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Country: ${selectedCountry.name}, +${selectedCountry.dialCode}`}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          <span
            className={`fi fi-${selectedCountry.iso2}`}
            aria-hidden="true"
          />
          <span>+{selectedCountry.dialCode}</span>
          <i aria-hidden="true" />
        </button>

        <input
          type="hidden"
          name="phoneCountry"
          value={selectedCountry.iso2.toUpperCase()}
        />
        <input
          type="hidden"
          name="phoneDialCode"
          value={`+${selectedCountry.dialCode}`}
        />
        <input
          id="community-phone"
          name="phone"
          type="tel"
          placeholder="(201) 555-0123"
          autoComplete="tel-national"
        />

        {isOpen && (
          <div className={styles.dropdown}>
            <input
              ref={searchRef}
              className={styles.search}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country or code..."
              aria-label="Search countries"
            />

            <div
              className={styles.countryList}
              role="listbox"
              aria-label="Countries"
            >
              {filteredCountries.map((country) => (
                <button
                  className={
                    country.iso2 === selectedCountry.iso2
                      ? styles.selectedCountry
                      : undefined
                  }
                  type="button"
                  role="option"
                  aria-selected={country.iso2 === selectedCountry.iso2}
                  onClick={() => selectCountry(country)}
                  key={`${country.iso2}-${country.dialCode}`}
                >
                  <span className={`fi fi-${country.iso2}`} aria-hidden="true" />
                  <span>{country.name}</span>
                  <strong>+{country.dialCode}</strong>
                </button>
              ))}

              {filteredCountries.length === 0 && <p>No country found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
