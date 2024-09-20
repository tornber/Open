const socket = io('/') 

const videoGrid = document.getElementById('video--grid') 
const myVideo = document.createElement('video') 
myVideo.muted = true
let myVideoStream

var peer = new Peer(undefined,{
    path: '/peerjs',
    host: '/',
    port: '3030'
})

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream
    addVideoStream(myVideo,myVideoStream)

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream',userVideoStream => {
            addVideoStream(video,userVideoStream)   
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId,stream)
    })

    
    let text = $('input')

    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length !== 0) {
            socket.emit('message',text.val())
            text.val('')
        }
    })

    socket.on('createMessage', message => {
        $('ul').append(`<li class="message"><b>user</b><br/>${message}</li>`)
        scrollToBotom()
    })
    
}).catch(error => {
    console.log(error)
})

peer.on('open',id => {
    socket.emit('join-room',RoomId,id)
})
const connectToNewUser = (userId,stream) => {
    const call = peer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream => {
        addVideoStream(video,userVideoStream)
    })

}

const addVideoStream = (video,stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

const scrollToBotom = () => {
    var d =$('.main--chat--window')
    d.scrollTop(d.prop('scrollHeight'))
}

function muteUnmute() {
    const enabled = myVideoStream.getAudioTracks()[0].enabled
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false
        setUnmuteButton()
    } else {
        myVideoStream.getAudioTracks()[0].enabled = true 
        setMuteButton()
    }
}


function setMuteButton() {
    const html = `<i class="fas fa-microphone"></i><span>Mute</span>`
    document.querySelector('.mute--button').innerHTML = html
}

function setUnmuteButton() {
        const html = `<i class="unmute fas fa-microphone-slash"></i><span>Unmute</span>`
        document.querySelector('.mute--button').innerHTML = html
}

function playStop() {
    const enabled = myVideoStream.getVideoTracks()[0].enabled
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false
        setPlayVideo()
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true 
        setStopVideo()
    }
}

function setStopVideo() {
    const html = `<i class="fas fa-video"></i><span>Stop Videoe</span>`
    document.querySelector(".video--button").innerHTML = html
}

function setPlayVideo() {
    const html = `<i class="fas fa-video-slash"></i><span>Play Videoe</span>`
    document.querySelector(".video--button").innerHTML = html
}