import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showFooter,
  confirmText,
  cancelText,
  onConfirm,
  size = "sm", // 'sm' | 'md' | 'lg'
}) => {
  if (!isOpen) return null;

  // Map size prop to Tailwind max-width classes
  const sizeClasses = {
    sm: "max-w-md", // ~480px
    md: "max-w-lg", // ~640px
    lg: "max-w-2xl", // ~800px
    xl: "max-w-4xl", // ~800px
    larg: "max-w-6xl", // ~800px
  };

  const modalWidth = sizeClasses[size] || sizeClasses.md;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      {/* Modal Container */}
      <div
        className={`relative w-full ${modalWidth} rounded-lg bg-white p-6 shadow-lg lg:p-12`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>

        {/* Content */}
        <div className="text-sm text-gray-600">{children}</div>

        {/* Footer */}
        {showFooter && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-[#3CAAFA] px-4 py-2 text-sm text-white hover:bg-[#2196e3] focus:outline-none"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
