import MainSection from "components/main/main";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MainWrapper() {
  const [currentDuration, setCurrentDuration] = useState(0);
  const router = useRouter();
  const liveEventStarts = new Date(
    "Dec 2 2021 11:30:00 GMT+0700 (Western Indonesia Time)"
  ).getTime();

  useEffect(() => {
    setInterval(() => {
      if (Date.now() >= liveEventStarts) {
        router.reload();
      }
    }, 1000);
  }, []);

  return (
    <MainSection
      setCurrentDuration={setCurrentDuration}
      currentDuration={currentDuration}
    />
  );
}
