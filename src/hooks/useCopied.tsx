import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook to manage clipboard copy functionality and display toast notifications.
 * @returns {Object} - An object containing the copy function and isCopied state.
 */
const useCopied = () => {
  // State to track if the content has been copied
  const [isCopied, setIsCopied] = useState(false);

  // State to control whether copying is allowed
  const [canCopy, setCanCopy] = useState(true);

  /**
   * Function to copy the given data to clipboard and show a success toast.
   * @param {string | string[]} data - The data to be copied. Can be a single string or an array of strings.
   */
  const copy = (data: string[] | string) => {
    // If copying is not allowed, exit the function
    if (!canCopy) {
      return;
    }

    let sentence: string = "";

    // Determine if the data is a string or an array and format it accordingly
    if (typeof data === "string") {
      sentence = data;
    } else if (Array.isArray(data)) {
      sentence = data.join(" ");
    }

    // Copy the formatted sentence to clipboard
    navigator.clipboard.writeText(sentence);

    // Show success notification
    toast.success("Copied!");

    // Update state to indicate content has been copied
    setIsCopied(true);

    // Prevent further copying for a short period (5 seconds)
    setCanCopy(false);
    setTimeout(() => {
      setCanCopy(true);
      setIsCopied(false);
    }, 5000);
  };

  // Return the copy function and the isCopied state
  return { copy, isCopied };
};

export default useCopied;
