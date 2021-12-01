import type { NextApiRequest, NextApiResponse } from "next";
import Students from "data/students.json";

type Data = {
  message: string;
  status: "success" | "error";
  item?: any;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const student = Students.find((student) => student.id == id);

  if (student) {
    res
      .status(200)
      .json({ message: "User Found", status: "success", item: student });
    return;
  }

  res.status(200).json({ message: "Student not found!", status: "error" });

  return;
};
