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

  const admin101Password = await bcrypt.hash("admin101", 12);
  await prisma.admin.upsert({
    where: { email: "admin101@groundpros.com" },
    update: { password: admin101Password, role: "editor" },
    create: {
      email: "admin101@groundpros.com",
      password: admin101Password,
      name: "admin101",
      role: "editor",
    },
  });

  await prisma.heroSection.deleteMany();
  await prisma.heroSection.create({
    data: {
      heading: "GROUND PROS INC.",
      subheading: "Chicagoland's Premier Commercial Landscape Partner",
      tagline: "Landscaping Excellence, Creative Solutions, Quality Craftsmanship",
      imageUrl: "https://www.groundpros.com/wp-content/uploads/2020/05/intro_web.jpg",
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
        "Award-winning commercial landscape management. Our motivated and experienced team is focused on building long-term relationships and delivering consistent quality that meets your needs, budget and site requirements.",
      fullDesc:
        "Ground Pros Inc. is an award-winning company specializing in commercial landscape management. Our motivated and experienced team is focused on building long-term relationships and delivering consistent quality that meets your needs, budget and site requirements. From precision mowing and detailed trimming to proactive fertilization and integrated pest management, we handle every aspect of your grounds maintenance.",
      iconName: "Trees",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/Service-Banner7.jpg",
      sortOrder: 0,
      features: JSON.parse(
        '["Precision mowing and edging","Shrub and hedge trimming","Fertilization programs","Weed and pest control","Soil conditioning","Fall and spring leaf removal"]'
      ),
    },
    {
      title: "Snow and Ice Management",
      slug: "snow-ice-management",
      shortDesc:
        "Snow and ice management is critical when it comes to the safety and protection of your property. We offer zero tolerance, seasonal or per push contracts with 24/7 response.",
      fullDesc:
        "Snow and ice management is critical when it comes to the safety and protection of your property. We offer zero tolerance, seasonal or per push contracts and have the team available to provide the service you desire. Our 24/7 response includes company staffed help desk, consulting meteorologist on staff, and GPS tracking on all equipment.",
      iconName: "Snowflake",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/Service-Banner5.jpg",
      sortOrder: 1,
      features: JSON.parse(
        '["24/7 emergency response","Snow plowing and hauling","Sidewalk clearing","De-icing and salt application","Roof snow removal","Storm monitoring and dispatch"]'
      ),
    },
    {
      title: "Landscape Installation",
      slug: "landscape-installation",
      shortDesc:
        "Our installation team recognizes that first impressions are key. From small enhancement projects to complete outdoor transformations, it is our goal to end any project with a satisfied client.",
      fullDesc:
        "Our installation team recognizes that first impressions are key. From small enhancement projects to complete outdoor transformations, it is our goal to end any project with a satisfied client. We offer design ideas for new or existing landscapes, digital design services, native and sustainable planting, seasonal color programs, and proactive plant care initiatives.",
      iconName: "Shovel",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/Service-Banner4.jpg",
      sortOrder: 2,
      features: JSON.parse(
        '["Custom landscape design","Hardscape installation","Softscape planting","Irrigation system installation","Outdoor lighting","Retaining walls and pavers"]'
      ),
    },
    {
      title: "Turf and Plant Health Care",
      slug: "turf-plant-health-care",
      shortDesc:
        "The key to maintaining a healthy property is through turf and plant healthcare. Our in-house, certified technicians complement our full-service landscape management program.",
      fullDesc:
        "The key to maintaining a healthy property is through turf and plant healthcare. Our in-house, certified technicians complement our full-service landscape management program. Services include fertilization, weed control, insect and disease control, core aeration, over seeding, selective pruning, deep root feeding, and proactive plant care programs.",
      iconName: "Leaf",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/IMG_7468.jpg",
      sortOrder: 3,
      features: JSON.parse(
        '["Soil testing and analysis","Custom fertilization programs","Disease and insect management","Aeration and overseeding","Tree and shrub care","Root zone management"]'
      ),
    },
    {
      title: "Irrigation Management",
      slug: "irrigation-management",
      shortDesc:
        "Proper irrigation is essential to the health of your turf and plants. Maintaining your irrigation system is vital to protecting your landscape investment.",
      fullDesc:
        "Proper irrigation is essential to the health of your turf and plants. Maintaining your irrigation system is vital to protecting your landscape investment. We provide spring start up, mid-season audits, winterization, weekly monitoring programs, and water conservation services.",
      iconName: "Droplets",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/Irrigation-new-header_0000_Irrigation-new-header-.jpg",
      sortOrder: 4,
      features: JSON.parse(
        '["System design and installation","Seasonal start-up and winterization","Smart controller programming","Leak detection and repair","Water audits","Backflow testing"]'
      ),
    },
    {
      title: "Seasonal Color Programs",
      slug: "seasonal-color-programs",
      shortDesc:
        "Ground Pros Inc. recognizes quality, efficient workmanship and is committed to safety, while beautifying and preserving the environment with vibrant seasonal displays.",
      fullDesc:
        "Ground Pros Inc. recognizes quality, efficient workmanship and is committed to safety, while beautifying and preserving the environment. Our seasonal color services include flower bed planting, native plant installations, seasonal displays with bulbs, annuals, perennials, and winter arrangements, design concepts, mulch application, and plant maintenance and replacement.",
      iconName: "Flower2",
      bgImageUrl: "https://www.groundpros.com/wp-content/uploads/2017/10/Untitled-design-3-300x250.png",
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
      images: ["https://www.groundpros.com/wp-content/uploads/2014/07/About-Us-Mike-Gina-300x240.jpg"],
    },
  });

  await prisma.testimonial.deleteMany();
  const testimonials = [
    {
      quote:
        "Our 26-acre campus has never looked better in its 12 year history. Ground Pros has done a fantastic job over the past two years with professional supervision and efficient budget management.",
      clientName: "Executive Director",
      clientTitle: "Executive Director",
      company: "Corporate Campus",
      rating: 5,
      sortOrder: 0,
    },
    {
      quote:
        "The follow-up and customer service given by Ground Pros is substantial. I continue to support Ground Pros for landscaping and snow services. Superb work and performance — impressed each season.",
      clientName: "Property Manager",
      clientTitle: "Property Manager",
      company: "Community Association Management",
      rating: 5,
      sortOrder: 1,
    },
    {
      quote:
        "It gives me peace of mind knowing the landscape needs are being addressed. I have never had to call to have the grass cut. The landscaping of the facility looks great, thanks to Ground Pros. The seasonal flowers are installed on time. Tremendous service.",
      clientName: "Director of Facilities",
      clientTitle: "Director of Facilities",
      company: "Hospital Campus",
      rating: 5,
      sortOrder: 2,
    },
    {
      quote:
        "Our account manager went above and beyond getting me the flowers! He planted the flowers himself and they look great! Everyone has commented on how beautiful they are.",
      clientName: "Property Manager",
      clientTitle: "Property Manager",
      company: "Commercial Management",
      rating: 5,
      sortOrder: 3,
    },
    {
      quote:
        "Ground Pros has dramatically improved the condition and appearance of our vast common areas with great attention to detail across our 1,440-home community. Their professionalism is second to none.",
      clientName: "Board President",
      clientTitle: "Board President",
      company: "Homeowner's Association, Plainfield IL",
      rating: 5,
      sortOrder: 4,
    },
    {
      quote:
        "I've worked with Ground Pros for the last five years. Knowledgeable staff that works together from the Account Managers to the crews. Always helpful with suggestions on landscaping improvements and great teamwork.",
      clientName: "Property Manager",
      clientTitle: "Property Manager",
      company: "Commercial Management Company",
      rating: 5,
      sortOrder: 5,
    },
  ];
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  await prisma.affiliation.deleteMany();
  const affiliations = [
    {
      name: "National Association of Landscape Professionals",
      logoUrl: "https://www.groundpros.com/wp-content/uploads/2015/03/NALP.jpg",
      website: "https://www.landscapeprofessionals.org",
      sortOrder: 0,
    },
    {
      name: "BOMA Suburban Chicago",
      logoUrl: "https://www.groundpros.com/wp-content/uploads/2015/03/BOMA.jpg",
      website: "https://www.bomasuburban.org",
      sortOrder: 1,
    },
    {
      name: "Illinois Landscape Contractors Association",
      logoUrl: "https://www.groundpros.com/wp-content/uploads/2015/03/ILCA.jpg",
      website: "https://www.ilca.net",
      sortOrder: 2,
    },
    {
      name: "Community Associations Institute",
      logoUrl: "https://www.groundpros.com/wp-content/uploads/2015/03/CAI.png",
      website: "https://www.caionline.org",
      sortOrder: 3,
    },
    {
      name: "Snow and Ice Management Association",
      logoUrl: "https://www.groundpros.com/wp-content/uploads/2014/07/SIMA.png",
      website: "https://www.sima.org",
      sortOrder: 4,
    },
  ];
  for (const affiliation of affiliations) {
    await prisma.affiliation.create({ data: affiliation });
  }

  await prisma.project.deleteMany();
  const projects = [
    {
      title: "English Garden",
      category: "Commercial",
      description: "Elegant English garden design with lush plantings and stone pathways.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/7-English-Garden.jpg",
      clientType: "Commercial",
      isFeatured: true,
      sortOrder: 0,
    },
    {
      title: "Grand Haven Community",
      category: "HOA",
      description: "Comprehensive landscape management for a premier residential community.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/Grand-Haven-23.jpg",
      clientType: "HOA",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Textured Driveway Landscape",
      category: "Commercial",
      description: "Creative landscape design with textured driveway accents.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/4v-Drive-textures.jpg",
      clientType: "Commercial",
      sortOrder: 2,
    },
    {
      title: "Corporate Entrance",
      category: "Commercial",
      description: "Professional entrance landscaping for a corporate property.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/08/IMG_0250.jpg",
      clientType: "Commercial",
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Seasonal Color Display",
      category: "Seasonal",
      description: "Vibrant seasonal flower installations creating stunning curb appeal.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/08/IMG-0209-e1565188797922.jpg",
      clientType: "Commercial",
      sortOrder: 4,
    },
    {
      title: "The Vi Senior Living",
      category: "Healthcare",
      description: "Premium landscape management for an upscale senior living community.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/The-Vi-216.jpg",
      clientType: "Healthcare",
      isFeatured: true,
      sortOrder: 5,
    },
    {
      title: "Rivershire Community",
      category: "HOA",
      description: "Beautiful common area maintenance for a residential community.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/Rivershire-57.jpg",
      clientType: "HOA",
      sortOrder: 6,
    },
    {
      title: "Property Enhancement",
      category: "Commercial",
      description: "Complete property landscape enhancement with premium plantings.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/08/IMG_0243.jpg",
      clientType: "Commercial",
      sortOrder: 7,
    },
    {
      title: "Spring Tulip Display",
      category: "Seasonal",
      description: "Colorful spring tulip installations brightening the property entrance.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/spring-tulips.jpg",
      clientType: "Commercial",
      isFeatured: true,
      sortOrder: 8,
    },
    {
      title: "Commercial Grounds",
      category: "Commercial",
      description: "Manicured commercial property grounds maintenance.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/100_0380.jpg",
      clientType: "Commercial",
      sortOrder: 9,
    },
    {
      title: "Landscape Installation",
      category: "Commercial",
      description: "New landscape installation with native plantings and hardscape elements.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/IMG_2654.jpg",
      clientType: "Commercial",
      sortOrder: 10,
    },
    {
      title: "Gift of Hope Campus",
      category: "Healthcare",
      description: "Landscape management for a healthcare campus facility.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/Gift-of-Hope-44.jpg",
      clientType: "Healthcare",
      sortOrder: 11,
    },
    {
      title: "Grounds Maintenance",
      category: "Commercial",
      description: "Year-round grounds maintenance ensuring pristine property appearance.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/IMG_2034-001.jpg",
      clientType: "Commercial",
      sortOrder: 12,
    },
    {
      title: "Turf Management",
      category: "Commercial",
      description: "Professional turf care and maintenance program.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/Maintenace-Page-Slider_preview.jpeg",
      clientType: "Commercial",
      sortOrder: 13,
    },
    {
      title: "Al Fresco Dining Landscape",
      category: "Commercial",
      description: "Outdoor dining area surrounded by beautiful landscape design.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/8-Al-Fresco-Dining.jpg",
      clientType: "Commercial",
      isFeatured: true,
      sortOrder: 14,
    },
    {
      title: "The Vi Entrance",
      category: "Healthcare",
      description: "Grand entrance landscape for The Vi senior living community.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/The-VI-1.jpg",
      clientType: "Healthcare",
      sortOrder: 15,
    },
    {
      title: "Schaumburg Corporate Campus",
      category: "Commercial",
      description: "Large-scale corporate campus landscape management in Schaumburg.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/05/Schaumburg-Corporate-8-e1571424287942.jpg",
      clientType: "Commercial",
      isFeatured: true,
      sortOrder: 16,
    },
    {
      title: "Property Entrance Design",
      category: "Commercial",
      description: "Welcoming entrance landscape design with seasonal plantings.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/08/IMG_0232.jpg",
      clientType: "Commercial",
      sortOrder: 17,
    },
    {
      title: "Community Landscape",
      category: "HOA",
      description: "Comprehensive community landscape management and enhancement.",
      afterImage: "https://www.groundpros.com/wp-content/uploads/2019/10/IMG-0526.jpg",
      clientType: "HOA",
      sortOrder: 18,
    },
  ];
  for (const project of projects) {
    await prisma.project.create({ data: project });
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
