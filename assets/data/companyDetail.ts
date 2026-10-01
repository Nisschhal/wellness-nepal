// Client details
// Source of truth: IRD PAN certificate + Google Business Profile.
// Name, address and phone must match the Google Business Profile exactly.
export const COMPANY_DETAILS = {
  brand: {
    name: "WN Wellness Gym Equipment Nepal",
    fullName: "Wellness Gym Equipment Nepal Pvt. Ltd.",
    slogan: "Gym Equipment Supplier in Butwal, Nepal",
    // Matches the Google Business Profile (registered: Navajagaran Tol, Ward 8)
    address: "Tribhuvan Path, Sukhanagar-8, Butwal, Rupandehi, Nepal",
    streetAddress: "Tribhuvan Path, Sukhanagar-8",
    locality: "Butwal",
    region: "Lumbini Province",
    postalCode: "32907",
    // Primary number: must match the Google Business Profile (also WhatsApp)
    phone: "+977-9840967865",
    otherPhones: ["+977-9815459107", "+977-9804830607"],
    // TODO(nap): add the business email once confirmed; hidden while empty
    email: "",
    whatsapp: "https://wa.me/9779840967865",
    pan: "622379544", // PAN/VAT, Inland Revenue Office Butwal
    founded: 2025, // registered Jestha 30, 2082 BS
    hours: { label: "OPEN DAILY: 10:00 - 17:00", opens: "10:00", closes: "17:00" },
    // Same text as the Google Business Profile description
    description:
      "WN Wellness Gym Equipment Nepal is a gym equipment supplier in Sukhanagar, Butwal, delivering across Nepal. We supply commercial and home gym equipment: treadmills, exercise bikes, multi gym and cable machines, Smith machines, benches, power racks, dumbbells and weight plates. We also plan and install complete gym setups for commercial gyms, hotels, schools and homes, with packages for different budgets. We repair and maintain gym equipment. Visit our showroom in Sukhanagar, Butwal, or message us on WhatsApp for a price list, a free gym layout and a quotation.",
  },
  socials: {
    instagram: "https://www.instagram.com/wellness.gym.equipment_nepal/",
    facebook:
      "https://www.facebook.com/people/WN-Wellness-Equipment/61556795123364/",
    tiktok: "https://www.tiktok.com/@wnfitnessnepal",
  } as Record<string, string>,
  googleReviewUrl: "https://g.page/r/CUXMZpBbWlqfECE/review",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=WN+Wellness+Gym+Equipment+Nepal+Butwal",
  // Same 20 entries as the Google Business Profile service area
  serviceAreas: [
    "Butwal",
    "Rupandehi",
    "Lumbini Province",
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Karnali Province",
    "Sudurpashchim Province",
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Pokhara",
    "Bharatpur",
    "Siddharthanagar",
    "Nepalgunj",
    "Biratnagar",
    "Birgunj",
    "Dhangadhi",
    "Hetauda",
  ],
  // Same services and descriptions as the Google Business Profile
  services: [
    {
      name: "Complete commercial gym setup",
      desc: "Full gym setup for commercial gyms in Nepal: layout planning, equipment selection, delivery and installation of cardio machines, strength machines, racks and free weights. Packages for different budgets. Free site visit and quotation in Butwal.",
    },
    {
      name: "Home gym setup",
      desc: "Home gym equipment and setup anywhere in Nepal: treadmills, exercise bikes, benches, dumbbells and multi gym machines chosen for your space and budget.",
    },
    {
      name: "Gym equipment installation",
      desc: "Professional installation of gym machines, treadmills and racks by our trained team. We assemble, level and test every machine and show your staff how to use it safely.",
    },
    {
      name: "Gym layout and design planning",
      desc: "Free gym layout plan for new gyms: we design the floor plan, machine placement and cardio/strength zones for your space, then quote the full equipment list.",
    },
    {
      name: "Gym equipment repair and maintenance",
      desc: "Repair and servicing of treadmills, exercise bikes, cable machines and strength equipment in Butwal and nearby areas. Belt, motor, cable and upholstery repairs.",
    },
    {
      name: "Annual maintenance contract (AMC)",
      desc: "Yearly maintenance plan for commercial gyms: scheduled servicing, lubrication, cable and belt checks, and priority repairs to keep every machine running.",
    },
    {
      name: "Gym equipment delivery across Nepal",
      desc: "Delivery of gym equipment from Butwal to cities across Nepal, with installation on arrival.",
    },
    {
      name: "Gym setup for hotels, schools and offices",
      desc: "Fitness rooms for hotels, resorts, schools, colleges, offices and apartments in Nepal. Compact, durable equipment packages with installation and after-sales service.",
    },
  ],
  terms: [
    "Prices exclusive of 13% VAT.",
    "50% advance for confirmation.",
    "Free delivery in Kathmandu, Butwal Valley.",
    "10-year structural warranty on industrial frames.",
    "Quarterly maintenance visits for the first year.",
  ],
  pillars: [
    { title: "UNBREAKABLE", desc: "12-gauge cold-rolled steel frames." },
    { title: "PRECISION", desc: "Biomechanical engineering for safety." },
    {
      title: "LOGISTICS",
      desc: "Nationwide support in every district of Nepal.",
    },
    { title: "ADVISORY", desc: "B2B consultancy on ROI and gym sales." },
  ],
}
