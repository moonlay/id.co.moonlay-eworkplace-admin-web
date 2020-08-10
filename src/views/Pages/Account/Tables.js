import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import {detailAccount} from './Edit/editacc/Tables';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {urlAbsen, urlBlob, stateHeadDivision, appovedList, stateList, urlUser, urlAccount, urlAccountInformation} from '../../../Constant'

const moment = require('moment');
class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      listaccount: [],
      loading: true,
      url: urlUser,
      currentPage: 1,
      resultsPerPage: 40,
      username: '',
      hasil: null,
      belomabsen: null,
      token: '',
      obj: [],
      show : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  deleteAccount(account) {
    this.setState({
      showdeleteAsset:true,
      accountId:account
    })
  }

  handledeleteAccount = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlAccountInformation + '/' + this.state.accountId,
      headers: Header,
    })
      .then(data => {
        console.log(data);
        alert('berhasil dihapus');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
    
  }


    //For Get Data
    handleGetData(){
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
        url:urlAccountInformation,
        headers:Header,
      }).then(data=>{
        this.setState({
          listaccount:data.data
        })
        console.log(data.data);
      })
    }

  handleDetails = (IdAccount) => {
    this.setState({
      show : true
    })

    var token = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json-patch+json',
    };

    axios({
      method: 'get',
      url: this.state.url + '/' + IdAccount,
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data.roles[0])
        this.setState({
          jobstitleName : data.data.data.roles[0].permissions[0].jobTitle.Name,
          divisionsName : data.data.data.roles[0].permissions[0].jobTitle.Division.Name,
          rolesId : data.data.data.roles[0].permissions[1].permission,
          RoleName : data.data.data.roles[0].name,

        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleClose = () => {
		this.setState({ show: false, showdeleteAsset: false});
  }
  
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleGetUser = () => {
    var token = localStorage.getItem('token');
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json-patch+json',
    };

    axios({
      method: 'get',
      url: this.state.url + '?page=1&order=%7B%7D&filter=%7B%7D',
      headers: Header,
    })
      .then(data => {
        var i;
        var hasil = [];
        var length = Object.keys(data.data.data).length;
        for (i = 0; i < length; i++) {
          hasil.push(data.data.data[i].username);
        }
        this.setState({
          results: data.data.data,
          loading: true,
          length: length,
          hasil: hasil,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.handleGetData();
    //alert(urlBlob)
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
      method: 'get',
      url: this.state.url + '?page=1&size=25',
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
          results: data.data.data,
          loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }



  filterList = event => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
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
  };

  render() {

    const {listaccount} = this.state;
    const renderaccount = listaccount.map((account,index)=>{
    return(
      <tr key={account.Id} data-category = {account.Id}>
        <td>{account.photo}</td>
        <td>{account.Fullname}</td>
        <td>{account.EmployeeID}</td>
        <td>{account.Gender}</td>
        <td>{account.Email}</td>
        <td>{account.JobTitleName}</td>
        <td>{account.Status}</td>
        <td>
        <UncontrolledButtonDropdown direction="right">
                        <DropdownToggle>
                            <i className="fa fa-wrench"></i> Tools
                        </DropdownToggle>
                        <DropdownMenu>
                        <Link style={{textDecoration:'none'}} to={"/account/detailaccount/"+account.Id}><DropdownItem >
                                <i className="fa fa-eye-slash"></i>View Detail
                            </DropdownItem></Link>
                            <Link style={{textDecoration:'none'}} to={"/account/editaccount/"+account.Id}><DropdownItem >
                                <i className="fa fa-pencil-square-o"></i>Edit
                            </DropdownItem></Link>
                            {/* <DropdownItem onClick= {() => {window.location.href = '/#/edit/editacc';}}><i className="fa fa-pencil-square-o"></i>Edit</DropdownItem> */}
                            <DropdownItem onClick={() => this.deleteAccount(account.Id)}><i className="fa fa-trash"></i>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    </td>
                    

      </tr>
    )
  })

    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className="page-link">
          {number}
        </li>
      );
    });

    if (this.state.loading === false) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>

              {/*Delete Modal*/}
      <Modal size="sm" show={this.state.showdeleteAsset} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure want to delete this field?
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="danger" onClick={this.handledeleteAccount}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*Delete Modal*/}
        
        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>Account</b>
                        {/* <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/caccount/caccounts';
                          }}>
                          Add Employee
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/account/addaccount';
                          }}>
                          Import
                        </Button>  */}
                        <div class="btn-group">
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/caccount/caccounts';
                          }}>
                          Add Employee
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            window.location.href = '/#/account/addaccount';
                          }}>
                          Import
                        </Button> &ensp;
                        <div style={{marginLeft:3}}>
                                <ReactHTMLTableToExcel 
                                className="btn btn-danger"
                                table="myTable"
                                filename="Report"
                                sheet="Sheet"
                                buttonText="Export"
                                />
                                </div>
                          </div> 
                        {/* <div style={{marginLeft:0}}>
                                <ReactHTMLTableToExcel 
                                className="btn btn-danger"
                                table="myTable"
                                filename="Report"
                                sheet="Sheet"
                                buttonText="Export"
                                />
                                </div> */}

                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: '100%' }}
                          placeholder="Search By Full Name"
                          onChange={this.filterList}
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table id="myTable" responsive striped >
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Full Name</th>
                          <th>Employee ID</th>
                          <th>Gender</th>
                          <th>Personal Email</th>
                          <th>Job Title</th>
                          <th>Status</th>  
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderaccount}
                        {/* {values.map(function(object, i){
                      return <tr key={i}><td>{object}</td></tr>;
                      })} */}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
