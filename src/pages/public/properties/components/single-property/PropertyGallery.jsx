// src/components/property/PropertyGallery.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

import { useLanguage } from "../../../../../hook/useLanguage";
import Modal from "../../../../../components/ui/Modal";
import SubscriptionCard from "./SubscriptionCard";

const ifNotImg = "/image/random/fallback.jpg";

const PropertyGallery = ({ media, user, isPaidUser, plans }) => {
  const { t } = useLanguage();
  const [mainImage, setMainImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isPaidUser) setIsOpen(true);
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <img
          src={media?.[mainImage]?.url || ifNotImg}
          alt="Main property"
          className="h-96 w-full rounded-lg object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {(media || []).slice(0, 4).map((img, idx) => {
          return (
            <div key={idx} className="relative">
              {isPaidUser ? (
                <img
                  src={img.url}
                  alt={`Gallery ${idx}`}
                  onClick={() => setMainImage(idx)}
                  className={`h-44 w-full cursor-pointer rounded-lg object-cover ring-2 ${
                    mainImage === idx ? "ring-gray-200" : "ring-gray-200"
                  }`}
                />
              ) : (
                <div
                  className="relative h-44 cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                  style={{
                    backgroundImage: `url(/image/fallback1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={handleClick}
                >
                  <div className="absolute inset-0 bg-slate-50 opacity-80"></div>
                  <div className="relative z-10 flex h-full flex-col items-center justify-center">
                    <FaLock size={18} className="text-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">
                      {t("auth.payment.vast")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={user ? "xl" : "sm"}
      >
        {user ? (
          <SubscriptionCard plans={plans} />
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-700">
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="font-semibold text-blue-600 underline"
              >
                {t("auth.payment.modal.firstText")}
              </Link>{" "}
              {t("auth.payment.modal.secondText")}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PropertyGallery;
