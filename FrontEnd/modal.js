function creerModale() {
    const modal = document.createElement("aside");

    const galeriePhoto= document.createElement("div")
}

    //galerie photo
    let divGaleriePhoto = `
    <div>
        <h3>Galerie photo</h3>
        <div></div>
        <hr />
        <button>Ajouter une photo</button>
    </div>
    `

    //ajout photo
    let divAjoutPhoto = `
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
    </div>
    `


// let modal = `
//     <aside>
//         <div class="modal-wrapper">
//             <h3>Galerie photo</h3>
//         </div>
//     </aside>
// `

// let portfolio = document.getElementById("portfolio")
// portfolio.innerHTML = modal

// // modal.style.display = "none"

// // let btnModif = document.getElementById("btn-modif")
// // btnModif.addEventListener ("click", () => {
// //     //afficher la boîte modale
// //     modal.style.display = "block"
// // })

