import { useEffect, useRef, useState } from "react";
import {
  FiHome,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FavouriteCoutingIcon from "../../components/FavouriteCoutingIcon/FavouriteCoutingIcon";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";
import { getCurrentUser, logout } from "../../features/auth/authUtils";
import { useLanguage } from "../../hook/useLanguage";

function MainHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { setFavorites } = useFavorites();

  const navigate = useNavigate();
  const { t } = useLanguage();

  const isUserPaid = getCurrentUser();

  const dropdownTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  const logOutHandler = () => {
    logout();
    setFavorites([]);
    toast.info(t("auth.toastMessage.logoutMessage"));
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#082e63]" : "bg-black/10 shadow-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/image/logos/Transparent_logo_white.png"
            alt="Logo"
            className="w-25 md:w-30 lg:w-35"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 font-medium text-white text-shadow-2xs md:flex">
          <MenuLink to="/">{t("header.home")}</MenuLink>
          <MenuLink to="/properties">{t("header.property")}</MenuLink>
          <MenuLink to="/about">{t("header.about")}</MenuLink>
          <MenuLink to="/contact">{t("header.contact")}</MenuLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <button className="flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 p-1 text-black transition hover:shadow-md md:p-2">
            <FavouriteCoutingIcon />
          </button>

          {/* Desktop Profile Dropdown */}
          <div
            className="relative hidden md:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-black transition hover:shadow-md">
              <FiUser className="text-xl" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 z-50 w-44 rounded-md bg-white text-black shadow-md">
                {isUserPaid ? (
                  <>
                    <DropdownItem to="/my-profile" icon={<FiUser />}>
                      {t("header.profile")}
                    </DropdownItem>
                    <button
                      onClick={logOutHandler}
                      className="flex w-full items-center gap-2 rounded-b-lg px-4 py-2 text-left transition hover:bg-[#3CAAFA] hover:text-white"
                    >
                      <FiLogOut />
                      {t("header.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <DropdownItem to="/auth/login" icon={<FiLogIn />}>
                      {t("header.login")}
                    </DropdownItem>
                    <DropdownItem to="/auth/register" icon={<FiUserPlus />}>
                      {t("header.register")}
                    </DropdownItem>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className="text-2xl text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="absolute top-[63px] -mt-3 w-full space-y-4 bg-black/90 px-4 py-6 text-white backdrop-blur-sm transition-all duration-300 md:hidden">
          <MenuLink to="/" icon={<FiHome />} onClick={() => setMenuOpen(false)}>
            {t("header.home")}
          </MenuLink>
          <MenuLink
            to="/properties"
            icon={<FiShoppingBag />}
            onClick={() => setMenuOpen(false)}
          >
            {t("header.property")}
          </MenuLink>
          <MenuLink
            to="/about"
            icon={<FiInfo />}
            onClick={() => setMenuOpen(false)}
          >
            {t("header.about")}
          </MenuLink>
          <MenuLink
            to="/contact"
            icon={<FiMail />}
            onClick={() => setMenuOpen(false)}
          >
            {t("header.contact")}
          </MenuLink>
          {isUserPaid ? (
            <>
              <MenuLink
                to="/my-profile"
                icon={<FiUser />}
                onClick={() => setMenuOpen(false)}
              >
                {t("header.profile")}
              </MenuLink>
              <button
                onClick={() => {
                  logOutHandler();
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 hover:text-[#3CAAFA]"
              >
                <FiLogOut />
                {t("header.logout")}
              </button>
            </>
          ) : (
            <>
              <MenuLink
                to="/auth/login"
                icon={<FiLogIn />}
                onClick={() => setMenuOpen(false)}
              >
                {t("header.login")}
              </MenuLink>
              <MenuLink
                to="/auth/register"
                icon={<FiUserPlus />}
                onClick={() => setMenuOpen(false)}
              >
                {t("header.register")}
              </MenuLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}

// 🔁 Reusable Menu Link
const MenuLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 transition hover:text-[#39547a]"
  >
    {icon}
    {children}
  </Link>
);

// 🔁 Reusable Dropdown Item
const DropdownItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded px-4 py-2 transition hover:rounded-sm hover:bg-[#082e63] hover:text-white"
  >
    {icon}
    {children}
  </Link>
);

export default MainHeader;
