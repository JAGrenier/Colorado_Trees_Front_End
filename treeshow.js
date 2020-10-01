const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`

const treeCardContainer = document.querySelector('.card-container')




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
            <h2 class="card-title">${tree.name}</h2>
                <h3 class="card-sciname"><i>${tree.scientific_name}</i></h3>
                    <img src="${tree.image}"  alt="Tree Picture"></img>
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