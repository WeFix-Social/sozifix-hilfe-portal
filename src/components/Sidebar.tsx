
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Calculator, 
  FileText, 
  MessageSquare, 
  Bot, 
  Settings,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'clients', icon: Users, label: 'Klienten' },
    { id: 'calculator', icon: Calculator, label: 'Leistungsrechner' },
    { id: 'documents', icon: FileText, label: 'Dokumente' },
    { id: 'messages', icon: MessageSquare, label: 'Nachrichten' },
    { id: 'ai-assistant', icon: Bot, label: 'KI-Assistent' },
    { id: 'settings', icon: Settings, label: 'Einstellungen' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Sozifix</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-left transition-colors duration-200",
                  isActive 
                    ? "bg-primary-50 text-primary-600 border-r-2 border-primary-500" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-600" : "text-gray-400"
                )} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Toggle button for collapsed state */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="fixed left-4 top-4 z-40 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
