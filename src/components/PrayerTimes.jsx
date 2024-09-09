import React from "react";
import { useLanguage } from "./LanguageContext";

const PrayerTimes = ({ prayerTimes }) => {
  const prayerNames = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };
  const { language } = useLanguage();

  return (
    <ul className="flex flex-col items-stretch max-w-md w-full gap-3 overflow-hidden">
      {prayerTimes &&
        Object.entries(prayerTimes).map(([name, time], index) => {
          if (prayerNames[name]) {
            return (
              <li
                key={name}
                className="flex py-3 animate-slideDown px-5 items-center justify-between opacity-0 flex-1 w-full bg-primary-700 text-primary-200 rounded-md text-xl"
                style={{ animationDelay: `${index * 0.4}s` }} // Add animation delay based on index
              >
                {language === "ar" ? (
                  <>
                    <p>{time}</p>
                    <p>{prayerNames[name]}</p>
                  </>
                ) : (
                  <>
                    <p>{name}</p>
                    <p>{time}</p>
                  </>
                )}
              </li>
            );
          }
          return null;
        })}
    </ul>
  );
};

export default PrayerTimes;
