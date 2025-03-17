const MAX_TAGS = 2;

const TAGS = [
  "Accounting",
  "Business",
  "Consulting",
  "Data Science",
  "Design",
  "Education",
  "Engineering",
  "Finance",
  "HR",
  "Healthcare",
  "Hospitality",
  "IT",
  "In-Person",
  "Legal",
  "Marketing",
  "Operations",
  "Product Mgmt",
  "Research",
  "Sales",
  "Social Media",
  "UX/UI",
  "Virtual",
  "Writing",
];

let API_URL: string;
if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:3002";
} else {
  API_URL = "https://hirespace.greenapp.tech/api";
}

export { MAX_TAGS, TAGS, API_URL };
