import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFounds = ({
  icon = <FiSearch className="h-8 w-8 text-gray-400" />,
  title = "No Properties Found",
  message = "We couldn't find any properties matching your criteria. Try adjusting your filters or search in a different location.",
  buttonText = "Go Back",
  buttonLink = "",
  onButtonClick = null,
  customButton = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-4 py-8 text-center">
      <div className="rounded-full bg-gray-100 p-4">{icon}</div>
      <div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
        <p className="max-w-md text-red-400">{message}</p>
      </div>

      {customButton ? (
        customButton
      ) : (
        <Link
          to={buttonLink}
          onClick={onButtonClick}
          className="rounded-md bg-gradient-to-r from-[#3CAAFA] to-[#1198fa] px-3 py-2 text-sm text-white shadow transition-transform hover:scale-95 hover:from-[#1a8adb] hover:to-[#0278d9]"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default NotFounds;
