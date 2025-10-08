import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";
import { getCurrentUser } from "../../features/auth/authUtils.js";

const FavouriteCoutingIcon = () => {
  const user = getCurrentUser();
  const { favorites } = useFavorites(); // Access the favorites array
  const nevigate = useNavigate();
  return (
    <div
      onClick={() => {
        !user ? nevigate("/auth/login") : nevigate("/favourite");
      }}
      className="relative cursor-pointer"
    >
      {/* Show favorite count */}
      {favorites.length > 0 && (
        <p className="absolute -top-4 left-3 rounded-full bg-blue-500 p-0.5 px-[7px] text-xs font-bold text-gray-100 shadow">
          {favorites.length}
        </p>
      )}

      {/* Heart icon */}
      {favorites.length > 0 ? (
        <FaHeart className="text-blue-500" size={18} />
      ) : (
        <FaRegHeart />
      )}
    </div>
  );
};

export default FavouriteCoutingIcon;
