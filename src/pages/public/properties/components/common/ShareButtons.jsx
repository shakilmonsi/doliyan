import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShare2,
  FiX,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiLink,
} from "react-icons/fi";

const ShareButtons = () => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareButtonRef = useRef(null);
  const sharePanelRef = useRef(null);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = "Check out this property listing";

  // Handle clicks outside the share panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sharePanelRef.current &&
        !sharePanelRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);

  const shareOnPlatform = (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setShowShareOptions(false);
        alert("Link copied to clipboard!");
        return;
      default:
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setShowShareOptions(false);
  };

  return (
    <div className="relative">
      <button
        ref={shareButtonRef}
        onClick={() => setShowShareOptions(!showShareOptions)}
        className={`rounded-full p-2 transition-all duration-200 ${
          showShareOptions ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
        }`}
        aria-label="Share this property"
      >
        <FiShare2
          className={`h-4 w-4 transition-transform duration-200 ${
            showShareOptions ? "rotate-45 text-gray-600" : "text-gray-400"
          }`}
        />
      </button>

      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            ref={sharePanelRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-10 right-0 z-20 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium text-gray-900">Share via</h3>
              <button
                onClick={() => setShowShareOptions(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-2 grid grid-cols-2 gap-2"
            >
              {[
                {
                  platform: "facebook",
                  icon: <FiFacebook className="h-4 w-4" />,
                  label: "Facebook",
                },
                {
                  platform: "twitter",
                  icon: <FiTwitter className="h-4 w-4" />,
                  label: "Twitter",
                },
                {
                  platform: "linkedin",
                  icon: <FiLinkedin className="h-4 w-4" />,
                  label: "LinkedIn",
                },
                {
                  platform: "copy",
                  icon: <FiLink className="h-4 w-4" />,
                  label: "Copy Link",
                },
              ].map((item) => (
                <motion.button
                  key={item.platform}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => shareOnPlatform(item.platform)}
                  className="flex items-center justify-center gap-2 rounded-md p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span className="text-gray-400">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButtons;
