async function appelerListeTravaux () {
    const reponse = await fetch("http://localhost:5678/api/works")
    const body = await reponse.json()
    return body
}

async function recupererListeTravaux () {
    const listeTravaux = await appelerListeTravaux()
    console.log(listeTravaux)
}

recupererListeTravaux()