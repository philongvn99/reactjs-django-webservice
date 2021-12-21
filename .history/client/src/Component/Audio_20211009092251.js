import React, {useState, useMemo} from "react";

const Audio = () => {

    const [musicSrc, setMusicSrc] = useState("/resource/music/GloryGloryManUnited.mp3")

    const AudioMemo = useMemo(() => {
        return (
            <div class="dropdown-menu music-menu" aria-labelledby="dropdownMenuButton">  
                <audio id="background-music" src={musicSrc} controls loop><p>If you are reading this, it is because your browser does not support the audio element.</p></audio>
                <ul class="music-selector">
                    <li><button className="music-option" id="ggmu-option" onClick={() => {console.log(1); setMusicSrc("/resource/music/GloryGloryManUnited.mp3")}}>Glory Glory Manchester United</button></li>
                    <li><button className="music-option" id="hnnu-option" onClick={() => {console.log(2); setMusicSrc("/resource/music/HaNoiNU.mp3")}}>Ha Noi And U</button></li>
                    <li><button className="music-option" id="tn-option" onClick={() => {console.log(3); setMusicSrc("/resource/music/TheNights.mp3")}}>The Nights</button></li>
                </ul>
            </div>
        )
    }, [musicSrc]);


    return AudioMemo;
}

export default Audio;