from BO.car import car
from DB.utils import fetchall_conversion
import sqlite3

class carsDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_cars = [
            (None, 'Volvo', 'C40', 2021, 'MPV', 'automatic', 'electric', '3902', 4, 65, 'available', 115, 400),
            (None, 'Ford', 'EcoSport', 2020, 'Sedan', 'manual', 'petrol', '6412', 4, 45, 'rented', 90, None),
            (None, 'Toyota', 'Prius', 2017, 'SUV', 'automatic', 'electric', '4923', 5, 50, 'available', 80, 500),
            (None, 'Ford', 'F-150', 2022, 'Van', 'manual', 'petrol', '3489', 3, 80, 'maintenance', 150, None),
            (None, 'BMW', 'M2 Coupe', 2016, 'SUV', 'manual', 'diesel', '2190', 4, 40, 'available', 170, None),
        ]
        self.keys = ('id', 'make', 'model', 'year', 'type', 'transmission', 'powertrain', 'vin_number',
            'seats', 'cargo_cap', 'status', 'range')
        
    def init_db(self):
           self.curs.execute("""CREATE TABLE IF NOT EXISTS Cars (
                car_id integer PRIMARY KEY AUTOINCREMENT,
                make text NOT NULL,
                model text NOT NULL,
                year integer NOT NULL,
                type text NOT NULL,
                transmission text CHECK(transmission IN ('manual', 'automatic')),
                powertrain text CHECK(powertrain IN ('petrol', 'diesel', 'electric', 'hybrid')),
                vin_number text NOT NULL,
                seats integer NOT NULL,
                cargo_capacity integer NOT NULL,
                status text CHECK(status IN ('available', 'rented', 'maintenance')),
                price_per_day integer NOT NULL,
                range integer)""")
                
    def populate_cars(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Cars VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", self.default_cars)
        
    def insert_car(self, car):
        with self.conn:
            self.curs.execute("INSERT INTO Cars VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                    (None, car.make, car.model, car.year, car.type, car.transmission, car.powertrain, car.vin_number,
                        car.seats, car.cargo_capacity, car.status, car.price_per_day, car.range))
                        
    def delete_car(self, id):
        with self.conn:
            self.curs.execute("DELETE FROM Cars WHERE car_id=?", (id,))
            
    def get_car_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE car_id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
           
    def get_car_by_make(self, make):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE make=? AND status='available'", (make,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
            
    def get_car_by_model(self, model):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE model=? AND status='available'", (model,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
            
    def show_all_available_cars(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE status='available'")
            return fetchall_conversion(self.keys, self.curs.fetchall())