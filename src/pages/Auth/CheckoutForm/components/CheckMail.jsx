const CheckEmailPage = () => {
  const subData = JSON.parse(localStorage.getItem("subscriptionData"));

  if (!subData) {
    return <div>Invalid access.</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-green-100 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Success, {subData.customerEmail.split("@")[0]}! 🎉
        </h1>

        <p className="mb-2 text-gray-600">
          You've subscribed to the <strong>{subData.planName}</strong> plan for{" "}
          <strong>
            €{subData.planAmount}/{subData.planInterval}
          </strong>
          .
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Check your inbox at <strong>{subData.customerEmail}</strong> to
          complete payment with iDEAL.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CheckEmailPage;
