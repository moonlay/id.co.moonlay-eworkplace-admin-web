import React, { Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Button
} from 'reactstrap';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlJobtitle, urlDivision, urlBlob, urlRole ,urlFamilyData, 
  urlContact,  urlInformalEducationData,urlAccountInformation, 
  urlWorkingExperienceData, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idaccount : props.id,
      results: [],
      listfamily:[],
      listcontact:[],
      listInformalEducation:[],
      listWorkingExperience:[],
      listDivison : [],
      loading: true,
      showTabAccount : false,
      url: urlRole,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      selectedDivision :{},
      stream : null,
      listJobtitle : {},
      selectedRolePermisiion : {},
      detailAccount : [],
      showDetails : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

    //Handle Show Detail
    detailAccount = (id)=>{
      const value = localStorage.getItem('token');
    this.setState({
      token: value,
    });
    const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
      // 'Content-Type' : 'application/json-patch+json'
    };
      // this.setState({
      //   showTabAccount:true
      // })
      axios({
        url:urlAccountInformation+'/'+this.state.idaccount,
        method:'get',
        headers:Header
      }).then(data=>{
        console.log(data.data);
        this.setState({
          detailAccount : data.data
        })
        console.log(this.state.detailAccount)
      })
    }


  //For Get Family Data
  handleGetFamilydata(){
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
      url:urlFamilyData,
      headers:Header,
    }).then(data=>{
      this.setState({
        listfamily:data.data
      })
      // console.log(data.data);
    })
  }

  //For Get Emergency Contact
  handleGetEmergencyContactdata(){
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
      url:urlContact,
      headers:Header,
    }).then(data=>{
      this.setState({
        listcontact:data.data
      })
      // console.log(data.data);
    })
  }

  //For Get Informal Education
  handleGetInformalEducationdata(){
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
      url:urlInformalEducationData,
      headers:Header,
    }).then(data=>{
      this.setState({
        listInformalEducation:data.data
      })
      // console.log(data.data);
    })
  }

  //For Get Working Experience
  handleGetWorkingExperiencedata(){
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
      url:urlWorkingExperienceData,
      headers:Header,
    }).then(data=>{
      this.setState({
        listWorkingExperience:data.data
      })
      // console.log(data.data);
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  componentDidMount() {
    this.handleGetFamilydata();
    this.handleGetInformalEducationdata();
    this.handleGetWorkingExperiencedata();
    this.handleGetEmergencyContactdata(); 
    this.detailAccount(); 
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
        // console.log(data.data.data)
        this.setState({
          results: data.data.data,
          loading: true,
        });
      })
     
      .catch(err => {
        // console.log(err);
      });
  }


  render() {

      const {listfamily} = this.state;
      let num = 1;
      let date=moment(this.state.detailAccount.Dob).format("DD/MM/YYYY").substr(0,10);
      let joindate=moment(this.state.detailAccount.JoinDate).format("DD/MM/YYYY").substr(0,10);
  
      const renderfamily = listfamily.map((family,index)=>{
      return(
        <tr key={family.Id} data-category = {family.Id}>
          <td>{num++}</td>
          <td>{family.FullNameOfFamily}</td>
          <td>{family.Relationship}</td>
          <td>{family.DOBFamily==null?family.DOBFamily:family.DOBFamily.substr(0,10)}</td>
          <td>{family.Religion}</td>
          <td>{family.Gender}</td>
          <td>{family.KTPNumber}</td>

        </tr>
      )
    })

    //For Emergency Contact Table
  const {listcontact} = this.state;
  let number = 1;
  const renderEmergContact = listcontact.map((contact,index)=>{
    return(
      <tr key={contact.Id} data-category = {contact.Id}>
        <td>{number++}</td>
        <td>{contact.NameOfContact}</td>
        <td>{contact.Relationship}</td>
        <td>{contact.PhoneNumber}</td>

      </tr>
    )
  })

  //For Informal Education Table
  const {listInformalEducation} = this.state;
  let numbe = 1;
  const renderInformalEd = listInformalEducation.map((informal,index)=>{
    return(
      <tr key={informal.Id} data-category = {informal.Id}>
        <td>{numbe++}</td>
        <td>{informal.HeldBy}</td>
        <td>{informal.JobPosition}</td>
        <td>{informal.StartDate==null?informal.StartDate:informal.StartDate.substr(0,10)}</td>
        <td>{informal.EndDate==null?informal.EndDate:informal.EndDate.substr(0,10)}</td>
        <td>{informal.Description}</td>
        <td>{informal.Certificate}</td>

      </tr>
    )
  })
  

  //For Working Experience Table
  const {listWorkingExperience} = this.state;
  let numb = 1;
  const renderWorkExperience = listWorkingExperience.map((experience,index)=>{
    return(
      <tr key={experience.Id} data-category = {experience.Id}>
        <td>{numb++}</td>
        <td>{experience.Company}</td>
        <td>{experience.JobPosition}</td>
        <td>{experience.TanggalMulai==null?experience.TanggalMulai:experience.TanggalMulai.substr(0,10)}</td>
        <td>{experience.TanggalSelesai==null?experience.TanggalSelesai:experience.TanggalSelesai.substr(0,10)}</td>
        <td>{experience.Deskripsi}</td>
        <td>{experience.Sertifikat}</td>

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

        
        <div className="row">
          {/* <div class="col-md-3">
            <h4>Date from</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterfrom"
              data-date-split-input="true"
              onChange={this.handleDateChange}
            />
          </div> */}
          {/* <div class="col-md-3">
            <h4>Date to</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterto"
              data-date-split-input="true"
            />
          </div> */}
          {/* <div>
            <h4>Date to</h4>
            <button onClick={this.handleJS}>filter date</button>
          </div> */}
        </div>

        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">

                    {/* <DateRange
              format="DD/MM/YYYY"
              startDate={rangePicker["startDate"]}
              endDate={rangePicker["endDate"]}
              linkedCalendars={true}
              disableDaysBeforeToday={true}
              date={now => now}
              onInit={this.handleChange}
              onChange={this.handleChange} /> */}
              
              <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>&nbsp;Detail Accounts</b>


                  
                      </Col>

                    </Row>
                  </CardHeader>
                  <CardBody>

                    <Tabs show={this.state.showTabAccount}>    
                                      
                      <TabList>
                        <Tab style={{ fontSize: '18px', width: '16rem'}}>&emsp; &emsp; Personal Data</Tab>
                        <Tab style={{ fontSize: '18px', width: '16rem'}}>&emsp; &emsp; Employement Data</Tab>
                        <Tab style={{ fontSize: '18px', width: '16rem'}}>&emsp; &emsp; Family Info</Tab>
                        <Tab style={{ fontSize: '18px', width: '17rem'}}>&emsp; &emsp; Experience</Tab>
                      </TabList>

                      
                      <TabPanel>
                      <br></br>
                      <br></br>

                      <Form>
                        <Col>
                        <Row>
                        
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &nbsp; Employee ID &nbsp;  
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.EmployeeID} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; Username &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Username} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; Religion &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Religion} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >&emsp; Full Name &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Fullname} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Phone Number &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.EmployeePhoneNumber} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; &emsp; Gender &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Gender} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" >&nbsp; &nbsp; Personal Email &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Email} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >  Date Of Birth &nbsp;
                          <Input style={{fontSize: '15px'}} type="type" value={date} disabled />
                          </InputGroup>

                        </Row>
                        </Col>
 
                      </Form>

                      </TabPanel>

                      <TabPanel>
                      <br></br>
                      <br></br>    

                      <Form>
                        <Col>
                        <Row>

                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; &nbsp; &nbsp; Job Title &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.JobTitleName} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; &nbsp; Join Date &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={joindate} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > Departement &ensp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Department} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Coorporate Email &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.CoorporateEmail} disabled />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &ensp; &emsp; &emsp; Status &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" value={this.state.detailAccount.Status} disabled />
                          </InputGroup>
    
                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; &ensp; &nbsp;  Skill Set &nbsp;
                          <Input style={{fontSize: '15px', height:'90px'}} type="textarea" value={this.state.detailAccount.SkillSet} disabled />
                          </InputGroup>

                        </Row>
                        </Col>
                      </Form>

                      </TabPanel>


    <TabPanel>
    <Form>
      <br></br>
      <label style={{fontSize: '22px', marginRight: '5px'}}>&ensp; Family Data</label>
        
    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Full Name</th>
                          <th>Relationship</th>
                          <th>Date of Birth</th>
                          <th>Religion</th>
                          <th>Gender</th>
                          <th>KTP Number</th>
                        </tr>
                      </thead>
                      <tbody>{
                       renderfamily
                        }</tbody>
                    </Table>

                    <br></br>

                    <label style={{fontSize: '21px', marginRight: '5px'}}>&ensp; Emergency Contacts</label>
        
        <Table id="myTable" responsive striped>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>Relationship</th>
                              <th>Phone Number</th>
                              
                            </tr>
                          </thead>
                          <tbody>{
                           renderEmergContact
                            }</tbody>
                        </Table>

        </Form>
    </TabPanel>

    <TabPanel>
    
    <Form>
    <br></br>  
    <label style={{fontSize: '21px', marginRight: '5px'}}>&ensp; Informal Education History</label>
        
        <Table id="myTable" responsive striped>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Company</th>
                              <th>Job Position</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Description</th>
                              <th>Certificate</th>
                            </tr>
                          </thead>
                          <tbody>{
                           renderInformalEd
                            }</tbody>
                        </Table>
                        <br></br>
                        <label style={{fontSize: '22px', marginRight: '5px'}}>&ensp; Formal Experience</label>
            
            <Table id="myTable" responsive striped>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>Company</th>
                                  <th>Job Position</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Description</th>
                                  <th>Certificate</th>
                                </tr>
                              </thead>
                              <tbody>{
                               renderWorkExperience
                                }</tbody>
                            </Table>
    

        </Form>
        
    </TabPanel>
    
  </Tabs>

  </CardBody>
                <CardFooter className="p-4">
                  <div className="kanan">
                    <Button style={{ marginLeft: 5, width:"80px" }}  onClick={() => {
                      window.location.href = '/#/account/listaccount';
                      }}color="danger">Back</Button>&nbsp;

                  </div>
                </CardFooter>
                </Card>



              </Col>
            </Row>
          )}
        </div>
        {/* <Pagination>
                  <PaginationItem>
                  {renderPageNumbers}
                     </PaginationItem>
    </Pagination>
         */}
       
      </div>
    );
  }
}

export default Tables;
