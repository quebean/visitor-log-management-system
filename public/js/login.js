const username = document.querySelector('#username');
const password = document.querySelector('#password');

document.querySelector('#submit').addEventListener('click', async (event) => {
    event.preventDefault();
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        mode: 'cors'
    }).then(result => result.json())
    .then(data => {
        if (data.success) {
            if(data.role == 'admin'){
                window.location = '/admin/dashboard';
            }else if (data.role == 'basic') {
                window.location = '/office/scanner'
            }
        }else{
            document.querySelector('#error-message').innerHTML = data.message;
        }
    }).catch(error => console.log(error))
})



