const username = document.querySelector('#username');
const password = document.querySelector('#password');

document.querySelector('#submit').addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const result = await fetch('admin/user/update', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            }),
            mode: 'cors'
        })
        const data = await result.json();
        if(data.success){
            if (data.role == 'admin') {
                window.location = '/admin/dashboard';
            }else{
                window.location = '/admin/office';
            }
        }else{
            document.querySelector('#error-message').textContent = data.message;
        }
    } catch (error) {
        console.log(error);
    }
})