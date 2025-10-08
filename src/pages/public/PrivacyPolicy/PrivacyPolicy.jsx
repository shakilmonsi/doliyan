import React from "react";
import { useLanguage } from "../../../hook/useLanguage";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <section>
      <header className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="https://stayinporta.com/vrp/rentals/ourplace_22.jpg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" />
      </header>

      <main className="flex justify-center py-8 md:py-10 lg:py-12">
        <div className="w-[90vw] max-w-5xl sm:w-[70vw] lg:w-[80vw]">
          <h1 className="mb-4 text-xl font-bold text-blue-400 sm:max-w-none md:text-4xl">
            {t("cookie.title")}
          </h1>
          <p>{t("cookie.intro")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.whatAreCookies.title")}
          </h3>
          <p>{t("cookie.whatAreCookies.description")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.necessaryCookies.title")}
          </h3>
          <p>{t("cookie.necessaryCookies.description")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.externalCookies.title")}
          </h3>
          <p>{t("cookie.externalCookies.description")}</p>

          <p>{t("cookie.externalCookies.note")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.blockCookies.title")}
          </h3>
          <p>{t("cookie.blockCookies.description")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.deleteCookies.title")}
          </h3>
          <p>{t("cookie.deleteCookies.description")}</p>
        </div>
      </main>
    </section>
  );
};

export default PrivacyPolicy;
