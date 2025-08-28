export interface Notification {
  id: string;
  sender: string;
  message: string;
  initialDelay: number;
  escalationDelay: number;
  courtReason: string;
  urgentMessage?: string;
  acknowledged?: boolean;
  escalated?: boolean;
}

export const notifications: Notification[] = [
  { id: 'n1', sender: 'Boss', message: 'Are you done with sprint 1?', initialDelay: 20000, escalationDelay: 120000, courtReason: 'Disability Act', urgentMessage: 'URGENT: Sprint 1 incomplete!' },
  { id: 'n2', sender: 'Family', message: 'Can you pick up the kids?', initialDelay: 25000, escalationDelay: 120000, courtReason: 'Family Neglect', urgentMessage: 'URGENT: Kids waiting!' },
  { id: 'n3', sender: 'Agile', message: 'Fix Title colour to Red', initialDelay: 30000, escalationDelay: 120000, courtReason: 'Disability Act', urgentMessage: 'URGENT: Title still wrong!' },
];
