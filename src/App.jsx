import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "./components/LanguageContext";
import CurrentTime from "./components/CurrentTime";
import PrayerInfo from "./components/PrayerInfo";
import PrayerTimes from "./components/PrayerTimes";
import "./App.css";
import { CircleSpinner } from "react-spinners-kit";
import Search from "./components/Search";

function App() {
  const { language, toggleLanguage } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [hijriDate, setHijriDate] = useState("");
  const [hijriWeekday, setHijriWeekday] = useState("");
  const [gregorianWeekday, setGregorianWeekday] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [location, setLocation] = useState({ city: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleArabicInputChange = (value) => {
    setArabicInput(value);
  };

  const handleEnglishInputChange = (value) => {
    setEnglishInput(value);
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${location.city}&country=`
        );
        const hijriDateObj = response.data.data.date.hijri;
        const formattedHijriDate = formatHijriDate(hijriDateObj);
        const gregorianDateObj = response.data.data.date.gregorian;
        const formattedgregorianDate = formatgregorianDate(gregorianDateObj);
        setPrayerTimes(response.data.data.timings);
        setHijriDate(formattedHijriDate);
        setHijriWeekday(response.data.data.date.hijri.weekday.ar);
        setGregorianWeekday(response.data.data.date.gregorian.weekday.en);
        setGregorianDate(formattedgregorianDate);
        calculateTimeLeft(response.data.data.timings);
        setIsLoading(false);
        setIsButtonVisible(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    if (location.city) {
      fetchPrayerTimes();
    }
  }, [location, language]);

  const handleCityChange = (e) => {
    setLocation({ city: e.target.value.replace(/\s+/g, "-") });
    setIsLoading(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerTimes) {
        calculateTimeLeft(prayerTimes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, language]);

  const calculateTimeLeft = (timings) => {
    const currentTime = new Date();
    let nextPrayerTime = null;
    let nextPrayer = "";

    const arabicPrayerNames = {
      Fajr: "الفجر",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Maghrib: "المغرب",
      Isha: "العشاء",
    };

    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    for (const prayer of prayerNames) {
      const [hours, minutes] = timings[prayer].split(":");
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);

      if (prayerDate > currentTime) {
        nextPrayerTime = prayerDate;
        nextPrayer = prayer;
        break;
      }
    }

    if (!nextPrayerTime) {
      const [fajrHours, fajrMinutes] = timings["Fajr"].split(":");
      nextPrayerTime = new Date();
      nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
      nextPrayerTime.setHours(fajrHours, fajrMinutes, 0, 0);
      nextPrayer = "Fajr";
    }

    const diffMs = nextPrayerTime - currentTime;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
    setTimeLeft(`${diffHrs}:${diffMins}:${diffSecs}`);
    const next = `${
      language === "ar" ? `${arabicPrayerNames[nextPrayer]} ` : `${nextPrayer}`
    }`;
    setNextPrayerName(next);
  };

  const formatHijriDate = (hijriDateObj) => {
    const day = hijriDateObj.day;
    const month = hijriDateObj.month[language === "ar" ? "ar" : "en"];
    const year = hijriDateObj.year;

    return `${year} ${day} ${month} `;
  };

  const formatgregorianDate = (gregorianDateObj) => {
    const day = gregorianDateObj.day;
    const month = gregorianDateObj.month.en;
    const year = gregorianDateObj.year;

    return `${day} ${month} ${year}`;
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    if (
      (isMobile && currentWidth >= 768) ||
      (!isMobile && currentWidth < 768)
    ) {
      setIsMobile(currentWidth < 768);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div className="mb-2 pt-2 md:pt-5 px-5 sm:px-10 md:px-20">
      <header>
        <nav>
          <ul className="flex flex-col gap-3 py-2 md:flex-row md:justify-around items-center">
            <Search
              handleCityChange={handleCityChange}
              onArabicInputChange={handleArabicInputChange}
              onEnglishInputChange={handleEnglishInputChange}
            />
            <CurrentTime />
            {isButtonVisible && (
              <button
                className=" p-1 md:p-2  px-5  ring-primary-200 cursor-pointer transition-colors duration-200 hover:bg-primary-400  hover:ring-2 hover:text-primary-800 bg-primary-700  text-white text-2xl font-bold rounded m-auto md:m-0 md:h-min"
                onClick={toggleLanguage}
              >
                {language === "ar" ? "en" : "ar"}
              </button>
            )}
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircleSpinner loading={isLoading} size={40} />
        </div>
      ) : (
        <main className="flex flex-col md:gap-5 justify-center items-center  md:flex-row md:justify-around md:mt-24">
          {location.city === "" ? (
            <h1 className="p-3 font-semibold text-3xl text-center">
              {language === "ar"
                ? "اكتب اسم المدينة في خانة البحث "
                : "Write the city name in the search box"}
            </h1>
          ) : (
            <>
              {isMobile ? (
                <>
                  {" "}
                  <PrayerInfo
                    location={location.city}
                    hijriDate={hijriDate}
                    hijriWeekday={hijriWeekday}
                    gregorianWeekday={gregorianWeekday}
                    gregorianDate={gregorianDate}
                    timeLeft={timeLeft}
                    nextPrayerName={nextPrayerName}
                  />
                  <PrayerTimes prayerTimes={prayerTimes} />
                </>
              ) : (
                <>
                  {language === "ar" ? (
                    <>
                      <PrayerTimes prayerTimes={prayerTimes} />
                      <PrayerInfo
                        location={location.city}
                        hijriDate={hijriDate}
                        hijriWeekday={hijriWeekday}
                        gregorianWeekday={gregorianWeekday}
                        gregorianDate={gregorianDate}
                        timeLeft={timeLeft}
                        nextPrayerName={nextPrayerName}
                      />
                    </>
                  ) : (
                    <>
                      <PrayerInfo
                        location={location.city}
                        hijriDate={hijriDate}
                        hijriWeekday={hijriWeekday}
                        gregorianWeekday={gregorianWeekday}
                        gregorianDate={gregorianDate}
                        timeLeft={timeLeft}
                        nextPrayerName={nextPrayerName}
                      />
                      <PrayerTimes prayerTimes={prayerTimes} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
