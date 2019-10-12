import React from 'react';
//emoji section
import Angry from "../emoji/angry.gif";
import Sad from "../emoji/sad.gif";
import Ok from "../emoji/ok.gif";
import Nice from "../emoji/nice.gif";
import Fun from "../emoji/fun.gif";
import Cool from "../emoji/cool.gif";

let moodMap = {
    angry: Angry,
    sad: Sad,
    ok: Ok,
    nice: Nice,
    fun: Fun,
    cool: Cool
}

function Emoji(props) {
    return (
        <a href="#" onClick={props.changeMoodToDaily(props.mood, props.dateInput)}><img src={moodMap[props.mood]}></img></a>
    )
}

export default Emoji;
