import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiEye,
  FiFilter,
  FiHome,
  FiLayers,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

import axios from "../../../utils/axiosInstance";

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    type: "All",
  });

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      };

      if (filters.search) params.search = filters.search;
      if (filters.status !== "All") params.status = filters.status;
      if (filters.type !== "All") params.type = filters.type;

      const response = await axios.get("/properties", {
        params,
      });

      setProperties(response.data.properties);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        totalItems: response.data.pagination.totalItems,
        itemsPerPage: response.data.pagination.itemsPerPage,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [pagination.currentPage, filters]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Reset to first page when filters change
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Properties</h1>
        <p className="text-gray-600">Manage and view all property listings</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              placeholder="Search by title or location..."
            />
          </div>

          <div className="flex flex-wrap">
            <div className="flex items-center gap-3">
              <FiFilter className="mr-2 text-gray-400" />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              >
                <option value="All">All Status</option>
                <option value="Te huur">For Rent</option>
                <option value="Verhuurd">Rented</option>
                <option value="Inactief">Inactive</option>
              </select>

              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
              >
                <option value="All">All Types</option>
                <option value="Appartement">Apartment</option>
                <option value="Maisonnette">Maisonnette</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      {/* Properties Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        {loading ? (
          <div className="p-6 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchProperties}
              className="mt-2 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {properties.length > 0 ? (
                    properties.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img
                                className="h-16 w-16 rounded-md object-cover"
                                src={property.primaryImage}
                                alt={property.title}
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/150?text=No+Image";
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="line-clamp-1 text-sm font-medium text-gray-900">
                                <a
                                  href={property.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600"
                                >
                                  {property.title}
                                </a>
                              </div>
                              <div className="text-sm text-gray-500">
                                {property.location}
                              </div>
                              <div className="text-xs text-gray-400">
                                ID: {property.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {property.features?.numberOfRoomsFloat && (
                              <div className="flex items-center gap-2">
                                <FiHome className="text-gray-400" />
                                <span>
                                  {property.features.numberOfRoomsFloat} rooms
                                </span>
                              </div>
                            )}
                            {property.features?.surfaceAreaFloat && (
                              <div className="mt-1 flex items-center gap-2">
                                <FiLayers className="text-gray-400" />
                                <span>
                                  {property.features.surfaceAreaFloat} m²
                                </span>
                              </div>
                            )}
                            {property.otherDetails?.bouwjaar && (
                              <div className="mt-1 flex items-center gap-2">
                                <FiCalendar className="text-gray-400" />
                                <span>
                                  Built: {property.otherDetails.bouwjaar}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {property.price ||
                              property.otherDetails?.huurprijs ||
                              "-"}
                          </div>
                          {property.otherDetails?.servicekosten && (
                            <div className="text-xs text-gray-500">
                              + {property.otherDetails.servicekosten} service
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => alert(`View ${property.id}`)}
                            >
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => alert(`Edit ${property.id}`)}
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => alert(`Delete ${property.id}`)}
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FiSearch className="mb-4 h-12 w-12 text-gray-300" />
                          <h3 className="text-lg font-medium text-gray-900">
                            No properties found
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {filters.search ||
                            filters.status !== "All" ||
                            filters.type !== "All"
                              ? "Try adjusting your search or filter criteria"
                              : "There are currently no properties available"}
                          </p>
                          {(filters.search ||
                            filters.status !== "All" ||
                            filters.type !== "All") && (
                            <button
                              onClick={() =>
                                setFilters({
                                  search: "",
                                  status: "All",
                                  type: "All",
                                })
                              }
                              className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Keep your existing pagination component */}
            {/* Pagination */}
            {properties.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(pagination.currentPage - 1) *
                          pagination.itemsPerPage +
                          1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          pagination.currentPage * pagination.itemsPerPage,
                          pagination.totalItems,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {pagination.totalItems}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.max(1, pagination.currentPage - 1),
                          )
                        }
                        disabled={pagination.currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          let pageNumber;
                          if (pagination.totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (
                            pagination.currentPage >=
                            pagination.totalPages - 2
                          ) {
                            pageNumber = pagination.totalPages - 4 + i;
                          } else {
                            pageNumber = pagination.currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                                pagination.currentPage === pageNumber
                                  ? "z-10 border-blue-500 bg-blue-50 text-blue-600"
                                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        },
                      )}

                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(
                              pagination.totalPages,
                              pagination.currentPage + 1,
                            ),
                          )
                        }
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <FiChevronRight
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProperty;
