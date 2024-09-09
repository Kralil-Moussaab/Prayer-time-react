import React from "react";
import { useLanguage } from "./LanguageContext";
const PrayerInfo = ({
  hijriDate,
  gregorianDate,
  gregorianWeekday,
  nextPrayerName,
  hijriWeekday,
  location,
  timeLeft,
}) => {
  const { language } = useLanguage();
  const next = `${
    language === "ar"
      ? `: الوقت متبقي لصلاة ${nextPrayerName} `
      : `There is time left for the ${nextPrayerName} prayer :`
  }`;
  return (
    <>
      {language === "ar" ? (
        <>
          {" "}
          <div className="flex flex-col items-center md:gap-7 md:items-end">
            <>
              {language === "ar" ? (
                <p className="text-3xl md:text-5xl font-bold">
                  مواقيت الصلاة {location.replace(/-/g, " ")}
                </p>
              ) : (
                <p className="text-3xl md:text-5xl font-bold">
                  Prayer time of {location.replace(/-/g, " ")}
                </p>
              )}
            </>
            <>
              {language === "ar" ? (
                <p className="text-3xl md:text-5xl font-bold">{hijriWeekday}</p>
              ) : (
                <p className="text-3xl md:text-5xl font-bold">
                  {gregorianWeekday}
                </p>
              )}
            </>
            <p className="text-3xl text-center">{next}</p>
            <p className="font-black text-3xl md:text-5xl text-center">
              {timeLeft}
            </p>
            <div className="flex gap-5">
              <p className="font-bold  text-center text-lg">{gregorianDate}</p>
              <p className="font-black text-center text-lg">{hijriDate}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col items-center md:items-start md:gap-7">
            <>
              {language === "ar" ? (
                <p className="text-3xl md:text-5xl font-bold">
                  مواقيت الصلاة {location.replace(/-/g, " ")}
                </p>
              ) : (
                <p className="text-3xl md:text-5xl font-bold">
                  Prayer time of {location.replace(/-/g, " ")}
                </p>
              )}
            </>
            <>
              {language === "ar" ? (
                <p className="text-3xl md:text-5xl font-bold">{hijriWeekday}</p>
              ) : (
                <p className="text-3xl md:text-5xl font-bold">
                  {gregorianWeekday}
                </p>
              )}
            </>
            <p className="text-3xl text-center">{next}</p>
            <p className="font-black text-3xl md:text-5xl text-center">
              {timeLeft}
            </p>
            <div className="flex gap-5">
              <p className="font-bold text-center text-lg">{gregorianDate}</p>
              <p className="font-black text-center text-lg">{hijriDate}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PrayerInfo;
