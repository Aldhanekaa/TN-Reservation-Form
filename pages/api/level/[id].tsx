import type { NextApiRequest, NextApiResponse } from "next";
import Students from "data/students.json";

type Data = {
  message: string;
  status: "success" | "error";
  items?: any;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const student = Students.filter((student) => student.level == id);

  if (student) {
    res
      .status(200)
      .json({ message: "User Found", status: "success", items: student });
    return;
  }

  res.status(200).json({ message: "Student not found!", status: "error" });

  return;
};
