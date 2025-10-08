import { useLanguage } from "../../../hook/useLanguage";

const TermsAndConditions = () => {
  const { t } = useLanguage();

  return (
    <section>
      <header className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="https://images.ctfassets.net/02vwvgr6spsr/1lypQzQpqkcRBJkghohvJ1/6c92b5cf250bb55d7d3720904c8b7fdc/Adjusted_shutterstock-654822016.jpg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      </header>

      <main className="flex justify-center py-8 md:py-10 lg:py-12">
        <div className="w-[90vw] max-w-5xl sm:w-[70vw] lg:w-[80vw]">
          <h1 className="mb-4 text-2xl font-bold text-blue-400 sm:max-w-none md:text-4xl">
            {t("terms.title")}
          </h1>
          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.1.title")}
          </h3>
          <p className="mb-4">
            <strong> 1.1 :</strong> {t("terms.articles.1.points.1.1")}
          </p>
          <p className="mb-4">
            <strong> 1.2 :</strong> {t("terms.articles.1.points.1.2")}
          </p>
          <p className="mb-4">
            <strong> 1.3 :</strong> {t("terms.articles.1.points.1.3")}
          </p>
          <p className="mb-4">
            <strong> 1.4 :</strong> {t("terms.articles.1.points.1.4")}
          </p>
          <p className="mb-4">
            <strong> 1.5 :</strong> {t("terms.articles.1.points.1.5")}
          </p>

          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.2.title")}
          </h3>
          <p className="mb-4">{t("terms.articles.2.content")}</p>
          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.3.title")}
          </h3>
          <p className="mb-4">{t("terms.articles.3.content")}</p>
          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.4.title")}
          </h3>
          <p className="mb-4">
            <strong> 4.1 : </strong> {t("terms.articles.4.points.4.1")}
          </p>
          <p className="mb-4">
            <strong> 4.2 : </strong> {t("terms.articles.4.points.4.2")}
          </p>
          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.5.title")}
          </h3>
          <p className="mb-4">
            <strong> 5.1 : </strong> {t("terms.articles.5.points.5.1")}
          </p>
          <p className="mb-4">
            <strong> 5.2 : </strong> {t("terms.articles.5.points.5.2")}
          </p>
          <h3 className="mb-4 text-lg font-semibold underline md:text-xl">
            {t("terms.articles.6.title")}
          </h3>
          <p className="mb-4">
            <strong>6.1 : </strong> {t("terms.articles.6.points.6.1")}
          </p>
          <p className="mb-4">
            <strong>6.2 : </strong> {t("terms.articles.6.points.6.2")}
          </p>
          <p className="mb-4">
            <strong>6.3 : </strong> {t("terms.articles.6.points.6.3")}
          </p>
          <p className="mb-4">
            <strong>6.4 : </strong> {t("terms.articles.6.points.6.4")}
          </p>
          <p className="mb-4">
            <strong>6.5 : </strong> {t("terms.articles.6.points.6.5")}
          </p>
        </div>
      </main>
    </section>
  );
};

export default TermsAndConditions;
