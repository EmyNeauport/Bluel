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

//créer une div qui contiendra les boutons
let buttonContainer = document.createElement("div")
buttonContainer.classList.add("button-container")
portfolio.appendChild(buttonContainer)
portfolio.insertBefore(buttonContainer, gallery)

//créer une div qui contiendra le titre du portfolio et le bouton d'accès à la modale
let divTitle = document.createElement("div")
divTitle.classList.add("title-container")
portfolio.appendChild(divTitle)
portfolio.insertBefore(divTitle, buttonContainer)

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

//fonction qui permet de modifier l'affichage en mode admin
function afficherModeAdmin () {
    const divToHide = document.querySelector(".button-container") 
    //si l'utilisateur est connecté
    if (token) {
    if (divToHide) {
        //masquer les filtres
        divToHide.style.display = "none"
        //ajouter le bouton de modification
        let divModif = `
            <div>
                <img src="./assets/icons/pen.svg" alt="Icone de modification">
                <a id="btn-modif">modifier</a>
            </div>
        `
        divTitle.innerHTML = divModif

        let b = document.querySelector("#portfolio h2")
        divTitle.appendChild(b)
    }
    }
}

//fonction qui permet d'afficher la modale
function afficherModale() {
    const modal = document.createElement("aside")
    modal.innerHTML = `
        <div>
            <h3>Galerie photo</h3>
            <div></div>
            <hr />
            <button>Ajouter une photo</button>
        </div>
        <div>
            <h3>Ajout photo</h3>
            <div>
                <img src="./assets/icons/img.svg"" alt="Icone photo" ></img>
                <button>+ Ajouter une photo</button>
                <p>jpg, png : 4mo max</p>
            </div>
            <form>
                <label>Titre</label>
                <input type="text" id ="titre" name="titre"></input>
                <label>Catégorie</label>
                <input type="text" id ="categorie" name="categorie"></input>
                <hr />
                <input type="" value="Valider"></btn>
            </form>
        </div>`
    document.body.appendChild(modal)
    console.log(modal)
}

//**************************************************/

//AFFICHER LES PROJETS
//réinitialiser le token
const token = ("Token in index.html:", window.sessionStorage.getItem("token"))
if (token) {
    window.sessionStorage.removeItem("token")
}

//afficher les projets
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

//**************************************************/

//A LA CONNEXION, MODIFIER LA PAGE D'ACCUEIL
afficherModeAdmin()

//**************************************************/

//AU CLIC SUR LE BOUTON MODIFIER, AFFICHER LA MODALE
const boutonModifier = document.querySelector("#btn-modif")

    //if (boutonModifier) {
        boutonModifier.addEventListener("click", (event) => {
            event.preventDefault() // Empêche le comportement par défaut
            afficherModale() // Affiche la modale
        })
    //} else {
    //    console.error("Le bouton 'modifier' n'a pas été trouvé !")
    //}


