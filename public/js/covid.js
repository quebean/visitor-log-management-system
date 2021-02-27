const date = document.querySelector('#date');
const search = document.querySelector('#search');


window.addEventListener('load', () => {
    date.value = formatDateString(new Date());
    getData(date.value, 'timein');
})

document.querySelector('#search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    getData(search.value, 'fullname');
})

document.querySelector('#date').addEventListener('change', (event) => {
    event.preventDefault();
    getData(date.value, 'timein');
});

async function getData(string, category) {
    try {
        const result = await fetch('admin/covid', {
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
        console.log(data);
        loadData(data);
        
    } catch (error) {
        console.log(error);
    }
}

function loadData(datas) {
    let dataHtml = '';
    datas.slice().reverse().forEach(data => {
        dataHtml += '<tr>';
        dataHtml += `<td>${data.fullname}</td>`;
        dataHtml += `<td>${data.temperature}</td>`;
        dataHtml += `<td>${data.timein}</td>`;
        dataHtml += `<td><a class="details-btn" href="admin/covid/${data.visit_id}">Details<a></td>`; 
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
        d = 0 + d;
    }
    return [year, month, d].join('-');
}