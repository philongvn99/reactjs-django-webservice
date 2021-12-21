import React, {useState, useMemo} from "react";

const AudioMemo = () => {
    return (
        <div class="dropdown-menu music-menu" aria-labelledby="dropdownMenuButton">  
            <audio id="background-music" src="/resource/music/GloryGloryManUnited.mp3" controls loop><p>If you are reading this, it is because your browser does not support the audio element.</p></audio>
            <ul class="music-selector">
                <li><button class="music-option" id="ggmu-option" onClick={selectMusic("/resource/music/GloryGloryManUnited.mp3")}>Glory Glory Manchester United</button></li>
                <li><button class="music-option" id="hnnu-option" onCLick={selectMusic("/resource/music/HaNoiNU.mp3")}>Ha Noi And U</button></li>
                <li><button class="music-option" id="tn-option" onClick={selectMusic("/resource/music/TheNights.mp3")}>The Nights</button></li>
            </ul>
        </div>
    )
}

const selectMusic = (option) => {
    document.getElementById(background-music).src=option;
}

const Audio = () => {
    return <AudioMemo></AudioMemo>;
}

export default Audio;