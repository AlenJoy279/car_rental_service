from BO.car import car
from BO.rental import rental
from BO.user import user
from BO.maintenance import maintenance
from DB.cars_db import carsDB
from DB.maintenance_db import maintenanceDB
from DB.rentals_db import rentalsDB
from DB.users_db import usersDB
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    return {"status": "Car successfully inserted",
            "make": req_data['make'], "model": req_data['model'], "year": req_data['year']}


@app.route('/vehicles/cars/delete', methods=['GET', 'POST'])
def delete_car():
    req_data = request.form
    carDB.delete_car(req_data['id'])
    return {"status": "Car successfully deleted", "id": req_data['id']}


@app.route('/vehicles/cars/update', methods=['GET', 'POST'])
def update_car():
    req_data = request.form
    carDB.update_car_status(req_data['id'], req_data['status'])
    return {"status": "Car successfully updated", "id": req_data['id']}


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


@app.route('/vehicles/rentals/add', methods=['GET', 'POST'])
def insert_rental():
    req_data = request.form
    new_rental = rental(req_data['user_id'], req_data['car_id'], req_data['pick_up'], req_data['start_date'],
                        req_data['start_time'], req_data['drop_off'], req_data['end_date'], req_data['end_time'],
                        req_data['total_cost'],
                        req_data['status'], req_data['payment_status'])
    rentalDB.insert_rental(new_rental)
    return {"status": "Rental successfully inserted"}


@app.route('/vehicles/rentals/delete', methods=['GET', 'POST'])
def delete_rental():
    req_data = request.form
    rentalDB.delete_rental(req_data['id'])
    return {"status": "Rental successfully deleted", "id": req_data['id']}


@app.route('/vehicles/rentals/get/id', methods=['GET', 'POST'])
def get_rental_by_id():
    req_data = request.form
    return rentalDB.get_rental_by_id(req_data['id'])


@app.route('/vehicles/rentals/get/all')
def show_all_active_rentals():
    return rentalDB.show_all_active_rentals()


@app.route('/vehicles/rentals/update/status', methods=['GET', 'POST'])
def update_rental_status():
    req_data = request.form
    rentalDB.update_rental_status(req_data['id'], req_data['status'])
    return {"status": "Rental successfully updated", "id": req_data['id']}


@app.route('/vehicles/rentals/update/payment', methods=['GET', 'POST'])
def update_rental_payment():
    req_data = request.form
    rentalDB.update_rental_payment(req_data['id'], req_data['payment_status'])
    return {"status": "Rental successfully updated", "id": req_data['id']}


@app.route('/users/get/all', methods=['GET', 'POST'])
def show_all_users():
    return userDB.show_all_users()


@app.route('/user/get/id', methods=['GET'])
def get_user_by_id():
    user_id = request.args.get('id')
    return userDB.get_user_by_id(user_id)


@app.route('/user/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    req_data = request.json
    try:
        update_status = userDB.update_user_by_id(user_id, req_data)

        if update_status:
            return {"status": "User successfully updated", "id": user_id}, 200
        else:
            return {"status": "Update failed", "id": user_id}, 500
    except Exception as e:
        return {"status": "An error occurred", "message": str(e)}, 500


@app.route('/maintenance/get/car_id', methods=['GET', 'POST'])
def get_maintenance_by_car_id():
    req_data = request.form
    return maintenanceDB.get_maintenance_by_car_id(req_data['car_id'])


@app.route('/maintenance/get/all', methods=['GET', 'POST'])
def show_all_maintenance():
    return maintenanceDB.show_all_maintenance()


if __name__ == '__main__':
    app.run()
