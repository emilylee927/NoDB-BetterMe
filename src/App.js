import React from 'react';
import axios from "axios"
import "./App.css";


//Components
import Mood from "./components/Mood.js";
import Calendar from "./components/Calendar.js";
import Daily from "./components/daily-page/Daily.js";
//logo
import Logo from "./BetterMe logo Text.png";
import Calendaricon from "./calendar.png";



class App extends React.Component {
  constructor(){
    super();
    this.state={
      currentPage:"mood",
      date: "",
      mood: ""

    }
    this.changeMoodToDaily = this.changeMoodToDaily.bind(this);
    this.changeMoodToCalendar = this.changeMoodToCalendar.bind(this);
    this.homeButton=this.homeButton.bind(this);
  }

changeMoodToDaily(mood,date){
  return function() {
    axios.post("/api/betterme",{
      mood,
      date
    }).then(response => {
      let mood = response.data[date].mood
      this.setState({currentPage:"daily", date, mood})
    })
  }.bind(this)
}

changeMoodToCalendar(){
  this.setState({currentPage:"calendar"})
}

homeButton(){
  this.setState({
    currentPage:"mood"
  })
}

  render(){
    return(
      <div className={
      this.state.currentPage === "mood" ? "app-outer-div background-plain" :
      this.state.currentPage === "daily" ? "app-outer-div background-plain2" :
      this.state.currentPage === "calendar" ? "app-outer-div background-plain3" :
      "app-outer-div"}>
        <header className="logo">
        <a href="#" onClick={this.homeButton}><img className="homeButton" src={Logo}></img></a>
        {this.state.currentPage !== "calendar"
        ?
        <a  href="#" onClick={this.changeMoodToCalendar}><img className="calendaricon" src={Calendaricon}></img></a>
        : null}
        </header>
        
       <nav className="pages">
      {this.state.currentPage === "mood"
      ?
      <Mood changeMoodToDaily={this.changeMoodToDaily} changeMoodToCalendar={this.changeMoodToCalendar}/>
      : this.state.currentPage === "calendar"
      ?
      <Calendar/> 
      : this.state.currentPage === "daily"
      ?
      <Daily date={this.state.date} mood={this.state.mood}/>

      : null}
      </nav>
      </div>
    )
  }
}

export default App;
