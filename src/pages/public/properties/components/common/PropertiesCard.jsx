import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiSofaLine } from "react-icons/ri";
import { FiClock, FiLayers, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../../../../../hook/useLanguage";
import FavouriteIcon from "../../../../../components/FavouriteIcon/FavouriteIcon";
import { getActivePlan } from "../../../../../features/auth/authUtils";
import Button from "../../../../../components/ui/Button";

const ifNotImg = "/image/random/fallback.jpg";

const PropertiesCard = ({ item }) => {
  const { t } = useLanguage();

  const {
    id,
    priceFloat,
    features: { surfaceAreaFloat, numberOfRoomsFloat },
    title,
    description,
    primaryImage,
    createdAt,
    location,
    price,
  } = item;

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} ${t("properties.hago")}`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} ${t("properties.dago")}`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // ============================================ //
  // Handle property view limit for Free plan users
  // ============================================ //
  const handleStorePropertyId = (e) => {
    const planName = getActivePlan(); // "Premium" | "Free" | null

    // Premium users → no storing, no blocking
    if (planName === "Premium") {
      return; // just allow navigation, don’t save IDs
    }

    // For others → store in array with max 10
    const stored = localStorage.getItem("app_property_id");
    let ids = stored ? JSON.parse(stored) : [];

    // Visitors, free users, or normal logged-in users
    if (ids.length >= 10 && !ids.includes(id)) {
      e.preventDefault();
      toast.warn("Upgrade to Premium");

      return;
    }

    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem("app_property_id", JSON.stringify(ids));
    }
  };

  const DISPLAY_SLICE_LIMIT = 31;
  const RENT_PREFIXES = ["Te huur:", "For rent:"];
  const isRentTitle = RENT_PREFIXES.some((prefix) => title?.includes(prefix));
  const displayTitle = title
    ? isRentTitle
      ? title.slice(0, DISPLAY_SLICE_LIMIT)
      : title
    : "";

  return (
    <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-sm transition hover:shadow-lg sm:h-72 md:mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64 sm:w-96">
          <Link to={`/properties/${id}`} onClick={handleStorePropertyId}>
            <img
              src={
                primaryImage === "No image available" ? ifNotImg : primaryImage
              }
              alt={title}
              className="h-full w-full cursor-pointer object-cover"
            />
          </Link>

          <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border-t border-zinc-900/5 bg-white p-2 shadow">
            <div>
              <FavouriteIcon itemId={id} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-4">
            {/* Title and time */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <h3 className="text-lg font-semibold text-black capitalize sm:text-xl">
                {displayTitle}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <FiClock size={15} />
                {formatRelativeTime(createdAt)}
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600 sm:line-clamp-3">
              {description.toLowerCase() || "No description available"}
            </p>

            <div>
              {/* Features */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <FiLayers className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {surfaceAreaFloat} m<sup>2</sup>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <RiSofaLine className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {numberOfRoomsFloat}{" "}
                    {numberOfRoomsFloat > 1
                      ? t("properties.rooms")
                      : t("properties.room")}
                  </span>
                </div>
              </div>

              {/* Location and price */}
              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-0">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <FiMapPin className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {location.slice(0, 30)}
                  </span>
                </div>

                <h3 className="py-2 text-lg font-bold text-gray-600 capitalize sm:text-xl">
                  € {priceFloat}/
                  <span className="text-sm">{t("properties.month")}</span>
                </h3>
              </div>
            </div>
          </div>
          {/* Button */}
          <Link
            to={`/properties/${id}`}
            className="text-base font-medium text-white"
            onClick={handleStorePropertyId}
          >
            <Button size="lg" variant="yellowGradient" className="w-full">
              <span>{t("common.cardButton")}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertiesCard;
