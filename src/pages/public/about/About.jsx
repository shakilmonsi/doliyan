import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import Button from "../../../components/ui/Button";
import { useLanguage } from "../../../hook/useLanguage";

const About = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const howWorks = t("home.howworks", { returnObjects: true }) || [];
  const faqData = t("about.faq.item", { returnObjects: true }) || [];

  if (!Array.isArray(howWorks) || !Array.isArray(faqData)) {
    return null; // or show a proper error/fallback UI
  }

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="flex w-full flex-col">
      {/* === Background Section === */}
      <section className="relative h-[400px] w-full md:h-[600px]">
        {/* Background Image */}
        <img
          src="/image/new/img_10.jpeg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />

        {/* Centered Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-lato max-w-[676px] text-3xl leading-tight font-semibold text-white capitalize md:mb-6 md:text-6xl">
            {t("about.hero.title1")} <br />
            <span className="text-[#3CAAFA]">{t("about.hero.title2")}</span>
          </h1>
          <p className="font-inter max-w-4xl leading-normal font-normal text-white md:text-xl">
            {t("about.hero.desc")}
          </p>
        </div>
      </section>

      {/* How to Works Section */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,_#FFFEEB,_#E9F6FF)] px-6 py-10 md:py-16">
        {/* Decorative Rotated Images */}
        <img
          className="absolute top-0 -left-[464px] h-64 w-[928px] rotate-90"
          src="/image/random/png-wing-2.png"
          alt="decor-top"
        />
        <img
          className="absolute -right-[404px] bottom-0 h-64 w-[928px] -rotate-90"
          src="/image/random/png-wing-2.png"
          alt="decor-bottom"
        />
        <img
          className="absolute top-0 left-1/2 h-[654px] w-[875px] -translate-x-1/2 object-contain"
          src="/image/random/png-wing-2.png"
          alt="main-illustration"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl capitalize md:text-4xl">
              {t("home.work.title")}
            </h2>
            <p className="text-base font-normal text-black">
              {t("home.work.desc")}
            </p>
          </div>

          {/* Steps */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {howWorks.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 rounded-lg bg-white px-4 py-8 shadow-sm md:px-6 md:py-16"
              >
                <div className="font-lato flex h-14 w-14 items-center justify-center rounded bg-[#082e63] text-2xl font-medium text-white">
                  {idx + 1}
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-lato text-xl font-semibold text-black capitalize">
                    {step.title}
                  </h3>
                  <p className="font-inter font-normal text-black">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Why Choose Us Section === */}
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 py-16 md:gap-12 md:px-0 lg:flex-row">
        {/* Right Image with Custom Clip Path */}
        <div className="w-full max-w-[589px] px-4">
          <img
            src="image/about/Subtract.png"
            alt="Why Choose Us"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="w-full space-y-4 px-4 md:space-y-8 lg:w-1/2">
          <h2 className="font-lato text-2xl font-semibold text-gray-900 capitalize md:text-4xl">
            {t("about.whyChoose.title")}
          </h2>
          <p className="font-inter text-base leading-relaxed font-normal text-gray-700">
            {t("about.whyChoose.desc")}
          </p>

          <Button size="lg" variant="yellowGradient" className="">
            {t("about.whyChoose.button")}
          </Button>
        </div>
      </section>

      {/* === FAQ Section === */}
      <div className="w-full bg-slate-50 px-4 py-10 md:px-12 lg:px-24 lg:py-26">
        <h2 className="font-lato mb-4 text-3xl font-semibold text-gray-600 capitalize md:mb-10 md:text-center md:text-4xl">
          {t("about.faq.title")}
        </h2>

        <div className="mx-auto max-w-4xl divide-y divide-gray-200">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-2 md:py-4">
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full cursor-pointer items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <p className="font-bold text-gray-600 md:text-lg lg:text-xl">
                    {item.title}
                  </p>

                  <span className="text-xl text-black">
                    {isOpen ? <FiX /> : <FiPlus />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="leading-relaxed text-gray-500 lg:text-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
