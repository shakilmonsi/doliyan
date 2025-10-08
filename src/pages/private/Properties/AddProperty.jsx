import React, { useState } from "react";
import {
  FiHome,
  FiMapPin,
  FiLayers,
  FiImage,
  FiDollarSign,
  FiUser,
  FiCheck,
  FiChevronRight,
  FiChevronLeft,
  FiUpload,
  FiX,
} from "react-icons/fi";
import {
  FaSwimmingPool,
  FaCar,
  FaWifi,
  FaSnowflake,
  FaTv,
} from "react-icons/fa";
import { GiElevator, GiSecurityGate } from "react-icons/gi";
import { MdBalcony, MdLocalLaundryService, MdPets } from "react-icons/md";

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    propertyType: "",
    status: "For Rent",

    // Location
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Netherlands",
    neighborhood: "",
    latitude: "",
    longitude: "",

    // Details
    bedrooms: "",
    bathrooms: "",
    size: "",
    yearBuilt: "",
    floors: "",
    furnished: "No",

    // Amenities
    amenities: [],

    // Pricing
    price: "",
    currency: "EUR",
    priceLabel: "per month",
    deposit: "",
    utilities: "",
    taxes: "",

    // Media
    featuredImage: null,
    gallery: [],
    virtualTour: "",

    // Contact
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactCompany: "",
  });

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Condo",
    "Townhouse",
    "Studio",
    "Penthouse",
    "Loft",
    "Duplex",
    "Bungalow",
    "Cottage",
    "Farmhouse",
  ];

  const statusOptions = ["For Rent", "For Sale", "Rented", "Sold"];

  const amenities = [
    { name: "Swimming Pool", icon: <FaSwimmingPool /> },
    { name: "Parking", icon: <FaCar /> },
    { name: "Elevator", icon: <GiElevator /> },
    { name: "Security", icon: <GiSecurityGate /> },
    { name: "WiFi", icon: <FaWifi /> },
    { name: "AC", icon: <FaSnowflake /> },
    { name: "TV", icon: <FaTv /> },
    { name: "Balcony", icon: <MdBalcony /> },
    { name: "Laundry", icon: <MdLocalLaundryService /> },
    { name: "Pets Allowed", icon: <MdPets /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const setFeaturedImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [featured] = newImages.splice(index, 1);
      return [featured, ...newImages];
    });
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.title ||
          !formData.propertyType ||
          !formData.description
        ) {
          alert("Please fill in all required fields");
          return false;
        }
        return true;
      case 2:
        if (!formData.address || !formData.city || !formData.postalCode) {
          alert("Please fill in all required location fields");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log("Property submitted:", { ...formData, images });
      alert("Property added successfully!");
      // Here you would typically send the data to your backend
    }
  };

  const StepIndicator = () => (
    <div className="mb-8 flex items-center justify-between">
      {[1, 2, 3, 4, 5].map((stepNumber) => (
        <div key={stepNumber} className="flex flex-1 flex-col items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${step === stepNumber ? "bg-blue-600 text-white" : step > stepNumber ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}
          >
            {step > stepNumber ? <FiCheck size={20} /> : stepNumber}
          </div>
          <span
            className={`mt-2 text-xs ${step === stepNumber ? "font-bold text-blue-600" : "text-gray-500"}`}
          >
            {stepNumber === 1 && "Basic Info"}
            {stepNumber === 2 && "Location"}
            {stepNumber === 3 && "Details"}
            {stepNumber === 4 && "Media"}
            {stepNumber === 5 && "Pricing"}
          </span>
          {stepNumber < 5 && (
            <div
              className={`mx-2 mt-5 hidden h-1 flex-1 sm:block ${step > stepNumber ? "bg-green-100" : "bg-gray-200"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Add New Property</h1>
          <p className="text-blue-100">
            Fill in the details to list your property
          </p>
        </div>

        {/* Progress Steps */}
        <div className="px-8 pt-6">
          <StepIndicator />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <FiHome className="mr-2 text-blue-600" /> Basic Information
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Property Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Beautiful 3-bedroom apartment in city center"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Property Type*
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your property in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status*
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Furnished
                  </label>
                  <select
                    name="furnished"
                    value={formData.furnished}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Partially">Partially</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <FiMapPin className="mr-2 text-blue-600" /> Location Details
              </h2>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Street name and number"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Country*
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Neighborhood
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="District or area name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="52.370216"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="4.895168"
                  />
                </div>
              </div>

              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">Map Preview Will Appear Here</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <FiLayers className="mr-2 text-blue-600" /> Property Details
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bedrooms*
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bathrooms*
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Size (m²)*
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Floors
                  </label>
                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Garage
                  </label>
                  <select
                    name="garage"
                    value={formData.garage}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="None">None</option>
                    <option value="1">1 space</option>
                    <option value="2">2 spaces</option>
                    <option value="3+">3+ spaces</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      onClick={() => handleAmenityChange(amenity.name)}
                      className={`flex cursor-pointer items-center rounded-lg border p-3 transition ${formData.amenities.includes(amenity.name) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <span
                        className={`mr-2 ${formData.amenities.includes(amenity.name) ? "text-blue-600" : "text-gray-500"}`}
                      >
                        {amenity.icon}
                      </span>
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <FiImage className="mr-2 text-blue-600" /> Media
              </h2>

              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FiUpload className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload property images
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG up to 10MB each
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    First image will be used as featured image
                  </p>
                  <div className="mt-4">
                    <label className="cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition focus-within:outline-none hover:bg-blue-500">
                      Select Files
                      <input
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {images.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700">
                    Uploaded Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="h-40 w-full rounded-lg object-cover"
                        />
                        <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black transition">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                          {index === 0 ? (
                            <span className="absolute top-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                              Featured
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setFeaturedImage(index)}
                              className="absolute top-2 left-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-gray-900"
                            >
                              Set Featured
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Virtual Tour URL
                </label>
                <input
                  type="url"
                  name="virtualTour"
                  value={formData.virtualTour}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Link to Matterport or other 3D tour
                </p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <FiDollarSign className="mr-2 text-blue-600" /> Pricing &
                Contact
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Price*
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500">
                        {formData.currency === "EUR"
                          ? "€"
                          : formData.currency === "USD"
                            ? "$"
                            : "£"}
                      </span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Currency*
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Price Label*
                  </label>
                  <input
                    type="text"
                    name="priceLabel"
                    value={formData.priceLabel}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Deposit
                  </label>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Utilities
                  </label>
                  <input
                    type="text"
                    name="utilities"
                    value={formData.utilities}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Included/Not included"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Taxes (per year)
                  </label>
                  <input
                    type="number"
                    name="taxes"
                    value={formData.taxes}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="flex items-center text-lg font-medium text-gray-800">
                  <FiUser className="mr-2 text-blue-600" /> Contact Information
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Contact Name*
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      name="contactCompany"
                      value={formData.contactCompany}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between border-t pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                <FiChevronLeft className="mr-2" /> Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center rounded-lg border border-transparent bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Next <FiChevronRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center rounded-lg border border-transparent bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              >
                Submit Property
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
