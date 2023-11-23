import React from "react";
import { PuffLoader } from "react-spinners";

function LoadingPage() {
  return (
    <div>
      <PuffLoader
        color="#60A5FA"
        size={200}
        cssOverride={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -40%)",
        }}
      />
      <h1 className="fixed top-[60%] left-[50%] -translate-x-[50%] -translate-y-[60%] text-blue-400">
        LOADING
      </h1>
    </div>
  );
}

export default LoadingPage;
