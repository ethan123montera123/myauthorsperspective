import propTypes from "prop-types";
import BackgroundImage from "../ui/BackgroundImage";

export default function SectionService({ position, title, inclusions, url }) {}

SectionService.propTypes = {
  position: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  inclusions: propTypes.arrayOf(propTypes.string).isRequired,
  url: propTypes.string.isRequired,
};
