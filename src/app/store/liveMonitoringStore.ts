import { getCards } from "./rfidStore";

export interface LiveSession {
  id: string;
  name: string;
  zone: string;
  entryTime: string;
  remaining: string;
  status: "active" | "warning" | "expiring";
  progress: number;
  package: string;
  lastTapAt: string;
}

export interface TapEvent {
  id: number;
  rfid: string;
  name: string;
  zone: string;
  result: "granted" | "denied";
  reason: string;
  time: string;
  source: "iot-reader" | "manual";
}

export interface TapResult {
  rfid: string;
  name: string;
  package: string;
  timeRemaining: string;
  zone: string;
  status: "granted" | "denied";
  reason: string;
  time: string;
}

let liveSessions: LiveSession[] = [
  {
    id: "RFID-001",
    name: "Emma Johnson",
    zone: "Trampoline Area",
    entryTime: "2:00 PM",
    remaining: "45 min",
    status: "active",
    progress: 60,
    package: "2 Hour Play",
    lastTapAt: "2:00 PM",
  },
  {
    id: "RFID-002",
    name: "Liam Smith",
    zone: "Ball Pit",
    entryTime: "2:18 PM",
    remaining: "12 min",
    status: "warning",
    progress: 20,
    package: "1 Hour Play",
    lastTapAt: "2:18 PM",
  },
  {
    id: "RFID-003",
    name: "Olivia Brown",
    zone: "Climbing Area",
    entryTime: "1:10 PM",
    remaining: "1 hr 20 min",
    status: "active",
    progress: 90,
    package: "Unlimited Play",
    lastTapAt: "1:10 PM",
  },
  {
    id: "RFID-004",
    name: "Noah Davis",
    zone: "Arcade Area",
    entryTime: "2:25 PM",
    remaining: "5 min",
    status: "expiring",
    progress: 8,
    package: "1 Hour Play",
    lastTapAt: "2:25 PM",
  },
  {
    id: "RFID-005",
    name: "Ava Wilson",
    zone: "Toddler Zone",
    entryTime: "2:02 PM",
    remaining: "58 min",
    status: "active",
    progress: 64,
    package: "2 Hour Play",
    lastTapAt: "2:02 PM",
  },
  {
    id: "RFID-006",
    name: "Ethan Martinez",
    zone: "Trampoline Area",
    entryTime: "1:45 PM",
    remaining: "35 min",
    status: "active",
    progress: 48,
    package: "2 Hour Play",
    lastTapAt: "1:45 PM",
  },
  {
    id: "RFID-007",
    name: "Sophia Garcia",
    zone: "Ball Pit",
    entryTime: "2:20 PM",
    remaining: "1 hr",
    status: "active",
    progress: 83,
    package: "Unlimited Play",
    lastTapAt: "2:20 PM",
  },
  {
    id: "RFID-008",
    name: "Mason Lee",
    zone: "Climbing Area",
    entryTime: "2:15 PM",
    remaining: "15 min",
    status: "warning",
    progress: 25,
    package: "1 Hour Play",
    lastTapAt: "2:15 PM",
  },
];

let tapEvents: TapEvent[] = [
  {
    id: 1,
    rfid: "RFID-001",
    name: "Emma Johnson",
    zone: "Trampoline Area",
    result: "granted",
    reason: "Valid access",
    time: "2:45 PM",
    source: "iot-reader",
  },
  {
    id: 2,
    rfid: "RFID-002",
    name: "Liam Smith",
    zone: "Ball Pit",
    result: "granted",
    reason: "Valid access",
    time: "2:42 PM",
    source: "iot-reader",
  },
  {
    id: 3,
    rfid: "RFID-003",
    name: "Olivia Brown",
    zone: "Climbing Area",
    result: "granted",
    reason: "Valid access",
    time: "2:38 PM",
    source: "iot-reader",
  },
  {
    id: 4,
    rfid: "RFID-010",
    name: "Unknown",
    zone: "Entry Gate",
    result: "denied",
    reason: "Invalid RFID",
    time: "2:35 PM",
    source: "iot-reader",
  },
];

const listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((listener) => listener());
}

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function nextEventId() {
  return tapEvents.length > 0 ? tapEvents[0].id + 1 : 1;
}

function recordEvent(event: TapEvent) {
  tapEvents = [event, ...tapEvents].slice(0, 20);
}

export function getLiveSessions() {
  return liveSessions;
}

export function getTapEvents() {
  return tapEvents;
}

export function recordRfidTap(
  rfidId: string,
  source: TapEvent["source"] = "iot-reader",
): TapResult {
  const time = formatClock(new Date());
  const normalizedId = rfidId.trim().toUpperCase();
  const card = getCards().find((item) => item.id === normalizedId);

  if (!card) {
    const result: TapResult = {
      rfid: normalizedId,
      name: "Unknown",
      package: "No active session",
      timeRemaining: "N/A",
      zone: "Entry Gate",
      status: "denied",
      reason: "RFID not registered",
      time,
    };

    recordEvent({
      id: nextEventId(),
      rfid: result.rfid,
      name: result.name,
      zone: result.zone,
      result: "denied",
      reason: result.reason,
      time: result.time,
      source,
    });
    notify();
    return result;
  }

  if (card.status !== "assigned") {
    const reason =
      card.status === "available"
        ? "Card has not been assigned yet"
        : card.status === "lost"
          ? "Card reported lost"
          : "Card is disabled";

    const result: TapResult = {
      rfid: card.id,
      name: card.customer === "-" ? "Unknown" : card.customer,
      package: "No active session",
      timeRemaining: "N/A",
      zone: "Entry Gate",
      status: "denied",
      reason,
      time,
    };

    recordEvent({
      id: nextEventId(),
      rfid: result.rfid,
      name: result.name,
      zone: result.zone,
      result: "denied",
      reason: result.reason,
      time: result.time,
      source,
    });
    notify();
    return result;
  }

  const session = liveSessions.find((item) => item.id === card.id);
  const result: TapResult = {
    rfid: card.id,
    name: card.customer,
    package: session?.package ?? "Play Session",
    timeRemaining: session?.remaining ?? "N/A",
    zone: session?.zone ?? "Entry Gate",
    status: "granted",
    reason: "Valid access",
    time,
  };

  if (session) {
    liveSessions = liveSessions.map((item) =>
      item.id === card.id ? { ...item, lastTapAt: time } : item,
    );
  } else {
    liveSessions = [
      {
        id: card.id,
        name: card.customer,
        zone: "Entry Gate",
        entryTime: time,
        remaining: "N/A",
        status: "active",
        progress: 0,
        package: "Play Session",
        lastTapAt: time,
      },
      ...liveSessions,
    ];
  }

  recordEvent({
    id: nextEventId(),
    rfid: result.rfid,
    name: result.name,
    zone: result.zone,
    result: "granted",
    reason: result.reason,
    time: result.time,
    source,
  });
  notify();
  return result;
}

export function subscribeLiveMonitoring(listener: () => void) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}
