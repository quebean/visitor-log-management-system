// contant elements and data
const date = document.querySelector('#date');
const search = document.querySelector('#search');

window.addEventListener('load', () => {
    date.value = formatDateString(new Date());
    getData(date.value, 'timein');
});

document.querySelector('#search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    getData(search.value, 'fullname');
})

document.querySelector('#date').addEventListener('change', (event) => {
    event.preventDefault();
    getData(date.value, 'timein');
});

// fetch function
async function getData(string, category) {
    try {
        const result = await fetch('admin/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                string,
                category,
            })
        })
        const data = await result.json();
        loadData(data);
    } catch (error) {
        console.log(error);
    }
    
    modalBind();

}

// functions
function loadData(datas) {
    let dataHtml = '';
    datas.slice().reverse().forEach(data => {
        dataHtml += `<tr data-modal-target="#modal${data.visit_id}">`;
        dataHtml += `<td>${data.fullname}</td>`;
        dataHtml += `<td>${data.timein}</td>`;
        dataHtml += `<td>${(data.timeout)  ? data.timeout : '<span style="color: red;">No out</span>'}</td>`;
        dataHtml += `<td><a class="details-btn" href="admin/visit/${data.visit_id}">Details<a>${modal(data)}</td>`; 
        dataHtml += `</tr>`;
        
    });
    document.querySelector('tbody').innerHTML = dataHtml;
}

function formatDateString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(d < 10){
        d = '0' + d;
    }
    return [year, month, d].join('-');
}

function modalBind(){
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll ('[data-close-button]')
    const overlay = document.getElementById('overlay')
    openModalButtons.forEach(button => {
        button.addEventListener ('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    overlay.addEventListener ('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener ('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal (modal){
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal (modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
}

function modal(data) {
    return `
    <div class="modal" id="modal${data.visit_id}">
        <div class="modal-header">
            <div class="title">Visit Details</div>
        </div>
        <div class="modal-body">

            <div class="modal-wrapper">
            
                <div class="form">
                
                    <div>
                        <div class="input_field">
                            <label>Name</label>
                            <p class="deets">${data.fullname}</p>
                        </div>
                        <div class="input_field">
                            <label>Address</label>
                            <p class="deets">${data.address}</p>
                        </div>
                        <div class="input_field">
                            <label>Contact Number</label>
                            <p class="deets">${data.contact_number}</p> 
                        </div>
                        <div class="input_field">
                            <label>Purpose</label>
                            <p class="deets">${data.purpose}</p>  
                        </div>
                        <div class="input_field">
                            <label>Time In</label>
                            <p class="deets">${data.timein}</p>
                        </div>
                        <div class="input_field">
                            <label>Time Out</label>
                            <p class="deets">${data.timeout}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}