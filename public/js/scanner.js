// Scanner instance
let scanner = new Instascan.Scanner({ 
    video: document.getElementById('preview'), 
    scanPeriod: 100, 
    mirror: true 
});

const snd = new Audio('assets/sound.mp3')
// Scanner listener then action
scanner.addListener('scan', async (content) => {
    snd.currentTime=.6;
    snd.play();
    const id = content;
    fetch('admin/scanner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(data => data.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
});

// Camera options and Start
Instascan.Camera.getCameras().then((cameras) => {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);

    }else{
        console.error('No cameras found.');
        alert('No cameras found.');
    }
}).catch(function(e){
    console.error(e);
    alert(e);
});

