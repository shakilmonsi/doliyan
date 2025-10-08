import Button from "../../../components/ui/Button";
import { useLanguage } from "../../../hook/useLanguage";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="flex w-full flex-col bg-blue-950">
      {/* === Contact Section === */}
      <div className="mt-20 flex min-h-screen flex-col lg:flex-row">
        <div className="h-[250px] w-full lg:h-full lg:w-1/2">
          <img
            src="/image/new/img_12.jpeg"
            alt="contact"
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">
          <form className="w-full max-w-xl space-y-6">
            <div className="">
              <h2 className="mb-4 text-3xl font-semibold text-black md:text-4xl">
                {t("contact.title")}
              </h2>
              <p>{t("contact.description")}</p>
            </div>

            <hr className="border-0.5 border-gray-200" />

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex w-full flex-col">
                <label className="mb-1 text-sm text-black">
                  {t("contact.form.firstName.label")}
                </label>
                <input
                  type="text"
                  placeholder={t("contact.form.firstName.placeholder")}
                  className="w-full rounded bg-blue-50 px-4 py-3"
                />
              </div>
              <div className="flex w-full flex-col">
                <label className="mb-1 text-sm text-black">
                  {t("contact.form.lastName.label")}
                </label>
                <input
                  type="text"
                  placeholder={t("contact.form.lastName.placeholder")}
                  className="w-full rounded bg-blue-50 px-4 py-3"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">
                {t("contact.form.email.label")}
              </label>
              <input
                type="email"
                placeholder={t("contact.form.email.placeholder")}
                className="w-full rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">
                {t("contact.form.phone.label")}
              </label>
              <input
                type="tel"
                placeholder="+31 6 xxx xxx xx"
                className="w-full rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">
                {t("contact.form.message.label")}
              </label>
              <textarea
                rows="4"
                placeholder={t("contact.form.message.placeholder")}
                className="w-full resize-none rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <Button variant="yellowGradient" size="lg" className="w-full">
              {t("contact.form.submit")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
