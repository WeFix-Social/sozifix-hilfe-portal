
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city: string;
  postalCode: string;
  status: "Neu" | "Aktiv" | "Wartend" | "Abgeschlossen";
  benefits: string[];
  lastContact: string;
  birthDate?: string;
  preferredLanguage: string;
  languageCode: string;
  assignedAdvisor: string;
  nextAppointment?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  location: string;
  languages: string[];
  languageCodes: string[];
  role: string;
  avatar?: string;
}

export interface TimelineEvent {
  id: string;
  clientId: string;
  type: "client_created" | "benefits_calculated" | "application_submitted" | "consultation";
  title: string;
  description: string;
  date: string;
  time: string;
  icon: string;
  color: string;
  details?: string;
  expanded?: boolean;
}

export interface Application {
  id: string;
  clientId: string;
  type: "BuT" | "Wohngeld" | "Kinderzuschlag" | "Bürgergeld";
  status: "In Bearbeitung" | "Versendet" | "Bewilligt" | "Abgelehnt";
  progress: number;
  documentsUploaded: number;
  documentsRequired: number;
  submittedDate: string;
}

export interface Notification {
  id: string;
  type: "new_application" | "whatsapp_message" | "new_client";
  title: string;
  description: string;
  clientId?: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
}
