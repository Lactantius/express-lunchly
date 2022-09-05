/** Reservation for Lunchly */

import moment from "moment";

import db from "../db";
//const db = require("../db");

/** A reservation for a party */

interface ReservationData {
  id?: number;
  customerId: number;
  numGuests: number;
  startAt?: Date;
  notes: string;
}

class Reservation {
  id?: number;
  customerId: number;
  numGuests: number;
  startAt?: Date;
  notes: string;

  constructor(data: ReservationData) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.numGuests = data.numGuests;
    this.startAt = data.startAt;
    this.notes = data.notes;
  }

  /** formatter for startAt */

  getformattedStartAt(): string {
    return moment(this.startAt).format("MMMM Do YYYY, h:mm a");
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId: number) {
    const results = await db.query(
      `SELECT id,
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
      [customerId]
    );

    return results.rows.map((row) => new Reservation(row));
  }
}

export default Reservation;
