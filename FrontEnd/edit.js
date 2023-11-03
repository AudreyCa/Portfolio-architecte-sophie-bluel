window.addEventListener('load', function () {
    let token = localStorage.getItem('token');
    let body = document.querySelector("body");
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
    let btnAddPicture = document.querySelector(".add_photo");
    let blocToChoosePic = document.querySelector(".disaperedForPicture");
    let imgToShow = document.querySelector(".img_preview");
    let titrePhotoToAdd = document.querySelector(".title_pic_Add");
    let categoryToAdd = document.querySelector(".category_pic_Add");
    let fileInput = document.getElementById("inputFileAdd");
    let formAddPicture = document.getElementById("formPhoto");
    let selectedImg, previewImg;


    if (!token) {
        body.innerHTML = '<h2 style="text-align:center; padding:50px;"> Vous n\'êtes pas autorisé à acceder à cette page <h2>';
        setTimeout(function () {
            window.location.href = '/'; // Remplacez 'autre_page.html' par le chemin de votre autre page
        }, 5000);
    }

    // Au chargement de la page, on affiche tous les projets :
    initGallery();

    function initGallery() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                galerie.innerText = "";
                data.forEach(element => {
                    console.log(element);
                    let projet = document.createElement('figure');
                    projet.innerHTML = `<img src=${element.imageUrl} alt=${element.title}>
                <figcaption>${element.title}</figcaption>`;
                    galerie.appendChild(projet);
                });
            });
    }


    // ------- A l'ouverture de la modale, on affiche toutes les images ----------
    btnModale.addEventListener("click", function () {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                allGalerie.innerText = "";
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

    // ------- Gestion des modales ---------- 
    closeFirstModale.forEach(trigger => 
        trigger.addEventListener('click', closeModale1)
    );
    function closeModale1() {
        modalContainer.classList.toggle("active");
        updateAttributeHidden();
        initGallery();
    }

    btnFirstModale.addEventListener('click', function () {
        modalContainer.classList.toggle("active");
        secondModale.classList.toggle("active");
        updateAttributeHidden();
        emptyFormProjet();
    });

    closeSecModale.forEach(trigger => {
        trigger.addEventListener('click', closeModale2);
    }
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

    function emptyFormProjet () {
        blocToChoosePic.style.display = "flex";
        imgToShow.style.display = "none";
        titrePhotoToAdd.value = "";
        categoryToAdd.value = "none";
        btnSecondModale.style.backgroundColor = "grey";
    }

    // Fonction qui permet de supprimer les photos que l'on choisi (en fonction de leur id)
    function deletePicture(id) {
        try {

            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Inclus le token d'authentification pour être authorisé à supprimer les datas
                }
            })
                .then(response => {
                    if (!response.ok) {
                        alert('La requête n\'a pas abouti');
                    }
                })
                .then(data => {
                    console.log(data);
                    // console.log(`Image avec l'ID ${id} supprimée avec succès.`);
                    updateGallery();
                })
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    };

    // Fonction pour ajouter une photo en cherchant dans notre dossier
    btnAddPicture.addEventListener('click', function chooseFileToUpload() {
        if(previewImg){
            imgToShow.replaceChildren();
        }
        fileInput = document.createElement('input');
        fileInput.id = 'inputFileAdd';
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png';

        fileInput.addEventListener('change', function () {
            // console.log(this.files[0]);
            selectedImg = this.files[0]; // On récupère le fichier image sélectionné
            if (selectedImg) {
                const reader = new FileReader(); // Permet de lire le contenu de l'image

                reader.onload = function (event) {
                    // console.log(event.target);
                    // Une fois le contenu lu : 
                    blocToChoosePic.style.display = "none";
                    imgToShow.style.display = "flex";
                    previewImg = document.createElement('img');
                    previewImg.src = event.target.result;                        
                    previewImg.alt = selectedImg.name;
                    previewImg.style.maxHeight = "180px";
                    imgToShow.appendChild(previewImg);
                }
                reader.readAsDataURL(selectedImg); // Permet d'afficher l'image dans ma page web (lu sous forme d'URL Data)
            }
        });

        fileInput.click(); // Ouvre le dossier pour choisir dedans. Le click se déclenche automatiquement. 

    });

    //------- Seconde modale : si les champs sont remplis, le bouton se colore ----------
    titrePhotoToAdd.addEventListener('input', updateInputColor);
    categoryToAdd.addEventListener('input', updateInputColor);
    function updateInputColor() {
        if (titrePhotoToAdd.value !== "" && categoryToAdd.value !== "") {
            btnSecondModale.style.backgroundColor = "#1D6154";
        }
    }

    // Fonction pour ajouter un projet dans la galerie / envoyer les data du formulaire au backend
    formAddPicture.addEventListener('submit', function (e) {

        e.preventDefault();

        if(!previewImg || !titrePhotoToAdd.value || !categoryToAdd.value) {
            e.preventDefault();
            document.getElementById('error').innerHTML = '<p class="error_message">Veuillez remplir tous les champs</p>';
        } else {
            let title = document.getElementById('title').value;
            let category = document.getElementById('category').value;
    
            let formPicData = new FormData();
            // on ajoute les champs selectionnées au formulaire : 
            formPicData.append('image', selectedImg); 
            formPicData.append('title', title);
            formPicData.append('category', category);
    
            // On envoie le formulaire au backend pour ajouter le projet
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formPicData
                })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    initGallery();
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
            
            emptyFormProjet();
            closeModale2();
        }
    });

    // Permet de supprimer visuellement le fichier nouvellement supprimer, sans refresh, dans la modale
    async function updateGallery() {
        await fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                allGalerie.innerText = "";
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

    // Pour se déconnecter
    logOut.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

});