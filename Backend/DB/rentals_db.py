from BO.rental import rental
import sqlite3

class rentalsDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        
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
                FOREIGN KEY(car_id) REFERENCES Cars(car_id))""")
      
    def insert_rental(self, rental):
        with self.conn:
            self.curs.execute("INSERT INTO Rentals VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (None, rental.user_id, rental.car_id, rental.pick_up, rental.start_date, rental.start_time,
                    rental.drop_off, rental.end_date, rental.end_time, rental.total_cost, rental.status,
                        rental.payment_status))
            
    def get_rental_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Rentals WHERE id=?", (id,))
            return self.curs.fetchall()
            
    def show_all_rentals(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Rentals")
            return self.curs.fetchall()