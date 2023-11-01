from BO.maintenance import maintenance
import sqlite3

class maintenanceDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_maintenance = [
            (None, 4, '2023-10-29', None, 'Tyre change')
        ]
        
    def init_db(self):
         self.curs.execute("""CREATE TABLE IF NOT EXISTS Maintenance (
              id integer PRIMARY KEY AUTOINCREMENT,
              car_id integer NOT NULL,
              start_date text NOT NULL,
              end_date text,
              desc text NOT NULL,
              FOREIGN KEY(car_id) REFERENCES Cars(car_id))""")
              
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
            return self.curs.fetchall()