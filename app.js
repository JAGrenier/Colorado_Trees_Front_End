const treeCardContainer = document.querySelector('.card-container')

fetch('http://localhost:3000/trees')
    .then(response => response.json())
    .then(showTrees)

function showTrees (trees){
    trees.forEach(showTreeCards)
}
//   
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
                    </div>
                `

    treeCardContainer.append(card)

}
//   <div class = "container">
//     <div class="row row-cols-1 row-cols-md-2">
//     <div class="card mb-4">
//         <div class="row no-gutters">
//             <div class="col-md-4">
//             <img src="${tree.image}" class="card-img" alt="Tree Picture">
//             </div>
//             <div class="col-md-8">
// //             <div class="card-body">
//                 <h3 class="card-title">${tree.name}</h>
//                 <h6 class="card-sciname">${tree.scientific_name}</h6>
//                 <p class="card-information"><strong>Bark: </strong> ${tree.bark} 
//                 <br> <strong>Leaves: </strong> ${tree.leaves} 
//                 <br> <strong>Fruit:</strong> ${tree.fruit}
//                 <br> <strong>Elevation: </strong> ${tree.elevation_max}ft to ${tree.elevation_min}ft
//                 <br> <strong>Height: </strong> ${tree.height_max}ft to ${tree.height_min}ft
//                 <br> <strong>Tree Trivia: </strong> ${tree.fun_fact}</p>
// //             </div>
// //             </div>
// //         </div>
// //         </div>
// //     </div>
//     </div>`
    // console.log(tree)
    // const treeCard = document.createElement('div')
    // treeCard.classList = ('tree-card')

    // const name = document.createElement('h2')
    // name.textContent = tree.name 

    // const scientific_name = document.createElement('p')
    // scientific_name.textContent = tree.scientific_name

    // const bark = document.createElement('p')
    // bark.textContent = `Bark: ${tree.bark}`

    // const leaves = document.createElement('p')
    // leaves.textContent = ` Leaves: ${tree.leaves}` 

    // const fruit = document.createElement('p')
    // fruit.textContent = `Fruit: ${tree.fruit}`


    // const elevation = document.createElement('p')
    // elevation.textContent = `Elevation: ${tree.elevation_max} to ${tree.elevation_min}`

    // const height = document.createElement('p')
    // height.textContent = `Height: ${tree.height_max} to ${tree.height_min}`

    // const treeFact = document.createElement('p')
    // treeFact.textContent = `Fun Fact: ${tree.fun_fact}`

    // const treePic = document.createElement('img')c
    // treePic.src = tree.image

    // treeCard.append(name, scientific_name, bark, leaves, fruit, elevation, height, treeFact, treePic)
    // treeCardContainer.append(treeCard)
    // // const imageCol = document.querySelector(".card-img")
    // // imageCol.src = tree.image
