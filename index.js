(() => {

    /*
     * Functions
     */

    const player = document.getElementById("movie_player");

    const formatTime = s => {
        const hours = Math.floor(s / (3600)).toString()
        const minutes = Math.floor(s % 3600 / 60).toString().padStart(2, '0')
        const seconds = (s % 60).toFixed(3)
        return `${hours}:${minutes}:${seconds}`
    }

    const setSub = (subs, i) => {
        let sub = subs[i]
        if (sub.start === undefined) {
            display.style.color = 'gray'
        } else {
            display.style.color = 'black'
        }
        display.innerText = sub.caption
        return sub
    }

    const parseSBV = file => file.text().then(content => {
        const subs = []
        content.split('\n\n').forEach(sub => {
            const s = {}
            let firstBreak = sub.indexOf('\n')
            s.caption = sub.substring(firstBreak + 1)
            subs.push(s)
        })
        return subs
    })

    const writeSBV = subs => {
        let sbv = ''
        subs.forEach(sub => {
            console.log(sub.start)
            if (sbv) sbv += '\n\n'
            sbv += sub.start + ',' + sub.end + '\n' + sub.caption
        })
        return sbv
    }

    const prepareDownload = content => {
        let download = document.createElement('a')
        download.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
        download.setAttribute('download', 'captions.sbv')
        download.innerText = 'Download captions'
        display.style.color = 'black'
        display.innerText = ''
        display.appendChild(download)
    }

    const run = () => {
        const file = fileUpload.files[0]
        if (file) parseSBV(file)
            .then(subArray => {
                const subs = subArray
                display.removeChild(form)
                let current = 0
                let sub = setSub(subs, current)
                player.pauseVideo()
                player.seekTo(0, true)
                player.playVideo()
                window.addEventListener('keydown', e => {
                    if (e.keyCode === 68 || e.keyCode === 65) {
                        let now = player.getCurrentTime()
                        now = formatTime(now)
                        if (!sub.start) {
                            sub.start = now
                        } else {
                            sub.end = now
                            current++
                            if (e.keyCode === 68) {
                                subs[current].start = now
                            }
                        }
                        console.log(sub)
                        if (current > subs.length) {
                            let sbv = writeSBV(subs)
                            console.log(sbv)
                            return prepareDownload(sbv)
                        }
                        sub = setSub(subs, current)
                    }
                })
            })
    }

    /*
     * UI
     */

    const display = document.createElement('div')
    Object.assign(display.style, {
        position: 'fixed',
        top: 'calc(50% - 50px)',
        left: '25vw',
        // transform: 'translate(-50%, -50%)',
        width: '50vw',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px 30px',
        fontSize: '16px',
        zIndex: '999'
    })

    const form = document.createElement('form')
    form.id = 'sbv-submit'
    form.innerText = 'Paste .sbv contents here:'

    const fileUpload = document.createElement('input')
    fileUpload.type = 'file'
    Object.assign(fileUpload.style, {
        margin: '20px 0'
    })

    const submitButton = document.createElement('button')
    submitButton.innerText = 'Submit'
    submitButton.onclick = e => {
        e.preventDefault()
        run()
    }

    form.appendChild(fileUpload)
    form.appendChild(submitButton)
    display.appendChild(form)

    document.body.appendChild(display)

})()
