const baseURL = 'http://localhost:3000'
const usertreesURL =`${baseURL}/usertrees`
console.log(localStorage.getItem('token'))

fetch(usertreesURL, {
    method: "GET",
    headers: {
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}).then(response => response.json())
    .then(result => console.log("user", result))
