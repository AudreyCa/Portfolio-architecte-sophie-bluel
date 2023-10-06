document.addEventListener('DOMContentLoaded', function() {
    const tous = document.getElementById("tous");
    const objects = document.getElementById("objects");
    const appartements = document.getElementById("appartements");
    const hotelsRestos = document.getElementById("hotels_restaurants");
    const galerie = document.querySelector(".gallery");

    // Au chargement de la page, on affiche tous les projets :
    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            // console.log(element);
            let projet = document.createElement('figure');
            projet.innerHTML =`<img src=${element.imageUrl} alt=${element.title}>
            <figcaption>${element.title}</figcaption>`;
            galerie.appendChild(projet);
        });
    });

    // Puis les filtres : 
    tous.addEventListener('click', function getAllproject() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                galerie.textContent = "";
                data.forEach(element => {
                    let projet = document.createElement('figure');
                    projet.innerHTML =`<img src=${element.imageUrl} alt=${element.title}>
                    <figcaption>${element.title}</figcaption>`;
                    galerie.appendChild(projet);
                });
            });
    });

    objects.addEventListener('click', function getAllproject() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                galerie.textContent = "";
                data.forEach(element => {
                    let projet = document.createElement('figure');
                    if(element.categoryId == 1){
                        projet.innerHTML =`<img src=${element.imageUrl} alt=${element.title}>
                        <figcaption>${element.title}</figcaption>`;
                    galerie.appendChild(projet);
                    }
                });
            });
    });

    appartements.addEventListener('click', function getAllproject() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                galerie.textContent = "";
                data.forEach(element => {
                    let projet = document.createElement('figure');
                    if(element.categoryId == 2){
                        projet.innerHTML =`<img src=${element.imageUrl} alt=${element.title}>
                        <figcaption>${element.title}</figcaption>`;
                    galerie.appendChild(projet);
                    }
                });
            });
    });

    hotelsRestos.addEventListener('click', function getAllproject() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                galerie.textContent = "";
                data.forEach(element => {
                    let projet = document.createElement('figure');
                    if(element.categoryId == 3){
                        projet.innerHTML =`<img src=${element.imageUrl} alt=${element.title}>
                        <figcaption>${element.title}</figcaption>`;
                    galerie.appendChild(projet);
                    }
                });
            });
    });

});