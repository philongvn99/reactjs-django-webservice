import React, {useState, useMemo} from "react";



const Audio = () => {

    const [musicSrc, setMusicSrc] = useState("/resource/music/GloryGloryManUnited.mp3")

    const AudioMemo = useMemo(() => {
        return 
    }, [musicSrc]);

    const AudioComp = (src) => {
        return (
            <div class="dropdown-menu music-menu" aria-labelledby="dropdownMenuButton">  
                <audio id="background-music" src={src} controls loop><p>If you are reading this, it is because your browser does not support the audio element.</p></audio>
                <ul class="music-selector">
                    <li><button class="music-option" id="ggmu-option" onClick={setMusicSrc("/resource/music/GloryGloryManUnited.mp3")}>Glory Glory Manchester United</button></li>
                    <li><button class="music-option" id="hnnu-option" onCLick={setMusicSrc("/resource/music/HaNoiNU.mp3")}>Ha Noi And U</button></li>
                    <li><button class="music-option" id="tn-option" onClick={setMusicSrc("/resource/music/TheNights.mp3")}>The Nights</button></li>
                </ul>
            </div>
        )
    }


    return AudioComp(musicSrc);
}

export default Audio;