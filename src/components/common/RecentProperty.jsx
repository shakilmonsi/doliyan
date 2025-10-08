import React from "react";
import { LiaBedSolid } from "react-icons/lia";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../hook/useLanguage";

const ifNotImg = "/image/random/fallback.jpg";

const RecentProperty = ({ item }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div
      onClick={() => navigate(`/properties/${item.id}`)}
      className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
    >
      <img
        src={item.media?.[0]?.url || ifNotImg}
        alt={item.title}
        className="h-48 w-full object-cover"
      />
      {/* Details */}
      <div className="bg-white p-4">
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-500">
            {item.title.slice(0, 30)}
          </h3>
          <p className="text-sm text-neutral-400">
            {item.location.slice(0, 35)}...
          </p>
        </div>

        {/* Features */}
        <div className="mb-4 flex justify-between">
          <div className="text-center">
            <div className="flex justify-center">
              {/* Bed Icon */}
              <LiaBedSolid className="text-gray-400" />
            </div>
            <span className="text-sm text-neutral-400">
              {item.features.numberOfRoomsFloat || "Beds"}
            </span>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              {/* Area Icon */}
              <TfiRulerAlt2 className="text-gray-400" />
            </div>
            <span className="font-dm-sans text-sm text-neutral-400">
              {item.features.surfaceAreaFloat || "Area"}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="border-opacity-40 flex items-center justify-between border-t border-neutral-200 pt-4">
          <div className="text-right">
            <h3 className="font-dm-sans text-base font-bold text-gray-600">
              € {item.priceFloat}/
              <span className="text-sm">{t("properties.month")}</span>
            </h3>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            {t("home.recent.viewDetails")}
          </a>
        </div>

        {/* CTA */}
      </div>
    </div>
  );
};

export default RecentProperty;
