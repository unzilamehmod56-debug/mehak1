/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  category: "makeup" | "hair" | "spa";
  basePrice: number;
  duration: string;
  image: string;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  serviceCategory?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  addOnIds: string[];
  date: string;
  time: string;
  notes: string;
  totalPrice: number;
  status: "pending" | "confirmed";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
