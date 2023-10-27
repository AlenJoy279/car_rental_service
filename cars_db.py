from car import car
import sqlite3

class carsDB():
    def __init__(self):
        self.conn = sqlite3.connect('cars.db', check_same_thread=False)
        self.curs = self.conn.cursor()
        self.default_cars = [
            (None, 'Volvo', 'C40', 2021, 'MPV', 'automatic', 'electric', '3902', 4, 65, 'rented', 115, 400),
            (None, 'Ford', 'EcoSport', 2020, 'Sedan', 'manual', 'petrol', '6412', 4, 45, 'rented', 90, None),
            (None, 'Toyota', 'Prius', 2017, 'SUV', 'automatic', 'electric', '4923', 5, 50, 'available', 80, 500),
            (None, 'Ford', 'F-150', 2022, 'Van', 'manual', 'petrol', '3489', 3, 80, 'maintenance', 150, None),
            (None, 'BMW', 'M2 Coupe', 2016, 'SUV', 'manual', 'diesel', '2190', 4, 40, 'rented', 170, None),
        ]
        
    def init_db(self):
        self.curs.execute("""CREATE TABLE Cars (
                id integer PRIMARY KEY AUTOINCREMENT,
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
            
    def get_car_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE id=?", (id,))
            return self.curs.fetchall()
           
    def get_car_by_make(self, make):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE make=?", (make,))
            return self.curs.fetchall()
            
    def show_all_cars(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars")
            return self.curs.fetchall()