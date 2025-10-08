import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";
import Modal from "../ui/Modal";
import { getCurrentUser } from "../../features/auth/authUtils";

const FavouriteIcon = ({ itemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.id === itemId);
  const user = getCurrentUser();

  const navigate = useNavigate();

  const handleClick = () => {
    if (user && user.id) {
      toggleFavorite(itemId);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleClick}>
        {isFavorite ? (
          <FaHeart className="text-blue-500" size={18} />
        ) : (
          <FaRegHeart className="text-blue-500" size={18} />
        )}
      </div>

      {/* Conditionally render modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          navigate("/auth/login");
          setIsOpen(false);
        }}
        title="⚠️ Login Required"
        cancelText="Cancel"
      >
        Please{" "}
        <Link to="/auth/login" className="text-blue-500 underline">
          Login
        </Link>{" "}
        to add this property to your favorites.
      </Modal>
    </>
  );
};

export default FavouriteIcon;
