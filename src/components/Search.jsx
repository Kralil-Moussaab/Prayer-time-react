import React from "react";
import { useLanguage } from "./LanguageContext";
export default function Search({ handleCityChange }) {
  const { language } = useLanguage();
  return (
    <li>
      <div className="relative max-w-sm w-full mx-auto">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-black absolute top-[50%] translate-y-[-50%] left-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
        </svg>
        <input
          className="rounded-md ring ring-primary-400 ring-offset-2 border-0 px-8 text-right py-2 focus:ring-0 outline-none w-full text-xl text-primary-800"
          placeholder={language === "ar" ? "اسم المدينة" : "city name"}
          type="text"
          name="search"
          onChange={handleCityChange}
        />
      </div>
    </li>
  );
}
