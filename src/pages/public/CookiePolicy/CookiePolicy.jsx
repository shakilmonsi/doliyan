import { useLanguage } from "../../../hook/useLanguage";

const CookiePolicy = () => {
  const { t } = useLanguage();

  return (
    <section>
      <header className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="https://waas.imgix.net/https%3A%2F%2Fwww.northwooduk.com%2Fwp-content%2Fuploads%2F2023%2F12%2Frental-income.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fm=webp%2Cjpg&h=507&ixlib=php-2.1.1&or=0&q=60&w=1920&s=955a9677488ff8362ebb540646c46f89"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      </header>

      <div className="flex justify-center py-8 md:py-10 lg:py-12">
        <div className="w-[90vw] max-w-5xl space-y-4 sm:w-[70vw] lg:w-[80vw]">
          {/* Translated content */}
          <h1 className="mb-4 text-xl font-bold text-blue-400 sm:max-w-none md:text-4xl">
            {" "}
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
            {t("cookie.statsCookies.title")}
          </h3>
          <p>{t("cookie.statsCookies.description")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.externalCookies.title")}
          </h3>
          <p>{t("cookie.externalCookies.description")}</p>
          <p>{t("cookie.externalCookies.note")}</p>

          <h3 className="my-4 text-lg font-bold text-blue-400 md:text-xl">
            {t("cookie.cookieOverview.title")}
          </h3>
          <p>{t("cookie.cookieOverview.description")}</p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
