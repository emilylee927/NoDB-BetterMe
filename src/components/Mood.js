import React from 'react';
import { ReactDatez } from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import moment from "moment";
import "./Mood.css";




//emoji section
import Angry from "../emoji/angry.gif";
import Sad from "../emoji/sad.gif";
import Ok from "../emoji/ok.gif";
import Nice from "../emoji/nice.gif";
import Fun from "../emoji/fun.gif";
import Cool from "../emoji/cool.gif";




class Mood extends React.Component {
  constructor(){
    super();
    this.state={
      dateInput: moment().format('YYYY MM DD')
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ dateInput: value })
}

  render(){
    return(
      <>
      <div className='main'>
        <div className="greeting"> 
          <h1 className="how-are-you">How Are You Today? &nbsp;</h1>
          <ReactDatez className="react-datez" name="dateInput" handleChange={this.handleChange} value={this.state.dateInput} />
        </div>
      </div>
       
       <section className="moodIcon">
        <a href="#" onClick={this.props.changeMoodToDaily('angry', this.state.dateInput)}><img src={Angry}></img></a>
        <a href="#" onClick={this.props.changeMoodToDaily('sad', this.state.dateInput)}><img src={Sad}></img></a>
        <a href="#" onClick={this.props.changeMoodToDaily('ok', this.state.dateInput)}><img src={Ok}></img></a>
        <a href="#" onClick={this.props.changeMoodToDaily('nice', this.state.dateInput)}><img src={Nice}></img></a>
        <a href="#" onClick={this.props.changeMoodToDaily('fun', this.state.dateInput)}><img src={Fun}></img></a>
        <a href="#" onClick={this.props.changeMoodToDaily('cool', this.state.dateInput)}><img src={Cool}></img></a>
      </section> 
      </>
    )
  }
}

export default Mood;
