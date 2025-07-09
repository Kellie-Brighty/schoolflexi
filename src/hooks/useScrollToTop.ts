import { useEffect } from "react";

/**
 * Custom hook that automatically scrolls to the top of the page when the component mounts
 * @param dependencies - Optional array of dependencies to trigger scroll on change
 */
export const useScrollToTop = (dependencies: React.DependencyList = []) => {
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Also ensure body scroll is reset (for some edge cases)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, dependencies);
};

export default useScrollToTop;
