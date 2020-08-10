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
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlJobtitle,urlFamilyData, urlContact, urlRole, urlInformalEducationData, urlWorkingExperienceData, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      listfamily:[],
      listcontact:[],
      listInformalEducation:[],
      listWorkingExperience:[],
      listDivison : [],
      loading: true,
      url: urlRole,
      isChecked:false,
      currentPage: 1,
      isCheckedUpdate :false,
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      selectedDivision :{},
      stream : null,
      listJobtitle : {},
      selectedRolePermisiion : {},
      showDetails : false,
      showAddFam : false,
      showEdFam : false,
      showAddEmergency : false,
      showEdEmergency : false,
      showAddInf : false,
      showEdInf : false,
      showAddEx : false,
      showEdEx : false
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleCheckUpdate = ()=>{
    this.setState({
      isCheckedUpdate : !this.state.isCheckedUpdate
    })
  }

  //For Handle Part of Tab
  handleAddFamilyData = () => {
    this.setState({
      showAddFam : true
    })
  }
  handleEditFamilyData = () => {
    this.setState({
      showEdFam : true
    })
  }
  handleAddEmergencyContacts = () => {
    this.setState({
      showAddEmergency : true
    })
  }
  handleEditEmergencyContacts = () => {
    this.setState({
      showEdEmergency : true
    })
  }
  handleAddInformalEd = () => {
    this.setState({
      showAddInf : true
    })
  }
  handleEditInformalEd = () => {
    this.setState({
      showEdInf : true
    })
  }
  handleAddExperience = () => {
    this.setState({
      showAddEx : true
    })
  }
  handleEditExperience = () => {
    this.setState({
      showEdEx : true
    })
  }

  //For Handle Click
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

  //For Handle Close Modal
  handleClose = () => {
    this.setState({ showAddFam: false, showEdFam: false, showAddEmergency: false, showEdEmergency: false,
      showAddInf: false, showEdInf: false, showAddEx: false, showEdEx: false, show: false, showDetails : false});
  }

  //For Checking
  handleCheck = ()=>{
    var Checked = this.state.isChecked;
    this.setState({
      isChecked:!Checked
    })
  }

  //For Family Data Field
  handleFullName = (e)=>{
    this.setState({
      FullNameOfFamily : e.target.value,
    })
  }
  handleRelationship = (e)=>{
    this.setState({
      Relationship:e.target.value
    })
  }
  handleGender = (e)=>{
    this.setState({
      Gender:e.target.value
    })
  }
  handleKtp = (e)=>{
    if(e.target.value !==  /^[0-9]*$/.test(e.target.value)){
      console.log("Salah");
    }else{
      this.setState({
        KTPNumber:e.target.value,
      })
    }
    
  }
  handleReligion = (e)=>{
    this.setState({
      Religion:e.target.value,
    })
  }
  handleDob = (e)=>{
    this.setState({
      DOBFamily:e.target.value
    })
  }
  handlePhone = (e)=>{
    this.setState({
      PhoneNumber:e.target.value,
    })
  }

  //For Emergency Contact Field
  handleNameOfContact = (e)=>{
    this.setState({
      NameOfContact:e.target.value,
    })
  }

  //For Informal Education History Field
  handleHeldBy = (e)=>{
    this.setState({
      HeldBy:e.target.value,
    })
  }
  handleJobPosition = (e)=>{
    this.setState({
      JobPosition:e.target.value,
    })
  }
  handleStartDate = (e)=>{
    this.setState({
      StartDate:e.target.value,
    })
  }
  handleEndDate = (e)=>{
    this.setState({
      EndDate:e.target.value,
    })
  }
  handleDescription = (e)=>{
    this.setState({
      Description:e.target.value,
    })
  }
  handleCertificate = (e)=>{
    this.setState({
      Certificate:e.target.value,
    })
  }

  //For Working Experience Field
  handleCompany = (e)=>{
    this.setState({
      Company:e.target.value,
    })
  }
  handleJobPosition = (e)=>{
    this.setState({
      JobPosition:e.target.value,
    })
  }
  handleTanggaMulai= (e)=>{
    this.setState({
      TanggalMulai:e.target.value,
    })
  }
  handleTanggalSelesai = (e)=>{
    this.setState({
      TanggalSelesai:e.target.value,
    })
  }
  handleDeskripsi = (e)=>{
    this.setState({
      Deskripsi:e.target.value,
    })
  }
  handleSertifikat = (e)=>{
    this.setState({
      Sertifikat:e.target.value,
    })
  }

  ///Create, Read, Delete///

  //For Submit Family Data
  handlesubmitform = ()=>{
    if(this.state.PhoneNumber === undefined || this.isChecked === false){
      const Data = {
        "FullNameOfFamily":this.state.FullNameOfFamily,
        "Relationship":this.state.Relationship,
        "DOBFamily":this.state.DOBFamily,
        "Religion":this.state.Religion,
        "Gender":this.state.Gender,
        "KTPNumber":this.state.KTPNumber,
        "NameOfContact":"",
        "PhoneNumber":"",
      }
      console.log(Data);
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
        url:urlFamilyData,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log("Berhasil");
        alert('berhasil ditambahkan');
        window.location.reload();
      })
    }else{
      const Data = {
        "FullNameOfFamily":this.state.FullNameOfFamily,
        "Relationship":this.state.Relationship,
        "DOBFamily":this.state.DOBFamily,
        "Religion":this.state.Religion,
        "Gender":this.state.Gender,
        "KTPNumber":this.state.KTPNumber,
        "NameOfContact":this.state.NameOfContact,
        "PhoneNumber":this.state.PhoneNumber
      }
      const Contact = {
        "NameOfContact":this.state.FullNameOfFamily,
        "Relationship":this.state.Relationship,
        "PhoneNumber":this.state.PhoneNumber,
      }
      const value = localStorage.getItem('token');
      this.setState({
        token: value,
      });
      const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
        // 'Content-Type' : 'application/json-patch+json'
      };
      console.log(Data);
      console.log(Contact);
         axios({
         method:'post',
         url:urlFamilyData,
         headers:Header,
         data:Data
       }).then(data=>{
         console.log("Berhasil");
       })
       axios({
         method:'post',
         url:urlContact,
         headers:Header,
         data:Contact
       }).then(data=>{
        console.log("Berhasil");
        alert('berhasil ditambahkan');
        window.location.reload();
       })
    }
  }

  //For Submit Emergency Contact
  handlesubmitEmergencyContactData= ()=>{
      const Data = {
        "NameOfContact":this.state.NameOfContact,
        "Relationship":this.state.Relationship,
        "PhoneNumber":this.state.PhoneNumber,
      }
      console.log(Data);
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
        url:urlContact,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log("Berhasil");
        alert('berhasil ditambahkan');
        window.location.reload();
      })
    }

  //For Submit Informal Education Data
  handlesubmitInformalEducationData= ()=>{
    if(this.state.Certificate === undefined || this.isChecked === false){
      const Data = {
        "HeldBy":this.state.HeldBy,
        "JobPosition":this.state.JobPosition,
        "StartDate":this.state.StartDate,
        "EndDate":this.state.EndDate,
        "Description":this.state.Description,
        "Certificate":"",
      }
      console.log(Data);
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
        url:urlInformalEducationData,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log("Berhasil");
        alert('berhasil ditambahkan');
        window.location.reload();
      })
      }else{
      const Data = {
        "HeldBy":this.state.HeldBy,
        "StartDate":this.state.StartDate,
        "EndDate":this.state.EndDate,
        "Description":this.state.Description,
        "Certificate":this.state.ertificate,
      }

      const value = localStorage.getItem('token');
      this.setState({
        token: value,
      });
      const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
        // 'Content-Type' : 'application/json-patch+json'
      };
      console.log(Data);
    }
  }

  //For Submit Working Experience
  handlesubmitWorkingExperienceData = ()=>{
    if(this.state.Sertifikat === undefined || this.isChecked === false){
      const Data = {
        "Company":this.state.Company,
        "JobPosition":this.state.JobPosition,
        "TanggalMulai":this.state.TanggalMulai,
        "TanggalSelesai":this.state.TanggalSelesai,
        "Deskripsi":this.state.Deskripsi,
        "Sertifikat":"",
      }
      console.log(Data);
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
        url:urlWorkingExperienceData,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log("Berhasil");
        alert('berhasil ditambahkan');
        window.location.reload();
      })
    }else{
      const Data = {
        "Company":this.state.Company,
        "JobPosition":this.state.JobPosition,
        "TanggalMulai":this.state.TanggalMulai,
        "TanggalSelesai":this.state.TanggalSelesai,
        "Deskripsi":this.state.Deskripsi,
        "Sertifikat":this.state.Sertifikat,
      }

      const value = localStorage.getItem('token');
      this.setState({
        token: value,
      });
      const Header = {
      accept: 'application/json',
      Authorization : `Bearer ` + value,
        // 'Content-Type' : 'application/json-patch+json'
      };
      console.log(Data);
    }
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
      console.log(data.data);
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
      console.log(data.data);
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
      console.log(data.data);
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
      console.log(data.data);
    })
  }

  //For Delete Family Data
  deleteFamilyData(familydata) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlFamilyData + '/' + familydata,
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

  //For Delete Emergency Contact
  deleteContact(contact) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlContact + '/' + contact,
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

  //For Delete Informal Education
  deleteInformal(informal) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlInformalEducationData + '/' + informal,
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

  //For Delete Working Experience
  deleteExperience(experience) {
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlWorkingExperienceData + '/' + experience,
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

  //Handle Show Modal Edit
  editFamilyData = (id)=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    this.setState({
      showEdFam:true
    })
    axios({
      url:urlFamilyData+'/'+id,
      method:'get',
      headers:Header
    }).then(data=>{
      this.setState({
        "FullNameOfFamily":data.data.FullNameOfFamily,
        "FamilyId":data.data.Id,
        "Relationship" : data.data.Relationship,
        "DOBFamily" : data.data.DOBFamily,
        "Religion":data.data.Religion,
        "Gender":data.data.Gender,
        "KTPNumber" : data.data.KTPNumber,
        "PhoneNumber":data.data.PhoneNumber
      })
    })
  }
  //Handle Form Edit














  handleUpdateForm = (id)=>{
    if(this.state.isCheckedUpdate === false || this.state.PhoneNumber === undefined){
      const Data = {
        "FullNameOfFamily":this.state.FullNameOfFamily,
        "Relationship":this.state.Relationship,
        "DOBFamily":this.state.DOBFamily,
        "Religion":this.state.Religion,
        "Gender":this.state.Gender,
        "KTPNumber":this.state.KTPNumber,
        "NameOfContact":"",
        "PhoneNumber":"",
      }
      console.log(Data);
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
        method:'put',
        url:urlFamilyData+'/'+id,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log('Berhasil');
        window.location.reload();
      })
    }
  }
  render() {

  //For Family Data Table

  const { results, listfamily, currentPage, resultsPerPage } = this.state;
  const indexOfLastTodo = currentPage * resultsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
  const currentlistfamily = listfamily.slice(indexOfFirstTodo, indexOfLastTodo);
  //const {listfamily} = this.state;
  let num = 1;

  const renderlistfamily = currentlistfamily.map((family,index)=>{
    return(
      <tr key={family.Id} data-category = {family.Id}>
        <td>{num++}</td>
        <td>{family.FullNameOfFamily}</td>
        <td>{family.Relationship}</td>
        <td>{family.DOBFamily==null?family.DOBFamily:family.DOBFamily.substr(0,10)}</td>
        <td>{family.Religion}</td>
        <td>{family.Gender}</td>
        <td>{family.KTPNumber}</td>
        <td>
              <Button
              color="warning"
              onClick={() => this.editFamilyData(family.Id)}
              style={{marginRight:'4px'}}>
               Edit
              </Button>
              <Button
              color="danger"
              onClick={() => this.deleteFamilyData(family.Id)}>
              Delete
              </Button>
        </td>
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
        <td>
              <Button
              color="warning"
              onClick={() => this.editEmergencyContactData(contact.Id)}
              style={{marginRight:'4px'}}>
               Edit
              </Button>
              <Button
              color="danger"
              onClick={() => this.deleteContact(contact.Id)}>
               Delete
              </Button>
        </td>
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
        <td>
              <Button
              color="warning"
              onClick={() => this.editInformalEducationData(informal.Id)}
              style={{marginRight:'4px'}}>
               Edit
              </Button>
              <Button
              color="danger"
              onClick={() => this.deleteInformal(informal.Id)}>
              Delete
              </Button>
        </td>
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
        <td>
              <Button
              color="warning"
              onClick={() => this.editWorkingExperienceData(experience.Id)}
              style={{marginRight:'4px'}}>
               Edit
              </Button>
              <Button
              color="danger"
              onClick={() => this.deleteExperience(experience.Id)}>
              Delete
              </Button>
        </td>
      </tr>
    )
  })

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
      {/*Modal buat detail */}

        {/* Add Family Data */}
        <Modal size="lg" show={this.state.showAddFam} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Family Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
              <div className="col">
              &nbsp; Full Name*
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input type="text" onChange={this.handleFullName} />
              </InputGroup>
              </div>

              <div className="col">
              &nbsp; Religion
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input  type="select" onChange={this.handleReligion} >
                  <option></option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Kong Hu Cu">Kong Hu Cu</option>
                </Input>
              </InputGroup>
              </div>
              </div>

              <div className="row">
              <div className="col">
              &nbsp; Relationship*
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input type="text" onChange={this.handleRelationship} />
              </InputGroup>
              </div>

              <div className="col">
              &nbsp; Gender
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input type="select" onChange={this.handleGender}>
                  <option></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              </InputGroup>
              </div>
              </div>

              <div className="row">
              <div className="col">
              &nbsp; Date of Birth
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input   type="date" onChange={(e)=>{this.handleDob(e)}}/>
              </InputGroup>
              </div>

              <div className="col">
              &nbsp; KTP Number
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input   type="text" onChange={this.handleKtp} />
              </InputGroup>
              </div>
              </div>

              <div className="form-check">
                <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
                <label>Add to Emergency Contact</label>
              </div>
                <Input type="text" placeholder="Phone Number" onChange={this.handlePhone} style={{display:this.state.isChecked?'':'none'}} />
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handlesubmitform}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of modal add family data */}

        {/* Edit Family Data */}
        <Modal size="lg" show={this.state.showEdFam} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Family Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
              <div className="col">
              &nbsp; Full Name*
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input type="text" onChange={this.handleFullName} value={this.state.FullNameOfFamily ?this.state.FullNameOfFamily:'' } />
              </InputGroup>
              </div>

              <div className="col">
              &nbsp; Religion
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input defaultValue={this.state.Religion ? this.state.Religion:''}  type="select" onChange={this.handleReligion}>
                  <option></option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Kong Hu Cu">Kong Hu Cu</option>
                </Input>
              </InputGroup>
              </div>
              </div>

              <div className="row">
              <div className="col">
              Relationship*
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input   type="text" value={this.state.Relationship ? this.state.Relationship: ""} onChange={this.handleRelationship}/>
              </InputGroup>
              </div>

              <div classname="col">
              Gender
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input type="select" onChange={this.handleGender}>
                  <option></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              </InputGroup>
              </div>
              </div>

              <div classname="row">
              <div classname="col">
              &nbsp; Date of Birth
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input  value={this.state.DOBFamily?this.state.DOBFamily:""} type="date" onChange={this.handleDob} />
              </InputGroup>
              </div>

              <div class="col">
              &nbsp; KTP Number
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input value={this.state.KTPNumber?this.state.KTPNumber:""}   type="text" onChange={this.handleKtp} />
              </InputGroup>
              </div>
              </div>

              <div class="form-check">
              <Input type="checkbox" onChange={this.handleCheckUpdate} checked={this.state.isCheckedUpdate} />
                <label  >Add to Emergency Contact</label>
              </div>
              <Input type="text" placeholder="Phone Number" onChange={this.handlePhone} value={this.state.PhoneNumber?this.state.PhoneNumber:""} style={{display:this.state.isCheckedUpdate?'':'none'}} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
            onClick={()=>this.handleUpdateForm(this.state.FamilyId)} 
            color="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Edit Family Data Modal */}

      {/* Add Emergency Contact Modal */}
        <Modal size="lg" show={this.state.showAddEmergency} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Emergency Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              Name*
              <InputGroup className="mb-3">
                <Input type="text" onChange={this.handleNameOfContact}  />
              </InputGroup>

              Relationship*
              <InputGroup className="mb-3">
                <Input type="text" onChange={this.handleRelationship}  />
              </InputGroup>

              Phone Number*
              <InputGroup className="mb-3">
                <Input type="text" onChange={this.handlePhone}  />
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handlesubmitEmergencyContactData}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Add Emergency Contact Modal */}

        {/* Edit Emergency Contact Modal */}
        <Modal size="lg" show={this.state.showEdEmergency} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Emergency Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              Name*
              <InputGroup className="mb-3">
              <Input type="text" onChange={this.handleNameOfContact}  />
              </InputGroup>

              Relationship*
              <InputGroup className="mb-3">
              <Input type="text" onChange={this.handleRelationship}  />
              </InputGroup>

              Phone Number*
              <InputGroup className="mb-3">
              <Input type="text" onChange={this.handlePhone}  />
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Edit Emergency Contact Modal */}

        {/* Add Informal Education History Modal */}
        <Modal size="lg" show={this.state.showAddInf} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Informal Education History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <div class="row">
            <div class="col">
            &nbsp; Company*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="text" onChange={this.handleHeldBy} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleStartDate} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="text" onChange={this.handleJobPosition} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="date" onChange={this.handleEndDate} />
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="textarea" onChange={this.handleDescription}  />
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
              <label>Certification</label>
            </div>

            <div style={{ width: '20rem', display:this.state.isChecked?'':'none'}} color="success" className="form-group">
              <Input type="file" multiple onChange={this.handleCertificate} checked={this.state.isChecked} />
            </div>

          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handlesubmitInformalEducationData}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Add Informal Education History Modal */}

        {/* Edit Informal Education History Modal */}
        <Modal size="lg" show={this.state.showEdInf} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Informal Education History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <div class="row">
            <div class="col">
            &nbsp; Company*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="text" onChange={this.handleCode} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleName} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input   type="text" onChange={this.handleCode}/>
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleName} />
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input   type="textarea" onChange={this.handleCode} />
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
              <label>Certification</label>
            </div>

            <Button style={{ width: '10rem', display:this.state.isChecked?'':'none'}} color="success" onClick={this.handleClose}>
              Attach File
            </Button>
            &nbsp;
            <Button style={{ display:this.state.isChecked?'':'none'}} color="success" onClick={this.handleClose}>
              +
            </Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Edit Informal Education History Modal */}

        {/* Add Working Experience Modal */}
        <Modal size="lg" show={this.state.showAddEx} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Working Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <div class="row">
            <div class="col">
            &nbsp; Company*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="text" onChange={this.handleCompany} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleTanggaMulai} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="text" onChange={this.handleJobPosition}/>
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleTanggalSelesai} />
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="textarea" onChange={this.handleDeskripsi} />
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
              <label>Certification</label>
            </div>

            <div style={{ width: '20rem', display:this.state.isChecked?'':'none'}} color="success" className="form-group">
              <Input type="file" multiple onChange={this.handleCertificate} checked={this.state.isChecked} />
            </div>

          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handlesubmitWorkingExperienceData}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Add Working Experience Modal */}

        {/* Edit Working Experience Modal */}
        <Modal size="lg" show={this.state.showEdEx} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Working Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <div class="row">
            <div class="col">
            &nbsp; Company*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="text" onChange={this.handleCode} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleName} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="text" onChange={this.handleCode}/>
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  type="date" onChange={this.handleName}/>
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input type="textarea" onChange={this.handleCode}/>
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
              <label>Certification</label>
            </div>

            <Button style={{ width: '10rem', display:this.state.isChecked?'':'none'}} color="success" onClick={this.handleClose}>
              Attach File
            </Button>
            &nbsp;
            <Button style={{ display:this.state.isChecked?'':'none'}} color="success" onClick={this.handleClose}>
              +
            </Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End of Working Experience Modal */}

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
                        <i className="fa fa-user" /> <b>&nbsp;Edit, Add; or Delete Spesific Information About an Employee</b>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Tabs>
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

                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &nbsp; Employee ID* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; Username* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; Religion* &nbsp;
                          <Input style={{fontSize: '15px'}} type="select" autoComplete="Username" value={this.state.divisionsName} >
                          <option></option>
                          <option value="Male">Islam</option>
                          <option value="Female">Kristen</option>
                          <option value="Female">Katolik</option>
                          <option value="Female">Buddha</option>
                          <option value="Female">Hindu</option>
                          <option value="Female">Kong Hu Cu</option>
                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >&emsp; Full Name* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Phone Number* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; &emsp; Gender* &nbsp;
                          <Input style={{fontSize: '15px'}} type="select" autoComplete="Username" value={this.state.divisionsName} >
                          <option></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" >&nbsp; &nbsp; Personal Email* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >  Date Of Birth* &nbsp;
                          <Input style={{fontSize: '15px'}} type="date" autoComplete="Username" value={this.state.divisionsName} />
                          </InputGroup>

                        </Row>
                        </Col>

                        <Button style={{ float: 'right', marginRight: '40px'}} color="primary" onClick={this.handelsubmitform}>
                          Save Personal Data
                          </Button>

                      </Form>

                      </TabPanel>

                      <TabPanel>
                      <br></br>
                      <br></br>

                      <Form>
                        <Col>
                        <Row>

                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; &nbsp; &nbsp; Job Title* &nbsp;

                          <Input type="select" style={{ fontSize: '15px'}}  value={this.state.divisionsName}  >
                          <option></option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Director Financial">Director Financial</option>
                          <option value="Data Analyst">Data Analyst</option>
                          <option value="Developer">Developer</option>
                          <option value="Scrum Master">Scrum Master</option>
                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; &nbsp; Join Date* &nbsp;
                          <Input style={{fontSize: '15px'}} type="date" autoComplete="Username" value={this.state.divisionsName} />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > Departement* &ensp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Coorporate Email* &nbsp;
                          <Input style={{fontSize: '15px'}} type="text" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &ensp; &emsp; &emsp; Status* &nbsp;
                          <Input type="select" style={{ fontSize: '15px'}} value={this.state.divisionsName} >
                          <option></option>
                          <option value="Contract">Contract</option>
                          <option value="Permanent">Permanent</option>
                          <option value="Probation">Probation</option>
                          <option value="Internship">Internship</option>

                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; &ensp; &nbsp;  Skill Set &ensp;
                          <Input style={{fontSize: '15px', height:'90px'}} type="textarea" autoComplete="Username" value={this.state.divisionsName}  />
                          </InputGroup>

                        </Row>
                        </Col>

                        <Button style={{ float: 'right', marginRight: '40px'}} color="primary" onClick={this.handelsubmitform}>
                          Save Employement Data
                          </Button>
                      </Form>

                      </TabPanel>

                      <TabPanel>
                        <Form>
                        <br></br>
                        <label style={{fontSize: '22px', marginRight: '5px'}}>&ensp; Family Data
                        <Button
                                color="success"
                                style={{ margin: '10px'}}
                                onClick={() => this.handleAddFamilyData(results._id)}>
                                Add New
                        </Button>
                        </label>

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
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>{
                                          renderlistfamily
                                          }</tbody>
                                        </Table>

                        <label style={{fontSize: '21px', marginRight: '5px'}}>&ensp; Emergency Contacts
                        <Button
                                color="success"
                                style={{ margin: '10px'}}
                                onClick={() => this.handleAddEmergencyContacts(results._id)}>
                                Add New
                        </Button>
                        </label>

                        <Table id="myTable" responsive striped>
                                          <thead>
                                            <tr>
                                              <th>No</th>
                                              <th>Name</th>
                                              <th>Relationship</th>
                                              <th>Phone Number</th>
                                              <th>Action</th>

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

                         <label style={{fontSize: '21px', marginRight: '5px'}}>&ensp; Informal Education History
                          <Button
                                  color="success"
                                  style={{ margin: '10px'}}
                                  onClick={() => this.handleAddInformalEd(results._id)}>
                                  Add New
                          </Button>
                          </label>

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
                                                <th>Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>{
                                            renderInformalEd
                                              }</tbody>
                                          </Table>
                            <br></br>

                          <label style={{fontSize: '22px', marginRight: '5px'}}>&ensp; Working Experience
                          <Button
                                  color="success"
                                  style={{ margin: '10px'}}
                                  onClick={() => this.handleAddExperience(results._id)}>
                                  Add New
                          </Button>
                          </label>

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
                                                <th>Action</th>

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