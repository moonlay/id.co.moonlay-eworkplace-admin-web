import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import DateTimePicker from 'reactstrap-date-picker';
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
import {urlProject} from '../../../Constant'
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : false,
            updateshow:false,
            status : [
                {
                    id : 0,
                    Name : "Active"
                },
                {
                    id : 1,
                    Name : "Inactive"
                }
            ],
            date:new Date(),
            url: urlProject,
            currentPage:1,
            resultPerPage:10,
            loading:false,
            selectedStatus : {},
            jumlah : [],
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        this.setState({
            currentPage:Number(event.target.id),
        })
    }
    handleCount = ()=>{
        this.setState({
            id:this.state.id+1,
        })
    }
    componentDidMount(){
        const value = localStorage.getItem('token');
        this.setState({
            token:value,
        })
        const Header = {
            accept: 'appication/json',
            Authorization: `Bearer `+value,
        };
        axios({
            method:'get',
            url: this.state.url+ '?page=1&size=25&order=%7B%7D&filter=%7B%7D',
            headers: Header,
        }).then(data=>{
            console.log(data.data)
            this.setState({
                jumlah:data.data,
                loading:true,
            })
        })
    }
    handleStatus = selectedstatus => {
        if(selectedstatus.value != null){
            this.setState({selectedstatus: selectedstatus,selectedStatus: selectedstatus.value});
        }
        console.log(selectedstatus);
        
        console.log(this.state.selectedStatus)
    }
    handleAddProject = ()=>{
        this.setState({
            show:true,
        })
    }
    handleClose=()=>{
        this.setState({
            show:false,
            updateshow:false
        });
    }
    handleProject = (e) => {
        this.setState({
            ProjectName: e.target.value,
        });
    }
    handleContract = (e)=>{
        this.setState({
            Contract: e.target.value,
        })
    }
    handleClient = (e)=>{
        this.setState({
            Client: e.target.value,
        })
    }
    handleWork = (e)=>{
        this.setState({
            Work: e.target.value,
        })
    }
    delete = (id)=>{
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        axios({
            method: 'delete',
            url: urlProject + '/'+id,
            headers:Headers,
        }).then(data=>{
            alert('Project Berhasil Dihapus');
            window.location.reload();
        })
    }
    update = (id)=>{
        this.setState({
            updateshow:true,
            idProject : id,
        })
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        axios({
            method:'get',
            url:this.state.url + '/' + id,
            headers: Headers,
        }).then(data => {
            // console.log(data.data);
            // console.log(status);
            this.setState({
                "ProjectName":data.data.projectName,
                "Contract":data.data.contract,
                "Work":data.data.workType,
                "selectedstatus" : data.data.status,  
            })
        })
    }
    handleFormUpdate = (id) =>{
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        const Data = {
            "projectName": this.state.ProjectName,
            "contract": this.state.Contract,
            "ClientName": this.state.Client,
            "workType": this.state.Work,
            "status":this.state.selectedStatus

        };
        axios({
            method:'put',
            url: urlProject+'/'+id,
            headers:Headers,
            data : Data,
        }).then(data=>{
            window.location.reload();
        })
    }
    handleForm = () =>{
        const Headers = {
            'accept' : 'application/json',
            'Authorization' : `Bearer `+localStorage.getItem('token'),
            'Content-type' : 'application/json-patch+json'
        };
        const Data = {
            "projectName": this.state.ProjectName,
            "contract": this.state.Contract,
            "ClientName" : this.state.Client,
            "workType": this.state.Work,
            "status":this.state.selectedStatus
        }
        axios({
            method:'post',
            url: urlProject,
            headers:Headers,
            data:Data            
        }).then(data =>{
            // console.log(data);
            window.location.reload();
        })
        // console.log(this.state.jumlah);
        //console.log(Data);
    }
    render(){
        let options = this.state.status.map(function(division){
            return{value:division.id, label:division.Name};
        })
        
    const { jumlah, currentPage, resultPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultPerPage;
    const currentresults = jumlah.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((jumlah, index)=>{
        var status;
        if(jumlah.status == 0){
            status = "Active"
        }else{
            status = "Inactive"
        }
        return(
            <tr key={jumlah.Id} data-category={jumlah.No} style={{width:200}}>
                <td>{jumlah.Id}</td>
                <td>{jumlah.projectName}</td>
                <td>{jumlah.contract}</td>
                <td>{jumlah.ClientName}</td>
                <td>{jumlah.workType}</td>
                <td>{status}</td>
                <td>
                    <UncontrolledButtonDropdown direction="right">
                        <DropdownToggle>
                            <i className="fa fa-wrench"></i> Tools
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link style={{textDecoration:'none'}} to={"/ProjectList/Project/"+jumlah.Id}><DropdownItem >
                                <i className="fa fa-eye-slash"></i>View Detail
                            </DropdownItem></Link>
                            <DropdownItem onClick = {()=>this.update(jumlah.Id)}><i className="fa fa-pencil-square-o"></i>Edit</DropdownItem>
                            <DropdownItem onClick = {()=>this.delete(jumlah.Id)}><i className="fa fa-trash"></i>Hapus</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </td>
            </tr>
        )
    })
    
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(jumlah.length/resultPerPage); i++){
        pageNumbers.push(i);
    }
    // console.log(pageNumbers);
    const renderPageNumbers = pageNumbers.map(number => {
        return(
            <li
             key = {number}
             id = {number}
             onClick = {this.handleClick}
             className = "page-link"
                >
                    {number}
            </li>
        )
    })
    
        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            Project Name
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.handleProject}
                                value={this.state.ProjectName} />
                            </InputGroup>
                            
                            PO/Contract Number
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.handleContract} value = {this.state.Contract} />
                            </InputGroup>
                            
                            Client Name
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.handleClient} value = {this.state.Client} />
                            </InputGroup>
                            
                            Work Type
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.handleWork} 
                                value={this.state.Work}
                                />
                            </InputGroup>
                            
                            Status
                            <Select styles={{width:70}}
                                name="form-field-name"
                                value={this.state.selectedstatus}
                                onChange={this.handleStatus}
                                options={options}/>
                        </Form>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button className="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button className="btn btn-info" onClick = {this.handleForm}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.updateshow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            Project Name
                            <InputGroup className="mb-3">
                                <Input type="text"
                                value={this.state.ProjectName || ' '} 
                                onChange = {this.handleProject}/>
                            </InputGroup>
                            
                            PO/Contract Number
                            <InputGroup className="mb-3">
                                <Input type="text"  value = {this.state.Contract || ''}
                                onChange={this.handleContract} />
                            </InputGroup>
                            
                            Client Name
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.handleClient} value = {this.state.Client} />
                            </InputGroup>
                            
                            Work Type
                            <InputGroup className="mb-3">
                                <Input type="text"  
                                value={this.state.Work || ''}
                                onChange={this.handleWork}
                                />
                            </InputGroup>
                            
                            Status
                            <Select styles={{width:70}}
                                name="form-field-name"
                                value={this.state.selectedstatus}
                                onChange = {this.handleStatus}
                                options={options}/>
                        </Form>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button className="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button className="btn btn-info" onClick = {()=>{this.handleFormUpdate(this.state.idProject)}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                <div className="animated fadeIn">
                    {this.state.loading && (
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
                                                  onClick={this.handleAddProject}
                                                >
                                                    Add New Project
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Table id="myTable" responsive striped>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Project Name</th>
                                                    <th>PO/Contract Number</th>
                                                    <th>Client Name</th>
                                                    <th>Work Type</th>
                                                    <th>Status</th>
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
                    <ul className="pagination pointer">{renderPageNumbers}</ul>
            </div>
        )
    }
}

export default Tables;