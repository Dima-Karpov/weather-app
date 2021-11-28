import { useEffect, useState } from "react"

export const useTime = () => {
  const [time, setTime] = useState(new Date());
  const getTwoDigitsString = (num: number) => num < 10 ? "0" + num : num;

  const secondsString = getTwoDigitsString(time.getSeconds());
  const minutesString = getTwoDigitsString(time.getMinutes());
  const hoursString = getTwoDigitsString(time.getHours());

  // useEffect(() => setTime(new Date()), [])

  return {
    setTime,
    sec: secondsString,
    min: minutesString,
    hour: hoursString,
  };
};