import axios from "axios";
import { FormSchemaI } from "components/form/FormSchema";

export default async function idk(values: FormSchemaI): Promise<{
  message: string;
  status: "success" | "error";
  imageUrl?: string;
}> {
  const server = await axios.post<
    {},
    {
      data: {
        message: string;
        status: "success" | "error";
      };
    }
  >(`${process.env.NEXT_PUBLIC_SERVER}/api/register_reservation`, {
    id: values.id,
  });
  return server.data;
}
