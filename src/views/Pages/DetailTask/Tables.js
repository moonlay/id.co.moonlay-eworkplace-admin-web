import React, { Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import DatePicker from 'reactstrap-date-picker';
import TimePicker from 'react-time-picker';
import './Tables.css';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlReport,urlTaskManagement,urlTimeSheet} from '../../../Constant';
// import momentDurationFormatSetup from "moment";
// import "../../../../node_modules/react-bootstrap-date-picker";
//const $ = require('jquery');
import SweetAlert from 'react-bootstrap-sweetalert';
const moment = require('moment');
require("moment-duration-format");
window.$duration="";
class Tables extends Component{
    constructor(props){
        super(props);
        this.state = {
            idTime : props.id,
            idTask : props.task,
            listTime : [],
            listTask: [],
            difficult:[
                {
                    name:"Low"
                },
                {
                    name:"Medium"
                },
                {
                    name:"High"
                }
            ],
            taskDif:{},
            startDate:new Date(),
            endDate:new Date(),
            startISO:"",
            endISO:"",
            isStartDate:false,
            isEndDate:false,
            isStartTime:false,
            isEndTime:false,
            isDifficult:false,
            startTime:"01:00",
            endTime:"01:00",
            duration:"",
            validate:true,
        }
        // this.handleForm = this.handleForm.bind(this);
        // console.log(this.props)
    }
    handleTimeSheet = ()=>{
        const value = localStorage.getItem('token');
        this.setState({
            token:value,
        })
        const Header = {
            accept: 'appication/json',
            Authorization: `Bearer `+value,
        };
        axios({
            method: 'get',
            url:urlTimeSheet+'/'+this.state.idTime,
            headers : Header,            
        }).then(data=>{
            // console.log(data.data);
            this.setState({
                listTime:data.data
            })
            // console.log(this.state.listTime);
        })
    }
    onConfirm = ()=>{
        this.setState({
            alert:null,
            validate:true,
        })
    }
    handleSelectDif = selecteddif => {
        // console.log(selecteddif);
        if(selecteddif.value != null){
            this.setState({selecteddif:selecteddif,taskDif:selecteddif.value,isDifficult:true})
        }
        // console.log(this.state.taskDif);
    }
    handleTask = ()=>{
        const value = localStorage.getItem('token');
        this.setState({
            token:value,
        })
        const Header = {
            accept: 'appication/json',
            Authorization: `Bearer `+value,
        };
        axios({
            method: 'get',
            url:urlTaskManagement+'/'+this.state.idTask,
            headers : Header,            
        }).then(data=>{
            // console.log(data.data);
            this.setState({
                listTask:data.data,
                "startDate":data.data.StartDate,
                "endDate":data.data.endDate,
                "taskDif":data.data.taskDif,
            })
            // console.log(this.state.listTask);
        })
    }
    onChangeStartTime = (e)=>{
        this.setState({
            startTime:e.target.value,
            isStartTime:true,
        })
        // console.log(e.target.value);
        // console.log(this.state.startTime);
        
    }
    onChangeEndTime = (e)=>{
        this.setState({
            endTime:e.target.value,
            isEndTime:true,
        })
       
    }
    handleForm = ()=>{
        const value = localStorage.getItem('token');
        this.setState({
            token:value,
        })
        const Header = {
            accept: 'appication/json',
            Authorization: `Bearer `+value,
        };
        this.setState({
            duration:window.$duration,
        })
        if(this.state.isDifficult){

        
        const Data={
            "TaskName":this.state.listTask.TaskName,
            "TaskStatus":this.state.listTask.TaskStatus,
            "TaskPriority":this.state.listTask.TaskPriority,
            "ManHour":this.state.listTask.ManHour,
            "TaskDescription":this.state.listTask.TaskDescription,
            "StartDate":this.state.startDate,
            "EndDate":this.state.endDate,
            "TaskDifficulty":this.state.taskDif,
            "EmployeeId":this.state.listTask.EmployeeId,
            "EmployeeName":this.state.listTask.EmployeeName,
            "ProjectId":this.state.listTask.ProjectId,
            // "ProjectId":
        }
        axios({
            method:'put',
            url:urlTaskManagement+'/'+this.state.idTask,
            headers:Header,
            data:Data,
        })
        const Data1 = {
            "StartTime":this.state.startTime,
            "EndTime":this.state.endTime,
            "Duration":window.$duration,
            "ProjectId":this.state.listTime.ProjectId,
            "TaskManagementId":this.state.listTask.Id,
        }

        // console.log(Data);
        
        // console.log(Data1);
        axios({
            method:'put',
            url:urlTimeSheet+'/'+this.state.idTime,
            headers:Header,
            data:Data1,
        }).then(data=>{
            this.setState({
                isUpdate:true,
            })
        }).catch((error)=>{
            console.log(error);
        })
    }else{
        this.setState({
            validate:false,
        })
    }
        
    }
    // handleStartDate = (e,v)=>{
    //     this.setState({
    //         startDate:e,
    //         date:v
    //     })
    // }
    // handleEndDate = (e,v)=>{
    //     this.setState({
    //         endDate:e,
    //         date:v
    //     })
    // }
    handleChange = (e) => {
        this.setState({
            startDate:e.target.value,
            isStartDate:true
        })
    }
    handleChangeEndDate = (e)=>{
        this.setState({
            endDate:e.target.value,
            isEndDate:true
        })
    }
    componentDidMount(){
        this.handleTimeSheet();
        this.handleTask();
        this.setState({
            show:true,
        })
        console.log(this.state.endDate);
    }
    render(){
        // var curr = moment(this.state.listTask.TaskName).format('mm/DD/YYYY');
        // var date = 
        // var curr = new Date();
        // curr.setDate(curr.getDate());
        // console.log(curr);
        // console.log()
        // var date = curr.toISOString().substr(0,10);
        var Startdate = moment.utc(this.state.listTask.StartDate).format('YYYY-MM-DD')
        var Enddate = moment.utc(this.state.listTask.EndDate).format('YYYY-MM-DD')
        // console.log(Startdate);
        // console.log(Enddate);
        // console.log();
        if(this.state.isUpdate){
            return (
            <div>
            <Redirect to="/TimeSheet/Report"/>
            </div>
            )
        }
        let options = this.state.difficult.map(function(dif){
            return{value:dif.name,label:dif.name};
        })
        let duration = moment(this.state.startTime+":00 01/01/1991");
        
        let duration2 = moment(this.state.endTime+":00 01/01/1991");
        let kurang = moment.utc(duration2.diff(duration)).format("HH:mm:ss");
        
        // console.log(duration3);
        // console.log(duration3.asHours());
        // console.log(moment.utc(duration3).format("HH:mm"));
        
        
        // console.log(duration3.asMinutes);
        const hours = kurang;
        window.$duration = hours;
        return(
            <div>
                {this.state.validate?
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md="9">
                                            <b>Add New Task</b>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="4">
                                                Task Name 
                                            </Col>
                                            <Col md="4">
                                                {this.state.listTask.TaskName}
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                            Employee Name 
                                            </Col>
                                            <Col md="4">
                                                {this.state.listTask.EmployeeName}
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                                Task Difficulty
                                            </Col>
                                            <Col md="2">
                                                <Select styles={{width:70}}
                                                name="form-field-name"
                                                value={this.state.selecteddif}
                                                onChange={this.handleSelectDif}
                                                options={options}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                                Start Date
                                            </Col>
                                            <Col md="4">
                                                <Input
                                                type="date"
                                                placeholder="DD-MM-YYYY"
                                                onChange={this.handleChange}
                                                value={moment.utc(this.state.startDate).format('YYYY-MM-DD')}
                                                >
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                                End Date
                                            </Col>
                                            <Col md="4">
                                                
                                            <Input type="date" onChange={this.handleChangeEndDate}
                                            value={moment.utc(this.state.endDate).format('YYYY-MM-DD')} />
                                                {/* <Input  type="date" value={this.state.endDate} onChange={(e,v)=>this.handleEndDate} /> */}
                                            {/* <DatePicker autoComplete="off"   dateFormat = "YYYY-MM-DD"  id="myDate" value={this.state.endDate} onChange={(e,v)=>this.handleEndDate(e,v)}/> */}
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                                Time
                                            </Col>
                                            <Col md="2">
                                            <Input type="time" value={this.state.startTime} onChange={(e)=>this.onChangeStartTime(e)}/>
                                            </Col>
                                            
                                            <Col md="3">
                                                Until
                                            </Col>
                                            <Col md="2">
                                            <Input type="time"  value={this.state.endTime} onChange={(e)=>this.onChangeEndTime(e)}/>
                                            </Col>
                                            
                                        </Row>
                                        <Row style={{marginTop:'15px'}}>
                                            <Col md="4">
                                                Duration
                                            </Col>
                                            <Col md="2">
                                                <Input type="text" value={hours} disabled/>
                                            </Col>
                                        </Row>
                                        <Button style={{marginTop:'40px',float:'right',width:100}} onClick={()=>this.handleForm()} className="btn btn-success">Submit</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>
                : <SweetAlert
                danger
                title="Failed Update Data"
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
                timeout={2000}
              >
                  Please Update all field
              </SweetAlert>}
            </div>
        )
    }
}

export default Tables;