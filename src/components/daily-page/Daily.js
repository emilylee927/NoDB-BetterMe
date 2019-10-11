import React from 'react';
import ToDo from "./ToDo.js";
import Journal from './Journal.js';
import "./Daily.css";
import moment from 'moment';

//emoji section
import Angry from "../../emoji/angry.gif";
import Sad from "../../emoji/sad.gif";
import Ok from "../../emoji/ok.gif";
import Nice from "../../emoji/nice.gif";
import Fun from "../../emoji/fun.gif";
import Cool from "../../emoji/cool.gif";

let moodMap = {
    angry: Angry,
    sad: Sad,
    ok: Ok,
    nice: Nice,
    fun: Fun,
    cool: Cool
}

class Daily extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div className="daily-parent">
            <div className="date-mood-parent">
                <h2 className="date">{moment(this.props.date, 'YYYY MM DD').format('MMM DD')}</h2>
                <img src={moodMap[this.props.mood]}></img>
            </div>
            <div className="todo-journal-parent">
                <div className="parentsofInput">
                    <h1>ToDo</h1>
                    <ToDo date={this.props.date} />
                </div>
                <Journal/>
            </div>
            </div>
        )
    }
}

export default Daily;