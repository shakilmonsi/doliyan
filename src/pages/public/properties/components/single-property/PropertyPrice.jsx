// src/components/property/PropertyPrice.jsx
const PropertyPrice = ({ price }) => {
  const cleanedPrice =
    typeof price === "string"
      ? price.replace(/(per maand|per month)(?=.*\1)/, "").trim()
      : price || "N/A";

  return (
    <div className="mb-6 rounded-lg bg-yellow-50 p-2">
      <h2 className="text-xl font-bold text-green-800 md:text-2xl">
        {cleanedPrice}
      </h2>
    </div>
  );
};

export default PropertyPrice;
