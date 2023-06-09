import propTypes from "prop-types";
import Image from "next/image";

export default function BackgroundImage({
  src,
  width,
  height,
  className,
  fixed = true,
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="Background"
      className={`${
        fixed ? "fixed" : "absolute"
      } top-0 left-0 -z-10 h-full object-cover ${className}`}
    />
  );
}

BackgroundImage.propTypes = {
  src: propTypes.string.isRequired,
  width: propTypes.string.isRequired,
  height: propTypes.string.isRequired,
  className: propTypes.string,
  fixed: propTypes.bool,
};
