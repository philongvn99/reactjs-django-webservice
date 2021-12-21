import React, {useState, useMemo} from "React";

const Audio = () => {
    return (
        <div>
            <audio id="background-music" src="/resource/music/GloryGloryManUnited.mp3" controls loop><p>If you are reading this, it is because your browser does not support the audio element.</p></audio>
            <ul class="music-selector">
                <li><button class="music-option" id="ggmu-option">Glory Glory Manchester United</button></li>
                <li><button class="music-option" id="hnnu-option">Ha Noi And U</button></li>
                <li><button class="music-option" id="tn-option">The Nights</button></li>
            </ul>
        </div>
    )
}

export default Audio;