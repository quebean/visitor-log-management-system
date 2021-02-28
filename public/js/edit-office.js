const officeName = document.querySelector('#officeName');
const incharge = document.querySelector('#incharge');
const username = document.querySelector('#username');
const submit = document.querySelector('#submit');

submit.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const result = await fetch(`/admin/office/edit/${submit.dataset.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                officeName: officeName.value,
                incharge: incharge.value,
                username: username.value
            }),
            mode: 'cors'
        })
        const data = await result.json();
        if(data.success){
            window.location = '/admin/office';
        }else{
            document.querySelector('#error-message').textContent = data.message;
        }
    } catch (error) {
        console.log(error);
    }
})