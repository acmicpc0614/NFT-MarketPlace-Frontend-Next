import { useState } from "react";

const useSaveImage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState<"success" | "failed" | "">("");

  const saveImage = async (address: string, url: string, prompt: string) => {
    try {
      setIsSaving(true);

    } catch (err) {
      console.log(err);
    }
  };

  return {
    isSaving,
    isSaved,
    setIsSaved,
    saveImage,
  };
};

export default useSaveImage;
