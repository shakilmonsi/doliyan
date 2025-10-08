import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FavoriteContext } from "./FavouriteContext.jsx";
import axios from "../../utils/axiosInstance.js";
import { STORAGE } from "../../utils/storage.js";

export const FavoriteProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Check and set user on mount + listen to logout from other tabs
  useEffect(() => {
    const parsedUserInfo = STORAGE.getUser();
    // Handle different data structures that might be returned from storage
    const userData = parsedUserInfo?.data || parsedUserInfo;
    setUser(userData || null);

    const handleStorageChange = () => {
      const updatedUserInfo = STORAGE.getUser();
      const updatedUserData = updatedUserInfo?.data || updatedUserInfo;
      if (!updatedUserInfo) {
        setUser(null);
        setFavorites([]);
      } else {
        setUser(updatedUserData);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Helper: check login before actions
  const checkLogin = () => {
    const info = STORAGE.getToken();
    if (!info) {
      setUser(null);
      setFavorites([]);
      navigate("/auth/login");
      return false;
    }
    return true;
  };

  // ✅ Fetch favorites from DB once user is known
  useEffect(() => {
    const fetchFavoritesFromDB = async () => {
      if (!user) {
        setIsLoading(false);
        setFavorites([]);
        return;
      }

      try {
        const { data } = await axios.get(`/favorites/getFavorites`);

        setFavorites(data || []);
      } catch (error) {
        console.error("Error fetching favorites from DB:", error);
        toast.error("Failed to load favorites from the database!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritesFromDB();
  }, [user]);

  // ✅ Toggle favorite (add/remove) with notifications
  const toggleFavorite = async (itemId) => {
    if (!checkLogin()) return;

    // Get current user to ensure we have the most up-to-date user info
    const currentUser = STORAGE.getUser();
    const userData = currentUser?.data || currentUser;

    if (!userData || !userData.id) {
      toast.error("User not found. Please log in again.");
      navigate("/auth/login");
      return;
    }

    const isAlreadyFavorite = favorites.some((item) => item.id === itemId);
    console.log("Is already favorite:", isAlreadyFavorite);
    const endpoint = isAlreadyFavorite ? "removeFavorite" : "addFavorite";
    const actionText = isAlreadyFavorite ? "removed item" : "item added";

    try {
      // Step 1: Toggle favorite (add/remove)
      await axios.post(`/favorites/${endpoint}`, {
        propertyId: itemId,
        userId: userData.id,
      });

      // Step 2: Refresh favorites
      const { data } = await axios.get(`/favorites/getFavorites`);
      setFavorites(data || []);
      toast.success(`${actionText}!`);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || `Failed to ${actionText} favorites`;
      toast.error(errorMessage);
      console.error(`Error toggling favorite:`, error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, isLoading, setFavorites, setUser }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
