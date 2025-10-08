// src/components/property/PropertyDetails.jsx
import { useState } from "react";

import clsx from "clsx";
import { FiHome, FiInfo, FiLayers, FiStar, FiTool } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { useLanguage } from "../../../../../hook/useLanguage";

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const PropertyDetails = ({ description, features, details, isPaidUser }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={clsx(
        isPaidUser
          ? "overflow-hidden md:col-span-2"
          : "h-96 overflow-hidden blur-sm md:col-span-2",
      )}
    >
      {/* Description */}
      <h2 className="mb-4 text-xl font-bold">{t("singleProperty.desc")}</h2>
      <div className="mb-6 text-base/8 whitespace-pre-line text-gray-700">
        <div
          className={`overflow-hidden text-justify transition-all duration-300 ${expanded ? "" : "max-h-32"}`}
        >
          {description || "No description available."}
        </div>
        <span
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          {expanded
            ? t("singleProperty.moreButton.less")
            : t("singleProperty.moreButton.more")}
        </span>
      </div>

      {/* Features */}
      <h2 className="mb-4 text-xl font-bold">
        {t("singleProperty.featureTitle")}
      </h2>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiLayers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs tracking-wider text-gray-500 uppercase">
              {t("singleProperty.feature.surface")}
            </p>
            <p className="text-md font-semibold text-gray-700">
              {features.surfaceAreaFloat || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiHome className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs tracking-wider text-gray-500 uppercase">
              {t("singleProperty.feature.rooms")}
            </p>
            <p className="text-md font-semibold text-gray-700">
              {features.numberOfRoomsFloat || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiTool className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs tracking-wider text-gray-500 uppercase">
              {t("singleProperty.feature.interior")}
            </p>
            <p className="text-md font-semibold text-gray-700">
              {features.interiorType || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiStar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs tracking-wider text-gray-500 uppercase">
              {t("singleProperty.feature.features")}
            </p>
            <p className="text-md font-semibold text-gray-700">Value</p>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <h2 className="mb-4 text-xl font-bold">
        {t("singleProperty.additionalDetails")}
      </h2>
      <div className="rounded-lg border border-gray-200">
        {Object.keys(details).length > 0 ? (
          <div className="divide-y divide-gray-200">
            {Object.entries(details).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <MdFilterList className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    {formatLabel(key)}
                  </span>
                </div>
                <span className="text-right whitespace-pre-line text-gray-500">
                  {value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FiInfo className="mb-2 h-8 w-8 text-gray-300" />
            <p className="text-gray-500">No details available</p>
            <p className="mt-1 text-sm text-gray-400">
              Additional information will appear here when available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
