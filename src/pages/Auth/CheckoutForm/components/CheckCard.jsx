import React from "react";
import Button from "../../../../components/ui/Button";

const CheckCard = ({ selectedPlan, handleChoosePlan }) => {
  return (
    <div className="">
      <div
        className={`w-full max-w-sm rounded-2xl bg-gray-50 p-8 text-center shadow-lg ${
          selectedPlan.recommended
            ? "border border-blue-500 shadow"
            : "border border-gray-200"
        }`}
      >
        {selectedPlan.recommended && (
          <div className="mb-4 inline-block rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
            Aanbevolen
          </div>
        )}
        <h3 className="text-3xl font-bold text-gray-800 capitalize">
          {selectedPlan.name}
        </h3>
        <p className="mt-1 text-4xl font-extrabold text-blue-500">
          {selectedPlan.price}
        </p>
        <p className="mt-2 text-sm text-gray-500">{selectedPlan.description}</p>

        <div className="space-y-6 pt-6">
          <ul className="space-y-0 text-left">
            {selectedPlan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <svg
                  className="h-6 w-6 text-green-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* <Button
            onClick={handleChoosePlan}
            variant="secondary"
            className="w-full"
            size="md"
          >
            Selected Plan
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default CheckCard;
