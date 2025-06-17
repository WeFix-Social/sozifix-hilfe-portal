
import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ClientCard from './ClientCard';
import { mockClients } from '../data/mockData';
import { Client } from '../types';

interface DashboardProps {
  onClientSelect: (clientId: string) => void;
}

const Dashboard = ({ onClientSelect }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.postalCode.includes(searchTerm) ||
      client.preferredLanguage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || client.status === selectedStatus;
    const matchesLanguage = selectedLanguage === '' || client.languageCode === selectedLanguage;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  const statusCounts = mockClients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusOptions = ['Neu', 'Aktiv', 'Wartend', 'Abgeschlossen'];
  const languageOptions = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'Arabisch', flag: '🇸🇦' },
    { code: 'tr', name: 'Türkisch', flag: '🇹🇷' },
    { code: 'ru', name: 'Russisch', flag: '🇷🇺' }
  ];

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statusOptions.map((status) => (
          <div key={status} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{status}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {statusCounts[status] || 0}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                status === 'Neu' ? 'bg-yellow-100' :
                status === 'Aktiv' ? 'bg-green-100' :
                status === 'Wartend' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <span className="text-2xl">
                  {status === 'Neu' ? '🆕' :
                   status === 'Aktiv' ? '✅' :
                   status === 'Wartend' ? '⏳' :
                   '✔️'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Meine Klienten</h2>
          <p className="text-gray-600">{filteredClients.length} von {mockClients.length} Klienten</p>
        </div>
        <Button className="bg-primary-500 hover:bg-primary-600">
          <Plus className="h-4 w-4 mr-2" />
          Neuen Klienten anlegen
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Nach Name, Stadt, PLZ oder Sprache suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('')}
            >
              Alle Status
            </Button>
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(selectedStatus === status ? '' : status)}
              >
                {status} ({statusCounts[status] || 0})
              </Button>
            ))}
          </div>

          {/* Language Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLanguage === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('')}
            >
              Alle Sprachen
            </Button>
            {languageOptions.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage(selectedLanguage === lang.code ? '' : lang.code)}
              >
                {lang.flag} {lang.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onClick={() => onClientSelect(client.id)}
          />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Keine Klienten gefunden.</p>
          <p className="text-sm text-gray-400 mt-1">
            Versuchen Sie andere Suchkriterien oder legen Sie einen neuen Klienten an.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
