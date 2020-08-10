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
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react';
import Select from 'react-select';
import {urlJobtitle,urlFamilyData, urlContact, urlRole, urlInformalEducationData, urlWorkingExperienceData, 
  permisionRoleIdList, urlAccountInformation} from '../../../Constant'
import { da } from 'date-fns/locale';
//const $ = require('jquery');
const moment = require('moment');
const SweetAlert = require('react-bootstrap-sweetalert');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAccount : [],
      results: [],
      idaccount : props.id,
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
      showEdEx : false,
      showTabAccount:false,
      validate : true,
      validatePhone: true,
      validateFullName: true,
      validateEditphone: true,
      NameOfContact: '',
      Relationship:'',
      PhoneNumber:'',
      HeldBy: '',
      JobPosition: '',
      StartDate: '',
      EndDate: '',
      Company: '',
      JobPositionExperience: '',
      TanggalMulai: '',
      TanggalSelesai: '',
      

    };
    this.handleClick = this.handleClick.bind(this);
  }

  //// OnChange Field ////
  //Account Field
  onChangeEmployeeID = (e) => {
    this.setState({
      EmployeeID : e.target.value
    })
  }
  onChangeFullName = (e) => {
    this.setState({
      Fullname : e.target.value,
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
          validateEditphone:true,
          EmployeePhoneNumber : e.target.value,
      })
  }else{
      this.setState({
          EmployeePhoneNumber : e.target.value,
          validateEditphone:false,
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

  //For Family Data Field
  handleFullName = (e)=>{
    this.setState({
      FullNameOfFamily:e.target.value
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
  handleKtp = (e) => {   
    if(/^[0-9]*$/.test(e.target.value)){
       this.setState({
           validate:true,
           KTPNumber : e.target.value,
       })
   }else{
       this.setState({
           KTPNumber : e.target.value,
           validate:false,
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
    if(/^[0-9]*$/.test(e.target.value)){
      this.setState({
          validatePhone:true,
          PhoneNumber : e.target.value,
      })
  }else{
      this.setState({
          PhoneNumber : e.target.value,
          validatePhone:false,
      })
    }
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
  handleJobPositionEx = (e)=>{
    this.setState({
      JobPositionExperience:e.target.value,
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

  //// ComponentDidMount ////
  componentDidMount() {
    this.handleGetFamilydata();
    this.handleGetInformalEducationdata();
    this.handleGetWorkingExperiencedata();
    this.handleGetEmergencyContactdata();
    this.editAccount(); 
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

  //// CRUD ////
  //For Submit Family Data
  handlesubmitform = ()=>{
    if(this.state.PhoneNumber === "" || this.isChecked === false 
      ){
      if(this.state.FullNameOfFamily === "" ||
      this.state.Relationship === ""){
        alert("Field harus diisi")
      }
      else{
      const Data = {
        "FullNameOfFamily":this.state.FullNameOfFamily,
        "Relationship":this.state.Relationship,
        "DOBFamily":this.state.DOBFamily,
        "Religion":this.state.Religion,
        "Gender":this.state.Gender,
        "KTPNumber":this.state.KTPNumber,
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
    }
  }
    else{
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
    if(this.state.NameOfContact !== "" && this.state.NameOfContact !== null &&
    this.state.Relationship !== "" && this.state.Relationship !== null &&
    this.state.PhoneNumber !== "" && this.state.PhoneNumber !== null){
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
      alert("Field harus diisi");
    }
  }

  //For Submit Informal Education Data
  handlesubmitInformalEducationData= ()=>{
    if(this.state.HeldBy !== "" && this.state.HeldBy !== null &&
      this.state.JobPosition !== "" && this.state.JobPosition !== null &&
      this.state.StartDate !== "" && this.state.StartDate !== null &&
      this.state.EndDate !== "" && this.state.EndDate !== null){
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
    }
    else(
      alert("Field harus diisi")
    )
  }

  //For Submit Working Experience
  handlesubmitWorkingExperienceData = ()=>{
    if(this.state.Company !== "" && this.state.Company !== null &&
    this.state.JobPositionExperience !== "" && this.state.JobPositionExperience !== null &&
    this.state.TanggalMulai !== "" && this.state.TanggalMulai !== null &&
    this.state.TanggalSelesai !== "" && this.state.TanggalSelesai !== null){
      const Data = {
        "Company":this.state.Company,
        "JobPositionExperience":this.state.JobPositionExperience,
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
    }
    else{
      alert("Field harus diisi")
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

  //Handle Show Edit Account(Personal Data & Employment Data)
  editAccount = (id)=>{
    const value = localStorage.getItem('token');
  this.setState({
    token: value,
  });
  const Header = {
    accept: 'application/json',
    Authorization : `Bearer ` + value,
    // 'Content-Type' : 'application/json-patch+json'
  };
    this.setState({
      showTabAccount:true
    })
    axios({
      url:urlAccountInformation+'/'+this.state.idaccount,
      method:'get',
      headers:Header
    }).then(data=>{
      console.log(data.data);
      this.setState({
        // editAccount : data.data,
        "AccountId":data.data.Id,
        "Fullname":data.data.Fullname,
        "Username":data.data.Username,
        "EmployeeID":data.data.EmployeeID,
        "Dob":data.data.Dob,
        "Gender":data.data.Gender,
        "Religion":data.data.Religion,
        "Email":data.data.Email,
        "CoorporateEmail":data.data.CoorporateEmail,
        "Password":data.data.Password,
        "EmployeePhoneNumber":data.data.EmployeePhoneNumber,
        "Status":data.data.Status,
        "JoinDate":data.data.JoinDate,
        "SkillSet":data.data.SkillSet,
        "JobTitleName":data.data.JobTitleName,
        "Department":data.data.Department,
      })
      console.log(this.state.editAccount)
    })
  }

  //Handle Save Changes Personal Data
  handleUpdatePersonal= (id)=>{
    const Data = {
      "Fullname":this.state.Fullname,
      "EmployeeID":this.state.EmployeeID,
      "Username":this.state.Username,
      "Dob":this.state.Dob,
      "Gender":this.state.Gender,
      "Religion":this.state.Religion,
      "Email":this.state.Email,
      "EmployeePhoneNumber":this.state.EmployeePhoneNumber,
      "CoorporateEmail":this.state.CoorporateEmail,
      "Status":this.state.Status,
      "JoinDate":this.state.JoinDate,
      "SkillSet":this.state.SkillSet,
      "JobTitleName":this.state.JobTitleName,
      "Department":this.state.Department,
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
      url:urlAccountInformation+'/'+id,
      headers:Header,
      data:Data
    }).then(data=>{
      console.log("Berhasil");
      alert('berhasil diedit');
      window.location.reload();
    })
  }

  //Handle Save Changes Employement Data
  handleUpdateEmployee = (id)=>{
    const Data = {
      "Fullname":this.state.Fullname,
      "EmployeeID":this.state.EmployeeID,
      "Username":this.state.Username,
      "Dob":this.state.Dob,
      "Gender":this.state.Gender,
      "Religion":this.state.Religion,
      "Email":this.state.Email,
      "EmployeePhoneNumber":this.state.EmployeePhoneNumber,
      "CoorporateEmail":this.state.CoorporateEmail,
      "Status":this.state.Status,
      "JoinDate":this.state.JoinDate,
      "SkillSet":this.state.SkillSet,
      "JobTitleName":this.state.JobTitleName,
      "Department":this.state.Department,
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
      url:urlAccountInformation+'/'+id,
      headers:Header,
      data:Data
    }).then(data=>{
      console.log("Berhasil");
      alert('berhasil diedit');
      window.location.reload();
    })
  }

    //Handle Show Modal Edit Family Data
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
  
    //Handle Form Edit Family Data
    handleUpdateForm = (id)=>{
      if(this.state.isCheckedUpdate === false || this.state.PhoneNumber === undefined){
        if(this.state.FullNameOfFamily === "" ||
        this.state.Relationship === ""){
          alert("Field harus diisi")
        }
        else{
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
          alert("berhasil diedit")
          window.location.reload();
        })
      }
    }
      else{
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
           method:'put',
           url:urlFamilyData+'/'+id,
           headers:Header,
           data:Data
         }).then(data=>{
           console.log("Berhasil");
         })
         axios({
           method:'put',
           url:urlContact+'/'+id,
           headers:Header,
           data:Contact
         }).then(data=>{
          console.log("Berhasil");
          alert('berhasil ditambahkan');
          window.location.reload();
         })
      }
    }
  
      //Handle Show Modal Edit Contact
      editContactData = (id)=>{
        const Header = {
          accept: 'application/json',
          Authorization: `Bearer ` + this.state.token,
        };
        this.setState({
          showEdEmergency:true
        })
        axios({
          url:urlAccountInformation+'/'+id,
          method:'get',
          headers:Header
        }).then(data=>{
          this.setState({
            "NameOfContact":data.data.NameOfContact,
            "ContactId":data.data.Id,
            "Relationship" : data.data.Relationship,
            "PhoneNumber":data.data.PhoneNumber
          })
        })
      }
      
      //Handle Form Edit Contact
      handleUpdateContact = (id)=>{
        if(this.state.NameOfContact !== "" && this.state.NameOfContact !== null &&
        this.state.Relationship !== "" && this.state.Relationship !== null &&
        this.state.PhoneNumber !== "" && this.state.PhoneNumber !== null){
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
          method:'put',
          url:urlAccountInformation+'/'+id,
          headers:Header,
          data:Data
        }).then(data=>{
          console.log("Berhasil");
          alert('berhasil diedit');
          window.location.reload();
        })
      }
      else{
        alert("Field harus diisi")
      }
      }
  
    //Handle Show Modal Edit Informal
    editInformalData = (id)=>{
      const Header = {
        accept: 'application/json',
        Authorization: `Bearer ` + this.state.token,
      };
      this.setState({
        showEdInf:true
      })
      axios({
        url:urlInformalEducationData+'/'+id,
        method:'get',
        headers:Header
      }).then(data=>{
        this.setState({
          "HeldBy":data.data.HeldBy,
          "JobPosition":data.data.JobPosition,
          "StartDate" :data.data.StartDate,
          "EndDate" : data.data.EndDate,
          "Description":data.data.Description,
          "InformalId":data.data.Id,
          "Certificate":"",
        })
      })
    }
  
    //Handle Form Edit Informal
    handleUpdateInformal = (id)=>{
      if(this.state.HeldBy !== "" && this.state.HeldBy !== null &&
      this.state.JobPosition !== "" && this.state.JobPosition !== null &&
      this.state.StartDate !== "" && this.state.StartDate !== null &&
      this.state.EndDate !== "" && this.state.EndDate !== null){
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
          method:'put',
          url:urlInformalEducationData+'/'+id,
          headers:Header,
          data:Data
        }).then(data=>{
          console.log("Berhasil");
          alert('berhasil diedit');
          window.location.reload();
        })
      }
      else{
        alert("Field harus diisi")
      }
    }
  
    //Handle Show Modal Edit Experience
    editExperienceData = (id)=>{
      const Header = {
        accept: 'application/json',
        Authorization: `Bearer ` + this.state.token,
      };
      this.setState({
        showEdEx:true
      })
      axios({
        url:urlWorkingExperienceData+'/'+id,
        method:'get',
        headers:Header
      }).then(data=>{
        this.setState({
          "Company":data.data.Company,
          "JobPositionExperience":data.data.JobPositionExperience,
          "TanggalMulai" : data.data.TanggalMulai,
          "ExperienceId" : data.data.Id,
          "TanggalSelesai" : data.data.TanggalSelesai,
          "Deskripsi":data.data.Deskripsi,
          "Sertifikat":"",
        })
      })
    }
  
      //Handle Form Edit Experience
      handleUpdateExperience = (id)=>{
        if(this.state.Company !== "" && this.state.Company !== null &&
        this.state.JobPositionExperience !== "" && this.state.JobPositionExperience !== null &&
        this.state.TanggalMulai !== "" && this.state.TanggalMulai !== null &&
        this.state.TanggalSelesai !== "" && this.state.TanggalSelesai !== null){
          const Data = {
            "Company":this.state.Company,
            "JobPositionExperience":this.state.JobPositionExperience,
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
            method:'put',
            url:urlWorkingExperienceData+'/'+id,
            headers:Header,
            data:Data
          }).then(data=>{
            console.log("Berhasil");
            alert('berhasil diedit');
            window.location.reload();
          })
        }
        else{
          alert("Field harus diisi")
        }
      }

    //For Delete Family
    deleteFamily(family) {
      this.setState({
        showDeleteFamily:true,
        familyId:family
      })
    }
  
    //For Delete Contact
    deleteContact(contact) {
      this.setState({
        showDeleteContact:true,
        contactId:contact
      })
    }
  
    //For Delete Informal Education
    deleteInformal(informal) {
      this.setState({
        showDelete:true,
        informalId:informal
      })
    }
  
    //For Delete Experience
    deleteExperience(experience) {
      this.setState({
        showDeleteExperience:true,
        experienceId:experience
      })
    }

  //Handle Delete Family Data
  handledeletefamily = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlFamilyData + '/' + this.state.familyId,
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

  //Handle Delete Contact Form
  handledeletecontact = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlContact + '/' + this.state.contactId,
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

  //Handle Delete Informal Form
  handledeleteform = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlInformalEducationData + '/' + this.state.informalId,
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

  //Handle Delete Experience Form
  handledeleteexperience = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlWorkingExperienceData + '/' + this.state.experienceId,
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
    

  handleCheckUpdate = ()=>{
    this.setState({
      isCheckedUpdate : !this.state.isCheckedUpdate
    })
  }

  //Handle Show Modal Add New(Family Info & Experience) Tab
  handleAddFamilyData = () => {
    this.setState({
      showAddFam : true
    })
  }
  handleAddEmergencyContacts = () => {
    this.setState({
      showAddEmergency : true
    })
  }
  handleAddInformalEd = () => {
    this.setState({
      showAddInf : true
    })
  }
  handleAddExperience = () => {
    this.setState({
      showAddEx : true
    })
  }

  //For Handle Click
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  //For Handle Close Modal
  handleClose = () => {
    this.setState({ showAddFam: false, showEdFam: false, showAddEmergency: false, showEdEmergency: false,
      showAddInf: false, showEdInf: false, showAddEx: false, showEdEx: false, show: false, showDetails : false, 
      showDelete: false, showDeleteContact: false, showDeleteExperience: false, showDeleteFamily: false});
  }

  //For Checking
  handleCheck = ()=>{
    var Checked = this.state.isChecked;
    this.setState({
      isChecked:!Checked
    })
  }

  render() {

  //For Family Data Table
  const { results, listfamily, currentPage, resultsPerPage } = this.state;
  const indexOfLastTodo = currentPage * resultsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
  const currentlistfamily = listfamily.slice(indexOfFirstTodo, indexOfLastTodo);
  //const {listfamily} = this.state;
  let num = 1;
  var StartDate = moment(this.state.StartDate).format('DD-MM-YYYY');
  var EndDate = moment(this.state.EndDate).format('DD-MM-YYYY');
  var TanggalMulai = moment(this.state.TanggalMulai).format('DD-MM-YYYY');
  var TanggalSelesai = moment(this.state.TanggalSelesai).format('DD-MM-YYYY');
  var DOBFamily = moment(this.state.DOBFamily).format('DD-MM-YYYY');  

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
              onClick={() => this.deleteFamily(family.Id)}>
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
              onClick={() => this.editContactData(contact.Id)}
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
              onClick={() => this.editInformalData(informal.Id)}
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
        <td>{experience.JobPositionExperience}</td>
        <td>{experience.TanggalMulai==null?experience.TanggalMulai:experience.TanggalMulai.substr(0,10)}</td>
        <td>{experience.TanggalSelesai==null?experience.TanggalSelesai:experience.TanggalSelesai.substr(0,10)}</td>
        <td>{experience.Deskripsi}</td>
        <td>{experience.Sertifikat}</td>
        <td>
              <Button
              color="warning"
              onClick={() => this.editExperienceData(experience.Id)}
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
      {/*Family Delete Modal*/}
      <Modal size="sm" show={this.state.showDeleteFamily} onHide={this.handleClose}>
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
            <Button color="danger" onClick={this.handledeletefamily}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*End of Family Delete Modal*/}

      {/*Contact Delete Modal*/}
      <Modal size="sm" show={this.state.showDeleteContact} onHide={this.handleClose}>
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
            <Button color="danger" onClick={this.handledeletecontact}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*End of Contact Delete Modal*/}

      {/*Informal Delete Modal*/}
      <Modal size="sm" show={this.state.showDelete} onHide={this.handleClose}>
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
            <Button color="danger" onClick={this.handledeleteform}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*End of Informal Delete Modal*/}

      {/*Experience Delete Modal*/}
            <Modal size="sm" show={this.state.showDeleteExperience} onHide={this.handleClose}>
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
            <Button color="danger" onClick={this.handledeleteexperience}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*End of Experience Delete Modal*/}

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
                <Input type="text" onChange={this.handleFullName} 
                value={this.state.FullNameOfFamily}/>
              </InputGroup>
              {/* &nbsp; <span style={{color:'red',display:this.state.validateFullName?'none':''}}>Field Must be Filled</span> */}
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
                <Input  type="text" onChange={this.handleKtp}
                 value={this.state.KTPNumber}/>
              </InputGroup>
              &nbsp; <span style={{color:'red',display:this.state.validate?'none':''}}>Field Must be Number</span>

              </div>
              </div>

              <div className="form-check">
                <Input type="checkbox" onChange={this.handleCheck} checked={this.state.isChecked} />
                <label>Add to Emergency Contact</label>
              </div>
                <Input type="text" placeholder="Phone Number" onChange={this.handlePhone} style={{display:this.state.isChecked?'':'none'}} 
                value={this.state.PhoneNumber}/>
                &nbsp; <span style={{color:'red',display:this.state.validatePhone?'none':''}}>Field Must be Number</span>
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
                <Input type="text" value={this.state.Relationship ? this.state.Relationship: ""} onChange={this.handleRelationship}/>
              </InputGroup>
              </div>

              <div className="col">
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

              <div className="row">
              <div className="col">
              &nbsp; Date of Birth
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input  defaultValue={DOBFamily} type="date" onChange={this.handleDob} />
              </InputGroup>
              </div>

              <div className="col">
              &nbsp; KTP Number
              <InputGroup className="mb-3" style={{ width: '22rem'}}>
                <Input value={this.state.KTPNumber?this.state.KTPNumber:""}   type="text" onChange={this.handleKtp} />
              </InputGroup>
              &nbsp; <span style={{color:'red',display:this.state.validate?'none':''}}>Field Must be Number</span>
              </div>
              </div>

              <div class="form-check">
              <Input type="checkbox" onChange={this.handleCheckUpdate} checked={this.state.isCheckedUpdate} />
                <label  >Add to Emergency Contact</label>
              </div>
              <Input type="text" placeholder="Phone Number" onChange={this.handlePhone} value={this.state.PhoneNumber?this.state.PhoneNumber:""} style={{display:this.state.isCheckedUpdate?'':'none'}} 
              />
              &nbsp; <span style={{color:'red',display:this.state.validatePhone?'none':''}}>Field Must be Number</span>
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
                <Input type="text" onChange={this.handlePhone} 
                value={this.state.PhoneNumber} />
              </InputGroup>
              &nbsp; <span style={{color:'red',display:this.state.validatePhone?'none':''}}>Field Must be Number</span>
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
              <Input value={this.state.NameOfContact? this.state.NameOfContact:'' } type="text" onChange={this.handleNameOfContact}  />
              </InputGroup>

              Relationship*
              <InputGroup className="mb-3">
              <Input value={this.state.Relationship? this.state.Relationship:'' } type="text" onChange={this.handleRelationship}  />
              </InputGroup>

              Phone Number*
              <InputGroup className="mb-3">
              <Input value={this.state.PhoneNumber? this.state.PhoneNumber:'' }type="text" onChange={this.handlePhone}  />
              </InputGroup>
              &nbsp; <span style={{color:'red',display:this.state.validatePhone?'none':''}}>Field Must be Number</span>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={()=>this.handleUpdateContact(this.state.ContactId)}>
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
              <Input   type="text" onChange={this.handleJobPosition} />
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
              <Input value={this.state.HeldBy? this.state.HeldBy:'' } type="text" onChange={this.handleHeldBy} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input defaultValue={StartDate} type="date" onChange={this.handleStartDate} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input value={this.state.JobPosition? this.state.JobPosition:'' }  type="text" onChange={this.handleJobPosition}/>
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input defaultValue={EndDate} type="date" onChange={this.handleEndDate} />
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input  value={this.state.Description? this.state.Description:'' } type="textarea" onChange={this.handleDescription} />
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheckUpdate} checked={this.state.isCheckedUpdate} />
              <label>Certification</label>
            </div>

            <div style={{ width: '20rem', display:this.state.isCheckedUpdate?'':'none'}} color="success" className="form-group">
              <Input type="file" multiple onChange={this.handleCertificate} checked={this.state.isCheckedUpdate} />
            </div>
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={()=>this.handleUpdateInformal(this.state.InformalId)}>
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
              <Input type="text" onChange={this.handleJobPositionEx}/>
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
              <Input value={this.state.Company? this.state.Company:'' } type="text" onChange={this.handleCompany} />
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; Start Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input defaultValue={TanggalMulai} type="date" onChange={this.handleTanggaMulai} />
            </InputGroup>
            </div>
            </div>

            <div class="row">
            <div class="col">
            &nbsp; Job Position*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input value={this.state.JobPositionExperience? this.state.JobPositionExperience:'' }type="text" onChange={this.handleJobPositionEx}/>
            </InputGroup>
            </div>

            <div class="col">
            &nbsp; End Date*
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input defaultValue={TanggalSelesai} type="date" onChange={this.handleTanggalSelesai}/>
            </InputGroup>
            </div>
            </div>
            <div class="row">
            <div class="col">
            </div>

            <div class="col">
            &nbsp; Description
            <InputGroup className="mb-3" style={{ width: '22rem'}}>
              <Input value={this.state.Deskripsi? this.state.Deskripsi:'' } type="textarea" onChange={this.handleDeskripsi}/>
            </InputGroup>
            </div>
            </div>

            <div className="form-check">
              <Input type="checkbox" onChange={this.handleCheckUpdate} checked={this.state.isCheckedUpdate} />
              <label>Certification</label>
            </div>

            <div style={{ width: '20rem', display:this.state.isCheckedUpdate?'':'none'}} color="success" className="form-group">
              <Input type="file" multiple onChange={this.handleCertificate} checked={this.state.isCheckedUpdate} />
            </div>
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button color="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={()=>this.handleUpdateExperience(this.state.ExperienceId)}>
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
                          <Input onChange={this.onChangeEmployeeID} style={{fontSize: '15px'}} type="text"  value={this.state.EmployeeID? this.state.EmployeeID:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; Username* &nbsp;
                          <Input onChange={this.onChangeUsername} style={{fontSize: '15px'}} type="text"  value={this.state.Username? this.state.Username:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; Religion* &nbsp;
                          <Input onChange={this.onChangeReligion} style={{fontSize: '15px'}} type="select"  value={this.state.Religion? this.state.Religion:''} >
                          <option></option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Kong Hu Cu">Kong Hu Cu</option>
                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >&emsp; Full Name* &nbsp;
                          <Input onChange={this.onChangeFullName} style={{fontSize: '15px'}} type="text" value={this.state.Fullname? this.state.Fullname:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Phone Number* &nbsp;
                          <Input onChange={this.onChangePhoneNumber} style={{fontSize: '15px'}} type="text"  value={this.state.EmployeePhoneNumber? this.state.EmployeePhoneNumber:''}  />
                          &nbsp; <span style={{color:'red',display:this.state.validateEditphone?'none':''}}>Field Must be Number</span>
                          </InputGroup>                         

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &emsp; &emsp; Gender* &nbsp;
                          <Input onChange={this.onChangeGender} style={{fontSize: '15px'}} type="select"  value={this.state.Gender? this.state.Gender:''} >
                          <option></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" >&nbsp; &nbsp; Personal Email* &nbsp;
                          <Input onChange={this.onChangePersonalEmail} style={{fontSize: '15px'}} type="text"  value={this.state.Email? this.state.Email:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" >  Date Of Birth* &nbsp;
                          <Input onChange={this.onChangeDob} style={{fontSize: '15px'}} type="date" value={this.state.Dob? this.state.Dob:''} />
                          </InputGroup>

                        </Row>
                        </Col>

                        <Button style={{ float: 'right', marginRight: '40px'}} color="primary" onClick={()=>{this.handleUpdatePersonal(this.state.AccountId)}}>
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

                          <Input onChange={this.onChangeJobTitle} type="select" style={{ fontSize: '15px'}}  value={this.state.JobTitleName? this.state.JobTitleName:''}  >
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
                          <Input onChange={this.onChangeJoinDate} style={{fontSize: '15px'}} type="date"  value={this.state.JoinDate? this.state.JoinDate:''} />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > Departement* &ensp;
                          <Input onChange={this.onChangeDepartement} style={{fontSize: '15px'}} type="text"  value={this.state.Department? this.state.Department:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &ensp; Coorporate Email* &nbsp;
                          <Input onChange={this.onChangeCoorporateEmail} style={{fontSize: '15px'}} type="text"  value={this.state.CoorporateEmail? this.state.CoorporateEmail:''}  />
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '30rem'}} className="mb-3" > &ensp; &emsp; &emsp; Status* &nbsp;
                          <Input onChange={this.onChangeStatus} type="select" style={{ fontSize: '15px'}}  value={this.state.Status? this.state.Status:''} >
                          <option></option>
                          <option value="Contract">Contract</option>
                          <option value="Permanent">Permanent</option>
                          <option value="Probation">Probation</option>
                          <option value="Internship">Internship</option>

                          </Input>
                          </InputGroup>

                          &emsp;
                          <InputGroup style={{ width: '33rem'}} className="mb-3" > &emsp; &emsp; &emsp; &ensp; &nbsp;  Skill Set &ensp;
                          <Input onChange={this.onChangeSkillSet} style={{fontSize: '15px', height:'90px'}} type="textarea"  value={this.state.SkillSet? this.state.SkillSet:''}  />
                          </InputGroup>

                        </Row>
                        </Col>

                        <Button style={{ float: 'right', marginRight: '40px'}} color="primary" onClick={()=>{this.handleUpdateEmployee(this.state.AccountId)}}>
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