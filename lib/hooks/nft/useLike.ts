import { useState } from "react";



export default function useLike() {
  const [isLiked, setLiked] = useState(false);

  const likeNFT = async (id: string, address: string) => {
 setLiked(true);
  };

  return {
    likeNFT,
    isLiked,
    setLiked,
  };
}
