const firebaseData = [
  {
    id: "J4Wvbm04PMfrLtq52JU4",
    priceTier: {
      default: "basic",
      premium: { level: 1, price: 2000 },
      basic: { level: 0, price: 1500 },
    },
    title: "Author's Blog Site",
    inclusions: [
      { tier: "basic", name: "Homepage", id: 1 },
      { tier: "basic", name: "About Page", id: 2 },
      { tier: "basic", name: "Blog Posts", id: 3 },
      { tier: "basic", name: "Contact Page", id: 4 },
      { tier: "basic", name: "Social Media Links", id: 5 },
      { tier: "premium", name: "Archives", id: 6 },
      { tier: "premium", name: "Categories", id: 7 },
      { tier: "premium", name: "Tags", id: 8 },
      { tier: "premium", name: "Search Bar", id: 9 },
      { tier: "premium", name: "Comments Section", id: 10 },
    ],
  },
  {
    id: "bOM1quqrDOqKHKdUWWwN",
    priceTier: {
      default: "basic",
      basic: { level: 0, price: 1800 },
    },
    title: "Social Media Management Program",
    inclusions: [
      { tier: "basic", name: "Social Media Strategy", id: 1 },
      { tier: "basic", name: "Content Creation", id: 2 },
      { tier: "basic", name: "Account Management", id: 3 },
      { tier: "basic", name: "Paid Social Advertising", id: 4 },
      { tier: "basic", name: "Influencer Marketing", id: 5 },
      { tier: "basic", name: "Analytics and Reporting", id: 6 },
      { tier: "basic", name: "Social Listening", id: 7 },
      { tier: "basic", name: "Community Management", id: 8 },
      { tier: "basic", name: "Training and Consultation", id: 9 },
    ],
  },
  {
    id: "gTOpZnGAC9ByAeyek8W0",
    priceTier: {
      default: "basic",
      basic: { level: 0, price: 1800 },
    },
    title: "Author's E-commerce Website",
    inclusions: [
      { tier: "basic", name: "Product Listing", id: 1 },
      { tier: "basic", name: "Shopping Cart", id: 2 },
      { tier: "basic", name: "Payment Getaway", id: 3 },
      { tier: "basic", name: "Order Management", id: 4 },
      { tier: "basic", name: "Inventory Management", id: 5 },
      { tier: "basic", name: "Customer Database", id: 6 },
      { tier: "basic", name: "Analytics and Reporting", id: 7 },
      { tier: "basic", name: "Content Management System (CMS)", id: 8 },
      { tier: "basic", name: "Search Engine Optimization (SEO)", id: 9 },
      { tier: "basic", name: "Responsive Design", id: 10 },
      { tier: "basic", name: "Security Features", id: 11 },
      { tier: "basic", name: "Customer Support", id: 12 },
    ],
  },
  {
    id: "jQNbJuv5eg8Sp55THM3X",
    priceTier: {
      default: "basic",
      basic: { level: 0, price: 1800 },
    },
    title: "Book Video Creation",
    inclusions: [
      { tier: "basic", name: "Book Title and Author", id: 1 },
      { tier: "basic", name: "Book Synopsis", id: 2 },
      { tier: "basic", name: "Book Cover", id: 3 },
      { tier: "basic", name: "Book Quotes", id: 4 },
      { tier: "basic", name: "Author Background", id: 5 },
      { tier: "basic", name: "Reader Demographic", id: 6 },
      { tier: "basic", name: "Visual Aids", id: 7 },
      { tier: "basic", name: "Music and Sound Effects", id: 8 },
      { tier: "basic", name: "Call to Action", id: 9 },
      { tier: "basic", name: "Credits", id: 10 },
    ],
  },
  {
    id: "HFRdyLzZSwyq4jtdGflS",
    priceTier: {
      default: "basic",
      basic: { level: 0, price: 4000 },
    },
    title: "Search Engine Optimization",
    inclusions: [
      { tier: "basic", name: "Keyword Research", id: 1 },
      { tier: "basic", name: "On-page Optimization", id: 2 },
      { tier: "basic", name: "Off-page Optimization", id: 3 },
      { tier: "basic", name: "Technical SEO", id: 4 },
      { tier: "basic", name: "Content Marketing", id: 5 },
      { tier: "basic", name: "Local SEO", id: 6 },
      { tier: "basic", name: "Analytics and Reporting", id: 7 },
    ],
  },
];

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
    priceUsd: 1800,
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
    priceUsd: 1500,
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

/**
 *
 * @param {number} number the number of services to retrieve, can not exceed length of `services` array
 * @param {options} object options.excludeUrl specifies the service URL to not include in the random choices
 * @returns {[ ...services ]} an array of the service objects
 */
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

/**
 * @param {serviceName} string the service name to get the inclusions array form
 * @returns {string[]} an array of strings representing the inclusions of the `serviceName`
 */
const getInclusionsOfService = (serviceName) => {
  return services.find((s) => s.title === serviceName).inclusions;
};

export {
  firebaseData as rawServices,
  services,
  getRandomServices,
  getInclusionsOfService,
};
