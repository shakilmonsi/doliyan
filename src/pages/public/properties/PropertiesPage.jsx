// 🟢 PropertyListPage.jsx (Final Corrected Code)
import { useCallback, useEffect, useRef, useState } from "react";
import { FaEuroSign } from "react-icons/fa";
import { FiGrid, FiLayers, FiMapPin } from "react-icons/fi";
import { RiSofaLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import CardSkeleton from "../../../components/common/Card-Skeleton";
import allCitiesForSuggestions from "../../../assets/data/cities.json";
import RangeSlider from "../../../components/common/RangeSlider";
import Pagination from "../../../components/common/Pagination";
import NotFounds from "../../../components/error/NotFounds";

import { useLanguage } from "../../../hook/useLanguage";
import axios from "../../../utils/axiosInstance";
import PeropertiesCard from "./components/common/PropertiesCard";

// Static list of cities for suggestions

const PropertyListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const suggestionsRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    minSurfaceArea: "",
    maxSurfaceArea: "",
  });
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Debounce function
  const debounce = useCallback((func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }, []);

  // Fetch property data from API
  const fetchData = async (page = 1, queryParams) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const params = new URLSearchParams(queryParams);
      params.set("page", page);
      params.set("limit", pagination.itemsPerPage);

      const res = await axios.get(`/properties?${params.toString()}`);

      setProperties(res.data.properties);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Main useEffect to handle URL and state synchronization
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      location: searchParams.get("location") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minBedrooms: searchParams.get("minBedrooms") || "",
      maxBedrooms: searchParams.get("maxBedrooms") || "",
      minSurfaceArea: searchParams.get("minSurfaceArea") || "",
      maxSurfaceArea: searchParams.get("maxSurfaceArea") || "",
    };

    setFilters(newFilters);
    setLocationInput(newFilters.location);
    setPagination((prev) => ({
      ...prev,
      currentPage: Number(searchParams.get("page")) || 1,
    }));
    fetchData(Number(searchParams.get("page")) || 1, newFilters);
  }, [location.search]);

  // Fetch location suggestions from static list
  const fetchSuggestions = (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = allCitiesForSuggestions.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
  };
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [debounce],
  );

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle filter state update and URL navigation
  const updateUrl = (newFilters, newPage) => {
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });
    if (newPage) {
      queryParams.set("page", newPage);
    }
    navigate(`?${queryParams.toString()}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      updateUrl(filters, newPage);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    updateUrl(newFilters, 1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    updateUrl(filters, 1);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    debouncedFetchSuggestions(value);
    const newFilters = { ...filters, location: value };
    updateUrl(newFilters, 1);
  };

  const handleSuggestionSelect = (suggestion) => {
    const newFilters = { ...filters, location: suggestion };
    updateUrl(newFilters, 1);
    setLocationInput(suggestion);
    setShowSuggestions(false);
  };

  const renderSkeletonListings = () => {
    return Array(pagination.itemsPerPage)
      .fill(0)
      .map((_, index) => <CardSkeleton key={index} />);
  };

  const handlePriceChange = ({ min, max }) => {
    const newFilters = { ...filters, minPrice: min, maxPrice: max };
    updateUrl(newFilters, 1);
  };

  const handleBedroomsChange = (value) => {
    const newFilters = {
      ...filters,
      minBedrooms: value,
      maxBedrooms: value === "5+" ? "" : value,
    };
    updateUrl(newFilters, 1);
  };

  const handleSurfaceAreaChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    updateUrl(newFilters, 1);
  };

  return (
    <section className="">
      <header className="relative h-[300px] bg-[url('/image/new/img_8.jpeg')] bg-cover bg-top">
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div>
            <h1 className="text-center text-3xl font-bold text-white drop-shadow-md md:text-4xl">
              {t("filters.top")}
            </h1>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-10 max-w-7xl gap-12 px-5 md:px-8 lg:mb-10 lg:flex lg:px-0">
        <aside className="top-20 h-fit space-y-4 md:w-full lg:sticky lg:w-1/4">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <FiGrid /> Filters
          </h2>
          <form
            onSubmit={handleFilterSubmit}
            className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-1"
          >
            <div
              className="relative rounded-md p-6 shadow-sm"
              ref={suggestionsRef}
            >
              {locationInput && (
                <button
                  type="button"
                  className="absolute top-[72px] right-8 rounded-full bg-gray-200 px-1 py-0.5 text-xs font-bold text-gray-600 hover:text-red-500"
                  onClick={() => {
                    setLocationInput("");
                    setFilters((prev) => ({ ...prev, location: "" }));
                    updateUrl({ ...filters, location: "" }, 1);
                  }}
                >
                  ✕
                </button>
              )}
              <label className="text-md mb-2 flex items-center gap-1.5 font-medium text-gray-500">
                <FiMapPin size={15} />
                {t("filters.search")}
              </label>
              <input
                type="text"
                name="location"
                value={locationInput}
                onChange={handleLocationChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t("filters.search")}
                className="mt-1 w-full rounded-md border border-gray-200 p-2"
                autoComplete="off"
              />
              {showSuggestions && (
                <ul className="absolute top-full left-0 z-10 mt-0 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white text-sm shadow-lg">
                  {isFetchingSuggestions ? (
                    <li className="mx-2 my-2 flex h-10 items-center justify-center rounded-xl bg-gray-50 px-2 text-gray-500">
                      Loading...
                    </li>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <FiMapPin size={14} />
                        {suggestion}
                      </li>
                    ))
                  ) : locationInput.trim().length >= 2 ? (
                    <li className="mx-2 my-2 flex h-10 items-center justify-center rounded-xl bg-gray-50 px-2 text-gray-400">
                      No matching locations!
                    </li>
                  ) : null}
                </ul>
              )}
            </div>
            <div className="rounded-md p-6 shadow-sm">
              <div className="inline-flex items-center gap-1">
                <span>
                  <FaEuroSign className="h-3.5 w-3.5 text-gray-400" />
                </span>
                <h4 className="text-gray-500">{t("filters.range.title")}</h4>
              </div>
              <hr className="my-2.5 text-gray-200" />
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.range.min")}
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.range.max")}
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="10000"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
              </div>
              <div className="">
                <RangeSlider
                  min={0}
                  max={10000}
                  step={10}
                  initialMin={filters.minPrice || 0}
                  initialMax={filters.maxPrice || 10000}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="rounded-md p-5 shadow">
              <label className="text-md inline-flex items-center gap-2 text-gray-500">
                <span>
                  <RiSofaLine className="text-gray-500" />
                </span>
                <span>{t("filters.rooms")}</span>
              </label>
              <ul className="grid grid-cols-3 gap-2 pt-4">
                {["1", "2", "3", "4", "5", "6+"].map((num, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer rounded-full border border-gray-200 p-2 text-center text-sm text-gray-500 hover:bg-gray-200 ${
                      (filters.minBedrooms === num && num !== "5+") ||
                      (num === "5+" && filters.minBedrooms === "5")
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                    onClick={() => handleBedroomsChange(num)}
                  >
                    {num}{" "}
                    {num === "5+"
                      ? ""
                      : num <= 1
                        ? t("properties.room")
                        : t("properties.rooms")}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md p-5 shadow">
              <div className="inline-flex items-center gap-2">
                <FiLayers className="text-gray-500" />
                <h4 className="text-md text-gray-500">
                  {t("filters.suface.title")}
                </h4>
              </div>
              <hr className="my-2.5 text-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.suface.min")}
                  </label>
                  <input
                    type="number"
                    name="minSurfaceArea"
                    placeholder="e.g. 50"
                    value={filters.minSurfaceArea}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.suface.max")}
                  </label>
                  <input
                    type="number"
                    name="maxSurfaceArea"
                    placeholder="e.g. 200"
                    value={filters.maxSurfaceArea}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </aside>
        <article className="flex-1 pt-5 md:pt-8 lg:pt-0">
          {isLoading ? (
            renderSkeletonListings()
          ) : isError ? (
            <NotFounds
              title="Something Went Wrong"
              message="Please check your connection or try again later."
              buttonText="Retry"
              onButtonClick={() => window.location.reload()}
            />
          ) : properties.length === 0 ? (
            <NotFounds
              buttonText={t("properties.reload")}
              title={t("properties.noResultsFound")}
              message={t("properties.noResultsFoundDescription")}
              onButtonClick={() => window.location.reload()}
            />
          ) : (
            <div className="">
              {properties.map((item) => (
                <PeropertiesCard key={item.id} item={item} />
              ))}
            </div>
          )}
          {pagination.totalPages > 1 && (
            <footer className="flex justify-center">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </footer>
          )}
        </article>
      </main>
    </section>
  );
};

export default PropertyListPage;
