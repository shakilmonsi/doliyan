// src/hooks/usePropertyData.js
import { useState, useEffect } from "react";
import axios from "../../../../utils/axiosInstance";

export const usePropertyData = (id) => {
  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const propertyRes = await axios.get(`/properties/search/${id}`);
        const listingData = propertyRes?.data?.data?.property;

        setListing(listingData);

        const recentRes = await axios.get(`/properties`);
        const filteredRecent = recentRes?.data?.properties
          .filter((item) => item.id !== parseInt(id))
          .slice(0, 4);

        setRecent(filteredRecent);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { listing, recent, isLoading };
};
