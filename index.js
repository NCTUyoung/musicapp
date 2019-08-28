const $ = require('jquery')
const mm = require('music-metadata')
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
                console.log(metadata.common.title,metadata.common.artist,metadata.format.duration)
                let songRow =
                    `<tr>
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


function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" +
        padZero(parseInt((t) % 60));
}
function padZero(v) {
    return (v < 10) ? "0" + v : v;
}