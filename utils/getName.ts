import axios from "axios";
import { ReservationI } from "model/reservation";
import Students from "data/students.json";

export default async function getLevel(level: number): Promise<{
  items: Array<{
    nama_lengkap: string;
    level: number;
    gender: "L" | "P";
    id: string;
  }>;
}> {
  // @ts-ignore
  const students: Array<{
    nama_lengkap: string;
    level: number;
    gender: "L" | "P";
    id: string;
  }> = Students.filter((student) => student.level == level);

  //
  return { items: students };
}
