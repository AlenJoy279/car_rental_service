const baseURL = 'http://127.0.0.1:9000';

// users

export async function getUserByID(id) {
    let params = new URLSearchParams({id: id});
    const response = await fetch(baseURL + '/user/get/id', {method: "POST", body: params});
    return response.json();
}


export async function upsertUser(token, email) {
    let params = new URLSearchParams({email: email});
    const response = await fetch(baseURL + "/user/upsert", {headers: {"Authorization": "Bearer " + token}, method: "POST", body: params})
    return response.json()

    // return await axios.get(baseURL + "/user/get_my_user", {headers: {"Authorization": "Bearer " + token}})
}


export async function updateUser(token, id, data) {
    let params = new URLSearchParams({id: id, full_name: data.full_name, phone: data.phone});
    const response = await fetch(baseURL + "/user/update", {headers: {"Authorization": "Bearer " + token}, method: "PUT", body: params});
    return response.json()
}


// cars 

export async function getAllAvailableCars() {
    const response =  await fetch(baseURL + '/vehicles/cars/get/all');
    return response.json();
 }
 
