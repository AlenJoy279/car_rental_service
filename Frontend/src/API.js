const baseURL = 'http://127.0.0.1:9000';



// users

// get_user_by_id
export async function getUserByID(token, id) {
    let params = new URLSearchParams({id: id});
    const response = await fetch(
        baseURL + '/user/get/id', 
        {headers: {"Authorization": "Bearer " + token}, method: "POST", body: params}
        );
    return response.json();
}


// upsert_my_user
export async function upsertUser(token, email) {
    let params = new URLSearchParams({email: email});
    const response = await fetch(
        baseURL + "/user/upsert", ////
        {headers: {"Authorization": "Bearer " + token}, method: "POST", body: params}
        );
    return response.json()

}


// update_user 
export async function updateUser(token, id, data) {
    let params = new URLSearchParams(
        {
            id: id, 
            full_name: data.full_name, 
            phone: data.phone
        }
    );
    const response = await fetch(
        baseURL + "/user/update", 
        {headers: {"Authorization": "Bearer " + token}, method: "PUT", body: params}
        );
    return response.json()
}


// show_all_users
export async function getAllUsers() {
    let params = new URLSearchParams();
    const response = await fetch(
        baseURL + '/user/get/all', 
        {method: "POST", body: params}
        );
    return response.json();
}



// cars 

// show_all_available_cars
export async function getAllAvailableCars() {
    const response =  await fetch(baseURL + '/vehicles/cars/get/all');
    return response.json();
}
 

// delete_cars
export async function deleteCar(token, id) {
    let params = new URLSearchParams({id: id});
    const response =  await fetch(
        baseURL + '/vehicles/cars/delete', 
        {headers: {"Authorization": "Bearer " + token}, method: "GET", body: params}
        );
    return response.json();
}


// update_car
export async function updateCar(id, data) {
    let params = new URLSearchParams({id: id, status: data.status});
    const response =  await fetch(
        baseURL + '/vehicles/cars/update', 
        {method: "PUT", body: params}
        );
    return response.json();
}


// get_car_by_id
export async function getCarByID(id) {
    let params = new URLSearchParams({id: id});
    const response = await fetch(
        baseURL + '/vehicles/cars/get/id', 
        {method: "POST", body: params}
        );
    return response.json();
}


// get_car_by_make
export async function getCarByMake(make) {
    let params = new URLSearchParams({make: make});
    const response = await fetch(
        baseURL + '/vehicles/cars/get/make', 
        {method: "POST", body: params}
        );
    return response.json();
}


// get_car_by_model
export async function getCarByModel(model) {
    let params = new URLSearchParams({model: model});
    const response = await fetch(
        baseURL + '/vehicles/cars/get/model', 
        {method: "POST", body: params}
        );
    return response.json();
}


//  insert_car
export async function insertCar(token, id, data) {
    let params = new URLSearchParams(
        {
            id: id, 
            make: data.make, 
            model: data.model,
            year: data.year,
            type: data.type,
            transmission: data.transmission,
            powertrain: data.powertrain,
            vin_number: data.vin_number,
            seats: data.seats,
            cargo_cap: data.cargo_cap,
            status: data.status,
            price_per_day: data.price_per_day,
            range: data.range            
        }
    );
    const response = await fetch(
        baseURL + "/vehicles/cars/add", 
        {headers: {"Authorization": "Bearer " + token}, method: "PUT", body: params}
        );
    return response.json()
}
