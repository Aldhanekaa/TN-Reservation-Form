import axios from "axios";

export default async function idk(id: string): Promise<{
  message: string;
  status: "error" | "success";
}> {
  const server = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER}/register_reservation`,
    {
      id: id,
      dateRegistered: String(Date.now()),
    }
  );
  console.log(server);
  return server.data;
}
