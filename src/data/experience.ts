export type ExperienceItem = {
  company: string;
  title: string;
  location?: string;
  start: string; // ISO-like: '2023-08'
  end?: string;  // 'Present' if undefined
  employmentType?: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  bullets: string[];
  skills?: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Systems Limited",
    title: "Consultant",
    location: "Karachi, Pakistan",
    employmentType: "Full-time",
    start: "2024-08",
    bullets: [
      "Contributed to middleware for a bank; built REST & SOAP services for mobile & internet banking.",
      "Key contributor in Google Wallet implementation.",
      "Delivered Java-based routines/customizations for Temenos Transact (T24): Customer, Accounts, Limits & Collaterals."
    ],
    skills: ["Node.js", "Express.js", "Java", "SOAP", "REST"]
  },
  {
    company: "Systems Limited",
    title: "Junior Consultant",
    location: "Karachi, Pakistan",
    employmentType: "Full-time",
    start: "2023-08",
    end: "2024-08",
    bullets: [
      "Java development for Core Banking modules (AA Arrangements, Accounts).",
      "Automated dormancy handling services; built middleware APIs to integrate Core Banking via input streams.",
      "Debugged and supported UAT/Prod issues across Oracle Service Bus & NodeJS middleware."
    ],
    skills: ["Temenos T24", "Java", "OSB", "Node.js"]
  }
];