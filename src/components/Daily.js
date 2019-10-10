import React from 'react';
import ToDo from "./ToDo.js";
import Journal from './Journal.js';
import "./Daily.css";

class Daily extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <>
            <div className="parentsofInput">
                <h1>ToDo</h1>
                <ToDo date={this.props.date} />
                
            </div>
            <Journal/>
            </>
        )
    }
}

export default Daily;