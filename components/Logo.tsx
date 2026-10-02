export type LogoProps = { text: string; sub: string; image?: string };

/** Text logo, or an uploaded logo image when one is set. */
export default function Logo({ text, sub, image }: LogoProps) {
  if (image) return <img className="logo-img" src={image} alt={text || "Logo"} />;
  return (
    <>
      <span>{text}</span>
      {sub && <small>{sub}</small>}
    </>
  );
}
