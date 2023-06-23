import propTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

export default function SectionService({
  position,
  title,
  url,
  imgSrc,
  inclusions,
}) {
  const positionIsOdd = Boolean(position % 2 === 1);

  const backgroundColor = positionIsOdd ? "bg-white" : "bg-neutral-300";
  const buttonBg = positionIsOdd ? "bg-neutral-300" : "bg-black";
  const buttonColor = positionIsOdd ? "text-black" : "text-white";
  const imagePosition = positionIsOdd ? "lg:order-last" : "lg:order-first";

  const inclusionListItems = (() =>
    inclusions.map((e) => (
      <li className="uppercase text-left text-xs md:text-base" key={e}>
        {e}
      </li>
    )))();

  return (
    <section
      className={`${backgroundColor} text-center md:text-left grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 relative -left-2 lg:-left-32 w-[100lvw] lg:w-[calc(100lvw-1.03rem)] gap-6 lg:gap-16 py-8 px-4 md:p-16 lg:px-32 lg:py-16`}
    >
      <div>
        <div className="font-bold uppercase text-xl md:text-4xl tracking-wide mb-2 md:mb-4">
          {title}
        </div>
        <div>
          <div className="uppercase mb-4 text-base md:text-xl font-bold">
            Inclusion:
          </div>
          <div>
            <ul className="ml-8 md:ml-16 list-disc">{inclusionListItems}</ul>
          </div>
          <Link href={url}>
            <button
              className={`${buttonBg} ${buttonColor} text-sm md:text-base font-bold mt-6 rounded-[2rem] py-3 px-8 uppercase hover:bg-[#04b2bd]`}
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`order-none ${imagePosition} h-full w-full flex items-center`}
      >
        <Image
          src={imgSrc}
          alt="Social Media Management Program"
          width={900}
          height={600}
          className="md:h-[350px] lg:h-[425px] object-cover w-full"
        />
      </div>
    </section>
  );
}

SectionService.propTypes = {
  position: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  imgSrc: propTypes.string.isRequired,
  inclusions: propTypes.arrayOf(propTypes.string).isRequired,
};
