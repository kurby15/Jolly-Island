export interface RFIDCard {
  id: string;
  status: 'available' | 'assigned' | 'lost' | 'disabled';
  customer: string;
  assignedDate: string;
}

// Shared in-memory store — admin manages cards, cashier reads available ones
let rfidCards: RFIDCard[] = [
  { id: 'RFID-001', status: 'assigned', customer: 'Emma Johnson', assignedDate: '2026-06-08' },
  { id: 'RFID-002', status: 'assigned', customer: 'Liam Smith', assignedDate: '2026-06-08' },
  { id: 'RFID-003', status: 'assigned', customer: 'Olivia Brown', assignedDate: '2026-06-08' },
  { id: 'RFID-004', status: 'available', customer: '-', assignedDate: '-' },
  { id: 'RFID-005', status: 'available', customer: '-', assignedDate: '-' },
  { id: 'RFID-006', status: 'lost', customer: '-', assignedDate: '2026-06-05' },
  { id: 'RFID-007', status: 'disabled', customer: '-', assignedDate: '-' },
  { id: 'RFID-008', status: 'available', customer: '-', assignedDate: '-' },
  { id: 'RFID-009', status: 'available', customer: '-', assignedDate: '-' },
  { id: 'RFID-010', status: 'available', customer: '-', assignedDate: '-' },
];

const listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(fn => fn());
}

export function getCards(): RFIDCard[] {
  return rfidCards;
}

export function getAvailableCards(): RFIDCard[] {
  return rfidCards.filter(c => c.status === 'available');
}

export function addCard(card: RFIDCard) {
  rfidCards = [...rfidCards, card];
  notify();
}

export function updateCard(id: string, updates: Partial<RFIDCard>) {
  rfidCards = rfidCards.map(c => c.id === id ? { ...c, ...updates } : c);
  notify();
}

export function assignCard(id: string, customer: string) {
  updateCard(id, { status: 'assigned', customer, assignedDate: new Date().toISOString().slice(0, 10) });
}

export function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i !== -1) listeners.splice(i, 1);
  };
}
