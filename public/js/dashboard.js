const pie = document.getElementById('pie-chart').getContext('2d');
const bar = document.getElementById('bar-graph').getContext('2d');
const count = document.querySelector('.count');
const topThree = document.querySelector('.top-three-box')

function renderChart(canvas, chartType, data, labels, title, scales, color) {
    var myChart = new Chart(canvas, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: color,
                borderColor: 'rgba(255, 255, 255, 0)'
            }]
        },
        options: {
            legend:{
                display: false
            },
            scales: scales
        }
    });
}

function renderTopThree(data) {
    topThree.innerHTML = "";
    data.topThreeCount.forEach((d, i) => {
        topThree.innerHTML += `<div><h1 class="number">${data.topThreeCount[i]}</h1><h2>${data.topThreeOffices[i]}</h2></div>`
    });
}

async function getData() {
    try {
        const result = await fetch('/admin/dashboard-chart',{
            method: 'GET',
            mode: 'cors'
        })
        const data = await result.json();
        if (data.success) {
            console.log(data);
            renderChart(pie, 'pie', data.pie.officesLogCount, data.pie.offices, '# of Visits', '', function () {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return `rgb(${r}, ${g}, ${b})`;
            });
            renderChart(bar, 'line', data.bar.sevenDaysCount.reverse(), data.bar.sevenDays.reverse(), '# of Visits', {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    }
                }]
            }, 'rgba(6, 98, 60, 0.7)');
            count.textContent = data.todayCount;
            renderTopThree(data.topThree);
        }
    } catch (error) {
        console.log(error);
    }
}

getData();