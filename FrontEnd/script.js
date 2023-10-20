document.addEventListener('DOMContentLoaded', function () {
    const tous = document.getElementById("tous");
    const objects = document.getElementById("objects");
    const appartements = document.getElementById("appartements");
    const hotelsRestos = document.getElementById("hotels_restaurants");
    const galerie = document.querySelector(".gallery");

    let projets;
    let allProjects = [];

    // Au chargement de la page, on affiche tous les projets :
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                // console.log(element);
                allProjects.push(element);
                projets = document.createElement('figure');
                projets.innerHTML = `<img src=${element.imageUrl} alt=${element.title}>
            <figcaption>${element.title}</figcaption>`;
                galerie.appendChild(projets);
            });
        });

    // Puis les filtres : 
    tous.addEventListener('click', getAllproject);
    objects.addEventListener('click', getObjects);
    appartements.addEventListener('click', getAppart);
    hotelsRestos.addEventListener('click', getHotelsResto);

    function getAllproject() {
        galerie.textContent = "";
        for (i = 0; i < allProjects.length; i++) {
            projets = document.createElement('figure');
            projets.innerHTML = `<img src=${allProjects[i].imageUrl} alt=${allProjects[i].title}>
            <figcaption>${allProjects[i].title}</figcaption>`;
            galerie.appendChild(projets);
        };
    }

    function getObjects() {
        galerie.textContent = "";
        for (i = 0; i < allProjects.length; i++) {
            if (allProjects[i].categoryId == 1) {
                projets = document.createElement('figure');
                projets.innerHTML = `<img src=${allProjects[i].imageUrl} alt=${allProjects[i].title}>
            <figcaption>${allProjects[i].title}</figcaption>`;
                galerie.appendChild(projets);
            }
        };
    };

    function getAppart() {
        galerie.textContent = "";
        for (i = 0; i < allProjects.length; i++) {
            if (allProjects[i].categoryId == 2) {
                projets = document.createElement('figure');
                projets.innerHTML = `<img src=${allProjects[i].imageUrl} alt=${allProjects[i].title}>
            <figcaption>${allProjects[i].title}</figcaption>`;
                galerie.appendChild(projets);
            }
        };
    };

    function getHotelsResto() {
        galerie.textContent = "";
        for (i = 0; i < allProjects.length; i++) {
            if (allProjects[i].categoryId == 3) {
                projets = document.createElement('figure');
                projets.innerHTML = `<img src=${allProjects[i].imageUrl} alt=${allProjects[i].title}>
            <figcaption>${allProjects[i].title}</figcaption>`;
                galerie.appendChild(projets);
            }
        };
    };

});