//récupérer les projets & catégories via l'API
const reponseTravaux = await fetch("http://localhost:5678/api/works")
const listeTravaux = await reponseTravaux.json()
const reponseCategories = await fetch ("http://localhost:5678/api/categories")
const listeCategories = await reponseCategories.json()

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

//fonction qui permet de mettre en place les filtres
function afficherBoutons () {
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
        })
    }
}

//fonction qui permet de mettre en place la réinitialisation des filtres
function afficherBoutonAll () {
    let buttonAll = document.createElement("button")
    buttonAll.innerHTML = "Tous"
    buttonContainer.appendChild(buttonAll)
    //gestion de l'affichage en cliquant sur le bouton 'Tous'
    buttonAll.addEventListener("click", () => {
        gallery.innerHTML = ""
        afficherProjets (listeTravaux)
    })
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

            let portfolioTitle = document.querySelector("#portfolio h2")
            divTitle.appendChild(portfolioTitle)

            isModeAdmin = true
        }
    }

}

//fonction qui permet d'afficher la modale
function afficherModale() {
    const modal = document.createElement("aside")
    modal.id = "modal"
    modal.innerHTML = `
    <img id="arrow-left" src="./assets/icons/arrow-left.svg" alt="Flèche qui permet de retourner sur la première page de la modale">    
    <img id="btn-close" src="./assets/icons/close.svg" alt="Croix qui permet de fermer la modale">
        <div id="galerie-photo">
            <h3>Galerie photo</h3>
            <div id="div-galery"></div>
            <hr />
            <button id="btn-ajout">Ajouter une photo</button>
        </div>
        <div id="ajout-photo">
            <h3>Ajout photo</h3>
            <div>
                <img src="./assets/icons/img.svg" alt="Icone photo" ></img>
                <button>+ Ajouter une photo</button>
                <p>jpg, png : 4mo max</p>
            </div>
            <form>
                <label>Titre</label>
                <input type="text" id ="titre" name="titre"></input>
                <label>Catégorie</label>
                <input type="text" id ="categorie" name="categorie" list="category-list"></input>
                <hr />
                <input type="" value="Valider"></btn>
            </form>
        </div>`
    document.body.appendChild(modal)
    displayModal = true
    console.log("display modal :"+displayModal)

    const ajoutPhoto = document.getElementById("ajout-photo")
    const galeriePhoto = document.getElementById("galerie-photo")
    const boutonAjout = document.querySelector("#btn-ajout")
    const boutonRetour = document.getElementById("arrow-left")
    const boutonFermer = document.getElementById("btn-close")
    const divGalery = document.getElementById("div-galery")
    
    ajoutPhoto.style.display = "none"
    boutonRetour.style.display = "none"
    
    for (let i = 0; i < listeTravaux.length; i++) {
        let projet = document.createElement("figure")
        projet.id = "projet"
        let imageProjet = document.createElement("img")
        imageProjet.src = listeTravaux[i].imageUrl
        let trashWork = document.createElement("img")
        trashWork.src = "./assets/icons/trash.svg"
        projet.appendChild(imageProjet)
        projet.appendChild(trashWork)
        divGalery.appendChild(projet)   
        }

    boutonAjout.addEventListener("click", () => {
        ajoutPhoto.style.display = "block"
        galeriePhoto.style.display = "none"
        boutonRetour.style.display = "block"
    
        let dataList = document.getElementById("category-list") // je ne comprends pas car il n'y a pas d'ID "category-list" associé à datalist
        if (!dataList) {
            dataList = document.createElement("datalist")
            dataList.id = "category-list"
            document.getElementById("ajout-photo").appendChild(dataList)
        }
    
        let data = "";
        for (let i = 0; i < listeCategories.length; i++) {
            data += `<option value="${listeCategories[i].name}"></option>`
        }
        dataList.innerHTML = data
    })

    boutonRetour.addEventListener("click", () => {
        ajoutPhoto.style.display = "none"
        galeriePhoto.style.display = "block"
        boutonRetour.style.display = "none"
    })

    boutonFermer.addEventListener("click", () => {
        modal.remove()
        displayModal = false
        console.log("display modal :"+displayModal)
    })
}

//**************************************************/

//GENERER LA PAGE D'ACCUEIL

//réinitialiser le token
const token = ("Token in index.html:", window.sessionStorage.getItem("token"))
if (token) {
    //window.sessionStorage.removeItem("token")
}

//afficher les projets
afficherProjets (listeTravaux)

//afficher les boutons
afficherBoutonAll ()
afficherBoutons ()

//**************************************************/

//MODIFIER LA PAGE D'ACCUEIL EN MODE ADMIN
let isModeAdmin = false
afficherModeAdmin()
console.log("mode admin :"+isModeAdmin)

//**************************************************/

//AU CLIC SUR LE BOUTON MODIFIER, AFFICHER LA MODALE

//afficher la modale
let displayModal = false
if (isModeAdmin) {
    const boutonModifier = document.querySelector("#btn-modif")
    if (boutonModifier) {
        boutonModifier.addEventListener("click", (event) => {
            event.preventDefault()
            afficherModale()
        })
    }
}