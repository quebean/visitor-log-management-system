const fetch = require('node-fetch');

function register() {
    fetch('http://192.168.68.13:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'kejatori',
            password: 'kejatori'
        }),
        mode: 'cors'
    }).then(result => result.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

register();