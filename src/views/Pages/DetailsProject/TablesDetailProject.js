import React, { Component} from 'react';
import {Link} from 'react-router-dom'
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
  DropdownItem,
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlProject,urlActiviyCategory,urlActivity} from '../../../Constant'
import './Tables.css';
// import "./Tables.css";
//const $ = require('jquery');
const moment = require('moment');

class TablesDetailProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            idProject : props.id,
            project:[],
            loading:false,
            show:false,
            updateshow:false,
            listCat:[],
            selectedCategory:[],
            ActiviyName:[
                {
                "value":"POC",
                "label":"POC"
                },
                {
                "value":"Requirement",
                "label":"Requirement"
                },
                {
                "value":"Design",
                "label":"Design"
                },
                {
                "value":"Development",
                "label":"Development"
                },
                {
                "value":"Testing",
                "label":"Testing"
                },
                {
                "value":"Deployment",
                "label":"Deployment"
                },
                    
            ],
            selectedact:[],
            activity:[],

        }
    }
    componentDidMount= (id)=>{
        this.handleGetCategory();
        this.handleGetActivity();
        id = this.props.id;
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        axios({
            method:'get',
            url: urlProject+'/'+id,
            headers:Headers,
        }).then(data=>{
            // console.log(data.data);
            this.setState({
                project:data.data,
                loading:true
            })
            console.log(this.state.project);
        })
    }
    handleGetActivity = ()=>{
        const value = localStorage.getItem('token');
        const Header = {
            accept: 'appication/json',
            Authorization: `Bearer `+value,
        };
        axios({
            method:'get',
            headers:Header,
            url:urlActivity+'??page=1&size=25',
        }).then(data=>{
            this.setState({
                activity:data.data
            })
            console.log(data);
        })
    }
    handleGetCategory = () =>{
        const value = localStorage.getItem('token');
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+ value,
        };
        axios({
            method:'get',
            url: urlActiviyCategory+'?page=1&size=25',
            headers:Headers,
        }).then(data => {
            // console.log(data.data);
            this.setState({
                listCat : data.data,
            })
            console.log(this.state.listCat);
        })
    }
    handleCat = selectedCat =>{
        if(selectedCat.value !== null){
            this.setState({
                selectedCat:selectedCat,
                selectedCategory:selectedCat.value,
            })
            console.log(selectedCat.value);
        }
    }
    handleActivity = selectedActivity =>{
        if(selectedActivity.value !== null){
            this.setState({
                selectedActivity:selectedActivity,
                selectedact:selectedActivity.value,
            })
        }
    }
    handleDescription = (event)=>{
        this.setState({
            description : event.target.value,
        })
    }
    openForm=()=>{
        this.setState({
            show:true,
        })
    }
    update = (id) => {
        this.setState({
            idActivity:id,
            updateshow:true,
        })
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        axios({
            method:'get',
            url:urlActivity+'/'+id,
            headers:Headers,
        }).then(data =>{
            console.log(data.data);
        })
    }
    delete = (id) => { 
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        axios({
            method:'delete',
            url:urlActivity+'/'+id,
            headers:Headers,
        }).then(data=>{
            alert('Activity Berhasil Dihapus');
            window.location.reload();
        })
    }
    handlesubmitform= ()=>{
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        const Data = {
            "Activityname" : this.state.selectedActivity.value,
            "Description" : this.state.description,
            "CategoryId" : this.state.selectedCat.value,
        }
        axios({
            method:'post',
            url:urlActivity,
            headers:Headers,
            data:Data
        });
        window.location.reload();
    }
    handleClose = () =>{
        this.setState({
            show:false,
            updateshow:false,
        })
    }
    render(){
        let options = this.state.listCat.map(function(category){
            return{value : category.Id,label:category.Category}
        })
        let optionsAct = this.state.ActiviyName.map(function(activity){
            return{value:activity.value,label:activity.label}
        })
        const {activity} = this.state;
        const renderresults = activity.map((act)=>{
            var status;
            if(act.CategoryId == 10){
                status = "Sales"
            }else if(act.CategoryId == 11){
                status = "Pre Sales"
            }else if(act.CategoryId == 12){
                status = "Project"
            }
            return(
                <tr key={act.Id} data-category={act.Id} style={{width:200}}>
                    <td>{act.Id}</td>
                    <td>{act.Activityname}</td>
                    <td>{status}</td>
                    <td>{act.Description}</td>
                    <td>
                    <UncontrolledButtonDropdown direction="right">
                        <DropdownToggle>
                            <i className="fa fa-wrench"></i> Tools
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick = {()=>this.update(act.Id)}><i className="fa fa-pencil-square-o"></i>Edit</DropdownItem>
                            <DropdownItem onClick = {()=>this.delete(act.Id)}><i className="fa fa-trash"></i>Hapus</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </td>
                </tr>
            )
        })
        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        Activity Name
                        <Select 
                            className="form-field-name"
                            value={this.state.selectedActivity}
                            onChange={this.handleActivity}
                            options={optionsAct}
                        />
                            Activiy Category
                            <Select style={{width:70}}
                            name = "form-field-name"
                            value = {this.state.selectedCat}
                            onChange = {this.handleCat}
                            options = {options}
                            />
                            Description
                            <InputGroup>
                            <Input type="textarea" onChange={this.handleDescription}/>
                            </InputGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
                        </Button>
						<Button className="btn btn-info" onClick={this.handlesubmitform}>
							Save Changes
                        </Button>
					</Modal.Footer>
                </Modal> <Modal show={this.state.updateshow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        Activity Name
                        <Select 
                            className="form-field-name"
                            value={this.state.selectedActivity}
                            onChange={this.handleActivity}
                            options={optionsAct}
                        />
                            Activiy Category
                            <Select style={{width:70}}
                            name = "form-field-name"
                            value = {this.state.selectedCat}
                            onChange = {this.handleCat}
                            options = {options}
                            />
                            Description
                            <InputGroup>
                            <Input type="textarea" onChange={this.handleDescription}/>
                            </InputGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
                        </Button>
						<Button className="btn btn-info" onClick={this.handlesubmitform}>
							Save Changes
                        </Button>
					</Modal.Footer>
                </Modal>
                <div className="animated fadeIn">
                    {this.state.loading &&(
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col md="9">
                                                <b>Project List</b>
                                            </Col>
                                            <Col md="3">
                                                <Button 
                                                    style={{width:180,height:50}}
                                                    color="success"
                                                    className="px-4"
                                                    onClick = {this.openForm}
                                                >
                                                    Add New Activity
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="3">
                                                <b>ID Project</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.Id}
                                            </Col>
                                            
                                            <Col md="3">
                                                <b>Project Name</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.projectName}
                                            </Col>
                                            
                                            <Col md="3">
                                                <b>PO/Contract Number</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.contract}
                                            </Col>
                                            <Col md="3">
                                                <b>Client Name</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.ClientName}
                                            </Col>
                                            <Col md="3">
                                                <b>Work Type</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.workType}
                                            </Col>
                                            
                                            <Col md="3">
                                                <b>Status</b>
                                            </Col>
                                            <Col md="9">
                                                {this.state.project.status==0?"Active":"Inactive"}
                                            </Col>
                                        </Row>
                                        <Table id="myTable" responsive striped>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Activity Name</th>
                                                    <th>Activity Category</th>
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderresults}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>

        )
    }
}

export default TablesDetailProject;