const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
console.log(id)


const baseURL = 'http://localhost:3000'
const usertreesURL =`${baseURL}/usertrees`
const userIdURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`
const joinURL = `${baseURL}/trees_users`

const treeCardContainer = document.querySelector('.card-container')

console.log(localStorage.getItem('token'))

fetch(usertreesURL, {
    method: "GET",
    headers: {
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}).then(response => response.json())
    .then(result => {

        localStorage.setItem('user_id', result.id)

        // console.log("user", result)
        // console.log("this",result)
        callTrees()
    
    })

function callTrees(){
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
    

    fetch(joinURL, {
            method: "GET",
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(result => {
            result
            
            
    // const treePair = tree.users.find(user => user.id === id)
    const previouslyLiked = result.id      
    console.log(result)
    if(previouslyLiked){
        favButton.classList.add('active-favorite')
    } else {
        favButton.classList.add('fav-button')
    } 
    })
    favButton.dataset.treeId = tree.id

    card.append(favButton)
    treeCardContainer.append(card)
    
    favButton.addEventListener('click', (event) =>{ 
        console.log("clicked")
        favButton.classList.toggle("active-favorite")
        handleFav(event)
    })

})
    })
}


function handleFav (event){
    const tree_id = event.target.dataset.treeId
    const user_id = id
    console.log(user_id)
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
