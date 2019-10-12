import React from 'react';
import { Calendar } from 'antd';
import './CalendarPage.css';


class CalendarPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: '09-10-2019'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <Calendar fullscreen={true} />
    )
  }
}

export default CalendarPage;