import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import Button from "../../../../components/ui/Button";

const SearchSection = (props) => {
  const {
    // Updated props
    query,
    suggestions,
    showSuggestions,
    isFetchingSuggestions,
    onLocationInput,
    onCitySelect,
    // Price values
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    // Search action
    onSearch,
    // Translations
    t,
  } = props;

  return (
    <section className="relative -top-14 z-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-3 bg-white p-6 md:mx-4 md:flex-row md:rounded-lg md:p-6 md:shadow-lg lg:p-8">
          {/* Location Search */}
          <div className="relative w-full">
            <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`${t("home.hero.search.place")}`}
              value={query}
              onChange={(e) => onLocationInput(e.target.value)}
              onFocus={() => onLocationInput(query)}
              onBlur={() => setTimeout(() => onLocationInput(query), 150)}
              className="h-16 w-full rounded-lg bg-white py-2 pr-4 pl-10 shadow focus:outline-none"
            />

            {showSuggestions && query.trim() !== "" && (
              <ul className="absolute top-[100%] left-0 z-10 mt-1 max-h-80 w-full overflow-y-auto rounded border border-gray-200 bg-white text-sm shadow">
                {suggestions.length > 0 ? (
                  suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="flex cursor-pointer items-center gap-1 px-4 py-2 hover:bg-blue-100"
                      onClick={() => onCitySelect(s)}
                    >
                      <FiMapPin />
                      <span>{s}</span>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No listings found!
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Min Price */}
          <div className="w-full">
            <input
              type="number"
              placeholder={`€ ${t("home.hero.search.min")}`}
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="h-16 w-full rounded-lg bg-white py-2 pr-4 pl-10 shadow focus:outline-none"
            />
          </div>

          {/* Max Price */}
          <div className="w-full">
            <input
              type="number"
              placeholder={`€ ${t("home.hero.search.max")}`}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="h-16 w-full rounded-lg bg-white py-2 pr-4 pl-10 shadow focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <div className="w-full">
            <Button
              variant="yellowGradient"
              size="lg"
              onClick={onSearch}
              className="flex w-full items-center justify-center gap-2 py-4.5"
            >
              <FiSearch /> {t("home.hero.search.button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
