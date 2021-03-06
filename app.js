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

/***************************** Systeme AUDIO *****************************/

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


/***************************** Progresse bar *****************************/


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
        if(random_value){
            i = getRandomInt(0, listSong.length);
        }
        apresSong()
    }
})

prog_font.addEventListener('click', (event) => {
    let distance = event.clientX - (container.offsetLeft + prog_font.offsetLeft);
    distance = distance * 100 / prog_font.offsetWidth
    
    prog_rond.style.left = `${distance}%`;
    prog_avant.style.width = `${distance}%`;

    audio.currentTime = distance * audio.duration / 100;
})

prog_rond.addEventListener('mousedown', (e)=>{
    mouseDown = true;
    prog_rond.style.cursor = 'grabbing';
})

container.addEventListener('mousemove', event => {
    if(mouseDown == true){
        let distance = event.clientX - (container.offsetLeft + prog_font.offsetLeft);
        distance = distance * 100 / prog_font.offsetWidth;

        if(distance < 0){
            distance = 0;
        }else if(distance > 99){
            distance = 99;
        }

        prog_rond.style.left = `${distance}%`;
        prog_avant.style.width = `${distance}%`;

        audio.currentTime = distance * audio.duration / 100;
    }
});

document.querySelector('body').addEventListener('mouseup', e => {
    mouseDown = false;
    prog_rond.style.cursor = 'grab';
});

const random = document.querySelector('.random');
const volume = document.querySelector('.volume');
const restart = document.querySelector('.restart');
const change_volume = document.querySelector('.change_volume');
const change_volume_bar = document.querySelector('.change_volume_bar');
const change_volume_bar_avant = document.querySelector('.change_volume_bar_avant');
const change_volume_bar_rond = document.querySelector('.change_volume_bar_rond');
const volume_actif = document.querySelector('.volume_actif');

var mouseDown_volume = false;

var random_value = false;

random.addEventListener('click', () => {
    random.classList.toggle('actif');
    if(random_value){
        random_value = false;
    }else{
        random_value = true;
    }
})

restart.addEventListener('click', () => {
    audio.currentTime = 0;
})

volume_actif.addEventListener('click', () =>{
    if(change_volume.style.opacity == 0){
        change_volume.style.opacity = 1;
    }else{
        change_volume.style.opacity = 0;
    }
    updateSoundIcon();
})

change_volume_bar.addEventListener('click', (event) => {
    let distance = event.clientY - (container.offsetTop + change_volume_bar.offsetTop + change_volume.offsetTop + volume.offsetTop);
    distance = distance * 100 / change_volume_bar.offsetHeight;
    
    change_volume_bar_rond.style.top = `${distance}%`;
    change_volume_bar_avant.style.height = `${100 - distance}%`;
    change_volume_bar_avant.style.top = `${distance}%`;

    audio.volume = (100 - distance) / 100;
    updateSoundIcon();
})

change_volume_bar_rond.addEventListener('mousedown', (e)=>{
    mouseDown_volume = true;
    change_volume_bar_rond.style.cursor = 'grabbing';
})

container.addEventListener('mousemove', event => {
    if(mouseDown_volume == true){
        let distance = event.clientY - (container.offsetTop + change_volume_bar.offsetTop + change_volume.offsetTop + volume.offsetTop);
        distance = distance * 100 / change_volume_bar.offsetHeight;

        if(distance < 0){
            distance = 0;
        }else if(distance > 100){
            distance = 100;
        }

        change_volume_bar_rond.style.top = `${distance}%`;
        change_volume_bar_avant.style.height = `${100 - distance}%`;
        change_volume_bar_avant.style.top = `${distance}%`;
    
        audio.volume = (100 - distance) / 100;
        updateSoundIcon();
    }
});

document.querySelector('body').addEventListener('mouseup', e => {
    mouseDown_volume = false;
    change_volume_bar_rond.style.cursor = 'grab';
});


function updateSoundIcon(){
    if(parseInt(change_volume_bar_rond.offsetTop) > 0){
        volume_actif.className = `fas fa-volume-up volume_actif`;
    }
    if(parseInt(change_volume_bar_rond.offsetTop) > 50){
        volume_actif.className = `fas fa-volume-down volume_actif`;
    }
    if(parseInt(change_volume_bar_rond.offsetTop) >= 100){
        volume_actif.className = `fas fa-volume-mute volume_actif`;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}