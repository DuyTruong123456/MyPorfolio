import profileImage from '../assets/profile.png'

const byNaturalPath = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const medproImageModules = import.meta.glob(
  '../../project/medpro/images/*.webp',
  { eager: true, import: 'default' },
)

const medproImages = Object.keys(medproImageModules)
  .sort(byNaturalPath)
  .map((path) => medproImageModules[path])

const hlmartImageModules = import.meta.glob(
  '../../project/HLMart/image/mobile/*.{jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
)

const hlmartImages = Object.keys(hlmartImageModules)
  .sort(byNaturalPath)
  .map((path) => hlmartImageModules[path])

const pakyawImageModules = import.meta.glob(
  '../../project/Pakyawkalabaw/image/mobile/*.{jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
)

const pakyawImages = Object.keys(pakyawImageModules)
  .sort(byNaturalPath)
  .map((path) => pakyawImageModules[path])

const bringhacksImageModules = import.meta.glob(
  '../../project/Bringhacks/image/mobile/*.{jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
)

const bringhacksImages = Object.keys(bringhacksImageModules)
  .sort(byNaturalPath)
  .map((path) => bringhacksImageModules[path])

export const site = {
  profileImage,
  name: 'Trần Cao Duy Trường',
  title: 'Mobile & Software Developer',
  tagline:
    'I build production mobile and web products — cross-platform apps, REST APIs, and polished UX — from prototypes through App Store and Google Play releases.',
  email: 'duytruong8a1@gmail.com',
  phone: '+84 367 243 065',
  location: 'Ho Chi Minh City, Vietnam',
  resumeUrl: '/Tran_Cao_Duy_Truong_CV_Flutter_2305.pdf',
  social: {
    github: '',
    linkedin: '',
    twitter: '',
  },
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const about = {
  paragraphs: [
    'Software developer based in Ho Chi Minh City with 5 years of experience shipping production apps across healthcare, logistics, e-commerce, real-time communication, and AI-enabled products.',
    'Comfortable across mobile (Flutter, React Native, native iOS/Android), web (React), and API-driven backends. Strong in architecture, REST integration (JWT/OAuth), Firebase, and release workflows on Google Play and the App Store. I work in Agile/Scrum with Git-based delivery and solid automated testing.',
    'Graduate of Ho Chi Minh City University of Technology (HCMUT), GPA 3.3/4.0, OISP Scholarship. IELTS 6.5.',
  ],
  highlights: [
    { label: 'Experience', value: '5+ years' },
    { label: 'Focus', value: 'Mobile & Web' },
    { label: 'Education', value: 'HCMUT' },
  ],
}

export const skills = [
  { label: 'Flutter', icon: 'flutter' },
  { label: 'Dart', icon: 'dart' },
  { label: 'React Native', icon: 'react' },
  { label: 'Android Native (Kotlin / Java)', icon: 'android' },
  { label: 'iOS Native (Swift / Objective-C)', icon: 'apple' },
  { label: 'Web (ReactJS)', icon: 'web' },
  { label: 'JavaScript / TypeScript', icon: 'javascript' },
  { label: 'HTML / CSS', icon: 'web' },
  { label: 'C# Backend (.NET)', icon: 'csharp' },
  { label: 'REST APIs', icon: 'api' },
  { label: 'SQL Database', icon: 'database' },
  { label: 'Firebase', icon: 'firebase' },
  { label: 'Git', icon: 'git' },
  { label: 'Agile / Scrum', icon: 'agile' },
]

export const experience = [
  {
    company: 'UTGL',
    role: 'Mobile Developer',
    period: '2025 – 2026',
    url: 'https://www.utgl.net/',
    bullets: [
      'Built and maintained cross-platform mobile features for production products.',
      'Integrated REST APIs and partnered with UI/UX and backend teams to ship production-ready releases.',
      'Participated in Agile delivery, code reviews, and iterative improvements to app performance and UX.',
    ],
  },
  {
    company: 'Develop.Software LLC',
    role: 'Mobile Developer',
    period: '2024 – 2025',
    url: 'https://www.develop.software/',
    bullets: [
      'Built and optimized cross-platform mobile apps; designed reusable UI components for client products.',
      'Partnered with designers and backend engineers to deliver API-driven, production-ready features.',
      'Applied licensed/open-source pub packages strategically to accelerate delivery without sacrificing quality.',
    ],
  },
  {
    company: 'BringHacks',
    role: 'Part-time Mobile Engineer',
    period: '2023 – 2024',
    bullets: [
      'Shipped consumer mobile app features with iterative Agile delivery and store releases.',
      'Integrated REST/Firebase APIs, fixed defects, and improved UX through widget-level refinements.',
    ],
  },
  {
    company: 'Beings',
    role: 'Mobile Engineer (calling / streaming)',
    period: '2023 – 2024',
    bullets: [
      'Developed real-time communication UI with platform-channel integration for WebRTC/streaming modules.',
      'Configured iOS/Android native build settings and WebRTC packaging for stable call delivery.',
      'Contributed to architecture discussions, reliability fixes, and cross-team coordination in English.',
    ],
  },
  {
    company: 'Medpro',
    role: 'Mobile Developer',
    period: '2020 – 2023',
    bullets: [
      'Owned healthcare mobile apps end-to-end: booking flows, medical workflows, and accessibility-focused UX.',
      'Stack: cross-platform mobile, REST APIs, JWT-style auth, Firebase, FCM push, and release pipelines.',
      'Published and maintained Google Play and App Store releases for BV Mắt, UMC, and UMC2.',
    ],
  },
]

/** All gallery images from every project (MedPro, PakyawKalabaw, BringHacks, HL Mart, …). */
export const allProjectGalleryImages = [
  ...medproImages,
  ...pakyawImages,
  ...bringhacksImages,
  ...hlmartImages,
]

export const projects = [
  {
    id: 'medpro',
    title: 'MedPro',
    featured: true,
    description:
      'Healthcare booking apps for hospitals and clinics (BV Mắt, UMC, UMC2). Cross-platform screens with Dart and BLoC, REST APIs (JWT auth), Firebase, FCM push — released on Google Play and the App Store.',
    tags: ['Flutter', 'Healthcare', 'Dart', 'BLoC'],
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=vn.com.medpro&hl=vi',
    appStoreUrl:
      'https://apps.apple.com/vn/app/medpro-%C4%91%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh/id1481561748',
    images: medproImages,
  },
  {
    id: 'pakyawkalabaw',
    title: 'PakyawKalabaw',
    description:
      'Logistics app for contractors and clients in the Philippines. Flutter mobile flows with Google Maps SDK; C# REST APIs and ReactJS admin dashboard for dispatch and order management.',
    tags: ['Flutter', 'C#', 'ReactJS', 'Philippines'],
    images: pakyawImages,
    autoSlide: true,
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=com.developsoftware.pakyawkalabaw',
    liveUrl: 'https://pakyawkalabaw.com/',
  },
  {
    id: 'bringhacks',
    title: 'BringHacks',
    description:
      'Consumer tips and quotes app on Android and iOS. Flutter with Firebase/REST APIs and BLoC/Riverpod; React admin companion for content management.',
    tags: ['Flutter', 'Firebase', 'Consumer'],
    images: bringhacksImages,
    autoSlide: true,
  },
  {
    id: 'olivia',
    title: 'Olivia',
    featured: true,
    description:
      'AI-powered 3D conversation and chat/video mobile product. Flutter UI for avatar sessions with Riverpod/BLoC, OpenAI/LLM pipelines, and REST/WebSocket event handling for live sessions.',
    tags: ['Flutter', 'Riverpod', 'LLM', '3D'],
    youtubeUrl: 'https://www.youtube.com/watch?v=9GeXwjuslnQ',
  },
  {
    id: 'hlmart',
    title: 'HL Mart',
    featured: true,
    description:
      'E-commerce mobile app for catalog browsing and online orders. Catalog, cart, and checkout flows with go_router navigation and WooCommerce REST API integration.',
    tags: ['Flutter', 'E-commerce', 'Dart', 'WooCommerce'],
    images: hlmartImages,
    autoSlide: true,
    liveUrl: 'https://hlmart.vn/',
  },
  {
    id: 'beam',
    title: 'Beam',
    featured: true,
    description:
      'Real-time voice and video calling platform. Production calling UI with flutter_webrtc via platform channels, REST/streaming/signaling services, and cross-platform reliability fixes.',
    tags: ['Flutter', 'flutter_webrtc', 'Real-time'],
    liveUrl: 'https://beings.com/',
  },
]
