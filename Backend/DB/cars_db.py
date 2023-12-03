from BO.car import car
from DB.utils import fetchall_conversion
import sqlite3

class carsDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_cars = [
            (None, 'Volvo', 'C40', 2021, 'MPV', 'automatic', 'electric', '3902', 4, 382, 'available', 115, 400),
            (None, 'Ford', 'EcoSport', 2020, 'Sedan', 'manual', 'petrol', '6412', 4, 200, 'rented', 90, None),
            (None, 'Toyota', 'Prius', 2017, 'SUV', 'automatic', 'hybrid', '4923', 5, 250, 'available', 80, 500),
            (None, 'Ford', 'F-150', 2022, 'Truck', 'manual', 'petrol', '3489', 3, 400, 'maintenance', 150, None),
            (None, 'BMW', 'M2 Coupe', 2016, 'SUV', 'manual', 'diesel', '2190', 4, 215, 'available', 170, None),
            (None, 'Audi', 'A1', 2018, 'Hatchback', 'automatic', 'petrol', '5798', 5, 325, 'available', 110, None),
            (None, 'Porche', '911 GT', 2020, 'Sport', 'manual', 'petrol', '4725', 4, 134, 'available', 280, None),
            (None, 'Tesla', 'Model 3', 2021, 'Sedan', 'automatic', 'electric', '1001', 5, 300, 'available', 150, 480),
            (None, 'Honda', 'Civic', 2019, 'Sedan', 'manual', 'petrol', '1002', 5, 300, 'rented', 80, None),
            (None, 'Mercedes', 'Benz C-Class', 2018, 'Sedan', 'automatic', 'diesel', '1003', 5, 350, 'maintenance', 120,
             None),
            (None, 'Chevrolet', 'Camaro', 2020, 'Coupe', 'automatic', 'petrol', '1004', 4, 400, 'available', 130, None),
            (None, 'Ford', 'Mustang', 2019, 'Sport', 'manual', 'petrol', '1005', 4, 300, 'available', 140, None),
            (None, 'Nissan', 'Leaf', 2022, 'Hatchback', 'automatic', 'electric', '1006', 5, 150, 'available', 110, 350),
            (None, 'Hyundai', 'Kona', 2020, 'SUV', 'automatic', 'electric', '1007', 5, 300, 'available', 100, 415),
            (None, 'Jeep', 'Wrangler', 2021, 'SUV', 'manual', 'petrol', '1008', 5, 400, 'rented', 130, None),
            (None, 'Volkswagen', 'Golf', 2019, 'Hatchback', 'automatic', 'petrol', '1009', 5, 280, 'available', 90,
             None),
            (None, 'Subaru', 'Outback', 2017, 'SUV', 'automatic', 'diesel', '1010', 5, 350, 'maintenance', 95, None),
            (None, 'Lexus', 'ES', 2018, 'Sedan', 'automatic', 'hybrid', '1011', 5, 350, 'available', 130, None),
            (None, 'Mazda', 'MX-5', 2021, 'Sport', 'manual', 'petrol', '1012', 2, 150, 'available', 150, None),
            (None, 'Acura', 'TLX', 2020, 'Sedan', 'automatic', 'petrol', '1013', 5, 380, 'available', 140, None),
            (None, 'Kia', 'Soul', 2022, 'Hatchback', 'automatic', 'electric', '1014', 5, 200, 'available', 105, 400),
            (None, 'Infiniti', 'Q50', 2018, 'Sedan', 'automatic', 'petrol', '1015', 5, 300, 'available', 125, None),
            (None, 'GMC', 'Sierra', 2021, 'Truck', 'automatic', 'diesel', '1016', 5, 500, 'available', 160, None),
            (None, 'Cadillac', 'Escalade', 2020, 'SUV', 'automatic', 'petrol', '1017', 7, 600, 'rented', 200, None),
            (None, 'Dodge', 'Charger', 2019, 'Sedan', 'automatic', 'petrol', '1018', 5, 400, 'maintenance', 130, None),
            (None, 'Mini', 'Cooper', 2018, 'Hatchback', 'manual', 'petrol', '1019', 4, 180, 'available', 90, None),
            (None, 'Buick', 'Enclave', 2017, 'SUV', 'automatic', 'petrol', '1020', 7, 500, 'available', 110, None),
            (None, 'Fiat', '500', 2021, 'Hatchback', 'automatic', 'petrol', '1021', 4, 150, 'available', 70, None),
            (None, 'Land Rover', 'Discovery', 2022, 'SUV', 'automatic', 'diesel', '1022', 7, 550, 'available', 180,
             None),
            (None, 'Jaguar', 'XE', 2019, 'Sedan', 'automatic', 'diesel', '1023', 5, 350, 'available', 140, None),
            (None, 'Volvo', 'XC90', 2018, 'SUV', 'automatic', 'hybrid', '1024', 7, 500, 'available', 160, None),
            (None, 'Porsche', 'Taycan', 2021, 'Sport', 'automatic', 'electric', '1025', 4, 100, 'available', 400, 450),
            (None, 'Lincoln', 'Navigator', 2020, 'SUV', 'automatic', 'petrol', '1026', 7, 600, 'available', 180, None),
            (
            None, 'Alfa Romeo', 'Giulia', 2019, 'Sedan', 'automatic', 'petrol', '1027', 5, 350, 'available', 150, None),
            (None, 'Chrysler', 'Pacifica', 2021, 'Van', 'automatic', 'hybrid', '1028', 7, 500, 'available', 120, None),
            (None, 'Genesis', 'G70', 2022, 'Sedan', 'automatic', 'petrol', '1029', 5, 350, 'available', 170, None),
            (None, 'Maserati', 'Ghibli', 2017, 'Sedan', 'automatic', 'petrol', '1030', 5, 400, 'available', 200, None),

        ]
        self.keys = ('id', 'make', 'model', 'year', 'type', 'transmission', 'powertrain', 'vin_number',
            'seats', 'cargo_cap', 'status', 'price_per_day', 'range')
        
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
            
    def update_car_status(self, id, status):
        with self.conn:
            self.curs.execute("UPDATE Cars SET status=? WHERE car_id=?", (status, id))
            
    def show_all_available_cars(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Cars WHERE status='available'")
            return fetchall_conversion(self.keys, self.curs.fetchall())
