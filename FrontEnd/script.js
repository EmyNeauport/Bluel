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

//fonction qui permet d'afficher les projets dans la modale
function afficherProjetsModale() {
    const divGalery = document.getElementById("div-galery")
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
    //déclarer les variables
    const modal = document.createElement("aside")
    let contenuMsgFile = ""
    let contenuMsgTitle = ""
    let contenuMsgCategory = ""
    let contenuMsgSubmit = ""
    //créer la modale
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
            <div id="div-ajout">
                <img src="./assets/icons/img.svg" alt="Icone photo" ></img>
                <p id="fileTitle"></p>
                <input type="file" id="fileElem" accept="image/*" style="display:none">
                <button id="fileSelect" type="button">+ Ajouter photo</button>
                <p>jpg, png : 4mo max</p>
            </div>
            <form>
                <label>Titre</label>
                <input type="text" id ="titre" name="titre"></input>
                <label>Catégorie</label>
                <select id ="categorie" name="categorie" list="category-list"></select>
                <hr />
                <p id="msg-file">${contenuMsgFile}</p>
                <p id="msg-title">${contenuMsgTitle}</p>
                <p id="msg-category">${contenuMsgCategory}</p>
                <input type="submit" id="btn-validation" value="Valider"></btn>
                <p id="msg-submit">${contenuMsgSubmit}</p>
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
        
    //afficher les projets retournés par l'API dans la galerie photo (1)
    afficherProjetsModale()
        
    //modifier le contenu de la modale au clic sur le bouton "Ajouter une photo" (2)
    boutonAjout.addEventListener("click", () => {
        //modifier le contenu de la modale
        ajoutPhoto.style.display = "block"
        galeriePhoto.style.display = "none"
        boutonRetour.style.display = "block"
        //génerer le contenu de la liste déroulante
        let select = document.getElementById("categorie")
        select.innerHTML = ""
            //par défaut, pas de valeur selectionnée dans la liste déroulante
            const firstOption = document.createElement("option");
            firstOption.value = ""
            firstOption.textContent = ""
            firstOption.disabled = true
            firstOption.selected = true
            select.appendChild(firstOption)
            //générer le contenu de la liste déroulante
            for (let i = 0; i < listeCategories.length; i++) {
                const optionContent = {
                    id: listeCategories[i].id,
                    name: listeCategories[i].name,
                }
                const option = document.createElement("option")
                option.value = optionContent.id
                option.textContent = optionContent.name
                select.appendChild(option)
            }
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
    })

    //fermer la modale au clic en dehors de celle-ci
    body.addEventListener("click", (event) => {
        if (
            modal && 
            !modal.contains(event.target) && 
            !event.target.closest("#btn-modif")
        ) {
            modal.remove()
            displayModal = false
        }
    })
}

//fonction qui permet de supprimer un projet
async function gererSuppression () {
    //récupérer l'ID du projet à supprimer
    //identifier toutes les icones de suppression
    const trashIcons = document.querySelectorAll(".trash-icon")
    //au clic sur une icone, récupérer l'ID du projet associé
    trashIcons.forEach((trashIcon) => {
        trashIcon.addEventListener("click", async(event) => {
            event.preventDefault()
            const workId = event.target.classList[1]
            //lancer la fonction de suppression
            await removeWork(workId)
        })
    })
}

//fonction qui permet d'appeler l'API DELETE (delete a work)
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
            //récupérer la liste mise à jour
            const reponseTravaux = await fetch("http://localhost:5678/api/works")
            listeTravaux = await reponseTravaux.json()

            //mettre à jour la galerie principale
            afficherProjets(listeTravaux)

            //mettre à jour la galerie de la modale
            afficherProjetsModale(listeTravaux)
            gererSuppression(listeTravaux)
            }
        //gérer les cas d'erreur
        switch (response.status) {
            case 401:
                alert("Cet utilisateur n'est pas autorisé à supprimer un projet")
                break
            default:
                break
            }        
    }
    catch (error)  {
        console.error("Erreur lors de la suppression du projet :", error)
    }
}

//fonction qui permet d'ajouter un projet
async function gererAjout() {
    //déclarer les variables
    const fileSelect = document.getElementById("fileSelect")
    const fileElem = document.getElementById("fileElem")
    const btnSubmit = document.getElementById("btn-validation")
    const title = document.getElementById("titre")
    const category = document.getElementById("categorie")
    //gérer la mise en forme du bouton de selection d'un fichier
    fileSelect.addEventListener("click", () => {
          if (fileElem) {
            fileElem.click()
          }
        },
        false,
    )
    //afficher un aperçu et le nom du fichier lorsqu'il est selectionné
    fileElem.addEventListener("change", () => {
        //afficher l'aperçu de la photo sélectionnée
        const reader = new FileReader()
        reader.onload = function (e) {
            //sélectionner l'icone existant
            const iconImage = document.querySelector("#div-ajout img")
            //créer une balise pour l'aperçu de la photo
            const imgPreview = document.createElement("img")
            imgPreview.src = e.target.result
            imgPreview.alt = "Aperçu de l'image"
            imgPreview.style.maxWidth = "100%"
            imgPreview.style.height = "auto"
            //remplacer l'icône par l'aperçu de la photo
            iconImage.replaceWith(imgPreview)
        };
        reader.readAsDataURL(fileElem.files[0]);
        //afficher le nom de l'image sélectionnée
        const fileTitle = document.getElementById("fileTitle")
        if (fileElem.files.length > 0) {
            fileTitle.textContent = fileElem.files[0].name
        }
    })
    //désactiver le bouton de soumission du formulaire
    btnSubmit.disabled = true
    //contrôler que les données sont renseignées, avant la soumission
    dataControlBlur()
    //activer le bouton de soumission si les informations sont renseignées
    fileElem.addEventListener("change", toggleSubmitButton)
    title.addEventListener("input", toggleSubmitButton)
    category.addEventListener("input", toggleSubmitButton)
    //au clic sur le bouton
    const submitForm = document.getElementById("btn-validation")
    submitForm.addEventListener("click", async (event) => {
        event.preventDefault()
        //récupérer les infos qui permettent d'ajouter un projet
        const fileElem = document.getElementById("fileElem")
        //récupérer l'ID de la catégorie selectionnée par l'utilisateur
        let select = document.getElementById("categorie")
        let categorie = select.value
        const formData = new FormData()
            formData.append("image", fileElem.files[0])
            formData.append("title", document.getElementById("titre").value)
            formData.append("category", categorie)
        //lancer la fonction d'ajout
        await addWork(formData)
    })
}

//fonction qui permet d'appeler l'API POST (send a new work)
async function addWork(formData) {
    try {
        //appeler l'API
        const url = "http://localhost:5678/api/works"
        const tokenAPI = `Bearer ${token}`
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": tokenAPI,
            },
            body: formData,
        })
        //gérer le retour
        if (response.ok) {
                const data = await response.json()
                //récupérer la liste mise à jour
                const reponseTravaux = await fetch("http://localhost:5678/api/works")
                listeTravaux = await reponseTravaux.json()
                //mettre à jour la galerie principale
                afficherProjets(listeTravaux)
                //mettre à jour la galerie de la modale
                afficherProjetsModale(listeTravaux)
                gererSuppression(listeTravaux)
                //confirmer à l'utilisateur l'ajout du projet
                const msgSubmit = document.getElementById("msg-submit")
                let msgSubmitValue = "Le projet a été ajouté avec succès, vous pouvez quitter cette fenêtre"
                msgSubmit.innerHTML = msgSubmitValue
        } else { 
            console.error("Erreur lors de l'envoi :", response.status, response.statusText)
            const msgSubmit = document.getElementById("msg-submit")
            let msgSubmitValue = "Une erreur est survenue, le projet n'a pas pu être ajouté"
            msgSubmit.innerHTML = msgSubmitValue
        }
    }
    catch (error) {
        console.error("Erreur réseau :", error)
        const msgSubmit = document.getElementById("msg-submit")
        let msgSubmitValue = "Une erreur est survenue, le projet n'a pas pu être ajouté"
        msgSubmit.innerHTML = msgSubmitValue
    }
}

//fonction qui contrôle les données saisies par l'utilisateur, avant la soumission
function dataControlBlur() {
    //déclarer les variables
    const fileElem = document.getElementById("fileElem")
    const title = document.getElementById("titre")
    const category = document.getElementById("categorie")
    const msgFile = document.getElementById("msg-file")
    const msgTitle = document.getElementById("msg-title")
    const msgCategory = document.getElementById("msg-category")
    msgFile.innerHTML = "Veuillez sélectionner la photo du projet à ajouter"
    //contrôler la présence d'un fichier
    fileElem.addEventListener("change", () => {
        const isFileLoaded = fileElem.files && fileElem.files.length > 0
        if(isFileLoaded) {
            let msgFileValue = ""
            msgFile.innerHTML = msgFileValue
        }
    })
    //contrôler la donnée titre
    title.addEventListener("blur", (event) => {
        const titlelValue = event.target.value.trim()
        if(titlelValue === "") {
            let msgTitleValue = "Veuillez renseigner le titre du projet à ajouter"
            msgTitle.innerHTML = msgTitleValue
        } else {
            let msgTitleValue = ""
            msgTitle.innerHTML = msgTitleValue
        }
    })
    //contrôler la donnée catégorie
    category.addEventListener("blur", (event) => {
        const categoryValue = category.options[category.selectedIndex].textContent
        let isValidCategory = false
        for (let i = 0; i < listeCategories.length; i++) {
            if (listeCategories[i].name === categoryValue) {
                isValidCategory = true
                break
            }
        }
        if(!isValidCategory) {
            let msgCategoryValue = "Veuillez sélectionner une catégorie valide dans la liste"
            msgCategory.innerHTML = msgCategoryValue
        } else {
            let msgCategoryValue = ""
            msgCategory.innerHTML = msgCategoryValue
        }
    })
}

//fonction qui permet d'activer / désactiver le bouton de soumission du formulaire
function toggleSubmitButton() {
    //déclarer les variables
    const fileElem = document.getElementById("fileElem")
    const title = document.getElementById("titre")
    const category = document.getElementById("categorie")
    const btnSubmit = document.getElementById("btn-validation")
    //récupérer les valeurs
    const titleValue = title.value.trim()
    const categoryValue = category.options[category.selectedIndex].textContent
    //vérifier si la catégorie est valide
    let isValidCategory = false;
    for (let i = 0; i < listeCategories.length; i++) {
        if (listeCategories[i].name === categoryValue) {
            isValidCategory = true
            break
        }
    }
    //vérifier si un fichier est chargé
    const isFileLoaded = fileElem.files && fileElem.files.length > 0
    //activer le bouton de soumission seulement si les deux champs sont non vide
    if (titleValue !== "" && isValidCategory && isFileLoaded) {
        btnSubmit.disabled = false
    } else {
        btnSubmit.disabled = true
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
const body = document.querySelector("body")

//mettre en forme le header
const listItems = document.querySelectorAll('header nav ul li')
const firstItem = listItems[0]
firstItem.innerHTML = `<a href="index.html">projets</a>`
const thirdItem = listItems[2]
thirdItem.innerHTML = `<a href="login.html">login</a>`

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
let token = window.sessionStorage.getItem("token")
if (token) {
    thirdItem.innerHTML = `<a id="log-out">logout</a>`
}

//afficher les projets
afficherProjets(listeTravaux)

//afficher les boutons
afficherBoutonAll()
afficherBoutons()

//*******************MODE ADMIN*********************/

//MODIFIER LA PAGE D'ACCUEIL EN MODE ADMIN
let isModeAdmin = false
afficherModeAdmin(token)

//*********************MODALE***********************/

//AFFICHER LA MODALE
let displayModal = false
if (isModeAdmin) {
    const boutonModifier = document.querySelector("#btn-modif")
    if (boutonModifier) {
        boutonModifier.addEventListener("click", async (event) => {
            event.preventDefault()
            await afficherModale()
            gererSuppression()
            gererAjout()
        }) 
    }
}

//******************DECONNEXION*********************/

//QUITTER LE MODE ADMIN
if (isModeAdmin) {
    const boutonLogout = document.getElementById("log-out")
    boutonLogout.addEventListener("click", (event) => {
        event.preventDefault()
        window.sessionStorage.removeItem("token")
        token = null
        isModeAdmin = false
        window.location.href = "index.html"
    })
}