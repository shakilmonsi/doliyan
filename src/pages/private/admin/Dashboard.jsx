import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiClock,
  FiDollarSign,
  FiHome,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import axios from "../../../utils/axiosInstance";
import { getCurrentUser } from "../../../features/auth/authUtils";
import { STORAGE } from "../../../utils/storage";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    activeListings: 0,
    averagePrice: 0,
    revenue: 0,
  });

  const [recentProperties, setRecentProperties] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = STORAGE.getToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // In a real app, you might have a dedicated dashboard endpoint
      // For this example, we'll fetch separately
      const [propertiesRes, usersRes] = await Promise.all([
        axios.get("/properties", config),
        axios.get("/users", config),
      ]);

      const paginate = propertiesRes.data.pagination || [];
      const properties = propertiesRes.data.properties || [];
      const users = usersRes.data.data.users || [];

      // Calculate stats
      const activeListings = properties.filter(
        (p) => p.transferDetails?.Status === "Te huur",
      ).length;

      const prices = properties.map((p) => {
        const match = (p.transferDetails?.Huurprijs || p.price).match(
          /€\s*([\d,.]+)/,
        );
        return match ? parseFloat(match[1].replace(",", "")) : 0;
      });

      const avgPrice =
        prices.length > 0
          ? prices.reduce((sum, price) => sum + price, 0) / prices.length
          : 0;

      setStats({
        totalProperties: paginate.totalItems,
        revenue: avgPrice * activeListings,
        totalUsers: users.length,
        averagePrice: avgPrice,
        activeListings,
      });

      // Get recent items
      setRecentProperties(properties.slice(0, 5));
      setRecentUsers(users.slice(0, 5));
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Key metrics and recent activity for your rental platform
          </p>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="mb-6 border-l-4 border-red-400 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={fetchDashboardData}
                  className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center">
                  <div className="mr-4 rounded-lg bg-blue-100 p-3 text-blue-600">
                    <FiHome size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Properties
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {stats.totalProperties}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FiTrendingUp className="mr-1" />
                  <span>12% from last month</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center">
                  <div className="mr-4 rounded-lg bg-green-100 p-3 text-green-600">
                    <FiActivity size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Active Listings
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {stats.activeListings}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FiTrendingUp className="mr-1" />
                  <span>8% from last month</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center">
                  <div className="mr-4 rounded-lg bg-purple-100 p-3 text-purple-600">
                    <FiDollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Avg. Price
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {formatCurrency(stats.averagePrice)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FiTrendingUp className="mr-1" />
                  <span>5% from last month</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center">
                  <div className="mr-4 rounded-lg bg-yellow-100 p-3 text-yellow-600">
                    <FiUsers size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Users
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FiTrendingUp className="mr-1" />
                  <span>15% from last month</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center">
                  <div className="mr-4 rounded-lg bg-red-100 p-3 text-red-600">
                    <FiStar size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-semibold text-gray-800">
                      {formatCurrency(stats.revenue)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FiTrendingUp className="mr-1" />
                  <span>10% from last month</span>
                </div>
              </div>
            </div>

            {/* Property Status Chart */}
            {/* <div className="mb-8 rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center text-lg font-medium text-gray-800">
                  <FiClock className="mr-2 text-blue-600" /> Property Status
                  Overview
                </h3>
                <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">
                  Chart visualization would appear here
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">For Rent</p>
                  <p className="text-lg font-semibold text-blue-600">42</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rented</p>
                  <p className="text-lg font-semibold text-green-600">28</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inactive</p>
                  <p className="text-lg font-semibold text-gray-600">15</p>
                </div>
              </div>
            </div> */}

            {/* Recent Activity */}
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Recent Properties */}
              <div className="overflow-hidden rounded-xl bg-white shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="flex items-center text-lg font-medium text-gray-800">
                    <FiHome className="mr-2 text-blue-600" /> Recent Properties
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <div
                        key={property.id}
                        className="p-4 transition hover:bg-gray-50"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 h-12 w-12 flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-md object-cover"
                              src={property.primaryImage}
                              alt={property.title}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {property.title}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {property.location}
                            </p>
                            <div className="mt-1 flex items-center">
                              <span
                                className={`rounded-full px-2 py-1 text-xs ${
                                  property.transferDetails?.Status === "Te huur"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {property.transferDetails?.Status ||
                                  "Available"}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                {property.transferDetails?.Huurprijs ||
                                  property.price}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 text-xs text-gray-500">
                            {formatDate(property.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No recent properties found
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link
                    to="/admin/properties/all"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all properties →
                  </Link>
                </div>
              </div>

              {/* Recent Users */}
              <div className="overflow-hidden rounded-xl bg-white shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="flex items-center text-lg font-medium text-gray-800">
                    <FiUsers className="mr-2 text-purple-600" /> Recent Users
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 transition hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                            {user.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <div className="ml-4 flex flex-col items-end">
                            <span
                              className={`mb-1 rounded-full px-2 py-1 text-xs ${
                                user.role === "ADMIN"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role}
                            </span>
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                user.ispaid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {user.ispaid ? "Paid" : "Free"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No recent users found
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link
                    to="/admin/users"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all users →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <button className="rounded-xl border border-transparent bg-white p-6 text-left shadow transition hover:border-blue-200 hover:bg-blue-50">
                <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-600">
                  <FiHome size={20} />
                </div>
                <h4 className="text-md mb-1 font-medium text-gray-800">
                  Add New Property
                </h4>
                <p className="text-sm text-gray-500">
                  List a new rental property
                </p>
              </button>

              <button className="rounded-xl border border-transparent bg-white p-6 text-left shadow transition hover:border-purple-200 hover:bg-purple-50">
                <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3 text-purple-600">
                  <FiUsers size={20} />
                </div>
                <h4 className="text-md mb-1 font-medium text-gray-800">
                  Add New User
                </h4>
                <p className="text-sm text-gray-500">
                  Create a new admin or user
                </p>
              </button>

              <button className="rounded-xl border border-transparent bg-white p-6 text-left shadow transition hover:border-green-200 hover:bg-green-50">
                <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3 text-green-600">
                  <FiDollarSign size={20} />
                </div>
                <h4 className="text-md mb-1 font-medium text-gray-800">
                  View Revenue
                </h4>
                <p className="text-sm text-gray-500">See financial reports</p>
              </button>

              <button className="rounded-xl border border-transparent bg-white p-6 text-left shadow transition hover:border-yellow-200 hover:bg-yellow-50">
                <div className="mb-4 inline-flex rounded-lg bg-yellow-100 p-3 text-yellow-600">
                  <FiActivity size={20} />
                </div>
                <h4 className="text-md mb-1 font-medium text-gray-800">
                  View Analytics
                </h4>
                <p className="text-sm text-gray-500">
                  See platform performance
                </p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
