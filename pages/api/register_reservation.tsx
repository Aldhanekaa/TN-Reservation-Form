import type { NextApiRequest, NextApiResponse } from "next";
import Students from "data/students.json";

type Data = {
  message: string;
  status: "success" | "error";
  online?: boolean;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method == "POST") {
    res
      .status(200)
      .json({ online: true, message: "Already Online", status: "success" });
    return;
  }
};
