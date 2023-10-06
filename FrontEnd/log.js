document.getElementById('formConnexion').addEventListener('submit', async function(e) {
    
    e.preventDefault();
    
    let email = document.getElementById('mail').value;
    let password = document.getElementById('password').value;

    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        window.location.href = 'edit_page.html';
    } else {
        document.getElementById('error').innerHTML = '<p class="error_message">L\'email et/ou le mot de passe sont incorrects</p>';
    }

});