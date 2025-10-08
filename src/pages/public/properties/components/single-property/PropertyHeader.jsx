// src/components/property/PropertyHeader.jsx
import { FiArrowLeft } from "react-icons/fi";
import ShareButtons from "../common/ShareButtons";
import { useLanguage } from "../../../../../hook/useLanguage";

const PropertyHeader = ({ title, location, createdAt, onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 text-yellow-600 hover:underline"
        >
          <FiArrowLeft /> {t("singleProperty.goback")}
        </button>
        <ShareButtons />
      </div>

      <h1 className="mb-2 text-lg font-bold md:text-3xl">{title}</h1>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 text-gray-400">
          <span className="w-5 text-gray-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <span className="text-xs text-gray-400 md:text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className="w-5 text-gray-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="text-xs text-gray-400 md:text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
