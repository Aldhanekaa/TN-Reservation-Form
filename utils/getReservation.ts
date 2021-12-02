import axios from "axios";
import { ReservationI } from "model/reservation";
import Students from "data/students.json";
import { status } from "nprogress";

export default async function idk(id: string): Promise<{
  item?: {
    nama_lengkap: string;
    level: number;
    gender: "L" | "P";
    id: string;
  };
  message: string;
  status: "error" | "success";
}> {
  const student = Students.find((student) => student.id == id);

  // @ts-ignore
  return { item: student, message: "", status: "success" };
}
