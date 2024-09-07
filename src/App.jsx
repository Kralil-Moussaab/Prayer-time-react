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
  const [gregorianDate, setGregorianDate] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [location, setLocation] = useState({ city: "" });
  const [isLoading, setIsLoading] = useState(false);

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
        setHijriWeekday(
          response.data.data.date.hijri.weekday[language === "ar" ? "ar" : "en"]
        );
        setGregorianDate(formattedgregorianDate);
        calculateTimeLeft(response.data.data.timings);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    if (location.city) {
      fetchPrayerTimes();
    }
  }, [location, language]);

  const handleCityChange = (e) => {
    setLocation({ city: e.target.value });
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
  return (
    <div className="min-h-screen pt-5 px-5 sm:px-10">
      <header>
        <nav>
          <ul className="flex flex-col gap-5 py-2 ">
            <button
              className="mb-4 p-2 px-5 ring-primary-200 transition-colors duration-200 hover:bg-primary-400 hover:ring-2 hover:text-primary-800 bg-primary-700 m-auto text-white text-2xl font-bold rounded"
              onClick={toggleLanguage}
            >
              {language === "ar" ? "Switch to English" : "تبديل إلى العربية"}
            </button>
            <CurrentTime />
            <Search handleCityChange={handleCityChange} />
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircleSpinner loading={isLoading} size={40} />
        </div>
      ) : (
        <main className="flex flex-col gap-5 justify-center items-center my-10">
          {location.city === "" ? (
            <h1 className="p-3 font-semibold text-3xl text-center">
              {language === "ar"
                ? "اكتب اسم المدينة في خانة البحث "
                : "Write the city name in the search box"}
            </h1>
          ) : (
            <>
              <PrayerInfo
                hijriDate={hijriDate}
                hijriWeekday={hijriWeekday}
                gregorianDate={gregorianDate}
                timeLeft={timeLeft}
                nextPrayerName={nextPrayerName}
              />
              <PrayerTimes prayerTimes={prayerTimes} />
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
