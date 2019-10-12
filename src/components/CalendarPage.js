import React from 'react';
import { Calendar } from 'antd';
import './CalendarPage.css';
import axios from 'axios';
import moment from 'moment';

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

class CalendarPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journalPage: {}
    }
    this.dateCellRender = this.dateCellRender.bind(this)
  }

  dateCellRender(value) {
    let date = value.format('YYYYMMDD');
    // console.log(date);
    let page = this.state.journalPage[date];
    let mood = null;
    if(typeof page !== "undefined") {
      mood = page.mood;
    }
    // console.log(mood);
    return (
      <img className='emoji' mood={mood} id={date} onClick={this.linkToJournalPage} src={moodMap[mood]}></img>
    )
  }
  
  linkToJournalPage= e =>{
    let date = e.target.id;
    let mood = e.target.getAttribute("mood")
    console.log(e.target.getAttribute("mood"))
    console.log("linkToJournalPage")
    console.log(date)
    this.props.convertPageToDaily(date,mood)
   
  }

  componentDidMount() {
    axios
    .get('/api/betterme')
    .then(response => {
      let journalPage = response.data
      this.setState({
        journalPage
      })
    })
  }

  render() {
    return (
      <Calendar dateCellRender={this.dateCellRender} fullscreen={false}/>
    )
  }
}

export default CalendarPage;
