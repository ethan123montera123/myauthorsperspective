import { Service } from "../../../interface";
import { config } from "../../../providers";

export const collection = config.firebase.collectionPaths.services;

export const data = [
  {
    title: "Social Media Management Program",
    unitPrice: 1800,
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
    unitPrice: 1000,
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
    unitPrice: 1800,
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
    unitPrice: 4000,
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
    unitPrice: 700,
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
] satisfies Service[];
