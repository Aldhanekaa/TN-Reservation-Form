import Image from "next/image";

export default function IconButton({
  src,
  ...other
}: {
  src: any;
  [key: string]: any;
}) {
  return <Image src={src} {...other} />;
}
