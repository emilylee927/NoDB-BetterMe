import React from 'react';
import { ReactDatez } from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import moment from "moment";
import "./Mood.css";
import Emoji from './Emoji';

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
          <ReactDatez className="react-datez" name="dateInput" allowPast={true} handleChange={this.handleChange} value={this.state.dateInput} />
        </div>
      </div>
       
       <section className="moodIcon">
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'angry'} dateInput={this.state.dateInput} />
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'sad'} dateInput={this.state.dateInput} />
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'ok'} dateInput={this.state.dateInput} />
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'nice'} dateInput={this.state.dateInput} />
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'fun'} dateInput={this.state.dateInput} />
         <Emoji changeMoodToDaily={this.props.changeMoodToDaily} mood={'cool'} dateInput={this.state.dateInput} />
      </section> 
      </>
    )
  }
}

export default Mood;
