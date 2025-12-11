// Portfolio-Station Typen
export type StationId =
  | "welcome"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "contact"
  | "cv";

export interface Station {
  id: StationId;
  name: string;
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
  icon?: string;
}

// Skill Typen
export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "design" | "other";
  level: number; // 1-100
  iconUrl?: string;
  description?: string;
  yearsExperience?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  category: string;
  items: Skill[];
  skills: Skill[];
  color: string;
}

// Projekt Typen
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned" | "in-development";
  startDate: string;
  endDate?: string | null;
  challenges?: string[];
  learnings?: string[];
  metrics?: ProjectMetrics;
  category?: string;
  links?: { live?: string; github?: string; demo?: string };
  highlights?: string[];
}

export interface ProjectMetrics {
  performance?: string;
  users?: string;
  codeLines?: number;
  duration?: string;
}

// Erfahrungs Typen
export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  startDate: string;
  endDate?: string | null;
  current: boolean;
  location?: string;
  skills: string[];
  technologies?: string[];
  companyUrl?: string;
  logoUrl?: string;
}

// About Typen
export interface AboutContent {
  intro: string;
  description: string;
  highlights: string[];
  personalInfo: PersonalInfo;
  interests?: string[];
  values?: Array<{ title: string; description: string; icon: string }>;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline?: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  profileImageUrl?: string;
  yearsOfExperience?: number;
  projects?: number;
  happyClients?: number;
  technologies?: number;
  social: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

// Contact Typen
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  availability: string;
  preferredContact: "email" | "phone" | "both";
  responseTime?: string;
  timezone?: string;
  languages?: string[];
  methods?: Array<{
    name: string;
    value: string;
    icon: string;
    primary?: boolean;
    type?: string;
    label?: string;
  }>;
}

// CV Typen
export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications?: Certification[];
  awards?: Award[];
  downloadUrl?: string;
  lastUpdated?: string;
  sections?: Array<{ title: string; content: string }>;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  grade?: string;
  description?: string;
  achievements?: string[];
}

export interface Language {
  name: string;
  level: "Basic" | "Intermediate" | "Advanced" | "Native";
  certification?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

// Modal & UI Typen
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
}

export interface StationContentProps {
  stationId: StationId;
  isActive: boolean;
  onClose?: () => void;
}

// Animation Typen
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: "in" | "out";
}

// Theme Typen
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
}

// Navigation Typen
export interface NavigationState {
  currentStation: StationId;
  previousStation?: StationId;
  isTransitioning: boolean;
  showContent: boolean;
}

// Form Validation Typen
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// API Response Typen
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Portfolio Data Container
export interface PortfolioData {
  about: AboutContent;
  personal: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  cv: CVData;
  contact: ContactInfo;
  stations: Station[];
}
