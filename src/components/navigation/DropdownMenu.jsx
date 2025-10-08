import { useEffect, useRef, useState } from "react";

const DropdownMenu = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  // Close on outside click
  // Close on outside click
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={toggle}>{trigger}</div>

      <div
        className={`absolute top-full right-0 z-50 mt-2 w-44 rounded-md bg-white shadow-md transition-all duration-200 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {typeof children === "function" ? children({ close }) : children}
      </div>
    </div>
  );
};

export default DropdownMenu;
