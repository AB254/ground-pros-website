import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.admin.upsert({
    where: { email: "admin@groundpros.com" },
    update: {},
    create: {
      email: "admin@groundpros.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  await prisma.heroSection.deleteMany();
  await prisma.heroSection.create({
    data: {
      heading: "GROUND PROS INC.",
      subheading: "Chicagoland's Premier Commercial Landscape Partner",
      tagline: "25+ Years of Landscaping Excellence",
      ctaPrimaryText: "Request a Consultation",
      ctaPrimaryLink: "#contact",
      ctaSecondaryText: "Our Services",
      ctaSecondaryLink: "#services",
    },
  });

  await prisma.statItem.deleteMany();
  const stats = [
    { number: "25+", label: "Years Experience", sortOrder: 0 },
    { number: "500+", label: "Properties Managed", sortOrder: 1 },
    { number: "100%", label: "Client Satisfaction", sortOrder: 2 },
    { number: "24/7", label: "Snow Response", sortOrder: 3 },
  ];
  for (const stat of stats) {
    await prisma.statItem.create({ data: stat });
  }

  await prisma.service.deleteMany();
  const services = [
    {
      title: "Landscape Management",
      slug: "landscape-management",
      shortDesc:
        "Comprehensive grounds maintenance including mowing, trimming, fertilizing, weed and pest control, soil conditioning, and leaf removal.",
      fullDesc:
        "Our full-service landscape management program keeps your property looking its best year-round. From precision mowing and detailed trimming to proactive fertilization and integrated pest management, we handle every aspect of your grounds maintenance with professional care and attention to detail.",
      iconName: "Trees",
      sortOrder: 0,
      features: JSON.parse(
        '["Precision mowing and edging","Shrub and hedge trimming","Fertilization programs","Weed and pest control","Soil conditioning","Fall and spring leaf removal"]'
      ),
    },
    {
      title: "Snow and Ice Management",
      slug: "snow-ice-management",
      shortDesc:
        "24/7 emergency snow and ice response to keep your commercial property safe and accessible throughout winter.",
      fullDesc:
        "When winter storms hit, Ground Pros responds with 24/7 emergency snow and ice management services. Our fleet of equipment and trained crews ensure your property remains safe and accessible for employees, customers, and visitors.",
      iconName: "Snowflake",
      sortOrder: 1,
      features: JSON.parse(
        '["24/7 emergency response","Snow plowing and hauling","Sidewalk clearing","De-icing and salt application","Roof snow removal","Storm monitoring and dispatch"]'
      ),
    },
    {
      title: "Landscape Installation",
      slug: "landscape-installation",
      shortDesc:
        "Custom landscape design and installation to enhance your property's curb appeal and value.",
      fullDesc:
        "Transform your property with custom landscape installations designed to enhance curb appeal, improve functionality, and increase property value. From hardscapes to softscapes, our design team creates beautiful, sustainable outdoor spaces.",
      iconName: "Shovel",
      sortOrder: 2,
      features: JSON.parse(
        '["Custom landscape design","Hardscape installation","Softscape planting","Irrigation system installation","Outdoor lighting","Retaining walls and pavers"]'
      ),
    },
    {
      title: "Turf and Plant Health Care",
      slug: "turf-plant-health-care",
      shortDesc:
        "Scientific approach to maintaining healthy, vibrant turf and plant material on your property.",
      fullDesc:
        "Our certified professionals use a scientific approach to turf and plant health care. We diagnose issues, develop treatment plans, and implement proactive programs to keep your landscape healthy and thriving.",
      iconName: "Leaf",
      sortOrder: 3,
      features: JSON.parse(
        '["Soil testing and analysis","Custom fertilization programs","Disease and insect management","Aeration and overseeding","Tree and shrub care","Root zone management"]'
      ),
    },
    {
      title: "Irrigation Management",
      slug: "irrigation-management",
      shortDesc:
        "Efficient irrigation system design, installation, and management to conserve water and maintain healthy landscapes.",
      fullDesc:
        "Our irrigation management services ensure your landscape receives the right amount of water at the right time. We design, install, and maintain efficient irrigation systems that conserve water while keeping your property green and healthy.",
      iconName: "Droplets",
      sortOrder: 4,
      features: JSON.parse(
        '["System design and installation","Seasonal start-up and winterization","Smart controller programming","Leak detection and repair","Water audits","Backflow testing"]'
      ),
    },
    {
      title: "Seasonal Color Programs",
      slug: "seasonal-color-programs",
      shortDesc:
        "Vibrant seasonal flower and plant installations that keep your property colorful and inviting all year long.",
      fullDesc:
        "Add year-round visual impact with our seasonal color programs. We design and install vibrant flower beds and container plantings that change with the seasons, ensuring your property always makes a stunning first impression.",
      iconName: "Flower2",
      sortOrder: 5,
      features: JSON.parse(
        '["Spring annual installations","Summer color rotations","Fall mum and ornamental displays","Holiday decorating","Container programs","Custom color design"]'
      ),
    },
  ];
  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  await prisma.aboutSection.deleteMany();
  await prisma.aboutSection.create({
    data: {
      heading: "Why Chicagoland Trusts Ground Pros",
      bodyText:
        "For over 25 years, Ground Pros Inc. has been the trusted landscape partner for commercial properties across the Chicagoland area. Our mission is to create raving fans by adhering to our core values of excellence, integrity, and innovation. From corporate campuses to healthcare facilities, we deliver landscaping excellence with creative solutions and quality craftsmanship that transforms properties and exceeds expectations.",
      bullets: [
        { icon: "Award", text: "Award-Winning Landscape Management" },
        { icon: "Shield", text: "Certified & Insured Professionals" },
        { icon: "Clock", text: "24/7 Emergency Snow Response" },
        { icon: "Leaf", text: "Sustainable & Eco-Friendly Practices" },
      ],
      images: [],
    },
  });

  await prisma.testimonial.deleteMany();
  const testimonials = [
    {
      quote:
        "Ground Pros has been maintaining our corporate campus for over 10 years. Their attention to detail and proactive communication make them an invaluable partner. Our property has never looked better.",
      clientName: "Sarah Mitchell",
      clientTitle: "Property Manager",
      company: "Corporate Campus Solutions",
      rating: 5,
      sortOrder: 0,
    },
    {
      quote:
        "When it comes to snow and ice management, Ground Pros is second to none. Their 24/7 response and meticulous service keep our hospital campus safe for patients, visitors, and staff throughout the harsh Chicago winters.",
      clientName: "Dr. Robert Chen",
      clientTitle: "Director of Facilities",
      company: "Regional Medical Center",
      rating: 5,
      sortOrder: 1,
    },
    {
      quote:
        "We've worked with several landscape companies over the years, but Ground Pros stands above the rest. Their seasonal color programs transform our retail center and our tenants couldn't be happier.",
      clientName: "Jennifer Adams",
      clientTitle: "HOA President",
      company: "Parkview Community Association",
      rating: 5,
      sortOrder: 2,
    },
  ];
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  await prisma.affiliation.deleteMany();
  const affiliations = [
    {
      name: "National Association of Landscape Professionals",
      logoUrl: "/images/affiliations/nalp.png",
      website: "https://www.landscapeprofessionals.org",
      sortOrder: 0,
    },
    {
      name: "BOMA Suburban Chicago",
      logoUrl: "/images/affiliations/boma.png",
      website: "https://www.bomasuburban.org",
      sortOrder: 1,
    },
    {
      name: "Illinois Landscape Contractors Association",
      logoUrl: "/images/affiliations/ilca.png",
      website: "https://www.ilca.net",
      sortOrder: 2,
    },
    {
      name: "American Green Zone Alliance",
      logoUrl: "/images/affiliations/agza.png",
      website: "https://www.agza.net",
      sortOrder: 3,
    },
  ];
  for (const affiliation of affiliations) {
    await prisma.affiliation.create({ data: affiliation });
  }

  await prisma.ctaBanner.deleteMany();
  await prisma.ctaBanner.create({
    data: {
      heading: "Ready to Transform Your Property?",
      subtext:
        "Get a free consultation and custom landscape management proposal",
      buttonText: "Get Your Free Quote",
      buttonLink: "#contact",
    },
  });

  await prisma.contactInfo.deleteMany();
  await prisma.contactInfo.create({
    data: {
      address: "1470 Industrial Dr, Itasca, IL 60143",
      phone: "(630) 993-1400",
      fax: "(630) 993-1430",
      email: "info@groundpros.com",
      businessHours: [
        { day: "Monday - Friday", hours: "7:00 AM - 5:00 PM" },
        { day: "Saturday", hours: "By Appointment" },
        { day: "Sunday", hours: "Closed" },
      ],
      socialLinks: {
        instagram: "https://www.instagram.com/groundprosinc",
        linkedin: "https://www.linkedin.com/company/ground-pros-inc",
        facebook: "",
      },
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2962.5!2d-88.0!3d41.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU4JzQ4LjAiTiA4OMKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890",
      notificationEmail: "info@groundpros.com",
    },
  });

  await prisma.footerContent.deleteMany();
  await prisma.footerContent.create({
    data: {
      description:
        "Ground Pros Inc. has been providing premier commercial landscape management services to the Chicagoland area for over 25 years. We are committed to landscaping excellence, creative solutions, and quality craftsmanship.",
      quickLinks: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Gallery", url: "/gallery" },
        { label: "Careers", url: "/careers" },
        { label: "Contact", url: "/contact" },
      ],
      copyright: "© 2025 Ground Pros Inc. All rights reserved.",
      showNewsletter: true,
    },
  });

  await prisma.seoSettings.deleteMany();
  const seoPages = [
    {
      page: "home",
      metaTitle:
        "Ground Pros Inc. | Commercial Landscape Management | Chicagoland",
      metaDesc:
        "Premier commercial landscape management in the Chicagoland area. 25+ years of landscaping excellence, creative solutions, and quality craftsmanship.",
    },
    {
      page: "about",
      metaTitle: "About Ground Pros Inc. | Our Story & Mission",
      metaDesc:
        "Learn about Ground Pros Inc., Chicagoland's trusted commercial landscape partner for over 25 years.",
    },
    {
      page: "services",
      metaTitle: "Commercial Landscaping Services | Ground Pros Inc.",
      metaDesc:
        "Full-service commercial landscape management including maintenance, snow removal, irrigation, and seasonal color programs.",
    },
    {
      page: "gallery",
      metaTitle: "Project Gallery | Ground Pros Inc.",
      metaDesc:
        "View our portfolio of commercial landscape projects across the Chicagoland area.",
    },
    {
      page: "careers",
      metaTitle: "Careers at Ground Pros Inc. | Join Our Team",
      metaDesc:
        "Explore career opportunities at Ground Pros Inc. Join our team of landscape professionals.",
    },
    {
      page: "contact",
      metaTitle: "Contact Ground Pros Inc. | Get a Free Quote",
      metaDesc:
        "Contact Ground Pros Inc. for a free consultation and custom landscape management proposal. Located in Itasca, IL.",
    },
  ];
  for (const seo of seoPages) {
    await prisma.seoSettings.create({ data: seo });
  }

  await prisma.generalSettings.deleteMany();
  await prisma.generalSettings.create({
    data: {
      siteName: "Ground Pros Inc.",
      siteTagline:
        "Landscaping Excellence, Creative Solutions, Quality Craftsmanship",
      primaryColor: "#2d5016",
      secondaryColor: "#3a5a1c",
      accentColor: "#8fbc4a",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
