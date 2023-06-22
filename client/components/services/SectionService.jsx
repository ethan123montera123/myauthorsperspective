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
  const positionIsOdd = Boolean(position % 2 == 1);

  const backgroundColor = positionIsOdd ? "bg-white" : "bg-neutral-300";
  const buttonBg = positionIsOdd ? "bg-neutral-300" : "bg-black";
  const buttonColor = positionIsOdd ? "text-black" : "text-white";
  const imagePosition = positionIsOdd ? "order-last" : "order-first";

  const inclusionListItems = (() =>
    inclusions.map((e) => <li key={e}>{e}</li>))();

  return (
    <section
      className={`${backgroundColor} relative -left-2 lg:-left-32 w-[100lvw] lg:w-[calc(100lvw-1.04rem)] gap-0 lg:gap-16 grid grid-cols-2 px-32 py-16`}
    >
      <div>
        <div className="font-bold uppercase text-4xl tracking-wide mb-4">
          {title}
        </div>
        <div>
          <div className="uppercase mb-4">Inclusion:</div>
          <div>
            <ul className="ml-16 list-disc">{inclusionListItems}</ul>
          </div>
          <Link href={url}>
            <button
              className={`${buttonBg} ${buttonColor} mt-6 rounded-[2rem] py-3 px-8 uppercase text-white hover:bg-[#04b2bd]`}
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
      <div className={imagePosition}>
        <Image
          src={imgSrc}
          alt="Social Media Management Program"
          width={900}
          height={600}
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
