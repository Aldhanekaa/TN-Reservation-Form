function getSessionByLevel(
  level: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
) {
  const session = {
    "1": "1.1",
    "2": "1.2",
    "3": "1.3",
    "4": "2.1",
    "5": "2.2",
    "6": "2.3",
    "7": "3.1",
    "8": "3.2",
    "9": "3.3",
  };

  return session[level];
}

function getSession(
  sessionSeatFormat: string, // 1.1 , [day].[session]
  onlyDay?: boolean
) {
  const sessionSeatFormatDay = sessionSeatFormat.split(".")[0];
  const sessionSeatFormatDaySession = sessionSeatFormat.split(".")[1];

  const sessionDay = {
    "1": "Dec 01 2021",
    "2": "Dec 02 2021",
    "3": "Dec 03 2021",
  };
  const session = {
    "1": {
      start: "09:00:00",
      end: "10:00:00",
    },
    "2": {
      start: "10:30:00",
      end: "11:00:00",
    },
    "3": {
      start: "13:15:00",
      end: "14:15:00",
    },
  };

  if (onlyDay) {
    // @ts-ignore
    return sessionDay[sessionSeatFormatDay];
  }
  // @ts-ignore
  return `${sessionDay[sessionSeatFormatDay]}. ${session[sessionSeatFormatDaySession].start} — ${session[sessionSeatFormatDaySession].end}`;
}

export { getSessionByLevel, getSession };
