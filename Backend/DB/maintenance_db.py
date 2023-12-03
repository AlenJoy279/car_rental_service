from BO.maintenance import maintenance
from DB.utils import fetchall_conversion
import sqlite3

class maintenanceDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_maintenance = [
            (None, 4, '2023-11-29', '2023-12-08', 'Tyre change'),
            (None, 10, '2023-11-05', '2023-12-15', 'Paint Job'),
            (None, 17, '2023-11-10', '2023-12-20', 'Suspension Check'),
            (None, 25, '2023-11-15', '2023-12-25', 'Transmission Repair'),
        ]
        self.keys = ('id', 'car_id', 'start_date', 'end_date', 'desc')
        
    def init_db(self):
         self.curs.execute("""CREATE TABLE IF NOT EXISTS Maintenance (
              id integer PRIMARY KEY AUTOINCREMENT,
              car_id integer NOT NULL,
              start_date text NOT NULL,
              end_date text,
              desc text NOT NULL,
              FOREIGN KEY(car_id) REFERENCES Cars(car_id) ON DELETE CASCADE)""")
              
    def populate_maintenance(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Maintenance VALUES (?, ?, ?, ?, ?)", self.default_maintenance)
            
    def insert_maintenance(self, maintenance):
        with self.conn:
            self.curs.execute("INSERT INTO Maintenance VALUES (?, ?, ?, ?, ?)", 
                    (None, user.auth_id, user.email, user.full_name, user.phone))
                    
    def get_maintenance_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Maintenance WHERE id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
            
    def get_maintenance_by_car_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Maintenance WHERE car_id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
           
    def show_all_maintenance(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Maintenance")
            return fetchall_conversion(self.keys, self.curs.fetchall())
