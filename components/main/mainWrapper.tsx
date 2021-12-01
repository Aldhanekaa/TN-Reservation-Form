import MainSection from "components/main/main";
import React, { useState, useEffect } from "react";

export default function MainWrapper() {
  const [currentDuration, setCurrentDuration] = useState(0);

  return (
    <MainSection
      setCurrentDuration={setCurrentDuration}
      currentDuration={currentDuration}
    />
  );
}
