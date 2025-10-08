import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hook/useLanguage";

const MainFooter = () => {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative w-full bg-[url('/image/new/img_9.jpeg')] bg-cover bg-center bg-no-repeat py-10 md:py-20">
        <div className="absolute inset-0 bg-purple-900/40 backdrop-brightness-75" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-2">
          <div className="flex max-w-3xl flex-col items-center gap-2 text-center md:gap-8">
            <h2 className="text-2xl leading-tight font-bold text-white capitalize md:text-5xl">
              {t("footer.register.title")}
            </h2>
            <p className="text-white md:text-lg">{t("footer.register.desc")}</p>

            <Link to="/properties">
              <Button
                size="lg"
                variant="yellowGradient"
                className="rounded-full"
              >
                {t("footer.register.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#082e63] px-4 pt-10 md:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img
              src="/image/logos/Transparent_logo_white.png"
              alt="logo"
              className="w-40"
            />
            <p className="text-white/80">{t("footer.logo")}</p>
          </div>

          {/* Quick Links */}
          <div className="px-0 md:px-10">
            <h3 className="mb-4 text-white">{t("footer.quick.link")}</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/">{t("footer.quick.home")}</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="about">{t("footer.quick.about")}</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="">
            <h3 className="mb-4 text-white">{t("footer.company.link")}</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/terms-and-conditions">
                  {t("footer.company.terms")}
                </Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/privacy-policy">{t("footer.company.privacy")}</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/cookie-policy">{t("footer.company.cookie")}</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white">Social Link</h3>

            <div className="flex gap-3">
              <FaFacebookF
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
              <FaTwitter
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
              <FaInstagram
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="">
          <hr className="border-0.5 mt-10 mb-4 border-white/10" />

          <p className="mb-4 text-center text-xs text-white/60 md:text-sm">
            {t("footer.copyRight")}
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
