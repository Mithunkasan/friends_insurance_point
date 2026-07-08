import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Seeding database...');

  // 1. Seed Admin
  const adminPasswordHash = hashPassword('admin123'); // Default admin password
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log('✔ Seeded default admin account (username: admin / password: admin123)');

  // 2. Seed Settings
  const settings = [
    { key: 'company_name', value: 'Friends Insurance Point', group: 'GENERAL' },
    { key: 'tagline', value: 'Your Trusted Insurance Partner – Get Your Insurance in Just 10 Minutes.', group: 'GENERAL' },
    { key: 'phone', value: '7373723019', group: 'CONTACT' },
    { key: 'email', value: 'info@friendsinsurancepoint.com', group: 'CONTACT' },
    { key: 'address', value: '72/132, Arattu Road, Krishnancoil, Vadasery, Nagercoil – 629001, Tamil Nadu, India.', group: 'CONTACT' },
    { key: 'whatsapp_number', value: '917373723019', group: 'CONTACT' },
    { key: 'business_hours', value: 'Monday - Saturday: 9:00 AM - 8:30 PM, Sunday: Closed', group: 'GENERAL' },
  ];

  for (const set of settings) {
    await prisma.setting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: set,
    });
  }
  console.log('✔ Seeded general and contact settings');

  // 3. Seed Insurance Partners
  const partners = [
    { name: 'TATA AIG', logoUrl: '/partners/tata-aig.png', orderIndex: 1 },
    { name: 'United India Insurance', logoUrl: '/partners/united-india.png', orderIndex: 2 },
    { name: 'National Insurance', logoUrl: '/partners/national.png', orderIndex: 3 },
    { name: 'Royal Sundaram', logoUrl: '/partners/royal-sundaram.png', orderIndex: 4 },
    { name: 'IFFCO Tokio', logoUrl: '/partners/iffco-tokio.png', orderIndex: 5 },
    { name: 'Chola MS', logoUrl: '/partners/chola-ms.png', orderIndex: 6 },
    { name: 'The New India Assurance Co. Ltd.', logoUrl: '/partners/new-india.png', orderIndex: 7 },
  ];

  for (const partner of partners) {
    await prisma.insurancePartner.upsert({
      where: { name: partner.name },
      update: { orderIndex: partner.orderIndex },
      create: partner,
    });
  }
  console.log('✔ Seeded insurance partners list');

  // 4. Seed Insurance Services
  const services = [
    {
      name: 'Bike Insurance',
      slug: 'bike-insurance',
      description: 'Get your two-wheeler insured instantly. Protect your bike against accidents, fire, theft, and third-party liability claims within minutes.',
      icon: 'Bike',
      category: 'MOTOR',
      benefits: [
        'Instant policy copy within 10 minutes',
        'Up to 70% discount on premiums',
        'Hassle-free online renewal',
        'Optional zero depreciation cover',
        'Third-party and comprehensive packages'
      ]
    },
    {
      name: 'Car Insurance',
      slug: 'car-insurance',
      description: 'Protect your car with India\'s top car insurance plans. Cashless garage network and immediate roadside assistance during emergencies.',
      icon: 'Car',
      category: 'MOTOR',
      benefits: [
        'Quick comparison of top 10+ insurers',
        'Cashless claims at 5000+ garages',
        '24/7 roadside assistance support',
        'No Claim Bonus (NCB) transfer option',
        'Add-ons like Engine Protect & Consumables Cover'
      ]
    },
    {
      name: 'Auto Insurance',
      slug: 'auto-insurance',
      description: 'Custom insurance policies for auto-rickshaws and passenger three-wheelers, safeguarding your daily livelihood.',
      icon: 'Gauge',
      category: 'MOTOR',
      benefits: [
        'Cover for passenger liabilities',
        'Protection against accidental damages',
        'Livelihood protection cover options',
        'Competitive commercial vehicle premiums',
        'Express claims service'
      ]
    },
    {
      name: 'Bus Insurance',
      slug: 'bus-insurance',
      description: 'Comprehensive coverage for school buses, staff buses, and commercial tour operators with legal passenger liability cover.',
      icon: 'Bus',
      category: 'MOTOR',
      benefits: [
        'High value third-party liability cover',
        'Accident insurance for driver & helpers',
        'Protection for school/corporate transport',
        'Flexible depreciation waiver add-ons',
        'Round-the-clock claim guidance'
      ]
    },
    {
      name: 'Heavy Vehicle Insurance',
      slug: 'heavy-vehicle-insurance',
      description: 'Tailored commercial vehicle insurance for trucks, tractors, trailers, tippers, and construction equipment.',
      icon: 'Truck',
      category: 'MOTOR',
      benefits: [
        'Comprehensive own damage & towing coverage',
        'Third-party property damage coverage',
        'Customized transit & load protection',
        'Special commercial fleet rates',
        'Dedicated claim advisors for fast approval'
      ]
    },
    {
      name: 'Life Insurance',
      slug: 'life-insurance',
      description: 'Ensure financial security for your family. Choose from term insurance, savings-oriented endowment plans, and children plans.',
      icon: 'HeartHandshake',
      category: 'LIFE',
      benefits: [
        'High sum assured term plans at lowest rates',
        'Tax savings under Section 80C',
        'Secured future for dependents',
        'Add-on critical illness benefit riders',
        'Assistance in selecting best payout options'
      ]
    },
    {
      name: 'Health Insurance',
      slug: 'health-insurance',
      description: 'Cover medical expenses, surgeries, and critical illnesses for you and your family. Cashless hospital stays at premium hospitals.',
      icon: 'ShieldAlert',
      category: 'HEALTH',
      benefits: [
        'Cashless treatment at network hospitals',
        'Tax benefit under section 80D',
        'No medical tests required up to 45 years',
        'Pre & post hospitalization charges cover',
        'Maternity and newborn cover options'
      ]
    },
    {
      name: 'Travel Insurance',
      slug: 'travel-insurance',
      description: 'Stay secured during your international and domestic travels. Covers medical emergencies, flight delays, and baggage loss.',
      icon: 'Plane',
      category: 'TRAVEL',
      benefits: [
        'Emergency medical evacuation coverage',
        'Compensation for lost or delayed baggage',
        'Passport and document loss assistance',
        'Trip cancellation & interruption cover',
        'Schengen visa approved policies'
      ]
    },
    {
      name: 'Accident Insurance',
      slug: 'accident-insurance',
      description: 'Personal accident policy offering absolute financial security against accidental death, partial/permanent disability, and hospital bills.',
      icon: 'Activity',
      category: 'HEALTH',
      benefits: [
        '100% payout for accidental death',
        'Permanent total disability cover',
        'Children education benefit extension',
        'Weekly accidental wage loss cover option',
        'Worldwide coverage active 24/7'
      ]
    },
    {
      name: 'OPD Insurance',
      slug: 'opd-insurance',
      description: 'Saves your pocket from day-to-day medical expenses like doctor consultations, dental checks, pharmacy bills, and diagnostics.',
      icon: 'Stethoscope',
      category: 'HEALTH',
      benefits: [
        'Covers regular doctor consulting fees',
        'Reimbursements for medicines & pharmacy bills',
        'Lab tests & diagnostic checkup covers',
        'No hospitalization required for claims',
        'Perfect add-on for corporate/family policies'
      ]
    },
    {
      name: 'Fire Insurance',
      slug: 'fire-insurance',
      description: 'Safeguard your commercial buildings, factories, offices, and inventories against fire hazards, storms, and explosions.',
      icon: 'Flame',
      category: 'FIRE',
      benefits: [
        'Protects structural building assets',
        'Inventory, raw materials & machinery cover',
        'Loss of profits (business interruption) cover',
        'Earthquake and atmospheric disturbance cover',
        'Swift damage evaluation & claim processing'
      ]
    },
    {
      name: 'Group Mediclaim Insurance',
      slug: 'group-mediclaim-insurance',
      description: 'Specially designed employee health benefits for small, medium, and corporate businesses to keep the team protected.',
      icon: 'Users',
      category: 'HEALTH',
      benefits: [
        'Pre-existing disease coverage from day one',
        'Maternity benefits and corporate buffer',
        'High employee retention and morale boost',
        'Cashless network access for employees',
        'Tailored group premium discounts'
      ]
    }
  ];

  for (const svc of services) {
    await prisma.insuranceService.upsert({
      where: { slug: svc.slug },
      update: {
        description: svc.description,
        icon: svc.icon,
        benefits: svc.benefits,
        category: svc.category,
      },
      create: svc,
    });
  }
  console.log('✔ Seeded 12 comprehensive insurance services');

  // 5. Seed FAQs (15+ items)
  const faqs = [
    {
      question: 'How quickly can I get my vehicle insurance renewed at Friends Insurance Point?',
      answer: 'At Friends Insurance Point, we promise instant policy issuance. In most cases, if you share the required vehicle details (RC copy and previous policy copy), we will generate and deliver your active insurance policy in just 10 minutes.',
      category: 'Motor Insurance'
    },
    {
      question: 'What documents are required to buy or renew car/bike insurance?',
      answer: 'You only need to provide two main documents: 1) Your vehicle\'s Registration Certificate (RC Book Copy) and 2) Your previous year\'s policy copy (if renewing). No additional physical paperwork is required.',
      category: 'Motor Insurance'
    },
    {
      question: 'What is Third-Party Insurance vs. Comprehensive Insurance?',
      answer: 'Third-Party Insurance is mandatory by law in India; it covers damages, death, or injury caused to a third party (person or property). Comprehensive Insurance is highly recommended; it covers third-party liabilities PLUS damage/theft of your own vehicle due to accidents, natural disasters, or fire.',
      category: 'Motor Insurance'
    },
    {
      question: 'What is Zero Depreciation (Zero-Dep) Cover?',
      answer: 'Zero Depreciation is an add-on cover for comprehensive motor insurance. Under normal policies, insurers deduct depreciation on parts (like plastic, glass, metal) during claims. With Zero-Dep, the insurance company pays the full cost of replacement parts without factoring in depreciation, saving you substantial out-of-pocket costs.',
      category: 'Motor Insurance'
    },
    {
      question: 'Can I transfer my No Claim Bonus (NCB) from my previous insurance company?',
      answer: 'Yes, absolutely. No Claim Bonus is linked to the vehicle owner, not the vehicle or insurer. When switching your policy to us, we will transfer your accumulated NCB (up to 50% discount) to your new policy, ensuring you retain the reward for safe driving.',
      category: 'General'
    },
    {
      question: 'Why choose an agency like Friends Insurance Point instead of buying online directly?',
      answer: 'Unlike automated online portals, we provide personalized advisory services. We compare premiums across multiple leading insurance companies to find the best rate, customize add-ons, and most importantly, we provide end-to-end assistance during the claims process. We stand by you when you need it most.',
      category: 'General'
    },
    {
      question: 'How do I file an insurance claim in the event of an accident?',
      answer: 'In the event of an accident, do not panic. 1) Take pictures of the damage. 2) Contact Friends Insurance Point immediately at 7373723019. 3) We will help you locate the nearest cashless garage and coordinate with the insurer\'s surveyor for a quick claim assessment.',
      category: 'Claims'
    },
    {
      question: 'Do you charge any extra fee for comparing premiums or issuing policies?',
      answer: 'No, we do not charge any service fee or hidden commissions from customers. You get the benefit of comparing premiums and expert advice entirely free of charge. You only pay the actual policy premium determined by the insurance company.',
      category: 'General'
    },
    {
      question: 'What is Cashless Hospitalization in Health Insurance?',
      answer: 'Cashless Hospitalization allows you to undergo medical treatment at network hospitals without paying the bills directly. The hospital sends the bills directly to the insurance company/TPA for evaluation and settlement. You only pay for non-medical expenses or co-pays as defined in your policy.',
      category: 'Health Insurance'
    },
    {
      question: 'Does health insurance cover pre-existing diseases from day one?',
      answer: 'Usually, individual health insurance policies have a waiting period of 2 to 4 years for pre-existing diseases (like diabetes, hypertension). However, Group Mediclaim Insurance policies for employees can cover pre-existing diseases from day one without any waiting period.',
      category: 'Health Insurance'
    },
    {
      question: 'What is a Family Floater Health Insurance?',
      answer: 'A Family Floater plan covers the entire family (usually self, spouse, and up to 3 children) under a single sum insured. The entire cover amount can be used by any single member or shared by all members during the policy year, making it more affordable than buying individual policies for everyone.',
      category: 'Health Insurance'
    },
    {
      question: 'Why is Term Life Insurance considered the most important type of life insurance?',
      answer: 'Term Life Insurance offers high coverage (Sum Assured) at very affordable premiums. It is a pure protection plan that pays the full sum assured to your nominees in case of an unfortunate event, ensuring your family\'s financial stability, loans, and education goals are secure.',
      category: 'Life Insurance'
    },
    {
      question: 'What is covered under commercial vehicle insurance for buses and trucks?',
      answer: 'Commercial vehicle insurance covers damage to the vehicle (due to collision, fire, theft, flood), third-party property damage, legal liability for passengers, and personal accident cover for the driver, helper, and conductor.',
      category: 'Motor Insurance'
    },
    {
      question: 'What is Fire Insurance, and who needs it?',
      answer: 'Fire Insurance covers damage to properties, assets, machinery, and inventories caused by fire, lightning, implosion, or natural disasters like storms and earthquakes. It is crucial for shopkeepers, factory owners, warehouses, and homeowners to protect their capital investments.',
      category: 'Commercial Insurance'
    },
    {
      question: 'How do I renew my expired policy? Is a vehicle inspection mandatory?',
      answer: 'If your policy has expired, contact us immediately. For bike insurance, we can often renew online without inspection. For car insurance, an inspection may be required if the policy has expired for more than a few days, but we can arrange a quick self-inspection or digital inspection to get your policy active within hours.',
      category: 'Motor Insurance'
    },
    {
      question: 'Do you offer door-step or remote digital service for policy issuance?',
      answer: 'Yes! You do not need to visit our Nagercoil office in person. You can simply WhatsApp us the vehicle details/documents to 7373723019. We will send you premium comparisons, collect payment online, and email/WhatsApp your policy PDF instantly within 10 minutes.',
      category: 'General'
    }
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log('✔ Seeded 16 detailed insurance FAQs');

  // 6. Seed Testimonials
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Commercial Tourist Bus Owner, Nagercoil',
      review: 'I have 5 tourist buses and got all of them insured through Friends Insurance Point. They gave me the best price comparison and sent the policy copies in 10 minutes. Claim assistance was smooth when one of our trucks had a minor collision.',
      rating: 5,
      image: '/testimonials/user1.jpg'
    },
    {
      name: 'Maria Josephine',
      role: 'IT Professional, Vadasery',
      review: 'Renewed my Honda Activa insurance over WhatsApp. I sent the RC copy, made the payment, and got the policy PDF on my phone within 7 minutes! The staff is extremely friendly and responsive. Highly recommended!',
      rating: 5,
      image: '/testimonials/user2.jpg'
    },
    {
      name: 'T. Murugan',
      role: 'Auto Driver, Krishnancoil',
      review: 'Every year I renew my auto insurance here. They guide me on the correct passenger liability add-on so that I am fully protected. The premium is very affordable and they remind me on time before the policy expires.',
      rating: 5,
      image: '/testimonials/user3.jpg'
    },
    {
      name: 'Dr. S. Anand',
      role: 'Senior Consultant, Nagercoil',
      review: 'Excellent service for health and family mediclaim insurance. They did a deep comparison of policies, explained the exclusions transparently, and set up our cashless insurance cards quickly. Very professional advisors.',
      rating: 5,
      image: '/testimonials/user4.jpg'
    }
  ];

  for (const test of testimonials) {
    await prisma.testimonial.create({
      data: test,
    });
  }
  console.log('✔ Seeded premium testimonials');

  // 7. Seed SEO Data for pages
  const seoPages = [
    {
      pagePath: '/',
      title: 'Friends Insurance Point | Vehicle Insurance in 10 Minutes | Nagercoil',
      description: 'Get car, bike, and commercial vehicle insurance in just 10 minutes at Friends Insurance Point, Nagercoil. Compare top premiums from leading Indian companies with expert assistance.',
      keywords: 'Bike Insurance in Nagercoil, Car Insurance in Nagercoil, Vehicle Insurance Near Me, Insurance Agency in Nagercoil, Health Insurance Nagercoil, Life Insurance Nagercoil, Insurance Renewal, 10 Minute Insurance'
    },
    {
      pagePath: '/about',
      title: 'About Us | Friends Insurance Point | Trusted Insurance Advisors in Tamil Nadu',
      description: 'Learn about Friends Insurance Point in Nagercoil. Experienced insurance advisors offering fast policy renewal, best premium comparisons, and comprehensive claim support.',
      keywords: 'Insurance Consultant Nagercoil, Trusted Insurance Advisors, Friends Insurance Point About, Best Insurance Agency Nagercoil'
    },
    {
      pagePath: '/services',
      title: 'Insurance Services | Motor, Health, Life & Commercial Insurance',
      description: 'Explore our wide range of insurance products including Bike, Car, Bus, Heavy Vehicle, Health, Life, Fire, and Group Mediclaim insurance. Fast online policy renewal.',
      keywords: 'Motor Insurance, Commercial Insurance, Health Insurance Nagercoil, Life Insurance, Fire Insurance, Group Mediclaim'
    },
    {
      pagePath: '/partners',
      title: 'Our Insurance Partners | TATA AIG, United India, National Insurance & More',
      description: 'Compare insurance policies from India\'s top insurance companies. We partner with TATA AIG, United India, Royal Sundaram, IFFCO Tokio, National Insurance, and more.',
      keywords: 'TATA AIG Nagercoil, United India Insurance, IFFCO Tokio, National Insurance, Royal Sundaram Partners'
    },
    {
      pagePath: '/contact',
      title: 'Contact Friends Insurance Point | Nagercoil Office Details & Enquiry Form',
      description: 'Visit our office at Arattu Road, Vadasery, Nagercoil. Call us at 7373723019 or WhatsApp us to get your vehicle policy issued in 10 minutes.',
      keywords: 'Insurance Agency Address Nagercoil, Friends Insurance Phone, Get Policy in 10 minutes Vadasery'
    },
    {
      pagePath: '/faq',
      title: 'Frequently Asked Questions | Insurance Claims, Renewals & Coverages',
      description: 'Find answers to common questions about car, bike, and health insurance. Understand NCB transfer, cashless claims, zero depreciation cover, and claim processes.',
      keywords: 'Insurance FAQ, Motor Insurance FAQ, Cashless Claim FAQ, NCB Transfer help'
    },
    {
      pagePath: '/quote',
      title: 'Request a Free Quote | Best Premium Insurance Comparison Nagercoil',
      description: 'Fill out our quote form to compare premiums for your car, bike, truck, or health insurance. Get the lowest premium quotes in Nagercoil within 10 minutes.',
      keywords: 'Best Insurance Premium Comparison, Car Insurance Quote, Bike Insurance Quote, Commercial Vehicle Quote'
    }
  ];

  for (const page of seoPages) {
    await prisma.sEOData.upsert({
      where: { pagePath: page.pagePath },
      update: page,
      create: page,
    });
  }
  console.log('✔ Seeded page SEO metadata');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
