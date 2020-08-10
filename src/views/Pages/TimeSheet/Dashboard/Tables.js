import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import DatePicker from 'reactstrap-date-picker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { saveAs } from 'file-saver';
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
import axios,{AxiosRequestConfig,Method} from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlReport,urlTimeSheet} from '../../../../Constant'

//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:"",
            show:false,
            time:'10:00:00',
            endtime:'10:00:00',
            report:[],
        }
    }
    componentDidMount(){
        const value = localStorage.getItem('token');
        this.setState({
            token:value,
        })
        const Header = {
            accept: 'application/json',
            Authorization: `Bearer `+value,
        };
        axios({
            method:'get',
            url:urlTimeSheet,
            headers:Header,
        }).then(data => {
            console.log(data.data);
            this.setState({
                report : data.data,
            })
        })
    }
    // handleExcel = ()=>{
    //     const value = localStorage.getItem('token');
    //     this.setState({
    //         token:value,
    //     })
    //     const Header = {
    //         accept: 'application/json',
    //         Authorization: `Bearer `+value,
    //     };
    //     axios({
    //         url: urlReport+'/Excel',
    //         method: 'GET',
    //         responseType: 'blob',
    //         headers:Header // important
    //       }).then((response) => {
    //          const url = window.URL.createObjectURL(new Blob([response.data]));
    //          const link = document.createElement('a');
    //          link.href = url;
    //          link.setAttribute('download', 'Report.xlsx'); //or any other extension
    //          document.body.appendChild(link);
    //          link.click();
    //       });
    // }
    handleDate =(e,v)=>{
        
        this.setState({
            value:e,
            date:v
        })
        var input,filter,table,tr,td,i,txtValue;
        input = document.getElementById('myDate');
        filter = input.value.substr(0,10);
        console.log(filter);
        table = document.getElementById('myTable');
        tr = table.getElementsByTagName('tr');
        if(v === null || v === ""){
            console.log('yes');
            for(i = 0;i < tr.length;i++){
                tr[i].style.display='';
            }
        }else{
            for(i = 0 ;i < tr.length;i++){
                td = tr[i].getElementsByTagName('td')[7];
                if(td){
                    if(v != td.textContent){
                        tr[i].style.display = 'none';
                    }else{
                        tr[i].style.display = '';
                    }
                }
            }
        }
        
      }
      filterEmployee = event =>{
          var input,filter,table,tr,td,i,txtValue;
          input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
      }
      onChange = time => this.setState({ time })
      onChangeTime = (e)=>{
          this.setState({
              time:e.target.value,
          })
          console.log((moment("01/01/1991 "+e.target.value).format('hh:mm:ss a')));
    }
    onChangeEndTime = (e)=>{
        this.setState({
            endtime:e.target.value,
        })
        var a = (moment("01/01/1991 "+e.target.value).format('hh:mm:ss a'));
        var b = a.substr(9,11);
        if(b === "pm"){
            console.log("yes");
            var c = a.substr(0,8);
            var d = c[0]+c[1];
            var e = c[3]+c[4];
            var f  = c[6]+c[7];
            var g = parseInt(d)+12;
            c = g.toString()+":"+e+":"+f;
            console.log(c);

        }
    }
      onChanged = endtime => this.setState({ endtime })
      handlesubmit = ()=>{
        //   console.log(this.state.endtime-this.state.time);
      }
    render(){
        const {report} = this.state;
        let i = 1;
        const renderresults = report.map((rep)=>{
            var time = rep.StartTime.substr(0,5) + "-" + rep.EndTime.substr(0,5);
            var result ;
                if(rep.Taskstatus == 1){
                    result = "To Do";
                }else if(rep.Taskstatus == 2){
                    result = "In Progress";
                }else if(rep.Taskstatus == 3){
                    result = "Done";
                }else if(rep.Taskstatus == 4){
                    result = "Not Done";
                }
            return(
                <tr key={rep.TimeSheetId} data-category={rep.TimeSheetId} style={{width:100}}>
                    <td>{i++}</td>
                    <td>{rep.EmployeeName}</td>
                    <td>{rep.ClientName}</td>
                    <td>{rep.ProjectName}</td>
                    <td>{rep.TaskName}</td>
                    <td>{rep.TaskDifficult}</td>
                    <td>{result}</td>
                    <td>{moment(rep.StartDate).format("DD-MM-YYYY").substr(0,10)}</td>
                    <td>{moment(rep.EndDate).format("DD-MM-YYYY").substr(0,10)}</td>
                    <td>{time}</td>
                    <td>{rep.Duration}</td>
                    {/* <td><Button className="btn btn-info">Edit</Button></td> */}
                </tr>
            )
        })
        return(
            <div>
                <Modal show={this.state.show}>

                </Modal>
                <div className="animated fadeIn">
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                        <b>Report Timesheet</b>
                                        </Col>
                                        <Col>
                                            <input 
                                            type="text"
                                            id="myInput"
                                            className="form-control form-control-md"
                                            style={{width:'100%'}}
                                            placeholder="Search By Employee Name"
                                            onChange={this.filterEmployee}
                                            />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                        <Link
                                        style={{textDecoration:'none'}}
                                        to={"/Addnew/AddnewTask"}><Button 
                                            color="success"
                                            style={{marginLeft:10}}
                                            >Edit Task</Button>
                                            </Link>
                                            
                                        </Col>
                                        <Col>
                                        <DatePicker autoComplete="off"   dateFormat = "DD-MM-YYYY"  id="myDate" value={this.state.value} onChange={(e,v)=>this.handleDate(e,v)}/>
                                        </Col>
                                    </Row>
                                    <Table id="myTable" style={{marginTop:'15px'}} responsive striped>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>EmployeeName</th>
                                                <th>Client Name</th>
                                                <th>Project Name</th>
                                                <th>Task Name</th>
                                                <th>Task Difficulty</th>
                                                <th>Task Status</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Time</th>
                                                <th>Duration</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderresults}
                                        </tbody>
                                    </Table>
                                </CardBody>
                                <div style={{marginLeft:'15px',marginBottom:'5px'}}>
                                <ReactHTMLTableToExcel 
                                className="btn btn-info"
                                table="myTable"
                                filename="Report"
                                sheet="Sheet"
                                buttonText="Export To Excel"
                                />
                                {/* <Button className="primary" onClick={()=>this.handleExcel()}>Export To Excel</Button> */}
                                </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
        )
    }
}
export default Tables;