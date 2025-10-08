import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "EN", flag: "/image/lang/flags_us.png" },
  { code: "nl", name: "NL", flag: "/image/lang/flags_nl.png" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0],
  );

  const menuRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setSelected(lang);
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
    window.location.reload();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 inline-block text-left" ref={menuRef}>
      {/* Selected Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-transparent px-2 py-1 text-white transition"
      >
        <img src={selected.flag} alt={selected.name} className="h-5 w-5" />
        <span className="text-sm">{selected.name}</span>
        <svg
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-3 w-full rounded-md border border-gray-500 bg-[var(--color-card)] shadow-md">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 transition hover:rounded-sm hover:bg-[#3CAAFA] hover:text-white"
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="h-6 w-6 rounded-full border border-gray-600 object-cover"
              />
              <span className="text-sm text-white">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
