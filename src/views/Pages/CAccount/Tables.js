import React, { Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Container,
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
import {urlJobtitle, urlDivision, urlBlob, urlUser, urlRole,urlAccountInformation, 
  urlTestUser,urlPayroll,urlTestRole, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      results: [],
      loading: true,
      url: urlUser,
      currentPage: 1,
      resultsPerPage: 40,
      selectedRole : {},
      listRole : [],
      // state baru
      Username : '',
      EmployeeID  : '',
      Fullname : '',
      Dob : '',
      Gender : '',
      Religion : '',
      EmployeePhoneNumber : '',
      Email : '',
      Password : '',
      JobTitleName : [],
      Departement : '',
      Status : '',
      JoinDate : '',
      CoorporateEmail : '',
      SkillSet : '',
      assetname : '',
      assetnumber : '',
      Salary : '',
      Tax : '',
      BPJSKesehatan : '',
      BPJSTenagaKerja : '',
      NPWP : '',
      NameBankAccount : '',
      Bank : '',
      BankAccountNumber : '',
      BankBranch : '',
      newAsset: [],
      validate: true,
      validateTax: true,
      validatebpjsk: true,
      validatebpjst: true,
      validatenpwp: true,
      validatebankaccnum: true,
      validatephone: true,

    };
    this.handleClick = this.handleClick.bind(this);
  }

    //For Submit Account
    handlesubmitAccountInformation= ()=>{
      if(this.state.Fullname !== "" && this.state.Fullname !== null &&
      this.state.Username !== "" && this.state.Username !== null &&
      this.state.EmployeeID !== "" && this.state.EmployeeID !== null &&
      this.state.Dob !== "" && this.state.Dob !== null &&
      this.state.Gender !== "" && this.state.Gender !== null &&
      // this.state.Religion !== "" && this.state.Religion!== null &&
      // this.state.Email !== "" && this.state.Email!== null &&
      // this.state.CoorporateEmail !== "" && this.state.CoorporateEmail!== null &&
      // this.state.Password !== "" && this.state.Password !== null &&
      // this.state.EmployeePhoneNumber!== "" && this.state.EmployeePhoneNumber!== null &&
      // this.state.Status!== "" && this.state.Status!== null &&
      // this.state.JoinDate !== "" && this.state.JoinDate !== null &&
      // this.state.JobTitleName !== "" && this.state.JobTitleName !== null &&
      // this.state.Department !== "" && this.state.Department !== null &&
      this.state.Salary !== "" && this.state.Salary !== null 
      // this.state.NameBankAccount !== "" && this.state.NameBankAccount!== null &&
      // this.state.Bank !== "" && this.state.Bank !== null &&
      // this.state.BankAccountNumber!== "" && this.state.BankAccountNumber!== null &&
      // this.state.BankBranch!== "" && this.state.BankBranch!== null 
      ){
        const Data = {
          "Fullname":this.state.Fullname,
          "Username":this.state.Username,
          "EmployeeID":this.state.EmployeeID,
          "Dob":this.state.Dob,
          "Gender":this.state.Gender,
          "Religion":this.state.Religion,
          "Email":this.state.Email,
          "CoorporateEmail":this.state.CoorporateEmail,
          "Password":this.state.Password,
          "EmployeePhoneNumber":this.state.EmployeePhoneNumber,
          "Status":this.state.Status,
          "JoinDate":this.state.JoinDate,
          "SkillSet":this.state.SkillSet,
          "JobTitleName":this.state.JobTitleName,
          "Department":this.state.Department,
        }
        const Payroll = {
          "Salary":this.state.Salary,
          "Tax":this.state.Tax,
          "BPJSKesehatan":this.state.BPJSKesehatan,
          "BPJSTenagaKerja":this.state.BPJSTenagaKerja,
          "NPWP":this.state.NPWP,
          "NameBankAccount":this.state.NameBankAccount,
          "Bank":this.state.Bank,
          "BankAccountNumber":this.state.BankAccountNumber,
          "BankBranch":this.state.BankBranch,
        }
        console.log(Data);
        console.log(Payroll);
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
          method:'post',
          url:urlPayroll,
          headers:Header,
          data:Payroll
        }).then(data=>{
          console.log("Berhasil");
        })
        axios({
          method:'post',
          url:urlAccountInformation,
          headers:Header,
          data:Data
        }).then(data=>{
          console.log("Berhasil");
          alert('berhasil ditambahkan');
          window.location.reload();
        })
      }
      else{
        alert("Field harus diisi")  
      }
    }

  
  //For Personal Data Field
  onChangeEmployeeID = (e) => {
    this.setState({
      EmployeeID : e.target.value
    })
  }
  onChangeFullName = (e) => {
    this.setState({
      Fullname : e.target.value
    })
  }
  onChangeDob = (e) => {
    this.setState({
      Dob : e.target.value
    })
  }
  onChangeGender = (e) => {
    this.setState({
      Gender : e.target.value
    })
  }
  onChangeReligion = (e) => {
    this.setState({
      Religion : e.target.value
    })
  }
  onChangePhoneNumber = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatephone:true,
          EmployeePhoneNumber : e.target.value,
      })
  }else{
      this.setState({
          EmployeePhoneNumber : e.target.value,
          validatephone:false,
      })
  }
  }
  onChangePersonalEmail = (e) => {
    this.setState({
      Email : e.target.value
    })
  }
  onChangePassword = (e) => {
    this.setState({
      Password : e.target.value
    })
  }
  onChangeUsername = (e) => {
    this.setState({
      Username : e.target.value
    })
  }
  onChangeJobTitle = (e) => {
    this.setState({
      JobTitleName : e.target.value
    })
  }

  onChangeRole = (selectedRole) => {
    if(selectedRole.value !== null){
      this.setState({
        selectedRole : selectedRole,
        selectedRoleValue : selectedRole.value
      })
    }   
  }

  onChangeDepartement = (e) => {
    this.setState({
      Department : e.target.value
    })
  }
  onChangeStatus = (e) => {
    this.setState({
      Status : e.target.value
    })
  }
  onChangeJoinDate = (e) => {
    this.setState({
      JoinDate : e.target.value
    })
  }
  onChangeCoorporateEmail = (e) => {
    this.setState({
      CoorporateEmail : e.target.value
    })
  }
  onChangeSkillSet = (e) => {
    this.setState({
      SkillSet : e.target.value
    })
  }
  onChangeAsset = (e) => {
    this.setState({
      assetname : e.target.value
    })
  }
  onChangeAssetNumber = (e) => {
    this.setState({
      assetnumber : e.target.value
    })
  }
  onChangeSalary = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validate:true,
          Salary : e.target.value,
      })
  }else{
      this.setState({
          Salary : e.target.value,
          validate:false,
      })
    }
  }

  onChangeTax = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validateTax:true,
          Tax: e.target.value,
      })
  }else{
      this.setState({
          Tax : e.target.value,
          validateTax:false,
      })
    }
  }
  onChangeBpjsKesehatan = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatebpjsk:true,
          BPJSKesehatan : e.target.value,
      })
  }else{
      this.setState({
          BPJSKesehatan : e.target.value,
          validatebpjsk:false,
      })
    }
  }
  onChangeBpjsTenaga = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatebpjst:true,
          BPJSTenagaKerja : e.target.value,
      })
  }else{
      this.setState({
          BPJSTenagaKerja : e.target.value,
          validatebpjst:false,
      })
    }
  }
  onChangeNpwp = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatenpwp:true,
          NPWP : e.target.value,
      })
  }else{
      this.setState({
          NPWP : e.target.value,
          validatenpwp:false,
      })
    }
  }
  onChangeNameinBank = (e) => {
    this.setState({
      NameBankAccount : e.target.value
    })
  }
  onChangeBank = (e) => {
    this.setState({
      bank : e.target.value
    })
  }
  onChangeBankAccnum = (e) => {
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatebankaccnum:true,
          BankAccountNumber : e.target.value,
      })
  }else{
      this.setState({
          BankAccountNumber : e.target.value,
          validatebankaccnum:false,
      })
  }
  }
  onChangeBankBranch = (e) => {
    this.setState({
      BankBranch : e.target.value
    })
  }

  
  // //To Handle Create Account
  // handlCreateAccount= ()=>{
  //   const Data = {
  //     "Fullname":this.state.Fullname,
  //     "EmployeeID":this.state.EmployeeID,
  //     "Dob":this.state.Dob,
  //     "Gender":this.state.Gender,
  //     "Religion":this.state.Religion,
  //     "Email":this.state.Email,
  //     "CoorporateEmail":this.state.CoorporateEmail,
  //     "Password":this.state.Password,
  //     "EmployeePhoneNumber":this.state.EmployeePhoneNumber,
  //     "Status":this.state.Status,
  //     "JoinDate":this.state.JoinDate,
  //     "SkillSet":this.state.SkillSet,
  //     "FamilyData":this.state.FamilyData,
  //     "EmergencyContact":this.state.EmergencyContact,
  //     "EducationHistory":this.state.EducationHistory,
  //     "InformalEducationHistory":this.state.InformalEducationHistory,
  //   }
  //   console.log(Data);
  //   const value = localStorage.getItem('token');
  //   this.setState({
  //     token: value,
  //   });
  //   const Header = {
  //   accept: 'application/json',
  //   Authorization : `Bearer ` + value,
  //     // 'Content-Type' : 'application/json-patch+json'
  //   };
  //   axios({
  //     method:'post',
  //     // url:urlContact,
  //     headers:Header,
  //     data:Data
  //   }).then(data=>{
  //     console.log("Berhasil");
  //     alert('berhasil ditambahkan');
  //     window.location.reload();
  //   })
  // }

  addAssetField(){
    this.setState({newAsset: [...this.state.newAsset, ""]})
  }

  handleChange(e, index){
    this.state.newAsset[index] = e.target.value

    this.setState({newAsset: this.state.newAsset})
  }

  handleRemove(index){
    this.state.newAsset.splice(index, 1)

    this.setState({newAsset: this.state.newAsset})
  }

  onhandleBack = (e) =>{
    //window.location.href = '/';  
    this.props.history.push('/account/listaccount');
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  GetRoles = () => {
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
      url: urlRole + '?page=1&size=25&order=%7B%7D&filter=%7B%7D',
      headers: Header,
    })
      .then(data => {
       // console.log(data.data.data)
        this.setState({
          listRole : data.data.data,
         
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }


  componentDidMount() {
    this.GetRoles();
    const dateTime =   new Date().toLocaleString();
    const value = localStorage.getItem("token");
    this.setState({
      token : value,
      dateTime : dateTime
    })
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
        console.log(err);
      });
  }

  toggleShow = (e) => {
    this.setState({ 
      hidden: !this.state.hidden, 
      });
  }
  
  render() {
    var token = localStorage.getItem('token');
    var RoleId = localStorage.getItem('RoleId')
    if (token === null || token === undefined ||RoleId === null || RoleId === undefined) {
      this.props.history.push('/login');
    }
    
    let roleList = this.state.listRole.map(function (role) {
      return { value: role._id, label: role .name };
    })

    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
   });
    

    const { results, currentPage, resultsPerPage } = this.state;
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }


    if (this.state.loading === false) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">

                <div className="app flex-row align-items-top">        
                <Container style={{marginRight: '-7rem'}} >
                <Row className="justify-content-left">
                <Col md="9" lg="7" xl="6">
                <Card style={{float:'left', width: '50rem'}}  className="mx-4">
                  <div className="auto">
                    <CardBody className="p-4">
                    <Form>                   
                    <h2>Create an Employee Account</h2>                    
                    <p className="text-muted">Personal Data </p>

                    Username*
                    <InputGroup className="mb-3">
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeUsername} />                     
                      </InputGroup>

                    Full Name*
                    <InputGroup className="mb-3">
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeFullName}  />                     
                      </InputGroup>
              
                    EmployeeID* &nbsp;  
                    <InputGroup className="mb-3">
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeEmployeeID} />
                      </InputGroup>
                   
                    Birthday* &nbsp;   
                    <InputGroup className="mb-3">      
                      <Input style={{ width: '45rem'}} type="date" onChange={this.onChangeDob}  />
                      </InputGroup>
    
                      Gender*
                    <InputGroup className="mb-3">                       
                      <Input type="select" style={{ width: '45rem'}}  value={this.state.value} onChange={this.onChangeGender}>
                      <option></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      </Input>
                      </InputGroup>
                 
                    Religion*
                    <InputGroup className="mb-3"> 
                      <Input type="select" style={{ width: '45rem'}}  value={this.state.value} onChange={this.onChangeReligion}>
                      <option></option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Kong Hu Cu">Kong Hu Cu</option>
                      </Input>        
                      </InputGroup>
                  
                      Phone Number* &nbsp; 
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangePhoneNumber} />
                        &nbsp; <span style={{color:'red',display:this.state.validatephone?'none':''}}>Field Must be Number</span>                        
                        </InputGroup>
                   
                      Personal Email* &nbsp; 
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem' }} type="text" onChange={this.onChangePersonalEmail}  />
                        </InputGroup>

                      Password*
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '43rem' }} type={this.state.hidden ? "password" : "text"} onChange={this.onChangePassword}    name="password"   id="password-field" />                    
                        &nbsp;
                      <i className={this.state.hidden ? "fa fa-eye" : "fa fa-eye-slash"} style={{fontSize : 25}} onClick={this.toggleShow}></i>                   
                      </InputGroup>
                      
                    <p className="text-muted">Employee Data</p>

                    Job Title* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="select" onChange={this.onChangeJobTitle}   >

                      <option></option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Director Financial">Director Financial</option>
                          <option value="Data Analyst">Data Analyst</option>
                          <option value="Developer">Developer</option>
                          <option value="Scrum Master">Scrum Master</option>
                          </Input>
                      </InputGroup>
            
                    Departement* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeDepartement}    />
                      </InputGroup>
                 
                    Status* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="select" onChange={this.onChangeStatus}   >
                      <option></option>
                          <option value="Contract">Contract</option>
                          <option value="Permanent">Permanent</option>
                          <option value="Probation">Probation</option>
                          <option value="Internship">Internship</option>
                      </Input>
                      </InputGroup>
                                     
                    Join Date* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="date" onChange={this.onChangeJoinDate} />
                      </InputGroup>
                                      
                    Coorporate Email* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeCoorporateEmail}   />
                      </InputGroup>

                    Skill Set &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input style={{ width: '45rem'}}  type="text" onChange={this.onChangeSkillSet}  />
                      </InputGroup>
            
                    <p className="text-muted">Assets</p>
                    
                    Asset* &nbsp;
                    <InputGroup className="mb-3"> 
                      <Input type="select" style={{ width: '45rem'}} value={this.state.value} onChange={this.onChangeAsset} >
                      <option></option>
                      <option value="Laptop">Laptop</option>
                      <option value="Card">Card</option>
                      <option value="Locker">Locker</option>
                      </Input>
                      </InputGroup>
           
                      Asset Number* &nbsp;            
                      <InputGroup className="mb-3"> 
                      <Input type="select" style={{ width: '45rem'}} value={this.state.value} onChange={this.onChangeAssetNumber}>
                      <option></option>
                      <option value="001">001</option>
                      <option value="002">002</option>
                      <option value="003">003</option>
                      </Input>
                      </InputGroup>

                   
                    {
                      this.state.newAsset.map((country,index)=>{
                        return(
                          
                          <div>
                      Asset* &nbsp;
                      <InputGroup className="mb-3"> 
                      <Input type="select" style={{ width: '45rem'}} value={this.state.value} onChange={this.onChangeAsset} >
                      <option></option>
                      <option value="Laptop">Laptop</option>
                      <option value="Card">Card</option>
                      <option value="Locker">Locker</option>
                      </Input>
                      </InputGroup>

                      Asset Number* &nbsp;            
                      <InputGroup className="mb-3"> 
                      <Input type="select" style={{ width: '45rem'}} value={this.state.value} onChange={this.onChangeAssetNumber}>
                      <option></option>
                      <option value="001">001</option>
                      <option value="002">002</option>
                      <option value="003">003</option>
                      </Input> 
                      </InputGroup>

                      <br></br>

                      <div className="kanan">
                      <Button style={{ marginBottom: '20px'}} onClick={(e)=>this.handleRemove(e)} color="danger">Remove</Button>&nbsp;
                      </div>
                          </div>
                          
                        )
                      })
                    } 

                  
                  <InputGroup className="mb-3"> 
                    <Button onClick={(e)=>this.addAssetField(e)} color="primary">+</Button>&nbsp;
                    
                    </InputGroup>
                                                                          
                    <p className="text-muted">Payroll Info</p>
                      
                    Salary* &nbsp;
                    <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeSalary}   />
                        &nbsp; <span style={{color:'red',display:this.state.validate?'none':''}}>Field Must be Number</span>
                        </InputGroup>
                           
                      Tax &nbsp;
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeTax}   />
                        &nbsp; <span style={{color:'red',display:this.state.validateTax?'none':''}}>Field Must be Number</span>
                        </InputGroup>
                        
               
                      BPJS Kesehatan &nbsp;
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeBpjsKesehatan} />
                        &nbsp; <span style={{color:'red',display:this.state.validatebpjsk?'none':''}}>Field Must be Number</span>
                        </InputGroup>
                        
          
                      BPJS Tenaga Kerja &nbsp;
                      <InputGroup className="mb-3"> 
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeBpjsTenaga} />
                        &nbsp; <span style={{color:'red',display:this.state.validatebpjst?'none':''}}>Field Must be Number</span>
                        </InputGroup>
                        
                                     
                      NPWP &nbsp;
                      <InputGroup className="mb-3">
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeNpwp} />
                        &nbsp; <span style={{color:'red',display:this.state.validatenpwp?'none':''}}>Field Must be Number</span>
                       </InputGroup>
                       
            
                      Name in Bank Account* &nbsp; 
                      <InputGroup className="mb-3">
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeNameinBank} />
                        </InputGroup>

                      Bank* &nbsp;
                      <InputGroup className="mb-3">
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeBank}  />
                        </InputGroup>
                     
                      Bank Account Number* &nbsp;
                      <InputGroup className="mb-3">
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeBankAccnum}  />
                        &nbsp; <span style={{color:'red',display:this.state.validatebankaccnum?'none':''}}>Field Must be Number</span>
                        </InputGroup>
                        
                                       
                      Bank Branch* &nbsp;
                      <InputGroup className="mb-3">
                        <Input style={{ width: '45rem'}} type="text" onChange={this.onChangeBankBranch}   />
                        </InputGroup>

                      <br></br>
                  </Form>
                </CardBody>
                
                <CardFooter className="p-4">    
                <div className="kanan">           
                    <Button onClick= {() => {window.location.href = '/#/account/listaccount';}} color="danger">Cancel</Button>&nbsp;
                    <Button onClick={this.handlesubmitAccountInformation} color="success">Create Account</Button>
                </div>
                 </CardFooter>
                
                </div> 
              </Card>  
            </Col>             
          </Row>

          
        
        </Container>

      </div>

                    {/* <DateRange
              format="DD/MM/YYYY"
              startDate={rangePicker["startDate"]}
              endDate={rangePicker["endDate"]}
              linkedCalendars={true}
              disableDaysBeforeToday={true}
              date={now => now}
              onInit={this.handleChange}
              onChange={this.handleChange} /> */}
              
 {/**/}



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
