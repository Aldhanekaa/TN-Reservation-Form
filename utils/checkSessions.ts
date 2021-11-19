export default function checkSessions(sessionString: string) {
  const sessions = sessionString.split("-");

  const now = Date.now();
  const hour = new Date(now).getHours();
  const minute = new Date(now).getMinutes();

  if (
    hour >= Number(sessions[0].split(":")[0]) &&
    hour <= Number(sessions[1].split(":")[0])
  ) {
    if (
      minute >= Number(sessions[0].split(":")[1]) &&
      minute <= Number(sessions[1].split(":")[1])
    ) {
      return true;
    }
  }

  return undefined;
}
