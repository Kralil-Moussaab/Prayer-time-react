import React from "react";
import { useLanguage } from "./LanguageContext";
const PrayerInfo = ({
  hijriDate,
  gregorianDate,
  nextPrayerName,
  hijriWeekday,
  timeLeft,
}) => {
  const { language } = useLanguage();
  const next = `${
    language === "ar"
      ? `: الوقت متبقي لصلاة ${nextPrayerName} `
      : `There is time left for the ${nextPrayerName} prayer`
  }`;
  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <p className="text-5xl mb-3">{hijriWeekday}</p>
        <p className="text-4xl mb-3 text-center">{next}</p>
        <p className="font-black text-5xl sm:text-6xl text-center">
          {timeLeft}
        </p>
        <div className="flex gap-5 mt-3">
          <p className="font-bold text-lg">{gregorianDate}</p>
          <p className="font-black text-lg">{hijriDate}</p>
        </div>
      </div>
    </>
  );
};

export default PrayerInfo;
