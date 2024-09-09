/* eslint-disable react/prop-types */
export default function Image({ src, ...rest }) {
  src = src?.includes("https://")
    ? src
    : "http://localhost:3001/uploads/" + src;
  return <img {...rest} src={src} alt={""} />;
}
