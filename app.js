const container = document.querySelector('.container');
const titre = document.querySelector('.titre');
const avant = document.querySelector('.avant');
const pause = document.querySelector('.pause');
const apres = document.querySelector('.apres');
const audio = document.querySelector('audio');
const image = document.querySelector('.image_music');
const prog_font = document.querySelector('.prog');
const prog_avant = document.querySelector('.prog_avant');
const prog_rond = document.querySelector('.prog_rond');
const time = document.querySelector('.time');

var mouseDown;

const listSong = [
    {
        path: "ressources/SomeThingsDontChange.mp3",
        songName: "Some Things Dont Change",
        img: "ressources/img_1.jpg",
    },
    {
        path: "ressources/Lyvo-Home.mp3",
        songName: "Lyvo Home",
        img: "ressources/img_2.jpg",
    },
    {
        path: "ressources/KeysOfMoon-TheEpicHero.mp3",
        songName: "Keys Of Moon - The Epic Hero",
        img: "ressources/img_3.jpg",
    }
]

/*
*   Systeme AUDIO
*/

let song_Playing = false;

function playSong(){
    song_Playing = true;
    audio.play();
    pause.classList.add('active');
    pause.innerHTML = `<i class="fas fa-pause"></i>`;
}
function stopSong(){
    song_Playing = false;
    audio.pause();
    pause.classList.remove('active');
    pause.innerHTML = `<i class="fas fa-play"></i>`;
}

function verifSong(){
    if(song_Playing){
        stopSong();
    }else{
        playSong();
    }
}

function verifSongChange(){
    if(song_Playing){
        playSong();
    }else{
        stopSong();
    }
}

pause.addEventListener('click', verifSong)

function loadSong(listSong){
    titre.textContent = listSong.songName;
    audio.src = listSong.path;
    image.style.backgroundImage  = `url(${listSong.img})`;
    prog_rond.style.left = `0%`;
    prog_avant.style.width = `0%`;
}

let i = 0;

loadSong(listSong[i]);

audio.addEventListener("loadeddata", function() {
    var heures = Math.floor(audio.currentTime / 3600);
    temp = audio.currentTime - heures * 3600;
    var minutes = Math.floor(temp / 60);
    var seconds = Math.floor(temp - minutes * 60);

    var total_heures = Math.floor(audio.duration / 3600);
    temp = audio.duration - total_heures * 3600;
    var total_minutes = Math.floor(temp / 60);
    var total_seconds = Math.floor(temp - total_minutes * 60);

    time.textContent = `${heures}h ${minutes}m ${seconds}s / ${total_heures}h ${total_minutes}m ${total_seconds}s`;
});

function avantSong(){
    i--;
    if(i < 0){
        i = listSong.length - 1;
    }
    loadSong(listSong[i]);
    verifSongChange();
}

avant.addEventListener('click', avantSong);

function apresSong(){
    i++;
    if(i > listSong.length - 1){
        i = 0;
    }
    loadSong(listSong[i]);
    verifSongChange();
}

apres.addEventListener('click', apresSong);

/*
*   Progresse bar
*/

audio.addEventListener('timeupdate', () => {
    let distance = audio.currentTime * 100 / audio.duration;
    prog_rond.style.left = `${distance}%`;
    prog_avant.style.width = `${distance}%`;

    var heures = Math.floor(audio.currentTime / 3600);
    temp = audio.currentTime - heures * 3600;
    var minutes = Math.floor(temp / 60);
    var seconds = Math.floor(temp - minutes * 60);

    var total_heures = Math.floor(audio.duration / 3600);
    temp = audio.duration - total_heures * 3600;
    var total_minutes = Math.floor(temp / 60);
    var total_seconds = Math.floor(temp - total_minutes * 60);

    time.textContent = `${heures}h ${minutes}m ${seconds}s / ${total_heures}h ${total_minutes}m ${total_seconds}s`;

    if(audio.duration == audio.currentTime){
        apresSong()
    }
})

prog_font.addEventListener('click', (event) => {
    let distance = Math.floor(event.offsetX * 100/ prog_font.offsetWidth);
    prog_rond.style.left = `${distance}%`;
    prog_avant.style.width = `${distance}%`;

    audio.currentTime = distance * audio.duration / 100;
})

prog_rond.addEventListener('mousedown', (e)=>{
    mouseDown = true;
    prog_rond.style.cursor = 'grabbing';
})

// prog_rond.addEventListener('mousemove', event => {
//     if(mouseDown == true){
//         console.log(event.offsetX)
        // console.log(container.offsetLeft)
        // console.log(container.offsetWidth)

        // console.log(prog_font.offsetLeft)
        // console.log(prog_font.offsetWidth)

//         console.log(prog_font.offsetLeft + container.offsetLeft)

//         console.log(event.offsetX - prog_font.offsetLeft - container.offsetLeft)


//         let distance = event.offsetX * 100 / prog_font.offsetWidth;
//         prog_rond.style.left = `${distance}%`;
//         prog_avant.style.width = `${distance}%`;
//     }
// });

container.addEventListener('mouseup', e => {
    mouseDown = false;
    prog_rond.style.cursor = 'grab';
});