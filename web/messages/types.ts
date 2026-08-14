export type ServiceSlug =
  | "ui-ux-design"
  | "web-app-development"
  | "mobile-app-development"
  | "ecommerce-development"
  | "logo-branding"
  | "seo"
  | "social-media-management"
  | "online-advertising"
  | "copywriting"
  | "graphic-design"
  | "photography-videography";

export type Dictionary = {
  meta: {
    tagline: string;
    description: string;
    keywords: string[];
  };
  nav: {
    work: string;
    blog: string;
    services: string;
    about: string;
    contact: string;
    startProject: string;
    featuredWork: string;
    featuredWorkBlurb: string;
    viewAllWork: string;
    allCaseStudies: string;
    primary: string;
    toggleMenu: string;
    skipToContent: string;
    language: string;
  };
  services: Record<
    ServiceSlug,
    {
      label: string;
      description: string;
    }
  >;
  home: {
    heroTitleBefore: string;
    heroTitleAccent: string;
    heroTitleAfter: string;
    heroLede: string;
    seeWork: string;
    startProject: string;
    heroCaption: string;
    studioTitleBefore: string;
    studioTitleAccent: string;
    studioLede: string;
    aboutLink: string;
    cultureCaption: string;
    workTitleBefore: string;
    workTitleAccent: string;
    allCaseStudies: string;
    servicesTitleBefore: string;
    servicesTitleAccent: string;
    servicesLede: string;
    exploreServices: string;
    ctaTitleBefore: string;
    ctaTitleAccent: string;
    ctaLede: string;
    scheduleCall: string;
    introEyebrow: string;
    introText: string;
    ctaConsultLabel: string;
    ctaConsultCopy: string;
    ctaCaseStudiesLabel: string;
    heroBasedIn: string;
    learnMore: string;
    approachLabel: string;
    messageEyebrow: string;
    messageTitleBefore: string;
    messageTitleAccent: string;
    messageLede: string;
    messageCta: string;
    messageFeatures: { title: string; copy: string }[];
    blogEyebrow: string;
    blogTitleBefore: string;
    blogTitleAccent: string;
    blogLede: string;
    blogReadMore: string;
    allArticles: string;
    faqEyebrow: string;
    faqTitleBefore: string;
    faqTitleAccent: string;
    faqLede: string;
    faqs: { question: string; answer: string }[];
  };
  roadmap: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    lede: string;
    steps: { title: string; copy: string }[];
  };
  about: {
    titleBefore: string;
    titleAccent: string;
    lede: string;
    pillars: { title: string; copy: string }[];
    factsTitle: string;
    facts: string[];
    cta: string;
    imageAlt: string;
  };
  work: {
    titleBefore: string;
    titleAccent: string;
    lede: string;
    readCaseStudy: string;
    metaTitle: string;
    metaDescription: string;
  };
  blog: {
    titleBefore: string;
    titleAccent: string;
    lede: string;
    readMore: string;
    backToBlog: string;
    metaTitle: string;
    metaDescription: string;
  };
  servicesPage: {
    titleBefore: string;
    titleAccent: string;
    lede: string;
    learnMore: string;
    metaTitle: string;
    metaDescription: string;
    faqs: { question: string; answer: string }[];
    discuss: string;
    outcomes: string;
    relatedWork: string;
  };
  contact: {
    titleBefore: string;
    titleAccent: string;
    lede: string;
    email: string;
    phone: string;
    locations: string;
    faq: string;
    metaTitle: string;
    metaDescription: string;
    faqs: { question: string; answer: string }[];
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    imageAlt: string;
  };
  footer: {
    studio: string;
    services: string;
    contact: string;
    networks: string;
    rights: string;
    newsletter: {
      title: string;
      lede: string;
      placeholder: string;
      submit: string;
      success: string;
    };
  };
  notFound: {
    title: string;
    lede: string;
    home: string;
  };
};
