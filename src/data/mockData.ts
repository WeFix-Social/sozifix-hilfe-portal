
import { Client, User, TimelineEvent, Application, Notification } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Aleksandra Tekin',
  email: 'atekin@but-beratung.de',
  organization: 'BuT Beratung',
  location: 'Berlin',
  languages: ['Deutsch', 'Russisch', 'Englisch'],
  languageCodes: ['de', 'ru', 'en'],
  role: 'Sozialberaterin',
  avatar: '/api/placeholder/150/150'
};

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    email: 'maria.schmidt@email.com',
    phone: '+49 30 12345678',
    city: 'Berlin',
    postalCode: '10115',
    status: 'Aktiv',
    benefits: ['BuT', 'Wohngeld'],
    lastContact: '15.06.2026',
    birthDate: '1985-03-15',
    preferredLanguage: 'Deutsch',
    languageCode: 'de',
    assignedAdvisor: 'Aleksandra Tekin',
    nextAppointment: '20.06.2026'
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+49 40 87654321',
    city: 'Hamburg',
    postalCode: '20095',
    status: 'Wartend',
    benefits: ['Bürgergeld'],
    lastContact: '12.06.2026',
    birthDate: '1990-08-22',
    preferredLanguage: 'Arabisch',
    languageCode: 'ar',
    assignedAdvisor: 'Aleksandra Tekin',
    nextAppointment: '22.06.2026'
  },
  {
    id: '3',
    name: 'Elena Müller',
    email: 'elena.mueller@email.com',
    phone: '+49 89 11223344',
    city: 'München',
    postalCode: '80331',
    status: 'Aktiv',
    benefits: ['Kinderzuschlag', 'BuT'],
    lastContact: '18.06.2026',
    birthDate: '1988-11-03',
    preferredLanguage: 'Deutsch',
    languageCode: 'de',
    assignedAdvisor: 'Aleksandra Tekin',
    nextAppointment: '25.06.2026'
  },
  {
    id: '4',
    name: 'Thomas Weber',
    email: 'thomas.weber@email.com',
    phone: '+49 221 99887766',
    city: 'Köln',
    postalCode: '50667',
    status: 'Abgeschlossen',
    benefits: ['Wohngeld'],
    lastContact: '05.06.2026',
    birthDate: '1975-01-12',
    preferredLanguage: 'Deutsch',
    languageCode: 'de',
    assignedAdvisor: 'Aleksandra Tekin'
  },
  {
    id: '5',
    name: 'Fatima Al-Rashid',
    email: 'fatima.alrashid@email.com',
    phone: '+49 711 55443322',
    city: 'Stuttgart',
    postalCode: '70173',
    status: 'Neu',
    benefits: [],
    lastContact: '19.06.2026',
    birthDate: '1992-05-18',
    preferredLanguage: 'Arabisch',
    languageCode: 'ar',
    assignedAdvisor: 'Aleksandra Tekin',
    nextAppointment: '21.06.2026'
  },
  {
    id: '6',
    name: 'Aylin Burcin',
    email: 'aylin.burcin@email.com',
    phone: '+49 30 66778899',
    city: 'Berlin',
    postalCode: '10178',
    status: 'Neu',
    benefits: [],
    lastContact: '17.06.2026',
    birthDate: '1987-09-25',
    preferredLanguage: 'Türkisch',
    languageCode: 'tr',
    assignedAdvisor: 'Aleksandra Tekin',
    nextAppointment: '23.06.2026'
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    clientId: '1',
    type: 'client_created',
    title: 'Klient angelegt',
    description: 'Neuer Klient Maria Schmidt wurde im System erstellt',
    date: '2026-05-15',
    time: '09:30',
    icon: 'users',
    color: 'text-blue-500',
    details: 'Klientendaten vollständig erfasst. Erste Beratung terminiert.',
    expanded: false
  },
  {
    id: '2',
    clientId: '1',
    type: 'benefits_calculated',
    title: 'Leistungen berechnet',
    description: 'BuT und Wohngeld Anspruch berechnet',
    date: '2026-05-18',
    time: '14:15',
    icon: 'calculator',
    color: 'text-purple-500',
    details: 'BuT: 150€/Monat, Wohngeld: 180€/Monat. Alle Voraussetzungen erfüllt.',
    expanded: false
  },
  {
    id: '3',
    clientId: '1',
    type: 'application_submitted',
    title: 'Antrag gestellt',
    description: 'BuT-Antrag beim zuständigen Amt eingereicht',
    date: '2026-05-22',
    time: '11:00',
    icon: 'file-text',
    color: 'text-green-500',
    details: 'Antrag vollständig mit allen erforderlichen Nachweisen eingereicht.',
    expanded: false
  },
  {
    id: '4',
    clientId: '1',
    type: 'consultation',
    title: 'Beratungsgespräch',
    description: 'Persönliches Beratungsgespräch geführt',
    date: '2026-06-15',
    time: '10:30',
    icon: 'message-square',
    color: 'text-orange-500',
    details: 'Ausführliche Beratung zu Wohngeld-Antrag. Nächste Schritte besprochen.',
    expanded: false
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    clientId: '1',
    type: 'BuT',
    status: 'Bewilligt',
    progress: 100,
    documentsUploaded: 7,
    documentsRequired: 7,
    submittedDate: '2026-05-22'
  },
  {
    id: '2',
    clientId: '1',
    type: 'Wohngeld',
    status: 'In Bearbeitung',
    progress: 85,
    documentsUploaded: 6,
    documentsRequired: 7,
    submittedDate: '2026-06-10'
  },
  {
    id: '3',
    clientId: '2',
    type: 'Bürgergeld',
    status: 'Versendet',
    progress: 100,
    documentsUploaded: 5,
    documentsRequired: 5,
    submittedDate: '2026-06-08'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new_application',
    title: 'Neuer Antrag',
    description: 'Maria Schmidt - Wohngeld Antrag eingereicht',
    clientId: '1',
    time: '10:30',
    read: false,
    icon: 'file-text',
    color: 'text-green-500'
  },
  {
    id: '2',
    type: 'whatsapp_message',
    title: 'WhatsApp Nachricht',
    description: 'Ahmed Hassan hat eine neue Nachricht gesendet',
    clientId: '2',
    time: '09:15',
    read: false,
    icon: 'message-square',
    color: 'text-blue-500'
  },
  {
    id: '3',
    type: 'new_client',
    title: 'Neue Klienten-Anfrage',
    description: 'Aylin Burcin - Erstberatung angefragt',
    clientId: '6',
    time: '08:45',
    read: true,
    icon: 'user-plus',
    color: 'text-purple-500'
  }
];
