import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaFolder,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../../features/auth/authUtils";
import { toast } from "react-toastify";

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  hasChildren,
  isOpen,
  onClick,
  chevronIcon: ChevronIcon,
}) => (
  <li>
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${
          active ? "text-indigo-500" : "text-gray-400"
        }`}
      />
      <span className="flex-1 text-left">{label}</span>
      {hasChildren && (
        <span className="ml-2">
          <ChevronIcon className="h-4 w-4 text-gray-400" />
        </span>
      )}
    </button>
  </li>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  // Unified navigation handler
  const handleNavigation = (path, itemName) => {
    setActiveItem(itemName);
    navigate(path);
  };

  const logOutHandler = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/auth/login", { replace: true });
  };

  const menuItems = [
    {
      icon: FaHome,
      label: "Dashboard",
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: FaUsers,
      label: "Users",
      name: "Users",
      path: "/admin/users",
    },
    {
      icon: FaFolder,
      label: "Properties",
      name: "Properties",
      path: "/admin/properties",
      children: [
        {
          label: "All Properties",
          name: "All Properties",
          path: "/admin/properties/all",
        },
      ],
    },
    {
      icon: FaCog,
      label: "Settings",
      name: "Settings",
      path: "/admin/profile",
    },
  ];

  return (
    <div className="hidden h-screen w-64 flex-col border-r border-gray-200 bg-white md:flex">
      {/* Logo/Brand */}
      <div className="flex h-[65px] items-center border-b border-gray-200 px-6">
        <img
          src="/image/logos/Transparent_logo_black.png"
          alt="logo"
          className="w-35"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={activeItem === item.name}
                hasChildren={!!item.children}
                isOpen={openItems[item.name]}
                chevronIcon={
                  openItems[item.name] ? FaChevronDown : FaChevronRight
                }
                onClick={() => {
                  if (item.children) {
                    toggleItem(item.name);
                  } else {
                    handleNavigation(item.path, item.name);
                  }
                }}
              />

              {item.children && openItems[item.name] && (
                <ul className="mt-1 ml-8 space-y-1">
                  {item.children.map((child) => (
                    <SidebarItem
                      key={child.name}
                      icon={FaChevronRight}
                      label={child.label}
                      active={activeItem === child.name}
                      onClick={() => handleNavigation(child.path, child.name)}
                    />
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logOutHandler}
          className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
