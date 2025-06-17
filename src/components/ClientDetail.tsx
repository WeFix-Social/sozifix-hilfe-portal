
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TimelineTab from './TimelineTab';
import { mockClients } from '../data/mockData';
import { Client } from '../types';

interface ClientDetailProps {
  clientId: string;
  onBack: () => void;
}

const ClientDetail = ({ clientId, onBack }: ClientDetailProps) => {
  const client = mockClients.find(c => c.id === clientId);
  
  if (!client) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-red-500">Klient nicht gefunden</p>
          <Button onClick={onBack} className="mt-4">
            Zurück zum Dashboard
          </Button>
        </div>
      </div>
    );
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zum Dashboard
        </Button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {client.city}, {client.postalCode}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">{getLanguageFlag(client.languageCode)}</span>
                  {client.preferredLanguage}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Letzter Kontakt: {client.lastContact}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {client.assignedAdvisor}
                </div>
                {client.nextAppointment && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Nächster Termin: {client.nextAppointment}
                  </div>
                )}
              </div>

              {client.benefits.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Bezogene Leistungen:</p>
                  <div className="flex flex-wrap gap-2">
                    {client.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <Button className="bg-primary-500 hover:bg-primary-600">
                Neuen Termin vereinbaren
              </Button>
              <Button variant="outline">
                Nachricht senden
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="timeline">Verlauf</TabsTrigger>
          <TabsTrigger value="applications">Aktuelle Anträge</TabsTrigger>
          <TabsTrigger value="calculator">Leistungen berechnen</TabsTrigger>
          <TabsTrigger value="documents">Behördenpost</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="files">Dokumente</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineTab clientId={clientId} />
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Aktuelle Anträge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Antragsübersicht wird hier angezeigt...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Leistungsrechner</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Leistungsberechnung wird hier angezeigt...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Behördenpost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Behördenkommunikation wird hier angezeigt...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Mehrsprachiger Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Chat-Interface wird hier angezeigt...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentenverwaltung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Dokumentenübersicht wird hier angezeigt...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
