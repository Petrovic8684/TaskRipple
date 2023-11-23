import React from "react";

function ErrorPage({ error }) {
  return (
    <div className="h-[85vh] mx-10 flex flex-column justify-center items-center text-center">
      <svg
        className="w-[200px] h-[200px] text-red-800 mb-[25px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
      <h1 className="text-red-500">ERROR</h1>
      <h4 className="mb-3">
        Something went wrong while fetching <br className="hidden md:block" />{" "}
        your boards. Please restart the app and try again later.
      </h4>
      <h6 className="text-red-400">{error}</h6>
    </div>
  );
}

export default ErrorPage;
