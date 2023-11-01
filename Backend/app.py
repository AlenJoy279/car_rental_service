from BO.car import car
from BO.rental import rental
from BO.user import user
from BO.maintenance import maintenance
from DB.cars_db import carsDB
from DB.maintenance_db import maintenanceDB
from DB.rentals_db import rentalsDB
from DB.users_db import usersDB
from flask import Flask, request

app = Flask(__name__)

carDB = carsDB()
carDB.init_db()
carDB.populate_cars()

userDB = usersDB()
userDB.init_db()
userDB.populate_users()

rentalDB = rentalsDB()
rentalDB.init_db()
rentalDB.populate_rentals()

maintenanceDB = maintenanceDB()
maintenanceDB.init_db()
maintenanceDB.populate_maintenance()


@app.route('/vehicles/cars/add', methods=['GET', 'POST'])
def insert_car():
    req_data = request.form
    new_car = car(req_data['make'], req_data['model'], req_data['year'], req_data['type'],
                    req_data['transmission'], req_data['powertrain'], req_data['vin_number'], req_data['seats'],
                        req_data['cargo_cap'], req_data['status'], req_data['price_per_day'], req_data['range'])
    carDB.insert_car(new_car)
    return {"status": "Car successfully inserted"}
    
@app.route('/vehicles/cars/delete', methods=['GET', 'POST'])
def delete_car():
    req_data = request.form
    carDB.delete_car(req_data['id'])
    return {"status": "Car successfully deleted", "id": req_data['id']}
    
@app.route('/vehicles/cars/get/id', methods=['GET', 'POST'])
def get_car_by_id():
    req_data = request.form
    return carDB.get_car_by_id(req_data['id'])
                        
@app.route('/vehicles/cars/get/make', methods=['GET', 'POST'])
def get_car_by_make():
    req_data = request.form
    return carDB.get_car_by_make(req_data['make'])
    
@app.route('/vehicles/cars/get/model', methods=['GET', 'POST'])
def get_car_by_model():
    req_data = request.form
    return carDB.get_car_by_model(req_data['model'])
    
@app.route('/vehicles/cars/get/all')
def show_all_available_cars():
    return carDB.show_all_available_cars()
    
if __name__ == '__main__':
    app.run()