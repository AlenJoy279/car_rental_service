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

# token validation
import jwt
import sys

app = Flask(__name__)
CORS(app, allow_headers = "*")

carDB = carsDB()
carDB.init_db()

userDB = usersDB()
userDB.init_db()

rentalDB = rentalsDB()
rentalDB.init_db()



maintenanceDB = maintenanceDB()
maintenanceDB.init_db()

# if "populate" in command line args - use the dummy data
#  from the code to populate the table
# "populate" needed when db file is deleted and the new one created
if "populate" in sys.argv:
    carDB.populate_cars()
    userDB.populate_users()
    rentalDB.populate_rentals()
    maintenanceDB.populate_maintenance()



# @app.after_request
# def add_default_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#     return response

# ################################################
# ######     CAR DATABASE INTERACTIONS
# ################################################

# ###### Server calls for everything below follow these patterns

# ###### Example Server Calls
# ###### curl -d make=Example -d model=Car -d year=2023 -d type=Sedan -d transmission=manual -d powertrain=petrol -d vin_number=2002 -d seats=4 -d cargo_cap=50 -d status=available -d price_per_day=200 -d range=None http://127.0.0.1:5000/vehicles/cars/add
# ###### curl -d id=4 -d status=available http://127.0.0.1:5000/vehicles/cars/update
# ###### curl -d id=1 http://127.0.0.1:5000/vehicles/cars/get/id
# ###### curl -d make=Volvo http://127.0.0.1:5000/vehicles/cars/get/make
# ###### curl -d model=C40 http://127.0.0.1:5000/vehicles/cars/get/model
# ###### curl http://127.0.0.1:5000/vehicles/cars/get/all
# ###### curl -d id=4 http://127.0.0.1:5000/vehicles/cars/delete

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

# curl -d id=1 http://127.0.0.1:5000/vehicles/cars/get/id    
@app.route('/vehicles/cars/get/id', methods=['GET', 'POST'])
def get_car_by_id():
    req_data = request.form
    return carDB.get_car_by_id(req_data['id'])

# curl -d make=Volvo http://127.0.0.1:5000/vehicles/cars/get/make                        
@app.route('/vehicles/cars/get/make', methods=['GET', 'POST'])
def get_car_by_make():
    req_data = request.form
    return carDB.get_car_by_make(req_data['make'])

# curl -d model=C40 http://127.0.0.1:5000/vehicles/cars/get/model    
@app.route('/vehicles/cars/get/model', methods=['GET', 'POST'])
def get_car_by_model():
    req_data = request.form
    return carDB.get_car_by_model(req_data['model'])
    
# http://127.0.0.1:5000/vehicles/cars/get/all  
@app.route('/vehicles/cars/get/all')
def show_all_available_cars():
    return carDB.show_all_available_cars()

# ################################################
# ######     RENTAL DATABASE INTERACTIONS
# ################################################

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

# ################################################
# ######     USER DATABASE INTERACTIONS
# ################################################

@app.route('/users/get/all', methods=['GET', 'POST'])
def show_all_users():
    return userDB.show_all_users()


@app.route('/user/get/id', methods=['GET'])
def get_user_by_id():
    user_id = request.args.get('id')
    return userDB.get_user_by_id(user_id)


# upsert user
@app.route('/user/upsert', methods=['POST'])
def upsert_my_user():

    # secret
    public_key = "read_from_secret_file"

    # get user data from token
    token = request.headers["Authorization"].split(" ")[1]

    # check what format public key must have to make verify signature work
    payload = jwt.decode(token, public_key, algorithms=["RS256"], options={"verify_signature": False})  # sub - authentication id

    # user_id = request.args.get('id')
    req_data = request.form # user email - unique

    auth_id = payload["sub"]
    email = req_data["email"]

    # if not in DB - create, if in DB - update
    # add error handling based on the error type returned
    try:
        user_object = userDB.insert_user(user(auth_id, email, "", ""))

    except Exception as e:
        print(e)

    user_object = userDB.get_user_by_email(email)

    return user_object


@app.route('/user/update', methods=['PUT'])
def update_user():
    req_data = request.form
    user_id = req_data["id"]

    try:
        update_status = userDB.update_user_by_id(user_id, req_data)

        if update_status:
            return {"status": "User successfully updated", "id": user_id}, 200
        else:
            return {"status": "Update failed", "id": user_id}, 500
    except Exception as e:
        return {"status": "An error occurred", "message": str(e)}, 500

# ################################################
# ######     MAINTENANCE DATABASE INTERACTIONS
# ################################################

@app.route('/maintenance/get/car_id', methods=['GET', 'POST'])
def get_maintenance_by_car_id():
    req_data = request.form
    return maintenanceDB.get_maintenance_by_car_id(req_data['car_id'])


@app.route('/maintenance/get/all', methods=['GET', 'POST'])
def show_all_maintenance():
    return maintenanceDB.show_all_maintenance()


if __name__ == '__main__':
    app.run(port=9000)
