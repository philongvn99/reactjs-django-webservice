import React, {useState, useMemo} from "react";

const Audio = (props) => {

    const [musicSrc, setMusicSrc] = useState(props.src)

    const AudioMemo = useMemo(() => {
        return (
            <div className="dropdown-menu music-menu" aria-labelledby="dropdownMenuButton">  
                <audio id="background-music" src={musicSrc} autoPlay controls loop><p>If you are reading this, it is because your browser does not support the audio element.</p></audio>
                <ul className="music-selector">
                    <li><button className="music-option" id="ggmu-option" onClick={() => {setMusicSrc("/resource/music/GloryGloryManUnited.mp3")}}>Glory Glory Manchester United</button></li>
                    <li><button className="music-option" id="hnnu-option" onClick={() => {setMusicSrc("/resource/music/HaNoiNU.mp3")}}>Ha Noi And U</button></li>
                    <li><button className="music-option" id="tn-option" onClick={() => {setMusicSrc("/resource/music/TheNights.mp3")}}>The Nights</button></li>
                </ul>
            </div>
        )
    }, [props.src]);


    return AudioMemo;
}

export default Audio;