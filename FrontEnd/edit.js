window.addEventListener('load', function () {
    let galerie = document.querySelector(".gallery");
    let modalContainer = document.querySelector(".modal-container");
    let modalTriggers = document.querySelectorAll(".modal-trigger");
    let btnModale = document.querySelector(".modal-btn");
    let allGalerie = document.getElementById("all_gallery");
    let btnSecondModale = document.getElementById("add_picture");
    let secondModale = document.querySelector(".modal-container-add");
    let closeSecModale = document.querySelectorAll(".modal-trigger-close");
    let backToFirstModale = document.querySelector(".fa-arrow-left");
    let btnsDelete = document.querySelectorAll(".fa-trash-can");
    

    // Au chargement de la page, on affiche tous les projets :
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            galerie.textContent = "";
            data.forEach(element => {
                // console.log(element);
                let projet = document.createElement('figure');
                projet.innerHTML = `<img src=${element.imageUrl} alt=${element.title}>
                <figcaption>${element.title}</figcaption>`;
                galerie.appendChild(projet);
            });
        });

    // ------- A l'ouverture de la modale, on affiche toutes les images ----------
    btnModale.addEventListener("click", function () {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                allGalerie.textContent = "";
                data.forEach(element => {
                    let modaleProjet = document.createElement('figure');
                    // let image = document.querySelector(".image");
                    modaleProjet.innerHTML =
                    `<div class="gallery_img">
                    <img src=${element.imageUrl} alt=${element.title} class="image">
                    <i class="fa-solid fa-trash-can" data-id=${element.id}></i>
                    </div>`
                    allGalerie.appendChild(modaleProjet);
                    // console.log(modaleProjet);
                    let btnDelete = modaleProjet.querySelector(".fa-trash-can");
                    console.log(btnDelete);
                    btnDelete.addEventListener('click', deletePicture);

                });
                // let btnDelete = document.querySelector(".fa-trash-can");
                // console.log(btnDelete);
            })
        // POur vérifier ce qu'on recois de btnsDelete
        // console.log(btnsDelete);
    });

    modalTriggers.forEach(trigger =>
        trigger.addEventListener('click', toggleModal)
    );
    function toggleModal() {
        modalContainer.classList.toggle("active");
    }

    btnSecondModale.addEventListener('click', function () {
        modalContainer.classList.toggle("active");
        secondModale.classList.toggle("active");
    });

    closeSecModale.forEach(trigger =>
        trigger.addEventListener('click', closeModale2)
    );
    function closeModale2() {
        secondModale.classList.toggle("active");
    }

    backToFirstModale.addEventListener('click', function () {
        modalContainer.classList.toggle("active");
        secondModale.classList.toggle("active");
    });

    function deletePicture() {
        // let idPicture = this.dataset.id;
        // alert(`L'ID de l'élément est : ${idPicture}`);
        try {
            let idPicture = this.dataset.id;
            let confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
    
            if (confirmation) {
                // Faire ici la suppression de l'image avec l'ID
                console.log(`L'utilisateur a confirmé la suppression de l'image avec l'ID : ${idPicture}`);
            } else {
                console.log("L'utilisateur a annulé la suppression.");
            }
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    
    };

});


