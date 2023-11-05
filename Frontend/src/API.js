
const baseURL = 'http://127.0.0.1:9000';


export async function getAllAvailableCars() {
   const response =  await fetch(baseURL + '/vehicles/cars/get/all');
   return response.json();
}


export async function getUserByID(id) {
    let params = new URLSearchParams({id: id});
    const response = await fetch(baseURL + '/user/get/id', {method: "POST", body: params});
    return response.json();
}


