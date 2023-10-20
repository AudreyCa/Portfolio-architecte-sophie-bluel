window.addEventListener('load', function () {
    let token = localStorage.getItem('token');
    let body = this.document.querySelector("body");
    let galerie = document.querySelector(".gallery");
    let modalContainer = document.getElementById("modal-container");
    let closeFirstModale = document.querySelectorAll(".modal-trigger");
    let btnModale = document.querySelector(".modal-btn");
    let allGalerie = document.getElementById("all_gallery");
    let btnFirstModale = document.getElementById("add_picture");
    let btnSecondModale = document.getElementById("add_picture2");
    let secondModale = document.getElementById("modal-container-add");
    let closeSecModale = document.querySelectorAll(".modal-trigger-close");
    let backToFirstModale = document.querySelector(".fa-arrow-left");
    let logOut = document.getElementById("logout");
    let btnAddPicture = this.document.querySelector(".add_photo");
    let blocToChoosePic = document.querySelector(".disaperedForPicture");
    let imgToShow = document.querySelector(".img_preview");
    let titrePhotoToAdd = this.document.querySelector(".title_pic_Add");
    let CategoryToAdd = this.document.querySelector(".category_pic_Add");
    let fileInput;
    let selectedImg;


    if (!token) {
        body.innerHTML = '<h2 style="text-align:center; padding:50px;"> Vous n\'êtes pas autorisé à acceder à cette page <h2>';
        setTimeout(function () {
            window.location.href = '/'; // Remplacez 'autre_page.html' par le chemin de votre autre page
        }, 5000);
    }

    // Au chargement de la page, on affiche tous les projets :
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            galerie.innerText = "";
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
                galerie.innerText = "";
                data.forEach(element => {
                    let modaleProjet = document.createElement('figure');
                    modaleProjet.innerHTML =
                        `<div class="gallery_img">
                    <img src=${element.imageUrl} alt=${element.title} class="image">
                    <i class="fa-solid fa-trash-can" data-id=${element.id}></i>
                    </div>`
                    allGalerie.appendChild(modaleProjet);
                    let btnDelete = modaleProjet.querySelector(".fa-trash-can");
                    let idToDelete = btnDelete.getAttribute("data-id");
                    btnDelete.addEventListener('click', function () {
                        deletePicture(idToDelete);
                    })
                });

            })
    });

    // Gestion des modales
    closeFirstModale.forEach(trigger =>
        trigger.addEventListener('click', closeModale1)
    );
    function closeModale1(e) {
        modalContainer.classList.toggle("active");
        updateAttributeHidden();
    }

    btnFirstModale.addEventListener('click', function () {
        modalContainer.classList.toggle("active");
        secondModale.classList.toggle("active");
        updateAttributeHidden();
    });

    closeSecModale.forEach(trigger =>
        trigger.addEventListener('click', closeModale2)
    );
    function closeModale2() {
        secondModale.classList.toggle("active");
        updateAttributeHidden();
    }

    backToFirstModale.addEventListener('click', function () {
        modalContainer.classList.toggle("active");
        secondModale.classList.toggle("active");
        updateAttributeHidden();
    });

    function updateAttributeHidden() {
        let isModalActive = modalContainer.classList.contains("active");
        modalContainer.setAttribute('aria-hidden', !isModalActive);
        secondModale.setAttribute('aria-hidden', isModalActive);
    }

    // Fonction qui permet de delete les photos que l'on choisi.
    async function deletePicture(id) {
        console.log(id);

        try {

            await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Inclure le token d'authentification
                }
            })
                .then(response => {
                    if (!response.ok) {
                        alert('La requête n\'a pas abouti');
                    }
                })
                .then(data => {
                    console.log(data);
                    console.log(`Image avec l'ID ${id} supprimée avec succès.`);
                    updateGallery();
                })
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    };

    async function updateGallery() {
        if (allGalerie.hasChild()) {
            galerie.removeChild();
        }
        await fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    let modaleProjet = document.createElement('figure');
                    modaleProjet.innerHTML =
                        `<div class="gallery_img">
                    <img src=${element.imageUrl} alt=${element.title} class="image">
                    <i class="fa-solid fa-trash-can" data-id=${element.id}></i>
                    </div>`
                    allGalerie.appendChild(modaleProjet);
                    let btnDelete = modaleProjet.querySelector(".fa-trash-can");
                    let idToDelete = btnDelete.getAttribute("data-id");
                    btnDelete.addEventListener('click', function () {
                        deletePicture(idToDelete);
                    })
                });

            })
    }


    // Fonction pour ajouter une photo :
    btnAddPicture.addEventListener('click', function chooseFileToUpload() {

        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png';

        fileInput.addEventListener('change', function () {
            selectedImg = this.files[0];
            if (selectedImg) {

                console.log(selectedImg);
                const reader = new FileReader();

                reader.onload = function (event) {
                    console.log(event.target);

                    blocToChoosePic.style.display = "none";
                    imgToShow.style.display = "flex";
                    let previewImg = document.createElement('img');
                    previewImg.src = event.target.result,
                        previewImg.alt = selectedImg.name;
                    previewImg.style.maxHeight = "180px";
                    imgToShow.appendChild(previewImg);

                }
                reader.readAsDataURL(selectedImg);
            }
        });

        fileInput.click();

    });

    titrePhotoToAdd.addEventListener('input', updateInputColor);
    CategoryToAdd.addEventListener('input', updateInputColor);
    function updateInputColor() {
        if (titrePhotoToAdd.value !== "" && CategoryToAdd.value !== "") {
            btnSecondModale.style.backgroundColor = "#1D6154";
            btnSecondModale.removeAttribute("disabled");
        }
    }

    btnSecondModale.addEventListener('click', function (e) {
        // body
        e.preventDefault();
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        console.log(selectedImg);

        let formPicData = new FormData();
        formPicData.append('image', selectedImg);
        formPicData.append('title', title);
        formPicData.append('category', category);

        fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formPicData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
    });

    
    // Pour se déconnecter
    logOut.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

});


