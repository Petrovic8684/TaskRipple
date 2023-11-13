import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Landing() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function getQuote() {
      const response = await axios.get(
        "https://api.quotable.io/random?tags=business|creativity|inspirational|knowledge|leadership|work&maxLength=120"
      );
      setQuote((quote) => ({
        ...quote,
        content: response.data.content,
        author: response.data.author,
      }));
    }

    getQuote();
  }, []);

  return (
    <section className="h-[100vh] flex items-center bg-white overflow-hidden">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-pink-500 lg:inline">
              TaskRipple
            </span>{" "}
            <span>is a simple way to manage your tasks.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            {quote.content} <br /> -{quote.author}
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Link
              to="/home"
              className="no-underline inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-400 rounded-2xl sm:w-auto sm:mb-0"
            >
              Get Started
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              to="/"
              className="no-underline inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-blue bg-gray-200 rounded-2xl sm:w-auto sm:mb-0"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
