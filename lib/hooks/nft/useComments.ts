import { useState } from "react";



export default function useComments() {
  const [isCommentSuccess, setCommentSuccess] = useState(false);

  const createComments = async (
    id: string,
    creator: string,
    contents: string
  ) => {
    try {
 setCommentSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isCommentSuccess,
    setCommentSuccess,
    createComments,
  };
}
