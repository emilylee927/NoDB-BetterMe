import React,{Component} from "react";
import "./Journal.css";
import axios from 'axios'; 
import Textarea from 'react-expanding-textarea';

class Journal extends Component {
    constructor(){
        super();
        this.state={
            journalInput:"",
          

        }
        this.handleChange = this.handleChange.bind(this);
       
    }




    handleChange = e =>{
        this.setState({journalInput:e.target.value});
        

        axios.post("/api/betterme/journal",{
            journalInput: e.target.value,
            date: this.props.date
        }).catch(error=>{

            console.log(error)
             
        })
    }

  
    

    componentDidMount(){
        console.log('journal did mount')
        axios.get("/api/betterme").then(response=>{
            console.log(response.data)
            this.setState({
                journalInput: response.data[this.props.date].thoughts
            })
        })
        .catch(error=>{
            console.log('error!')
            console.log(error)});
        }



    render(){
        return(
            <div className='journal-container'>
                <h1>Journal </h1>
                <Textarea className="journal-textarea" type="text" maxLength="4000" value={this.state.journalInput} onChange={this.handleChange}  placeholder="What's on your mind?"></Textarea>
                <p className='journalAdded'>
                </p> 
            </div>
           
        )
        
    }
}


export default Journal;