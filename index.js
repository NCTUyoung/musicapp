const $ = require('jquery')
const mm = require('music-metadata')

let songData = {
    path:[],
    title:[]
};
let audioPlayer = $('audio').get(0);
let playing = false
let currentIndex = 0
function chooseMusic() {
    $('input').click()
}

function musicSelected() {
    let files = $('input').get(0).files
    // console.log(files)
    for(let i=0;i<files.length;i++){
        let{path} = files[i]
        console.log(path)
        mm.parseFile(path, {native: true})
            .then( metadata => {
                songData.path[i] = path
                songData.title[i] = metadata.common.title
                // console.log(metadata.common.title,metadata.common.artist,metadata.format.duration)
                let songRow =
                    `<tr ondblclick="playSong(${i})">
                        <td>${metadata.common.title}</td>
                        <td>${metadata.common.artist}</td>
                        <td>${secondsToTime(metadata.format.duration)}</td>
                    </tr>`

                $('#table-body').append(songRow)

            })
            .catch( err => {
                console.error(err.message);
            });
    }
}


function playSong(index) {
    audioPlayer.src = songData.path[index]
    audioPlayer.load()
    audioPlayer.play()
    $('h4').text(songData.title[index])
    playing = true
    currentIndex = index
    updatePlayButton()

}
function play() {
    if(playing){
        audioPlayer.pause()
        playing = false
    }else {
        audioPlayer.play()
        playing = true
    }
    updatePlayButton()
}
function playNext() {
    currentIndex++
    currentIndex %= songData.path.length
    console.log(currentIndex)
    playSong(currentIndex)
}
function playPrevious() {
    currentIndex--
    currentIndex = ((currentIndex%songData.path.length)+songData.path.length)%songData.path.length
    console.log(currentIndex)
    playSong(currentIndex)

}
function updatePlayButton() {
    let playIcon = $('#play-button span')
    if(playing){
        playIcon.removeClass('icon-play')
        playIcon.addClass('icon-pause')
    }else {
        playIcon.removeClass('icon-pause')
        playIcon.addClass('icon-play')
    }
}


function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" +
        padZero(parseInt((t) % 60));
}
function padZero(v) {
    return (v < 10) ? "0" + v : v;
}