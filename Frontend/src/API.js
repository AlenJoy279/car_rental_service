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
 
export async function searchCars(params) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${baseURL}/api/search?${queryParams}`);
    return response.json();
}

export async function getAllManufacturers() {
    const response = await fetch(`${baseURL}/vehicles/manufacturers`);
    return response.json();
}

export async function getAllBodyTypes() {
    const response = await fetch(`${baseURL}/vehicles/bodytypes`);
    return response.json();
}

// rentals

export async function createRental(token, rentalData) {
    let params = new URLSearchParams(rentalData);
    const response = await fetch(baseURL + "/vehicles/rentals/add", {
        headers: {"Authorization": "Bearer " + token},
        method: "POST",
        body: params
    });
    return response.json();
}

export async function getUserRentals(userId) {
    const response = await fetch(`${baseURL}/vehicles/rentals/get/user?user_id=${userId}`);
    return response.json();
}

export async function getCarById(carId) {
    const response = await fetch(`${baseURL}/vehicles/cars/get/id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: carId })
    });
    return response.json();
}

export async function deleteRental(rentalId) {
    const response = await fetch(`${baseURL}/vehicles/rentals/delete/${rentalId}`, {
        method: 'DELETE',
    });
    return response.json();
}
