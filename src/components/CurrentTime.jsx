import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <li>
      <div className="flex flex-col items-center justify-center gap-1 font-bold p-2 md:p-3 border border-primary-200 shadow-lg rounded-lg max-w-xs mx-auto text-center">
        <span className="text-sm">
          {language === "ar" ? "الوقت المحلي" : "Local time"}
        </span>
        <span className="text-3xl">
          {currentTime.toLocaleTimeString("en-GB", { hour12: false })}
        </span>
      </div>
    </li>
  );
};

export default CurrentTime;
