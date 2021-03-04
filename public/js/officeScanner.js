// Scanner instance
let scanner = new Instascan.Scanner({ 
    video: document.getElementById('preview'), 
    scanPeriod: 100, 
    mirror: true 
});

const snd = new Audio('assets/sound.mp3')
// Scanner listener then action
scanner.addListener('scan', async (content) => {
    try {
        const result = await fetch('/office/officelog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: content
            })
        })
        const data = await result.json();
        console.log(data);
        if(data.success){
            snd.currentTime=.6;
            snd.play();
        }

    } catch (error) {
        
    }
});

// Camera options and Start
Instascan.Camera.getCameras().then(function (cameras){
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