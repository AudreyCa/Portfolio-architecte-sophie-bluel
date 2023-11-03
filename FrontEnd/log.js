let formLog = document.getElementById('formConnexion');

formLog.addEventListener('submit', async function(e) {
    
    e.preventDefault();
    
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    
    try {
        let response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            let data = await response.json();
            let token = data.token;
            localStorage.setItem('token', token);
            if(token){
                localStorage.setItem('token', token);
                window.location.href = 'edit_page.html';
            } else{
                alert("Une erreur s'est produite");
            }

        } else {
            document.getElementById('error').innerHTML = `<p class="error_message">L'email et/ou le mot de passe sont incorrects</p>`;
        }
    } catch(error) {
        alert('Erreur du serveur');
        console.log("error ", error);
    }

});