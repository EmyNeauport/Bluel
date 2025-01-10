//********************FONCTIONS*********************/

//fonction qui contrôle les données saisies par l'utilisateur, avant la soumission du formulaire de connexion
function dataControlBlur() {
    //contrôler la donnée 'e-mail'
    email.addEventListener("blur", (event) => {
        const emailValue = event.target.value.trim()
        if(emailValue === "") {
            let msgMailValue = "Veuillez renseigner votre identifiant de connexion"
            msgMail.innerHTML = msgMailValue
        } else {
            let msgMailValue = ""
            msgMail.innerHTML = msgMailValue
        }
    })
    //contrôler la donnée 'mot de passe'
    pw.addEventListener("blur", (event) => {
        const pwValue = event.target.value.trim()
        if(pwValue === "") {
            let msgMdpValue = "Veuillez renseigner votre mot de passe"
            msgMdp.innerHTML = msgMdpValue
        } else {
            let msgMdpValue = ""
            msgMdp.innerHTML = msgMdpValue
        }
    })
}

//fonction qui permet d'activer / désactiver le bouton de soumission du formulaire de connexion
function toggleSubmitButton() {
    //déclarer les variables
    const emailValue = email.value.trim()
    const pwValue = pw.value.trim()
    //activer le bouton de soumission seulement si les deux champs sont non vide
    if (emailValue !== "" && pwValue !== "") {
        btn.disabled = false
    } else {
        btn.disabled = true
    }
}

//fonction qui récupère les informations de connexion renseignées par l'utilisateur
async function recupererInfosLogin () {
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

//fonction qui appelle l'API de connexion avec les informations renseignées par l'utilisateur
async function connexion(chargeUtile) {
    //appeler l'API
    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },   
        body: chargeUtile
        })
    //gérer les cas d'erreur
    switch (response.status) {
        case 404:
            let msgConnexionUnValue = "Veuillez vérifier vos informations de connexion"
            msgConnexionUn.innerHTML = msgConnexionUnValue
            break
        case 401:
            let msgConnexionDeuxValue = "Veuillez vérifier vos informations de connexion"
            msgConnexionDeux.innerHTML = msgConnexionDeuxValue
            break
        default:
            break
        }
    //générer le token
    if (response.status===200) {
        const data = await response.json()
        const token = data.token
        //stocker le token
        window.sessionStorage.setItem("token",token)
        //rediriger vers la page d'accueil
        window.location.href = "index.html"
    }
}

//**************************************************/
//**************************************************/

//***************EXECUTION DU CODE******************/

//METTRE EN PLACE LA PAGE DE CONNEXION

//mettre en forme le header
const listItems = document.querySelectorAll('header nav ul li')
const firstItem = listItems[0]
firstItem.innerHTML = `<a href="index.html">projets</a>`
const thirdItem = listItems[2]
thirdItem.innerHTML = `<a href="login.html">login</a>`

//générer le contenu de la page
let mainLogin = document.querySelector("main")

let contenuTitre = "Log In"
let contenuMail = "E-mail"
let contenuMdp = "Mot de passe"
let contenuMsgMail = ""
let contenuMsgMdp = ""
let contenuMsgConnexionUn = ""
let contenuMsgConnexionDeux = ""
let contenuLien = "Mot de passe oublié"

let div = `
    <div>
        <h2>${contenuTitre}</h2>
        <form action="#" method="post">
            <label>${contenuMail}</label>
            <input type="email" id="mail" name="mail">
            <label>${contenuMdp}</label>
            <input type="password" id="mdp" name="mdp">
            <p id="msg-mail">${contenuMsgMail}</p>
            <p id="msg-mdp">${contenuMsgMdp}</p>
            <p id="msg-connexion-un">${contenuMsgConnexionUn}</p>
            <p id="msg-connexion-deux">${contenuMsgConnexionDeux}</p>
            <input class="btn-se-connecter" id="btn" type="submit" value="Se connecter">
        </form>
        <a>${contenuLien}</a>
    </div>
`

mainLogin.innerHTML = div
mainLogin.classList.add("main-container")

//**************************************************/

//GERER LA CONNEXION

//déclarer les variables
const form = document.querySelector("form")
const email = document.getElementById("mail")
const pw = document.getElementById("mdp")
const msgMail = document.getElementById("msg-mail")
const msgMdp = document.getElementById("msg-mdp")
const msgConnexionUn = document.getElementById("msg-connexion-un")
const msgConnexionDeux = document.getElementById("msg-connexion-deux")
const btn = document.getElementById("btn")

//désactiver le bouton de soumission du formulaire de connexion
btn.disabled = true

//contrôler que les données sont renseignées, avant la soumission
dataControlBlur()

//activer le bouton de soumission si les informations sont renseignées
email.addEventListener("input", toggleSubmitButton)
pw.addEventListener("input", toggleSubmitButton)

//au clic sur le bouton "Se connecter" déclencher plusieurs actions
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        //récupérer les infos de connexion renseignées par l'utilisateur
        const chargeUtile = await recupererInfosLogin()
        //appeler l'API pour vérifier que l'utilisateur a le droit de se connecter
        connexion(chargeUtile)
    } catch {
        alert("Ce service est momentanément indisponible, veuillez ressayer ultérieurement.")
    } 
})




