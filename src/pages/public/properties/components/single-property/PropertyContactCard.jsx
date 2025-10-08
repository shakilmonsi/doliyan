import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";

import Modal from "../../../../../components/ui/Modal";
import Button from "../../../../../components/ui/Button";
import { useLanguage } from "../../../../../hook/useLanguage";
import SubscriptionCard from "./SubscriptionCard";

const PropertyContactCard = ({ url, isPaidUser, user, plans }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isPaidUser) setIsOpen(true);
  };

  return (
    <div className="sticky top-20 h-fit rounded-lg bg-slate-50 p-6">
      <h3 className="mb-4 text-center text-xl font-bold">
        {t("singleProperty.agent.title")}
      </h3>
      <hr className="mb-4 border-gray-100" />

      {isPaidUser ? (
        <div className="space-y-4">
          <a
            href={url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3CAAFA] to-[#1198fa] px-4 py-4 text-white shadow transition-transform hover:scale-95"
          >
            <BiLinkAlt size={20} />
            <span className="text-lg font-bold">
              {t("singleProperty.agent.contact")}
            </span>
          </a>
        </div>
      ) : (
        <div className="relative flex h-44 flex-col items-center justify-center">
          <span
            className="cursor-pointer rounded-full bg-slate-100 p-4"
            onClick={handleClick}
          >
            <FaLock size={18} className="text-gray-300" />
          </span>
          <p className="mt-2 text-gray-400">{t("header.access")}</p>

          <Button
            onClick={handleClick}
            className="mt-4"
            variant="yellowGradient"
            size="md"
          >
            {t("auth.payment.title")}
          </Button>
        </div>
      )}

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

export default PropertyContactCard;
