import { getPayload } from "payload";
import configPromise from "@payload-config";

const constantCategories = [
  {
    name: "Electronics",
    slug: "electronics",
    subcategories: [
      {
        name: "Audio",
        slug: "audio",
      },
      {
        name: "Camera & Photo",
        slug: "camera-photo",
      },
      {
        name: "Computer Accessories",
        slug: "computer-accessories",
      },
      {
        name: "Cellphone Accessories",
        slug: "cellphone-accessories",
      },
      {
        name: "Headphones",
        slug: "headphones",
      },
      {
        name: "Home Theater",
        slug: "home-theater",
      },
    ],
  },
  {
    name: "Computers",
    slug: "computers",
    subcategories: [
      {
        name: "Laptops",
        slug: "laptops",
      },
      {
        name: "Desktops",
        slug: "desktops",
      },
      {
        name: "Components",
        slug: "components",
      },
      {
        name: "Data Storage",
        slug: "data-storage",
      },
      {
        name: "Monitors",
        slug: "monitors",
      },
      {
        name: "Networking",
        slug: "networking",
      },
    ],
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    subcategories: [
      {
        name: "Furniture",
        slug: "furniture",
      },
      {
        name: "Bedding",
        slug: "bedding",
      },
      {
        name: "Kitchen Appliances",
        slug: "kitchen-appliances",
      },
      {
        name: "Home Decor",
        slug: "home-decor",
      },
      {
        name: "Storage & Organization",
        slug: "storage-organization",
      },
      {
        name: "Cookware",
        slug: "cookware",
      },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    subcategories: [
      {
        name: "Men's Clothing",
        slug: "mens-clothing",
      },
      {
        name: "Women's Clothing",
        slug: "womens-clothing",
      },
      {
        name: "Shoes",
        slug: "shoes",
      },
      {
        name: "Watches",
        slug: "watches",
      },
      {
        name: "Jewelry",
        slug: "jewelry",
      },
      {
        name: "Bags & Luggage",
        slug: "bags-luggage",
      },
    ],
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    subcategories: [
      {
        name: "Exercise & Fitness",
        slug: "exercise-fitness",
      },
      {
        name: "Camping & Hiking",
        slug: "camping-hiking",
      },
      {
        name: "Cycling",
        slug: "cycling",
      },
      {
        name: "Water Sports",
        slug: "water-sports",
      },
      {
        name: "Team Sports",
        slug: "team-sports",
      },
      {
        name: "Outdoor Recreation",
        slug: "outdoor-recreation",
      },
    ],
  },
  {
    name: "Books & Media",
    slug: "books-media",
    subcategories: [
      {
        name: "Books",
        slug: "books",
      },
      {
        name: "Movies & TV",
        slug: "movies-tv",
      },
      {
        name: "Music",
        slug: "music",
      },
      {
        name: "Video Games",
        slug: "video-games",
      },
      {
        name: "Magazines",
        slug: "magazines",
      },
      {
        name: "Digital Content",
        slug: "digital-content",
      },
    ],
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    subcategories: [
      {
        name: "Skincare",
        slug: "skincare",
      },
      {
        name: "Makeup",
        slug: "makeup",
      },
      {
        name: "Hair Care",
        slug: "hair-care",
      },
      {
        name: "Fragrances",
        slug: "fragrances",
      },
      {
        name: "Personal Care",
        slug: "personal-care",
      },
      {
        name: "Bath & Body",
        slug: "bath-body",
      },
    ],
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    subcategories: [
      {
        name: "Action Figures",
        slug: "action-figures",
      },
      {
        name: "Board Games",
        slug: "board-games",
      },
      {
        name: "Puzzles",
        slug: "puzzles",
      },
      {
        name: "Building Toys",
        slug: "building-toys",
      },
      {
        name: "Dolls & Accessories",
        slug: "dolls-accessories",
      },
      {
        name: "Educational Toys",
        slug: "educational-toys",
      },
    ],
  },
  {
    name: "Automotive",
    slug: "automotive",
    subcategories: [
      {
        name: "Car Electronics",
        slug: "car-electronics",
      },
      {
        name: "Exterior Accessories",
        slug: "exterior-accessories",
      },
      {
        name: "Interior Accessories",
        slug: "interior-accessories",
      },
      {
        name: "Tools & Equipment",
        slug: "tools-equipment",
      },
      {
        name: "Car Care",
        slug: "car-care",
      },
      {
        name: "Replacement Parts",
        slug: "replacement-parts",
      },
    ],
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
    subcategories: [
      {
        name: "Baby Gear",
        slug: "baby-gear",
      },
      {
        name: "Diapering",
        slug: "diapering",
      },
      {
        name: "Feeding",
        slug: "feeding",
      },
      {
        name: "Baby Care",
        slug: "baby-care",
      },
      {
        name: "Kids' Furniture",
        slug: "kids-furniture",
      },
      {
        name: "Safety Products",
        slug: "safety-products",
      },
    ],
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    subcategories: [
      {
        name: "Dog Supplies",
        slug: "dog-supplies",
      },
      {
        name: "Cat Supplies",
        slug: "cat-supplies",
      },
      {
        name: "Fish & Aquatic Pets",
        slug: "fish-aquatic-pets",
      },
      {
        name: "Bird Supplies",
        slug: "bird-supplies",
      },
      {
        name: "Small Animals",
        slug: "small-animals",
      },
      {
        name: "Pet Health",
        slug: "pet-health",
      },
    ],
  },
  {
    name: "Office Products",
    slug: "office-products",
    subcategories: [
      {
        name: "Office Supplies",
        slug: "office-supplies",
      },
      {
        name: "Office Electronics",
        slug: "office-electronics",
      },
      {
        name: "Office Furniture",
        slug: "office-furniture",
      },
      {
        name: "School Supplies",
        slug: "school-supplies",
      },
      {
        name: "Filing & Organization",
        slug: "filing-organization",
      },
      {
        name: "Presentation Boards",
        slug: "presentation-boards",
      },
    ],
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    subcategories: [
      {
        name: "Vitamins & Supplements",
        slug: "vitamins-supplements",
      },
      {
        name: "Medical Supplies",
        slug: "medical-supplies",
      },
      {
        name: "Fitness Equipment",
        slug: "fitness-equipment",
      },
      {
        name: "Wellness Products",
        slug: "wellness-products",
      },
      {
        name: "Health Monitors",
        slug: "health-monitors",
      },
      {
        name: "Mobility Aids",
        slug: "mobility-aids",
      },
    ],
  },
  {
    name: "Garden & Outdoor",
    slug: "garden-outdoor",
    subcategories: [
      {
        name: "Gardening Tools",
        slug: "gardening-tools",
      },
      {
        name: "Plants & Seeds",
        slug: "plants-seeds",
      },
      {
        name: "Outdoor Furniture",
        slug: "outdoor-furniture",
      },
      {
        name: "Grills & Outdoor Cooking",
        slug: "grills-outdoor-cooking",
      },
      {
        name: "Lawn Care",
        slug: "lawn-care",
      },
      {
        name: "Patio Decor",
        slug: "patio-decor",
      },
    ],
  },
  {
    name: "Musical Instruments",
    slug: "musical-instruments",
    subcategories: [
      {
        name: "Guitars",
        slug: "guitars",
      },
      {
        name: "Keyboards & Pianos",
        slug: "keyboards-pianos",
      },
      {
        name: "Drums & Percussion",
        slug: "drums-percussion",
      },
      {
        name: "Wind Instruments",
        slug: "wind-instruments",
      },
      {
        name: "Studio Recording",
        slug: "studio-recording",
      },
      {
        name: "DJ Equipment",
        slug: "dj-equipment",
      },
    ],
  },
  {
    name: "Gift Cards",
    slug: "gift-cards",
  },
  {
    name: "Handmade",
    slug: "handmade",
  },
  {
    name: "Grocery",
    slug: "grocery",
  },
  {
    name: "Industrial & Scientific",
    slug: "industrial-scientific",
  },
  {
    name: "Collectibles & Fine Art",
    slug: "collectibles-fine-art",
  },
];

const seed = async () => {
  const payload = await getPayload({ config: configPromise });

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "meetsanghvi2347@gmail.com",
      password: "Meet4654$$",
      roles: ["super-admin"],
      username: "admin",
      tenants: [{ tenant: adminTenant.id }],
    },
  });

  for (const category of constantCategories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("SuccessFull Seeding");
  process.exit(0);
} catch (e) {
  console.error("Error Seeding:", e);
  process.exit(1);
}
