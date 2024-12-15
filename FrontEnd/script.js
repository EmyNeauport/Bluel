//récupérer la liste des projets via l'API
const reponse = await fetch("http://localhost:5678/api/works")
const listeTravaux = await reponse.json()
console.log(listeTravaux)

//récupérer l'élement gallery du HTML dans le JavaScript
const gallery = document.querySelector(".gallery")

// boucle qui permet d'ajouter les projets retournés par l'API dans l'élement gallery 
// à chaque projet est associé une image et un titre retourné par l'API
for (let i = 0; i < listeTravaux.length; i++) {
    let projet = document.createElement("figure")
    let imageProjet = document.createElement("img")
    let titreProjet = document.createElement("figcaption")
    imageProjet.src = listeTravaux[i].imageUrl
    titreProjet.innerText = listeTravaux[i].title
    projet.appendChild(imageProjet)
    projet.appendChild(titreProjet)
    gallery.appendChild(projet)   
}
console.log(gallery)
