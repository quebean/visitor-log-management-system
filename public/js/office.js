const search = document.querySelector('#search');
const category = document.querySelector('#category');

window.addEventListener('load', () => {
    getData();
});

document.querySelector('#search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    getData();
})

async function getData() {
    try {
        const result = await fetch('/admin/offices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search: search.value,
                category: category.value
            })
        })

        const data = await result.json();
        if (data.success) {
            loadData(data.offices);
        }
    } catch (error) {
        
    }
}

function loadData(datas) {
    let dataHtml = ''
    datas.slice().reverse().forEach(data => {
        dataHtml += '<tr>';
        dataHtml += `<td>${data.office_name}</td>`;
        dataHtml += `<td>${data.incharge}</td>`;
        dataHtml += `<td>${data.username}</td>`;
        dataHtml += `<td><a class="details-btn" href="admin/office/edit/${data.office_id}">Edit<a></td>`; 
        dataHtml += '</tr>';
    });
    document.querySelector('tbody').innerHTML = dataHtml;
}
