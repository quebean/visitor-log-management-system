var outputQR = new QRCode("outputQR", {
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

const cookie = getCookie(document.cookie, 'visitIdCookie');
document.querySelector('.visitId').textContent = cookie;
outputQR.clear();
outputQR.makeCode(cookie);

const visitorCokie = getCookie(document.cookie, 'visitorName');
document.querySelector('.visitorName').textContent = formatCookieString(visitorCokie);

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

function formatCookieString(string) {
    const fullname = string.split('%20');
    return fullname.join(' ');
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

