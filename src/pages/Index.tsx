
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import ClientDetail from '../components/ClientDetail';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const getPageTitle = () => {
    if (selectedClientId) {
      return 'Klient Details';
    }
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'clients':
        return 'Klienten';
      case 'calculator':
        return 'Leistungsrechner';
      case 'documents':
        return 'Dokumente';
      case 'messages':
        return 'Nachrichten';
      case 'ai-assistant':
        return 'KI-Assistent';
      case 'settings':
        return 'Einstellungen';
      default:
        return 'Sozifix';
    }
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentPage('client-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedClientId(null);
    setCurrentPage('dashboard');
  };

  const renderMainContent = () => {
    if (selectedClientId) {
      return (
        <ClientDetail 
          clientId={selectedClientId} 
          onBack={handleBackToDashboard}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
      case 'clients':
        return <Dashboard onClientSelect={handleClientSelect} />;
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {getPageTitle()}
              </h2>
              <p className="text-gray-600">
                Diese Seite ist noch in Entwicklung.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 ml-16 lg:ml-16">
        <Header title={getPageTitle()} />
        
        <main className="min-h-[calc(100vh-80px)] bg-gray-50">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
