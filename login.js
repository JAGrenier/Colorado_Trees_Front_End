const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`
const joinURL = `${baseURL}/trees_users`

const treeCardContainer = document.querySelector('.card-container')
const loginForm = document.querySelector('.login-form')
const getUsers = document.querySelector('.get-users')
const createUserForm = document.querySelector('.create-user')




loginForm.addEventListener('submit', loginUser)
createUserForm.addEventListener('submit', createNewUser)

function createNewUser(event){
    event.preventDefault()

    const newUserFomrData = new FormData (event.target)
    const username = newUserFomrData.get('username')
    const password = newUserFomrData.get('password')
    const newUser = { username, password }

    fetch(usersURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({user: newUser})
    })
        .then(handleResponseErrors)
        .then(result => console.log('new user', result))
        .catch(error => {
            console.error(error)
            const errorMessage = document.createElement('p')
            errorMessage.textContent = error
            createUserForm.append(errorMessage)
            
        })
        
        createUserForm.reset()   
}

function handleResponseErrors(response){
    console.log('response', response)
    if (response.ok){
    return response.json()
    }else {
        throw new Error("error detected")
    }
}

function handleFav (event){
    const tree_id = event.target.dataset.treeId
    const user_id = localStorage.getItem('user_id')

    fetch(joinURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({user_id, tree_id})
    })
    .then(response => response.json())
    .then(result => console.log('fav result', result))

}

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
        localStorage.setItem('user_id', result.user.id)
    })

    loginForm.reset()

    callTrees(event, username)
}

function callTrees(event, username){
fetch('http://localhost:3000/trees')
    .then(response => response.json())
    .then(trees => {
        trees.forEach(tree => {

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
                        
                        <br> <label for="comment">Comment:</label>
                        <br> <textarea name="comment" rows="10" cols="25">Add your comments on this tree here.</textarea>
                        </div>`
    const favButton = document.createElement('button')
    favButton.textContent = "⭐"  
    
    const previouslyLiked = tree.users.find(user => user.id === parseInt(localStorage.user_id))      
    
    if(previouslyLiked){
        console.log(previouslyLiked)
        favButton.classList.add('active-favorite')
    } else {
        favButton.classList.add('fav-button')
    } 

    favButton.dataset.treeId = tree.id

    card.append(favButton)
    treeCardContainer.append(card)
    
    favButton.addEventListener('click', (event) =>{ 
        favButton.classList.toggle("activeFavorite")
        handleFav(event)
    })

})
    })
}
