from car import car
from cars_db import carsDB
from flask import Flask

app = Flask(__name__)

db = carsDB()
db.init_db()
db.populate_cars()

@app.route('/insert')
def insert():
    car_1 = car(6, 'Porsche', '911', 1998)
    db.insert_car(car_1)
    return "200 OK"
    
@app.route('/show')
def show():
    return db.show_all_cars()
    
if __name__ == '__main__':
    app.run()