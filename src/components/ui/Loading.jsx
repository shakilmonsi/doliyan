import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
    </div>
  );
};

export default Loading;
