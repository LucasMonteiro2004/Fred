const getBtn = document.getElementById('get-btn');
const posBtn = document.getElementById('pos-btn');

const SendHttpRequest = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        // Se data for do tipo FormData, não definir Content-Type (o navegador cuidará disso)
        if (!(data instanceof FormData)) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong');
        };

        // Verificar se é FormData ou não para enviar corretamente
        if (data instanceof FormData) {
            xhr.send(data); // Enviar como FormData (para arquivos, por exemplo)
        } else {
            xhr.send(JSON.stringify(data)); // Enviar como JSON
        }
    });
};

const getData = () => {
    SendHttpRequest('GET', "url do server").then(responseData => {
        // Ação de mostrar ou obter os dados
    });
};

const sendData = () => {
    const formData = new FormData();
    const fileInput = document.getElementById('your-file-input-id'); // Certifique-se de ter um input de arquivo com este ID
    formData.append('file', fileInput.files[0]);

    // Substitua 'localhost' pelo endereço IP ou nome do host apropriado se necessário
    // Substitua '12345' pela porta onde o seu servidor C está ouvindo se diferente
    SendHttpRequest('POST', "http://localhost:8080", formData)
    .then(responseData => {
        // Ação para processar a resposta após enviar os dados
    }).catch(err => {
        console.log(err);
    });
};


getBtn.addEventListener('click', getData);
posBtn.addEventListener('click', sendData);
