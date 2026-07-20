/* ==========================================================================
   DATA.JS
   Why this file exists: it separates CONTENT from LOGIC. The component
   functions in features.js / pricing.js / etc. know how to render a card,
   but they don't know what a card *says*. That copy lives here instead.
   In a real company this is the file a marketer or PM could edit without
   touching a single line of rendering code, and it's also what you'd swap
   for a fetch() call to a real API/CMS later without changing components.
   ========================================================================== */

const SITE_DATA = {
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'Product', href: '#preview' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],

  trustedBy: [
    { name: 'Northwind', src: 'images/logos/northwind.svg' },
    { name: 'Velocix', src: 'images/logos/velocix.svg' },
    { name: 'Archway', src: 'images/logos/archway.svg' },
    { name: 'Pixelforge', src: 'images/logos/pixelforge.svg' },
    { name: 'Halcyon', src: 'images/logos/halcyon.svg' },
    { name: 'Gridworks', src: 'images/logos/gridworks.svg' },
  ],

  features: [
    {
      icon: 'images/icons/icon-pulse.svg',
      title: 'Real-time monitoring',
      desc: 'Track uptime, latency and error rate across every service the moment something changes — no polling delay.',
    },
    {
      icon: 'images/icons/icon-alert.svg',
      title: 'Smart alerting',
      desc: 'Route incidents to the right on-call engineer with noise-suppression so you only get paged for what matters.',
    },
    {
      icon: 'images/icons/icon-trace.svg',
      title: 'Distributed tracing',
      desc: 'Follow a single request across every microservice it touches and pinpoint the exact call that slowed it down.',
    },
    {
      icon: 'images/icons/icon-shield.svg',
      title: 'SLA & uptime reports',
      desc: 'Auto-generated, shareable reports that prove your uptime commitments to customers and stakeholders.',
    },
    {
      icon: 'images/icons/icon-dashboard.svg',
      title: 'Custom dashboards',
      desc: 'Build the exact view your team needs by dragging metrics onto a canvas — no query language required.',
    },
    {
      icon: 'images/icons/icon-integrations.svg',
      title: '80+ integrations',
      desc: 'Connect Slack, PagerDuty, Datadog exports, and your existing stack in minutes, not sprints.',
    },
  ],

  whyChecklist: [
    'Set up your first monitor in under five minutes',
    'No credit card required for the 14-day trial',
    'SOC 2 Type II certified infrastructure',
    'Dedicated Slack channel with your onboarding engineer',
  ],

  stats: [
    { value: 99.98, suffix: '%', label: 'Average uptime tracked' },
    { value: 3100, suffix: '+', label: 'Engineering teams' },
    { value: 42, suffix: 'M', label: 'Checks run daily' },
    { value: 140, suffix: 'ms', label: 'Median alert time' },
  ],

  testimonials: [
    {
      name: 'Sara Malik',
      role: 'Head of Platform, Northwind',
      avatar: 'images/avatars/avatar-1.svg',
      stars: 5,
      quote: 'We cut our mean time to acknowledge from nineteen minutes to under two. Meridian paid for itself in the first incident it caught.',
    },
    {
      name: 'Rahul Kapoor',
      role: 'Staff SRE, Velocix',
      avatar: 'images/avatars/avatar-2.svg',
      stars: 5,
      quote: 'The tracing view is the first tool I open during an incident. Being able to see the exact hop that failed saves us real time.',
    },
    {
      name: 'Tessa Nkomo',
      role: 'CTO, Archway',
      avatar: 'images/avatars/avatar-3.svg',
      stars: 5,
      quote: 'Alert fatigue basically disappeared after we switched. The noise suppression actually understands what "critical" means.',
    },
    {
      name: 'Adrian Lowe',
      role: 'DevOps Lead, Pixelforge',
      avatar: 'images/avatars/avatar-4.svg',
      stars: 4,
      quote: 'Dashboards took an afternoon to set up instead of a sprint. Our whole team can read them, not just the person who built them.',
    },
    {
      name: 'Jamie Byun',
      role: 'Engineering Manager, Halcyon',
      avatar: 'images/avatars/avatar-5.svg',
      stars: 5,
      quote: 'Our SLA reports used to take a full day to compile by hand. Now they generate themselves and customers trust the data more.',
    },
    {
      name: 'Mateo Ortega',
      role: 'Founder, Gridworks',
      avatar: 'images/avatars/avatar-6.svg',
      stars: 5,
      quote: 'As a small team we needed something that felt enterprise-grade without the enterprise setup. Meridian was live the same day.',
    },
  ],

  pricing: [
    {
      name: 'Basic',
      price: 19,
      period: '/mo',
      highlighted: false,
      features: [
        { text: 'Up to 10 monitors', included: true },
        { text: '5-minute check interval', included: true },
        { text: 'Email alerts', included: true },
        { text: 'Distributed tracing', included: false },
        { text: 'Custom dashboards', included: false },
      ],
      cta: 'Start free trial',
    },
    {
      name: 'Pro',
      price: 79,
      period: '/mo',
      highlighted: true,
      badge: 'Most popular',
      features: [
        { text: 'Up to 100 monitors', included: true },
        { text: '30-second check interval', included: true },
        { text: 'Slack, SMS & email alerts', included: true },
        { text: 'Distributed tracing', included: true },
        { text: 'Custom dashboards', included: true },
      ],
      cta: 'Start free trial',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      highlighted: false,
      features: [
        { text: 'Unlimited monitors', included: true },
        { text: '10-second check interval', included: true },
        { text: 'SSO & audit logs', included: true },
        { text: 'Dedicated support engineer', included: true },
        { text: 'Custom SLA agreement', included: true },
      ],
      cta: 'Talk to sales',
    },
  ],

  faq: [
    {
      q: 'How is Meridian different from a generic status page tool?',
      a: 'Status pages tell your customers something is wrong after the fact. Meridian watches request-level traces and infrastructure metrics so your team knows within seconds, with the context to fix it — not just report it.',
    },
    {
      q: 'Do I need to change my infrastructure to use it?',
      a: 'No. Meridian connects through a lightweight agent or API webhooks depending on your stack, and most teams have their first monitor live in under five minutes without any code changes.',
    },
    {
      q: 'Can I cancel or change plans at any time?',
      a: 'Yes. Plans are billed monthly with no long-term contract on Basic and Pro. You can upgrade, downgrade, or cancel from your billing settings at any time.',
    },
    {
      q: 'What counts as a "monitor"?',
      a: 'A monitor is any single endpoint, service, or synthetic check you configure — for example one API route, one background job, or one database connection.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Every plan starts with a 14-day free trial on Pro-tier features, no credit card required. You can downgrade to Basic or cancel at any point before it ends.',
    },
  ],

  footerLinks: {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#features' },
      { label: 'Changelog', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
};
