var outputQR = new QRCode("outputQR", {
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

const cookie = getCookie(document.cookie, 'visitIdCookie');
document.querySelector('.visitId').textContent = cookie;
outputQR.clear();
outputQR.makeCode(cookie);

function getCookie(cookies, name) {
    const cookieArr = cookies.split('; ');
    let result = '';
    cookieArr.forEach(cookie => {
        if (cookie.includes(name)) {
            result = cookie.split('=')[1];
        }
    });
    return result;
}

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    html2canvas(document.querySelector('.wrapper')).then(function(canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg');
        a.download = 'qrcode.jpeg';
        a.click();
    });
})

