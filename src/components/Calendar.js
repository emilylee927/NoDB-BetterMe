import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';


class Calendar extends React.Component {
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
    return <ModernDatepicker 
          date={this.state.startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}

export default Calendar;