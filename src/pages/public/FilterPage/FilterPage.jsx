import { useContext, useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";
import {
  FiClock,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiLayers,
  FiMapPin,
  FiSliders,
} from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardSkeleton from "../../../components/common/Card-Skeleton";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

// ✅ Clean numeric price parser
const cleanPrice = (priceStr) => {
  if (!priceStr) return 0;

  const raw = priceStr.replace(/[^\d.,]/g, "").replace(",", ".");
  const normalized = raw.replace(/\.(?=.*\.)/, "").replace(",", ".");

  return parseFloat(normalized);
};

export default function FilterPage() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [rooms, setRooms] = useState("");
  const [surface, setSurface] = useState("");

  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 30;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedListings = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3011/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const processedListings = data.properties.map((l) => ({
          ...l,
          numericPrice: cleanPrice(l.price),
        }));

        setListings(processedListings);

        const city = params.get("address") || "";
        const min = parseInt(params.get("min")) || 0;
        const max = parseInt(params.get("max")) || 10000;

        setLocation(city);
        setMinPrice(min);
        setMaxPrice(max);

        const filteredData = processedListings.filter((l) => {
          const locMatch =
            !city || l.location.toLowerCase().includes(city.toLowerCase());
          const priceMatch = l.numericPrice >= min && l.numericPrice <= max;
          return locMatch && priceMatch;
        });

        setFiltered(filteredData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  useEffect(() => {
    applyFilters();
  }, [location, minPrice, maxPrice, rooms, surface]);

  const handleLocationInput = (value) => {
    setLocation(value);
    setShowSuggestions(true);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const citySet = [...new Set(listings.map((l) => l.location))];

    const matches = citySet.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestions(matches);
  };

  const handleCitySelect = (location) => {
    setLocation(location);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const applyFilters = () => {
    const filteredData = listings.filter((l) => {
      const locMatch =
        !location || l.location.toLowerCase().includes(location.toLowerCase());
      const priceMatch =
        l.numericPrice >= minPrice && l.numericPrice <= maxPrice;
      const roomMatch = !rooms || l.rooms === parseInt(rooms);
      const surfaceMatch = !surface || l.surface >= parseInt(surface);
      return locMatch && priceMatch && roomMatch && surfaceMatch;
    });

    setFiltered(filteredData);
    setCurrentPage(1); // reset pagination
  };

  const handleListingClick = (id) => {
    navigate(`/property-list/${id}`);
  };

  // Uniq rooms
  const uniqueRooms = [...new Set(listings.map((l) => l.rooms))].sort(
    (a, b) => a - b,
  );

  // Skeleton loader for listings
  const renderSkeletonListings = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => <CardSkeleton key={index} />);
  };

  return (
    <div className="min-h-screen w-full">
      <header
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1599423300746-b62533397364)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            Explore Rental Listings in Netherlands
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-[1300px] px-4 md:flex">
        {/* Sidebar Filters */}
        <aside className="top-20 h-fit space-y-4 p-4 md:sticky md:w-1/4">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <FiGrid /> Filters
          </h2>

          {/* Location Filter */}
          <div className="relative rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiMapPin /> Location
            </div>
            <input
              type="text"
              placeholder="Enter city"
              value={location}
              onChange={(e) => handleLocationInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full rounded border border-gray-200 bg-gray-50 p-2 text-sm"
            />

            {showSuggestions && location.trim() !== "" && (
              <ul className="absolute top-[100%] left-0 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-300 bg-white text-sm shadow">
                {suggestions.length > 0 ? (
                  suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="flex cursor-pointer items-center gap-1 px-4 py-2 hover:bg-blue-100"
                      onClick={() => handleCitySelect(s)}
                    >
                      <FiMapPin />
                      <span>{s}</span>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No listings found</li>
                )}
              </ul>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiDollarSign /> Price Range
            </div>
            <div className="mb-4 flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))
                }
                className="w-1/2 rounded border border-gray-200 bg-gray-50 p-2 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))
                }
                className="w-1/2 rounded border border-gray-200 bg-gray-50 p-2 text-sm"
              />
            </div>
            <ReactSlider
              className="h-2 w-full rounded bg-gray-200"
              thumbClassName="h-4 w-4 rounded-full bg-blue-600 cursor-pointer"
              trackClassName="bg-blue-500 h-2 rounded"
              min={0}
              max={10000}
              step={100}
              value={[minPrice, maxPrice]}
              onChange={([min, max]) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              withTracks={true}
              pearling
              minDistance={100}
            />
          </div>

          {/* Rooms Filter */}
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiHome /> Rooms
            </div>
            <div className="flex flex-wrap gap-2">
              {isLoading ? (
                <Skeleton
                  count={3}
                  height={30}
                  width={70}
                  inline
                  containerClassName="flex gap-2"
                />
              ) : (
                uniqueRooms.map((r) => (
                  <label
                    key={r}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${
                      rooms == r
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      value={r}
                      checked={rooms == r}
                      onChange={(e) => setRooms(e.target.value)}
                      className="hidden"
                    />
                    {r} Room{r > 1 && "s"}
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Surface Filter */}
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiSliders /> Min Surface (m²)
            </div>
            <input
              type="number"
              placeholder="e.g. 50"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="w-full rounded border border-gray-200 bg-gray-50 p-2 text-sm"
            />
          </div>
        </aside>

        {/* Listings + Pagination */}
        <article className="grid w-3/4 gap-6 p-4">
          {isLoading ? (
            renderSkeletonListings()
          ) : (
            <>
              {paginatedListings.length === 0 ? (
                <div className="py-10 text-center text-lg text-gray-600">
                  No listings found!
                </div>
              ) : (
                paginatedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="w-full cursor-pointer rounded-xl bg-white p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] transition hover:shadow-md sm:h-72"
                    onClick={() => handleListingClick(listing.id)}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64 sm:w-96">
                        <img
                          src={
                            listing?.media?.[0]?.url ||
                            "https://via.placeholder.com/384x256?text=No+Image"
                          }
                          alt={listing.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/384x256?text=No+Image";
                          }}
                        />
                        <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border-t border-zinc-900/5 bg-white p-2 shadow">
                          <div className="h-4 w-4 text-blue-700">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="space-y-2">
                          {/* Title and time */}
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                            <h3 className="text-lg font-semibold text-black capitalize sm:text-xl">
                              {listing.title.length > 40
                                ? `${listing.title.slice(0, 40)}...`
                                : listing.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-blue-700">
                              <FiClock />
                              4:50PM
                            </div>
                          </div>

                          {/* Description */}
                          <p className="line-clamp-2 text-sm text-gray-600 sm:line-clamp-3">
                            {listing.description || "No description available"}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 sm:gap-4">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                              <FiLayers className="text-gray-700" />
                              <span className="text-xs text-gray-700">
                                {listing.surface}m<sup>2</sup>
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                              <FaHotel className="text-gray-700" />
                              <span className="text-xs text-gray-700">
                                {listing.rooms}{" "}
                                {listing.rooms > 1 ? "rooms" : "room"}
                              </span>
                            </div>
                          </div>

                          {/* Location and price */}
                          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-0">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                              <FiMapPin className="text-gray-700" />
                              <span className="text-xs text-gray-700">
                                {listing.location || "Location not specified"}
                              </span>
                            </div>
                            <div className="text-lg font-semibold text-blue-700 capitalize sm:text-xl">
                              € {listing.numericPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="mt-4 flex max-h-12 w-full items-center justify-center rounded bg-gradient-to-l from-yellow-600 to-yellow-500 px-6 py-3 sm:mt-0">
                          <span className="text-base font-medium text-white">
                            Bekijk de woning
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Pagination Buttons */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`rounded-md px-3 py-1 text-sm font-medium sm:px-4 sm:py-2 sm:text-base ${
                          pageNum === currentPage
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-100 text-blue-500 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </article>
      </div>
    </div>
  );
}
