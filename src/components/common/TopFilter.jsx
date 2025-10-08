import React from "react";

const TopFilter = () => {
  return  <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-md">
  {/* Sort options */}
  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
    <label htmlFor="sort" className="whitespace-nowrap">
      Sort by:
    </label>
    <select
      id="sort"
      className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
    >
      <option value="">Default</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>

  {/* View toggle buttons */}
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <label htmlFor="sort" className="whitespace-nowrap">
        Per-page:
      </label>
      <select
        id="sort"
        className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>

    <div>
      <button className="rounded-md p-2 text-gray-600 hover:bg-gray-200">
        <FaListUl />
      </button>
      <button className="rounded-md p-2 text-gray-400 hover:bg-gray-200">
        <FiGrid />
      </button>
    </div>
  </div>
</div>

export default TopFilter;
