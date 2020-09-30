const baseURL = 'http://localhost:3000/'
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`

const treeCardContainer = document.querySelector('.card-container')
const loginForm = document.querySelector('.login-form')
const getUsers = document.querySelector('.get-users')

// loginForm.addEventListener('submit', loginUser)
// getUsers.addEventListener('click', retrieveUsers)

function loginUser(event){
    event.preventDefault()

    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')

    fetch(loginURL, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(result => {
        localStorage.setItem('token', result.token)
    })
}

function retrieveUsers(event) {
    fetch(usersURL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(response => {
        console.log(response) 
    
    // .then(result =>{
    //     console.log(result)
    })
}

fetch('http://localhost:3000/trees')
    .then(response => response.json())
    .then(showTrees)

function showTrees (trees){
    trees.forEach(showTreeCards)
}

function showTreeCards (tree){
    let card = document.createElement('div')
    card.classList = ('card')
    card.innerHTML = `
            <h5 class="card-title">${tree.name}</h5>
                <h6 class="card-sciname">${tree.scientific_name}</h6>
                    <img src="${tree.image}"  alt="Tree Picture" style="width:100%"></img>
                    <div class="card-body">
                        <p class="card-information"><strong>Bark: </strong> ${tree.bark} 
                        <br> <strong>Leaves: </strong> ${tree.leaves} 
                        <br> <strong>Fruit:</strong> ${tree.fruit}
                        <br> <strong>Elevation: </strong> ${tree.elevation_max}ft to ${tree.elevation_min}ft
                        <br> <strong>Height: </strong> ${tree.height_max}ft to ${tree.height_min}ft
                        <br> <strong>Tree Trivia: </strong> ${tree.fun_fact}</p>
                    </div>`
    treeCardContainer.append(card)
}