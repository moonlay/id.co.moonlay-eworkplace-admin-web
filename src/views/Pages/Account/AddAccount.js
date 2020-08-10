import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {urlUser, divisionList, jobtitleList, urlRole} from '../../../Constant'
import $ from 'jquery';

class AddAccount extends Component {
      constructor(props){
          super(props);
          this.state={
            hidden: true,
            listRole : [],
            fullname : '',
            religion : '',
            employeeid  : '',
            email : '',
            password : '',
            dob : '',
            status : '',
            role : '',
            gender : '',
            departement : '',
            status : '',
            joindate : '',
            skillset : '',
            asset : '',
            assetnum : '',
            salary : '',
            tax : '',
            bpjskesehatan : '',
            bpjstenaga : '',
            npwp : '',
            nameinbank : '',
            bank : '',
            bankaccnum : '',
            bankbranch : '',
            phonenumber : '',
            coorporateemail : '',
            url : urlUser,
            step : 1,
            selectedRole : {},
            field:[],  
            
          }
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

      componentDidMount = () => {
        this.GetRoles();
        const dateTime =   new Date().toLocaleString();
        const value = localStorage.getItem("token");
        this.setState({
          token : value,
          dateTime : dateTime
        })

        var logged = localStorage.getItem("logged");
        if(logged === null ){
          //window.location.href = '/#/login';  
          this.props.history.push('/login')
        }

      }

    onhandleSubmit = (event) => {
      if (this.state.employeeid !== "" && this.state.employeeid !== null && this.state.password !== null && this.state.password !=="" 
      &&  this.state.fullname !== "" && this.state.fullname !== null && this.state.religion !== null && this.state.religion !== ""
      &&  this.state.gender !== "" && this.state.gender !== null && this.state.dob !== null && this.state.dob !== "" 
      && this.state.email !=="" && this.state.email !== "" && this.state.departement !== "" && this.state.departement !== null
      && this.state.status !== "" && this.state.status !== null && this.state.joindate !== "" && this.state.joindate !== null 
      && this.state.skillset !== "" && this.state.skillset !== null && this.state.asset !== "" && this.state.asset !== null
      && this.state.assetnum !== "" && this.state.assetnum !== null && this.state.salary !== "" && this.state.salary !== null
      && this.state.tax !== "" && this.state.tax !== null && this.state.bpjskesehatan !== "" && this.state.bpjskesehatan !== null
      && this.state.bpjstenaga !== "" && this.state.bpjstenaga !== null && this.state.npwp !== "" && this.state.npwp !== null
      && this.state.nameinbank !== "" && this.state.nameinbank !== null && this.state.bank !== "" && this.state.bank !== null
      && this.state.bankaccnum !== "" && this.state.bankaccnum !== null && this.state.bankbranch !== "" && this.state.bankbranch !== null
      && this.state.phonenumber !== "" && this.state.phonenumber !== null && this.state.coorporateemail !== "" && this.state.coorporateemail !== null ){
        const Header = {
          accept: 'application/json',
          Authorization : `Bearer ` + this.state.token,
          'Content-Type' : 'application/json-patch+json'
        }
      
        const headerlur = {
          accept: 'application/json',
          Authorization : `Bearer ` +  localStorage.getItem('token'),
          'Content-Type' : 'application/json-patch+json'
        }
        axios({
          method: 'get',
          url: urlRole + '/' + this.state.selectedRoleValue,
          headers: Header,
          //data: Data,
        }).then(data => {
          console.log(data.data.data)
            this.setState({
              roleId : data.data.data._id,
              roleCode : data.data.data.code,
              roleName : data.data.data.name,
            })
          })
          .then(
            datas => {
              //alert (this.state.roleCode)
              const Data = {
                employeeid : this.state.employeeid,
                password : this.state.password,
                departement : this.state.departement,
                status : this.state.status,
                joindate : this.state.joindate,
                skillset : this.state.skillset,
                asset : this.state.asset,
                assetnum : this.state.assetnum,
                salary : this.state.salary,
                tax : this.state.tax,
                bpjskesehatan : this.state.bpjskesehatan,
                bpjstenaga : this.state.bpjstenaga,
                npwp : this.state.npwp,
                nameinbank : this.state.nameinbank,
                bank : this.state.bank,
                bankaccnum : this.state.bankaccnum,
                bankbranch : this.state.bankbranch,
                phonenumber : this.state.phonenumber,
                coorporateemail : this.state.coorporateemail,
                isLocked : true,
                profile : {
                  fullname : this.state.fullname,
                  religion : this.state.religion,
                  gender : this.state.gender,
                  dob : this.state.dob,
                  email : this.state.email
                },
                "roles": [
                  {
                    "_id": this.state.roleId,
                    "code": this.state.roleCode,
                    "name": this.state.roleName
                  }
                ],
              }

              axios({
                method: 'post',
                url: urlUser,
                headers: headerlur,
                data: Data,
              })
              .then(data => {
                alert("berhasil");
               window.location.reload();
              })
              .catch(err => {
               alert("ERROR" + err)
              });  
            }
          )
          .catch(err => {
            alert(err);
          });
      }
      else{
        alert("Tidak Boleh Ada Data Yang Kosong")
      }
    }

    onhandleNext = () =>{
      if(this.state.employeeid === "" || this.state.employeeid === null || this.state.password === null || this.state.password ==="" 
      ||  this.state.fullname === "" || this.state.fullname === null || this.state.religion === null || this.state.religion === ""
      || this.state.email ==="" || this.state.email === ""){
      alert("tidak boleh ada data yang kosong")
      }else{
      this.setState({
        step : this.state.step+1
      })
    }
    }
    onChangeFullname = (e) => {
      this.setState({
        fullname : e.target.value
      })
    }

    onChangeReligion = (e) => {
      this.setState({
        religion : e.target.value
      })
    }

    onChangeEmployeeID = (e) => {
      this.setState({
        employeeid : e.target.value
      })
    }

    onChangeEmail = (e) => {
      this.setState({
        email : e.target.value
      })
    }

    onchagePassword = (e) => {
      this.setState({
        password : e.target.value
      })
    }

    onChangeDob = (e) => {
      this.setState({
        dob : e.target.value
      })
    }

    onChangeDepartement = (e) => {
      this.setState({
        departement : e.target.value
      })
    }

    onChangeStatus = (e) => {
      this.setState({
        status : e.target.value
      })
    }

    onChangeJoindate = (e) => {
      this.setState({
        joindate : e.target.value
      })
    }

    onChangeSkillset = (e) => {
      this.setState({
        skillset : e.target.value
      })
    }

    onChangeAsset = (e) => {
      this.setState({
        asset : e.target.value
      })
    }

    onChangeAssetnum = (e) => {
      this.setState({
        assetnum : e.target.value
      })
    }

    onChangeSalary = (e) => {
      this.setState({
        salary : e.target.value
      })
    }

    onChangeTax = (e) => {
      this.setState({
        tax : e.target.value
      })
    }

    onChangeBpjskesehatan = (e) => {
      this.setState({
        bpjskesehatan : e.target.value
      })
    }

    onChangeBpjstenaga = (e) => {
      this.setState({
        bpjstenaga : e.target.value
      })
    }

    onChangeNpwp = (e) => {
      this.setState({
        npwp : e.target.value
      })
    }

    onChangeNameinbank = (e) => {
      this.setState({
        nameinbank : e.target.value
      })
    }

    onChangeBank = (e) => {
      this.setState({
        bank : e.target.value
      })
    }

    onChangeBankaccnum = (e) => {
      this.setState({
        bankaccnum : e.target.value
      })
    }

    onChangeBankbranch = (e) => {
      this.setState({
        bankbranch : e.target.value
      })
    }

    onChangePhonenumber = (e) => {
      this.setState({
        phonenumber : e.target.value
      })
    }

    onChangeCoorporateemail = (e) => {
      this.setState({
        coorporateemail : e.target.value
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

    onChangeGender = (e) => {
      this.setState({
        gender : e.target.value
      })
    } 

    onhandlePrevius = () => {
     this.setState({
       step : this.state.step -1
     })
    }
    onhandleBack = (e) =>{
      //window.location.href = '/';  
      this.props.history.push('/account/listaccount');
    }

    addField(){
      this.setState({field: [...this.state.field, ""]})
    }

    handleChange(e, index){
      this.state.field[index] = e.target.value

      this.setState({countries: this.state.field})
    }

    handleRemove(index){
      this.state.field.splice(index,1)

      console.log(this.state.countries, "$$$$");

      this.setState({field: this.state.field})
    }

    toggleShow = (e) => {
      this.setState({ 
        hidden: !this.state.hidden, 
        });
    }
    render(){
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

    return (
      <div className="app flex-row align-items-top">        
        <Container style={{ width: '50rem', marginLeft: '12px'}}>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card  style={{ width: '60rem', marginLeft: '12px'}} className="mx-4">
              <div className="auto">
                <CardBody className="p-4">
                  <Form>                   
                    <h1>Create an Employee Account</h1>                    
                    <p className="text-muted">Personal Data </p>

                    Full Name*
                    <div >
                      <input style={{ width: '55rem', height: '30px'}}  type="text" onChange={this.onChangeFullname}  autoComplete="fullname" />                     
                    </div>

                    <br></br>

                    EmployeeID* &nbsp;  
                    <div>
                      <input style={{ width: '55rem', height: '30px'}}  type="text" type="text" onChange={this.onChangeEmployeeID}  autoComplete="employeeid" />
                    </div>

                    <br></br>

                    Birthday* &nbsp;   
                    <div>                
                      <input style={{ width: '55rem', height: '30px'}} type="date" onChange={this.onChangeDob}  />
                    </div> 
            
                    <br></br>
                    
                    Gender*
                    <div> 
                      
                      <select style={{ width: '55rem', height: '30px'}}  value={this.state.value} onChange={this.onChangeGender}>
                      <option></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      </select>
                      </div>
                      <br></br>

                    Religion*
                      <div> 


                      <select style={{ width: '55rem', height: '30px'}}  value={this.state.value} onChange={this.onChangeReligion}>
                      <option></option>
                      <option value="Male">Islam</option>
                      <option value="Female">Kristen</option>
                      <option value="Female">Katolik</option>
                      <option value="Female">Buddha</option>
                      <option value="Female">Hindu</option>
                      <option value="Female">Kong Hu Cu</option>
                      </select>
        
                      </div>

                      <br></br>

                      Phone Number* &nbsp; 
                      <div>            
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangePhonenumber}  autoComplete="phonenumber" />
                      </div>

                      <br></br>

                      Personal Email* &nbsp; 
                      <div>  
                        <input style={{ width: '55rem', height: '30px' }} type="text" onChange={this.onChangeEmail}  autoComplete="email" />
                      </div>

                      <br></br>

                      Password*
                      <div> 
                        <input style={{ width: '53rem', height: '30px' }} type={this.state.hidden ? "password" : "text"} onChange={this.onchagePassword}    name="password"  autoComplete="new-password" id="password-field" />                    
                    &nbsp;
                      <i className={this.state.hidden ? "fa fa-eye" : "fa fa-eye-slash"} style={{fontSize : 25}} onClick={this.toggleShow}></i>         
          
                      </div>
                      <br></br>

                    <p className="text-muted">Employee Data</p>
                    {/* <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup> */}
                    
                    
                    {/*<Row>
                    <Col style={{marginRight:'-30px'}} md={3} ><InputGroupText>
                          Job Title*
                        </InputGroupText>
                    </Col>
                    <Col>     <Select
                      name="form-field-name"
                      value={this.state.selectedRole}
                      onChange={this.onChangeRole}
                      options={roleList} /> <br /></Col>
                    </Row>*/}

                     Job Title* &nbsp;
                    <div> 
                      <select style={{ width: '55rem', height: '30px'}} value={this.state.value} onChange={this.onChangeRole} >
                      <option></option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Director Financial">Director Financial</option>
                      <option value="Data Analyst">Data Analyst</option>
                      <option value="Developer">Developer</option>
                      <option value="Scrum Master">Scrum Master</option>
                      
                      </select>
                    </div>

                    <br></br>

                    Departement* &nbsp;
                    <div> 
                      <input style={{ width: '55rem', height: '30px'}}  type="text" onChange={this.onChangeDepartement}   autoComplete="departement" />
                    </div>

                    <br></br>

                    Status* &nbsp;
                    <div> 
                      <input style={{ width: '55rem', height: '30px'}}  type="text" onChange={this.onChangeStatus}  autoComplete="status" />
                    </div>

                    <br></br>
                    
                    Join Date* &nbsp;
                    <div> 
                      <input style={{ width: '55rem', height: '30px'}}  type="date" onChange={this.onChangeJoindate} />
                    </div>

                    <br></br>
                    
                    Coorporate Email* &nbsp;
                    <div> 
                      <input style={{ width: '55rem', height: '30px'}}  type="text" onChange={this.onChangeCoorporateemail}  autoComplete="coorporateemail" />
                    </div>

                    <br></br>

                    Skill Set &nbsp;
                    <div> 
                      <input style={{ width: '55rem', height: '30px'}}  type="text" onChange={this.onChangeSkillset}  autoComplete="skillset" />
                    </div>

                    <br></br>

                    <p className="text-muted">Assets</p>
                    
                    Asset* &nbsp;
                    <div> 
                      <select style={{ width: '55rem', height: '30px'}} value={this.state.value} onChange={this.onChangeAsset} >
                      <option></option>
                      <option value="Laptop">Laptop</option>
                      <option value="Card">Card</option>
                      <option value="Locker">Locker</option>
                      </select>
                    </div>

                      <br></br>

                      Asset Number* &nbsp;            
                    <div> 
                      <select style={{ width: '55rem', height: '30px'}} value={this.state.value} onChange={this.onChangeAssetnum}>
                      <option></option>
                      <option value="001">001</option>
                      <option value="002">002</option>
                      <option value="003">003</option>
                      </select>
                    </div>

                    <br></br> 

                    {
                      this.state.field.map((country,index)=>{
                        return(
                        <div>
                          <br></br> 
                        <div>

                        Asset* &nbsp;
                          <div> 
                          <select style={{ width: '55rem', height: '30px'}} value={this.state.value} onChange={this.onChangeAsset} >
                          <option></option>
                          <option value="Laptop">Laptop</option>
                          <option value="Card">Card</option>
                          <option value="Locker">Locker</option>
                          </select>
                          </div>
    
                          <br></br>

                        Asset Number* &nbsp;          
                        <div> 
                          <select style={{ width: '55rem', height: '30px'}} value={this.state.value} onChange={this.onChangeAssetnum}>
                          <option></option>
                          <option value="001">001</option>
                          <option value="002">002</option>
                          <option value="003">003</option>
                          </select>
                        </div>
                        </div>
                        </div>
                        )
                      })
                    }

                    <br></br>

                    <div>
                    <Button onClick={(e)=>this.addField(e)} color="primary">+</Button>&nbsp;
                    <Button onClick={(e)=>this.handleRemove(e)} color="danger">x</Button>&nbsp;
                    </div>     
                      

                    <br></br>
                    
                    
                    <p className="text-muted">Payroll Info</p>
                      
                    Salary* &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeSalary}  autoComplete="salary" />
                      </div>

                      <br></br>
                      
                      Tax &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeTax}  autoComplete="tax" />
                      </div>

                      <br></br>

                      BPJS Kesehatan &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeBpjskesehatan}  autoComplete="bpjskesehatan" />
                      </div>

                      <br></br>

                      BPJS Tenaga Kerja &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeBpjstenaga}  autoComplete="bpjstenaga" />
                      </div>

                      <br></br>
                      
                      NPWP &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeNpwp}  autoComplete="npwp" />
                      </div>

                      <br></br>

                      Name in Bank Account* &nbsp; 
                      <div>     
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeNameinbank}  autoComplete="nameinbank" />
                      </div>

                      <br></br>

                      Bank* &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeBank} autoComplete="bank" />
                      </div>

                      <br></br>

                      Bank Account Number* &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeBankaccnum}  autoComplete="bankaccnum" />
                      </div>

                      <br></br>
                      
                      Bank Branch* &nbsp;
                      <div> 
                        <input style={{ width: '55rem', height: '30px'}} type="text" onChange={this.onChangeBankbranch}  autoComplete="bankbranch" />
                      </div>

                      <br></br>
                  </Form>
                </CardBody>
                
                <CardFooter className="p-4">    
                <div className="kanan">           
                    <Button onClick={this.onhandleBack} color="danger">Cancel</Button>&nbsp;
                    <Button onClick={this.onhandleSubmit} color="success">Create Account</Button>
                </div>
                 </CardFooter>
                
                </div> 
              </Card>  
            </Col>             
          </Row>

          
        
        </Container>

      </div>
      );
    }
  }


  export default AddAccount;
