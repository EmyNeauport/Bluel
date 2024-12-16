let mainLogin = document.querySelector("main")

let contenuTitre = "Log In"
let contenuLien = "Mot de passe oublié"
let inputMail = "E-mail"
let inputMdp = "Mot de passe"

let div = `
    <div>
        <h2>${contenuTitre}</h2>
        <form action="#" method="post">
            <label>${inputMail}</label>
            <input type="email" id="mail" name="mail">
            <label>${inputMdp}</label>
            <input type="password" id="mdp" name="mdp">
        </form>
        <input class="btn-se-connecter" type="submit" value="Se connecter"><br>
        <a>${contenuLien}</a>
    </div>
`

mainLogin.innerHTML = div
mainLogin.classList.add("main-container")
