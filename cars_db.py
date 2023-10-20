from car import car
import sqlite3

class carsDB():
    def __init__(self):
        self.conn = sqlite3.connect(':memory:', check_same_thread=False)
        self.curs = self.conn.cursor()
        self.default_cars = [
            (1, 'Ford', 'Bronco', 2021),
            (2, 'Ford', 'EcoSport', 2020),
            (3, 'Ford', 'Edge', 2017),
            (4, 'Ford', 'F-150', 2022),
            (5, 'BMW', 'M2 Coupe', 2016),
        ]
        
    def init_db(self):
        self.curs.execute("""CREATE TABLE Cars (
                id integer,
                make text,
                model text,
                year integer)""")
                
    def populate_cars(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Cars VALUES (?, ?, ?, ?)", self.default_cars)
        
    def insert_car(self, car):
        with self.conn:
            self.curs.execute("INSERT INTO Cars VALUES (?, ?, ?, ?)", (car.id, car.make, car.model, car.year))
            
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