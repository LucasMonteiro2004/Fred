document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir o envio tradicional do formulário
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            username: username,
            password: password
        };

        SendHttpRequest('POST', 'http://localhost:8080', data)
        .then(responseData => {
            if (responseData.status === 'ok') {
                // Altere para a URL desejada após o login
                window.location.href = '/principal.html';
            } else {
                alert('Login falhou! Tente novamente.');
            }
        })
        .catch(err => {
            console.error('Erro ao enviar dados', err);
            alert('Erro ao conectar com o servidor');
        });
    });
});

function SendHttpRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Erro na conexão com o servidor');
        };

        xhr.send(JSON.stringify(data));
    });
}
