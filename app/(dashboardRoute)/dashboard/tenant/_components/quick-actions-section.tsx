'use client';

import { Search, Plus, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const quickActions = [
  {
    icon: Search,
    label: 'Browse Properties',
    description: 'Find your next place to stay',
  },
  {
    icon: Plus,
    label: 'New Request',
    description: 'Create a booking request',
  },
  {
    icon: MessageSquare,
    label: 'Contact Support',
    description: 'Get help from our team',
  },
  {
    icon: HelpCircle,
    label: 'Help Center',
    description: 'Browse FAQs and guides',
  },
];

export function QuickActionsSection() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col items-center justify-center gap-2 p-4 hover:bg-muted transition-colors"
            >
              <Icon className="h-5 w-5 text-sidebar-primary" />
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
