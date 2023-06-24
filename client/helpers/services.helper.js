const services = [
  {
    title: "Social Media Management Program",
    url: "/services/social-media-management-program",
    imgSrc: "/images/services/social-media-management-program.webp",
    priceUsd: 1800,
    inclusions: [
      "Social Media Strategy",
      "Content Creation",
      "Account Management",
      "Paid Social Advertising",
      "Influencer Marketing",
      "Analytics and Reporting",
      "Social Listening",
      "Community Management",
      "Training and Consultation",
    ],
  },
  {
    title: "Book Video Creation",
    url: "/services/book-video-creation",
    imgSrc: "/images/services/book-video-creation.webp",
    priceUsd: 1000,
    inclusions: [
      "Book Title and Author",
      "Book Synopsis",
      "Book Cover",
      "Book Quotes",
      "Author Background",
      "Reader Demographic",
      "Visual Aids",
      "Music and Sound Effects",
      "Call to Action",
      "Credits",
    ],
  },
  {
    title: "Author's E-commerce Website",
    url: "/services/author-ecommerce-site",
    imgSrc: "/images/services/author-ecommerce-site.webp",
    priceUsd: 1800,
    inclusions: [
      "Product Listing",
      "Shopping Cart",
      "Payment Getaway",
      "Order Management",
      "Inventory Management",
      "Customer Database",
      "Analytics and Reporting",
      "Content Management System (CMS)",
      "Search Engine Optimization (SEO)",
      "Responsive Design",
      "Security Features",
      "Customer Support",
    ],
  },
  {
    title: "Search Engine Optimization",
    url: "/services/search-engine-optimization",
    imgSrc: "/images/services/search-engine-optimization.webp",
    priceUsd: 4000,
    inclusions: [
      "Keyword Research",
      "On-page Optimization",
      "Off-page Optimization",
      "Technical SEO",
      "Content Marketing",
      "Local SEO",
      "Analytics and Reporting",
    ],
  },
  {
    title: "Author's Blog Site",
    url: "/services/author-blog-site",
    imgSrc: "/images/services/author-blog-site.webp",
    priceUsd: 700,
    inclusions: [
      "Homepage",
      "About Page",
      "Blog Posts",
      "Archives",
      "Categories",
      "Tags",
      "Search Bar",
      "Contact Page",
      "Social Media Links",
      "Comments Section",
    ],
  },
];

const getRandomServices = (number, options = { excludeUrl: undefined }) => {
  const { excludeUrl } = options;

  // catchers for `options` object
  if (
    excludeUrl !== undefined &&
    services.find((s) => s.url === excludeUrl) === undefined
  ) {
    throw Error("Error: url not found in services list!");
  }

  // catchers for bad `number` input
  if (Number(number) === NaN) {
    throw Error("Error: please input a valid number!");
  } else if (
    (number > services.length && excludeUrl === undefined) ||
    (number > services.length - 1 && excludeUrl !== undefined)
  ) {
    throw Error(
      "Error: you cannot retrieve more services than the length of the service list!"
    );
  } else if (number < 0) {
    throw Error("Error: number is out of range!");
  }

  // generates a random number from 0 to `max`
  const generateRandomNumber = (max) => Math.floor(Math.random() * max);

  const randomServices = []; // to be returned later

  let potentialServices =
    excludeUrl === undefined
      ? services.slice(0)
      : services.filter((s) => s.url !== excludeUrl);

  for (let i = 0; i < number; i++) {
    // save a random services to be returned later
    const randomService =
      potentialServices[generateRandomNumber(potentialServices.length)];
    randomServices.push(randomService);
    // remove it from the potentialServices array
    potentialServices = potentialServices.filter(
      (s) => s.url !== randomService.url
    );
  }

  return randomServices;
};

const exports = { services, getRandomServices };

export default exports;
