import React from "react";
import { Web3Context } from "./Web3Context";


const useWeb3 = () => {
  const context = React.useContext(Web3Context);
  if (!context) {
    throw new Error("");
  } else {
    return context;
  }
};

export default useWeb3;
