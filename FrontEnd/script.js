//récupérer les projets & catégories via l'API
const reponseTravaux = await fetch("http://localhost:5678/api/works")
const listeTravaux = await reponseTravaux.json()
console.log(listeTravaux)
const reponseCategories = await fetch ("http://localhost:5678/api/categories")
const listeCategories = await reponseCategories.json()
console.log(listeCategories)

//récupérer les éléments du HTML
const gallery = document.querySelector(".gallery")
const portfolio = document.querySelector("#portfolio")

//créer une div qui contiendra les boutons, placer et rattacher cette div au HTML
let buttonContainer = document.createElement("div")
buttonContainer.classList.add("button-container")
portfolio.appendChild(buttonContainer)
portfolio.insertBefore(buttonContainer, gallery)

//fonction qui permet d'afficher les projets dans la galerie 
function afficherProjets (projets) {
    for (let i = 0; i < projets.length; i++) {
        let projet = document.createElement("figure")
        let imageProjet = document.createElement("img")
        let titreProjet = document.createElement("figcaption")
        imageProjet.src = projets[i].imageUrl
        titreProjet.innerText = projets[i].title
        projet.appendChild(imageProjet)
        projet.appendChild(titreProjet)
        gallery.appendChild(projet)   
    }
}

//**************************************************/

afficherProjets (listeTravaux)

//BOUTON - filtrer en affichant tous les projets
//mise en place du bouton 'Tous'
let buttonAll = document.createElement("button")
buttonAll.innerHTML = "Tous"
buttonContainer.appendChild(buttonAll)
//gestion de l'affichage en cliquant sur le bouton 'Tous'
buttonAll.addEventListener("click", () => {
    gallery.innerHTML = ""
    afficherProjets (listeTravaux)
    console.log(listeTravaux)
})

//BOUTON - filtrer en fonction de la catégorie
//mise en place des boutons
for (let i = 0; i < listeCategories.length; i++) {
    let button = document.createElement("button")
    button.innerHTML = listeCategories[i].name
    buttonContainer.appendChild(button)
//gestion de l'affichage en cliquant sur le bouton
    button.addEventListener("click", () => {
        gallery.innerHTML = ""
        const projetsFiltres = listeTravaux.filter(
            (projet) => projet.categoryId === listeCategories[i].id)
        afficherProjets(projetsFiltres)
        console.log(projetsFiltres)
    })
}
