//METTRE EN PLACE LA PAGE DE CONNEXION
let mainLogin = document.querySelector("main")

let contenuTitre = "Log In"
let contenuMail = "E-mail"
let contenuMdp = "Mot de passe"
let contenuLien = "Mot de passe oublié"

let div = `
    <div>
        <h2>${contenuTitre}</h2>
        <form action="#" method="post">
            <label>${contenuMail}</label>
            <input type="email" id="mail" name="mail">
            <label>${contenuMdp}</label>
            <input type="password" id="mdp" name="mdp">
            <input class="btn-se-connecter" id="btn" type="submit" value="Se connecter">
        </form>
        <a>${contenuLien}</a>
    </div>
`

mainLogin.innerHTML = div
mainLogin.classList.add("main-container")

//contrôler le format des données renseignées dans le formulaire
//à faire - moins prioritaire que le reste

//**************************************************/

//GERER LA CONNEXION

async function recupererInfosLogin () {
//fonction qui récupère les informations renseignées par l'utilisateur
    //récupérer l'e-mail renseigné
    let baliseEmail = document.getElementById("mail")
    let email = baliseEmail.value
    //récupérer le mdp renseigné
    let baliseMdp = document.getElementById("mdp")
    let password = baliseMdp.value
    //déclarer une variable login reprenant ces informations, qui constituera la charge utile
    const login = {
        email,
        password,
    }
    //transformer la charge utile en JSON
    const chargeUtile = JSON.stringify(login)
    return chargeUtile
}

async function connexion(chargeUtile) {
//fonction qui appelle l'API avec les informations renseignées par l'utilisateur
    //appeler l'API
    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },   
        body: chargeUtile
        })
    //récupérer le token
    const data = await response.json()
    const token = data.token
    //stocker le token
    window.sessionStorage.setItem("token",token)
    //rediriger vers la page d'accueil
    window.location.href = "index.html"
    //gérer les cas d'erreur
    switch (response.status) {
        case 404:
            alert("Cet utilisateur n'est pas autorisé à se connecter");
            break
        case 401:
            alert("Le mot de passe est incorrect");
            break
        default:
            break
        }
}

let formulaire = document.querySelector("form")
//récupérer l'élement formulaire
formulaire.addEventListener("submit", async (event) => {
//au clic sur le bouton "Se connecter" déclencher plusieurs actions
    try {
        //empêcher le rechargement de la page
        event.preventDefault()
        //récupérer les infos de connexion renseignées par l'utilisateur
        const chargeUtile = await recupererInfosLogin()
        //appeler l'API pour vérifier que l'utilisateur a le droit de se connecter
        //stocker le token et rediriger vers la page d'accueil
        connexion(chargeUtile)
    } catch {
        alert("Ce service est momentanément indisponible, veuillez ressayer ultérieurement.")
    } 
})




