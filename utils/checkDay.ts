import exhibitionDays from "data/sessions";
import grades from "data/grades";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const daysIRL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function checkDay() {
  let newGrades: typeof grades = [];
  for (
    let exhibitionDayIndex = 0;
    exhibitionDayIndex < exhibitionDays.length;
    exhibitionDayIndex++
  ) {
    const exhibitionDay = exhibitionDays[exhibitionDayIndex];
    const exhibitionDayMonth = months.findIndex(
      (month) => month == exhibitionDay.date.split(" ")[0]
    ); // int
    const exhibitionDayDate = Number(
      months.findIndex((month) => month == exhibitionDay.date.split(" ")[1])
    ); // int

    console.log(exhibitionDay.date.split(" ")[1]);

    const exhibitionDaySessions = exhibitionDay.sessions;

    const now = Date.now();
    const month = new Date(now).getMonth();
    const nowDay = new Date(now).getDay(); // int

    console.log(month, exhibitionDayMonth, nowDay, exhibitionDayDate);

    if (month <= exhibitionDayMonth) {
      if (
        month <= exhibitionDayMonth ||
        (month == exhibitionDayMonth && nowDay <= exhibitionDayDate)
      ) {
        // console.log(nowDay, daysIRL[nowDay]);
        // console.log(exhibitionDayIndex + 1);
        // console.log("hey");

        if (newGrades.length == grades.length) {
          break;
        }
        grades.forEach((grade) => {
          // console.log(
          //   "================================================================"
          // );
          // console.log(grade.grade);
          // console.log("day", grade.day, nowDay);
          // console.log("session", grade.session, exhibitionDayIndex + 1);
          // console.log(
          //   "================================================================"
          // );

          if (month < exhibitionDayMonth) {
            newGrades.push(grade);
          } else if (
            month == exhibitionDayMonth &&
            nowDay <= exhibitionDayDate
          ) {
            console.log("hey!");
          }
        });
      }
    }
  }
  console.log("newGrades", newGrades);
}
