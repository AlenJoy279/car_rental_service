from BO.rental import rental
from DB.utils import fetchall_conversion
import sqlite3


class rentalsDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_rentals = [
            (None, 1, 2, 'Dublin North Depot', '2023-10-20', 1697840966, 'Dublin North Depot', '2023-10-29', 1698622166,
             810, 'completed', 'paid'),
            (None, 1, 9, 'Dublin South Depot', '2023-12-05', 1697834966, 'Dublin South Depot', '2023-12-15', 1698616166,
             560, 'active', 'unpaid'),
            (None, 2, 15, 'Galway West Depot', '2023-10-18', 1697840966, 'Galway West Depot', '2023-10-25', 1698622166,
             490, 'completed', 'paid'),
            (None, 3, 23, 'Galway City Depot', '2023-10-19', 1697844566, 'Galway City Depot', '2023-10-26', 1698625766,
             630, 'completed', 'paid'),
            (None, 4, 29, 'Cork City Depot', '2023-10-21', 1697848166, 'Cork City Depot', '2023-10-28', 1698629366, 700,
             'completed', 'paid'),
            (None, 5, 33, 'Cork East Depot', '2023-10-23', 1697851766, 'Cork East Depot', '2023-10-30', 1698632966, 770,
             'completed', 'paid')

        ]
        self.keys = (
        'id', 'user_id', 'car_id', 'pick_up', 'start_date', 'start_time', 'drop_off', 'end_date', 'end_time',
        'total_cost', 'status', 'payment_status')

    def init_db(self):
        self.curs.execute("""CREATE TABLE IF NOT EXISTS Rentals (
                id integer PRIMARY KEY AUTOINCREMENT,
                user_id integer NOT NULL,
                car_id integer NOT NULL,
                pick_up text NOT NULL,
                start_date text NOT NULL,
                start_time integer NOT NULl,
                drop_off text NOT NULL,
                end_date text NOT NULL,
                end_time integer NOT NULL,
                total_cost integer NOT NULL,
                status text CHECK(status IN ('active', 'completed', 'cancelled')),
                payment_status text CHECK(payment_status IN ('unpaid', 'paid')),
                FOREIGN KEY(car_id) REFERENCES Cars(car_id) ON DELETE CASCADE,
                FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE)""")

    def populate_rentals(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Rentals VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                                  self.default_rentals)

    def insert_rental(self, rental):
        with self.conn:
            self.curs.execute("INSERT INTO Rentals VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                              (
                              None, rental.user_id, rental.car_id, rental.pick_up, rental.start_date, rental.start_time,
                              rental.drop_off, rental.end_date, rental.end_time, rental.total_cost, rental.status,
                              rental.payment_status))

    def delete_rental(self, id):
        with self.conn:
            self.curs.execute("DELETE FROM Rentals WHERE id=?", (id,))

    def update_rental_status(self, id, status):
        with self.conn:
            self.curs.execute("UPDATE Rentals SET status=? WHERE id=?", (status, id))

    def update_rental_payment(self, id, status):
        with self.conn:
            self.curs.execute("UPDATE Rentals SET payment_status=? WHERE id=?", (status, id))

    def get_rental_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Rentals WHERE id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())

    def show_all_active_rentals(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Rentals WHERE status='active'")
            return fetchall_conversion(self.keys, self.curs.fetchall())

    def get_rentals_by_user(self, user_id):
        with self.conn:
            self.curs.execute("SELECT * FROM Rentals WHERE user_id=?", (user_id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
