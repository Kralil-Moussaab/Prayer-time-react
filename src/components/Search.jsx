import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function Search({
  handleCityChange,
  onArabicInputChange,
  onEnglishInputChange,
}) {
  const { language } = useLanguage();
  const [value, setValue] = useState("");
  const handleClick = () => {
    const input = document.getElementById("cityInput");
    if (input) {
      handleCityChange({ target: { value: input.value } });
    }
  };
  const handleArabicChange = (e) => {
    const inputValue = e.target.value;
    const arabicRegex = /^[\u0600-\u06FF\s]*$/;

    if (arabicRegex.test(inputValue)) {
      setValue(inputValue);
      onArabicInputChange(inputValue);
    }
  };

  const handleEnglishChange = (e) => {
    const inputValue = e.target.value;
    const englishRegex = /^[a-zA-Z\s]*$/;

    if (englishRegex.test(inputValue)) {
      setValue(inputValue);
      onEnglishInputChange(inputValue);
    }
  };
  return (
    <li>
      <div className="relative w-full mx-auto">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="w-12 h-12 p-r-3 fill-black absolute top-[50%] translate-y-[-50%] cursor-pointer border-r-2  border-primary-400"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={language === "ar" ? "بحث" : "Search"}
          onClick={handleClick}
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
        </svg>
        {language === "ar" ? (
          <input
            id="cityInput"
            className="rounded-md ring md:w-96 ring-primary-400 ring-offset-2 border-0 px-8 text-right py-2 focus:ring-0 outline-none w-full text-xl text-primary-800"
            placeholder={
              language === "ar"
                ? "اسم المدينة ( بالعربية فقط)"
                : "City name in English"
            }
            type="text"
            value={value}
            name="search"
            onChange={handleArabicChange}
          />
        ) : (
          <input
            id="cityInput"
            className="rounded-md ring md:w-96 ring-primary-400 ring-offset-2 border-0 px-8 text-right py-2 focus:ring-0 outline-none w-full text-xl text-primary-800"
            placeholder={
              language === "ar"
                ? "اسم المدينة بالعربية فقط"
                : "City name(accept English only)"
            }
            type="text"
            value={value}
            name="search"
            onChange={handleEnglishChange}
          />
        )}
      </div>
    </li>
  );
}
