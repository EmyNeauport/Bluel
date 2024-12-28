//********************FONCTIONS*********************/

//DECLARER LES FONCTIONS

//fonction qui permet d'afficher les projets dans la galerie 
function afficherProjets (projets) {
    gallery.innerHTML = ""
    for (let i = 0; i < projets.length; i++) {
        //déclarer les variables
        let projet = document.createElement("figure")
        let imageProjet = document.createElement("img")
        let titreProjet = document.createElement("figcaption")
        //associer les attributs
        imageProjet.src = projets[i].imageUrl
        titreProjet.innerText = projets[i].title
        //associer les éléments à l'arbre DOM
        projet.appendChild(imageProjet)
        projet.appendChild(titreProjet)
        gallery.appendChild(projet)   
    }
}

//fonction qui permet de mettre en place les filtres
function afficherBoutons () {
    for (let i = 0; i < listeCategories.length; i++) {
    //créer les boutons
        let button = document.createElement("button")
        button.innerHTML = listeCategories[i].name
        buttonContainer.appendChild(button)
    //associer une action aux boutons
        button.addEventListener("click", () => {
            gallery.innerHTML = ""
            const projetsFiltres = listeTravaux.filter(
                (projet) => projet.categoryId === listeCategories[i].id)
            afficherProjets(projetsFiltres)
        })
    }
}

//fonction qui permet de mettre en place le filtre 'ALL' (pour gérer la réinitialisation des filtres)
function afficherBoutonAll () {
    //créer le bouton
    let buttonAll = document.createElement("button")
    buttonAll.innerHTML = "Tous"
    buttonContainer.appendChild(buttonAll)
    //associer une action au bouton
    buttonAll.addEventListener("click", () => {
        //gallery.innerHTML = ""
        afficherProjets (listeTravaux)
    })
}

//fonction qui permet de modifier l'affichage en mode admin
function afficherModeAdmin (token) {
    const divToHide = document.querySelector(".button-container") 
    //si l'utilisateur est connecté au mode admin
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
    //créer la modale
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
                <input type="submit" value="Valider"></btn>
            </form>
        </div>`
    document.body.appendChild(modal)
    
    //déclarer les variables
    const ajoutPhoto = document.getElementById("ajout-photo")
    const galeriePhoto = document.getElementById("galerie-photo")
    const boutonAjout = document.getElementById("btn-ajout")
    const boutonRetour = document.getElementById("arrow-left")
    const boutonFermer = document.getElementById("btn-close")
    const divGalery = document.getElementById("div-galery")
    
    //afficher la modale
    displayModal = true
    ajoutPhoto.style.display = "none"
    boutonRetour.style.display = "none"
    console.log("display modal :"+displayModal)
    
    //afficher les projets retournés par l'API dans la galerie photo
    divGalery.innerHTML = ""
    for (let i = 0; i < listeTravaux.length; i++) {
        //déclarer les variables
        let projet = document.createElement("figure")
        let imageProjet = document.createElement("img")
        let trashWork = document.createElement("img")
        //ajouter des attributs aux variables
        imageProjet.src = listeTravaux[i].imageUrl
        trashWork.src = "./assets/icons/trash.svg"
        projet.classList.add("projet")
        let idProjet = listeTravaux[i].id
        imageProjet.classList.add(idProjet)
        trashWork.classList.add("trash-icon")
        trashWork.classList.add(idProjet)
        //faire le lien avec l'arbre DOM
        projet.appendChild(imageProjet)
        projet.appendChild(trashWork)
        divGalery.appendChild(projet)   
        }
    
    //modifier le contenu de la modale au clic sur le bouton "Ajouter une photo"
    boutonAjout.addEventListener("click", () => {
        //modifier le contenu de la modale
        ajoutPhoto.style.display = "block"
        galeriePhoto.style.display = "none"
        boutonRetour.style.display = "block"
        //récupérer le contenu de la liste déroulante "Catégorie" via l'API
        let dataList = document.getElementById("category-list") // je ne comprends pas car il n'y a pas d'ID "category-list" associé à datalist
        if (!dataList) {
            dataList = document.createElement("datalist")
            dataList.id = "category-list"
            document.getElementById("ajout-photo").appendChild(dataList)
        }
        let data = ""
        for (let i = 0; i < listeCategories.length; i++) {
            data += `<option value="${listeCategories[i].name}"></option>`
        }
        dataList.innerHTML = data
        })

    //retourner à la vue Galerie au clic sur le bouton retour
    boutonRetour.addEventListener("click", () => {
        ajoutPhoto.style.display = "none"
        galeriePhoto.style.display = "block"
        boutonRetour.style.display = "none"
    })

    //fermer la modale au clic sur la croix
    boutonFermer.addEventListener("click", () => {
        modal.remove()
        displayModal = false
        console.log("display modal :"+displayModal)
    })
}

//fonction qui permet de récupérer l'ID du projet à supprimer
async function recupererIdProjet () {
    //identifier toutes les icones de suppression
    const trashIcons = document.querySelectorAll(".trash-icon")
    //au clic sur une icone, récupérer l'ID du projet associé
    trashIcons.forEach((trashIcon) => {
        trashIcon.addEventListener("click", async(event) => {
            event.preventDefault()
            const workId = event.target.classList[1]
            console.log("Classes de l'élément cliqué :", workId)
            await removeWork(workId)
        })
    })
}

//fonction qui permet de supprimer un projet
async function removeWork(workId) {
    try {
        //appeler l'API
        const url = `http://localhost:5678/api/works/${workId}`
        const tokenAPI = `Bearer ${token}`
    
        const response = await fetch (url, {
            method: "DELETE",
            headers: { 
                "Accept": "*/*",
                "Authorization": tokenAPI,
            },  
        })
        //gérer le retour
        if (response.status===204) {
            console.log("ça marche")
        }
        //gérer les cas d'erreur
        switch (response.status) {
            case 401:
                alert("Cet utilisateur n'est pas autorisé à supprimer un projet")
                break
            default:
                break
            }
        
            //récupérer la liste mise à jour
        const reponseTravaux = await fetch("http://localhost:5678/api/works")
        listeTravaux = await reponseTravaux.json()

        //mettre à jour la galerie principale
        afficherProjets(listeTravaux)

        //mettre à jour la galerie de la modale
        const divGalery = document.getElementById("div-galery")
        divGalery.innerHTML = ""
        for (let i = 0; i < listeTravaux.length; i++) {
            let projet = document.createElement("figure")
            let imageProjet = document.createElement("img")
            let trashWork = document.createElement("img")

            imageProjet.src = listeTravaux[i].imageUrl
            trashWork.src = "./assets/icons/trash.svg"

            projet.classList.add("projet")
            let idProjet = listeTravaux[i].id
            imageProjet.classList.add(idProjet)
            trashWork.classList.add("trash-icon")
            trashWork.classList.add(idProjet)

            projet.appendChild(imageProjet)
            projet.appendChild(trashWork)
            divGalery.appendChild(projet)
        }

        //réattacher les événements de suppression
        recupererIdProjet() 
    } catch (error)  {
        console.error("Erreur lors de la suppression du projet :", error)
    }
}

//**************************************************/
//**************************************************/

//*****************INITIALISATION*******************/

//INITIALISER LA PAGE D'ACCUEIL

//récupérer les projets & catégories via l'API
const reponseTravaux = await fetch("http://localhost:5678/api/works")
let listeTravaux = await reponseTravaux.json()
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

//récupérer le token si il a déjà été généré
const token = window.sessionStorage.getItem("token")

//afficher les projets
afficherProjets(listeTravaux)
console.log(listeTravaux)

//afficher les boutons
afficherBoutonAll()
afficherBoutons()

//*******************MODE ADMIN*********************/

//MODIFIER LA PAGE D'ACCUEIL EN MODE ADMIN
let isModeAdmin = false
afficherModeAdmin(token)
console.log("mode admin :"+isModeAdmin)

//*********************MODALE***********************/

//AU CLIC SUR LE BOUTON MODIFIER, AFFICHER LA MODALE

//afficher la modale
let displayModal = false
if (isModeAdmin) {
    const boutonModifier = document.querySelector("#btn-modif")
    if (boutonModifier) {
        boutonModifier.addEventListener("click", async (event) => {
            event.preventDefault()
            afficherModale()
            recupererIdProjet()
        })
    }
}