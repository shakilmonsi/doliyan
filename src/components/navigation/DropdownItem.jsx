import { Link } from "react-router-dom";

// 🔁 Reusable Dropdown Item
const DropdownItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 transition hover:rounded-sm hover:bg-[#3CAAFA] hover:text-white"
  >
    {icon}
    {children}
  </Link>
);

export default DropdownItem;
