import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import DatePicker from 'reactstrap-date-picker';
import TimePicker from 'react-time-picker';
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
import {urlReport,urlProject,urlTimeSheet} from '../../../../Constant'

//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component{
    constructor(props){
        super(props);
        this.state = {
            listProject : [],
            resultsTask:[],
            ProjectSelect:{},
            listTask:[],
            listTimeSheet:[],
        }
    }
    handleProject = selectedProject=>{
        if(selectedProject.value !==null){
            this.setState({
                selectedProject:selectedProject,
                ProjectSelect:selectedProject.value,
            })
        }
        // console.log(selectedProject.value);
        const value = localStorage.getItem('token');
        this.setState({
          token: value,
        });
        const Header = {
          accept: 'application/json',
          Authorization : `Bearer ` + value,
          // 'Content-Type' : 'application/json-patch+json'
        };
        axios({
            method:'get',
            url:urlTimeSheet+'/Project/'+selectedProject.value,
            headers:Header
        }).then(data=>{
            console.log(data.data);
            this.setState({
                listTimeSheet:data.data,
            })
        })
    }
    handleGetProject(){
        const value = localStorage.getItem('token');
        this.setState({
        token: value,
        });
        const Header = {
        accept: 'application/json',
        Authorization : `Bearer ` + value,
        // 'Content-Type' : 'application/json-patch+json'
        };
        axios({
            method:'get',
            headers:Header,
            url:urlProject+'?page=1&size=25',
        }).then(data=>{
            // console.log(data.data);
            this.setState({
                listProject:data.data,
            })
        })
    }
    componentDidMount(){
        this.handleGetProject();
    }
    render(){
        let options = this.state.listProject.map(function(project){
            return {value:project.Id,label:project.projectName}
        })
        const {listTimeSheet} = this.state;
        const renderTimeSheet = listTimeSheet.map((time)=>{
            return(
                <tr key={time.TimeSheetId} data-category={time.TimeSheetId}>
                    <td>{time.Task_name}</td>
                    <td>{time.EmployeeName}</td>
                    <td><Link style={{textDecoration:'none'}} to={"/Addnew/AddnewTask/"+time.TimeSheetId+"/"+time.Task_id} ><Button className="btn btn-info">View Detail</Button></Link></td>
                </tr>
            )
        })
        return(
            <div>
                <div className = "animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md="12">
                                            <b>Add New Task</b>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="4">
                                            <b>Project Name :</b> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Select styles={{width:70}}
                                            name="form-field-name"
                                            value={this.state.selectedProject}
                                            onChange={this.handleProject}
                                            options={options}
                                            ></Select>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Table id="myTable" responsive striped>
                                        <thead>
                                            <tr>
                                                <th>Task Name</th>
                                                <th>Employee Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderTimeSheet}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Tables;