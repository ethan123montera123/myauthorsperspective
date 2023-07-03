import { Service, ServiceInclusion } from "../../../interface";
import { config } from "../../../providers";

/**
 * Apply IDs to an array of values based on their indices.
 *
 * @param arr An array to be applied with .
 * @return Array with values mapped with ids.
 */
function applyIds<T extends string>(
  arr: Omit<ServiceInclusion<T>, "id">[]
): ServiceInclusion<T>[] {
  return arr.map((v, idx) => ({ id: idx + 1, ...v }));
}

export const collection = config.firebase.collections.SERVICES;

export const data = [
  {
    title: "Social Media Management Program",
    priceTier: {
      default: "basic",
      basic: {
        level: 0,
        price: 1800,
      },
    },
    inclusions: applyIds([
      { tier: "basic", name: "Social Media Strategy" },
      { tier: "basic", name: "Content Creation" },
      { tier: "basic", name: "Account Management" },
      { tier: "basic", name: "Paid Social Advertising" },
      { tier: "basic", name: "Influencer Marketing" },
      { tier: "basic", name: "Analytics and Reporting" },
      { tier: "basic", name: "Social Listening" },
      { tier: "basic", name: "Community Management" },
      { tier: "basic", name: "Training and Consultation" },
    ]),
  },
  {
    title: "Book Video Creation",
    priceTier: {
      default: "basic",
      basic: {
        level: 0,
        price: 1000,
      },
    },
    inclusions: applyIds([
      { tier: "basic", name: "Book Title and Author" },
      { tier: "basic", name: "Book Synopsis" },
      { tier: "basic", name: "Book Cover" },
      { tier: "basic", name: "Book Quotes" },
      { tier: "basic", name: "Author Background" },
      { tier: "basic", name: "Reader Demographic" },
      { tier: "basic", name: "Visual Aids" },
      { tier: "basic", name: "Music and Sound Effects" },
      { tier: "basic", name: "Call to Action" },
      { tier: "basic", name: "Credits" },
    ]),
  },
  {
    title: "Author's E-commerce Website",
    priceTier: {
      default: "basic",
      basic: {
        level: 0,
        price: 1800,
      },
    },
    inclusions: applyIds([
      { tier: "basic", name: "Product Listing" },
      { tier: "basic", name: "Shopping Cart" },
      { tier: "basic", name: "Payment Getaway" },
      { tier: "basic", name: "Order Management" },
      { tier: "basic", name: "Inventory Management" },
      { tier: "basic", name: "Customer Database" },
      { tier: "basic", name: "Analytics and Reporting" },
      { tier: "basic", name: "Content Management System (CMS)" },
      { tier: "basic", name: "Search Engine Optimization (SEO)" },
      { tier: "basic", name: "Responsive Design" },
      { tier: "basic", name: "Security Features" },
      { tier: "basic", name: "Customer Support" },
    ]),
  },
  {
    title: "Search Engine Optimization",
    priceTier: {
      default: "basic",
      basic: {
        level: 0,
        price: 4000,
      },
    },
    inclusions: applyIds([
      { tier: "basic", name: "Keyword Research" },
      { tier: "basic", name: "On-page Optimization" },
      { tier: "basic", name: "Off-page Optimization" },
      { tier: "basic", name: "Technical SEO" },
      { tier: "basic", name: "Content Marketing" },
      { tier: "basic", name: "Local SEO" },
      { tier: "basic", name: "Analytics and Reporting" },
    ]),
  },
  {
    title: "Author's Blog Site",
    priceTier: {
      default: "basic",
      basic: {
        level: 0,
        price: 1500,
      },
      premium: {
        level: 1,
        price: 2000,
      },
    },
    inclusions: applyIds([
      { tier: "basic", name: "Homepage" },
      { tier: "basic", name: "About Page" },
      { tier: "basic", name: "Blog Posts" },
      { tier: "basic", name: "Contact Page" },
      { tier: "basic", name: "Social Media Links" },
      { tier: "premium", name: "Archives" },
      { tier: "premium", name: "Categories" },
      { tier: "premium", name: "Tags" },
      { tier: "premium", name: "Search Bar" },
      { tier: "premium", name: "Comments Section" },
    ]),
  },
] satisfies Service[];
