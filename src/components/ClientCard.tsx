
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Client } from '../types';

interface ClientCardProps {
  client: Client;
  onClick: () => void;
}

const getStatusColor = (status: Client['status']) => {
  switch (status) {
    case 'Neu':
      return 'bg-yellow-100 text-yellow-800';
    case 'Aktiv':
      return 'bg-green-100 text-green-800';
    case 'Wartend':
      return 'bg-yellow-100 text-yellow-800';
    case 'Abgeschlossen':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getLanguageColor = (languageCode: string) => {
  switch (languageCode) {
    case 'ar':
      return 'bg-orange-100 text-orange-800';
    case 'tr':
      return 'bg-red-100 text-red-800';
    case 'ru':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

const getLanguageFlag = (languageCode: string) => {
  switch (languageCode) {
    case 'ar':
      return '🇸🇦';
    case 'tr':
      return '🇹🇷';
    case 'ru':
      return '🇷🇺';
    default:
      return '🇩🇪';
  }
};

const ClientCard = ({ client, onClick }: ClientCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow duration-200 cursor-pointer border-l-4 border-l-primary-500"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 transition-colors">
              {client.name}
            </h3>
            <p className="text-sm text-gray-500">
              {client.city}, {client.postalCode}
            </p>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg">{getLanguageFlag(client.languageCode)}</span>
          <Badge className={getLanguageColor(client.languageCode)}>
            {client.preferredLanguage}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Letzter Kontakt:</span> {client.lastContact}
          </div>
          {client.nextAppointment && (
            <div>
              <span className="font-medium">Nächster Termin:</span> {client.nextAppointment}
            </div>
          )}
          <div>
            <span className="font-medium">Berater:</span> {client.assignedAdvisor}
          </div>
        </div>

        {client.benefits.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Bezogene Leistungen:</p>
            <div className="flex flex-wrap gap-1">
              {client.benefits.map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientCard;
