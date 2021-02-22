

window.addEventListener('load', () => {
    getData();
});


async function getData() {
    try {
        const result = await fetch('/admin/offices', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })

        const data = await result.json();
        console.log(data);
        if (data.success) {
            loadData(data.offices);
        }
    } catch (error) {
        
    }
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

function loadData(datas) {
    let dataHtml = ''
    datas.slice().reverse().forEach(data => {
        dataHtml += '<tr>';
        dataHtml += `<td>${data.office_name}</td>`;
        dataHtml += `<td>${data.incharge}</td>`;
        dataHtml += `<td><a class="details-btn" href="/office/${data.office_id}">Edit</a></td>`;
        dataHtml += '</tr>';
    });
    document.querySelector('tbody').innerHTML = dataHtml;
}