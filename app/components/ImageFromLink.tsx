export default function ImageFromLink({ src }: { src: string }) {
  return <img src={src} alt="Imagen del post" style={{ maxWidth: "100%" }} />;
}
