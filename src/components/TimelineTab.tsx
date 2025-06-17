
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users, Calculator, FileText, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockTimelineEvents } from '../data/mockData';
import { TimelineEvent } from '../types';

interface TimelineTabProps {
  clientId: string;
}

const TimelineTab = ({ clientId }: TimelineTabProps) => {
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  
  const clientEvents = mockTimelineEvents
    .filter(event => event.clientId === clientId)
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());

  const toggleExpanded = (eventId: string) => {
    setExpandedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'client_created':
        return <Users className="h-5 w-5" />;
      case 'benefits_calculated':
        return <Calculator className="h-5 w-5" />;
      case 'application_submitted':
        return <FileText className="h-5 w-5" />;
      case 'consultation':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (clientEvents.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Keine Verlaufseinträge vorhanden.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {clientEvents.map((event, index) => {
          const isExpanded = expandedEvents.includes(event.id);
          
          return (
            <div key={event.id} className="relative flex items-start space-x-4 pb-8">
              {/* Timeline dot and icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${event.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                <div className={event.color}>
                  {getEventIcon(event.type)}
                </div>
              </div>

              {/* Event content */}
              <Card className="flex-1 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {formatDate(event.date)} um {event.time}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      
                      {isExpanded && event.details && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-3">
                          <p className="text-sm text-gray-700">{event.details}</p>
                        </div>
                      )}
                    </div>
                    
                    {event.details && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(event.id)}
                        className="ml-2"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineTab;
