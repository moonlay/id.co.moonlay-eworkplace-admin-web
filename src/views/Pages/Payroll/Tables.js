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
import {DatePicker} from 'react-datepicker';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlJobtitle, urlDivision, urlBlob, urlRole, urlPayroll, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      listDivison : [],
      listPayroll : [],
      loading: true,
      url: urlRole,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      showEditPayroll : false,
      showDetailPayroll : false,
      selectedDivision :{},
      stream : null,
      listJobtitle : {},
      selectedRolePermisiion : {},
      showRunPayroll : false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //For Get Data
  handleGetPayrollData(){
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
      url:urlPayroll,
      headers:Header,
    }).then(data=>{
      this.setState({
        listPayroll:data.data
      })
      console.log(data.data);
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  componentDidMount() {
    this.handleGetPayrollData();
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

  // handleEditPayroll = () => {
  //   this.setState({
  //     showEditPayroll : true
  //   })
  // }

  //handle field
  handleNameBankAccount = (e)=>{
    this.setState({
      NameBankAccount:e.target.value
    })
  }
  handleSalary = (e)=>{
    this.setState({
      Salary:e.target.value
    })
  }
  handleTax = (e)=>{
    this.setState({
      Tax:e.target.value
    })
  }
  handleBPJSKesehatan = (e)=>{
    this.setState({
      BPJSKesehatan:e.target.value
    })
  }
  handleBPJSTenagaKerja = (e)=>{
    this.setState({
      BPJSTenagaKerja:e.target.value
    })
  }
  handleBank = (e)=>{
    this.setState({
      Bank:e.target.value
    })
  }
  handleBankAccountNumber = (e)=>{
    this.setState({
      BankAccountNumber:e.target.value
    })
  }
  handleBankBranch = (e)=>{
    this.setState({
      BankBranch:e.target.value
    })
  }
  handleBackDatedPayment = (e)=>{
    this.setState({
      BackDatedPayment:e.target.value
    })
  }
  handleAllowance = (e)=>{
    this.setState({
      Allowance:e.target.value
    })
  }
  handleIncentive = (e)=>{
    this.setState({
      Incentive:e.target.value
    })
  }
  handlePaidleave = (e)=>{
    this.setState({
      PaidLeave:e.target.value
    })
  }
  handleUnPaidleave = (e)=>{
    this.setState({
      UnPaidLeave:e.target.value
    })
  }
  handleTakeHomePay = (e)=>{
    this.setState({
      TakeHomePay:e.target.value
    })
  }

  //handle details
  detailPayrollData = (id)=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    this.setState({
      showDetailPayroll:true
    })
    axios({
      url:urlPayroll+'/'+id,
      method:'get',
      headers:Header
    }).then(data=>{
      this.setState({
        "Salary":data.data.Salary,
        "PayrollId":data.data.Id,
        "Tax" : data.data.Tax,
        "BPJSKesehatan" : data.data.BPJSKesehatan,
        "BPJSTenagaKerja":data.data.BPJSTenagaKerja,
        "NameBankAccount" : data.data.NameBankAccount,
        "Bank":data.data.Bank, 
        "BankAccountNumber":data.data.BankAccountNumber,
        "BankBranch":data.data.BankBranch,
        "BackDatedPayment" : data.data.BackDatedPayment,
        "Allowance" : data.data.Allowance,
        "Incentive":data.data.Incentive,
        "PaidLeave":data.data.PaidLeave,
        "TakeHomePay":data.data.TakeHomePay

      })
    })
  }

  //handle edit payroll
  editPayrollData = (id)=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    this.setState({
      showEditPayroll:true
    })
    axios({
      url:urlPayroll+'/'+id,
      method:'get',
      headers:Header
    }).then(data=>{
      this.setState({
        "Salary":data.data.Salary,
        "PayrollId":data.data.Id,
        "Tax" : data.data.Tax,
        "BPJSKesehatan" : data.data.BPJSKesehatan,
        "BPJSTenagaKerja":data.data.BPJSTenagaKerja,
        "NameBankAccount" : data.data.NameBankAccount,
        "Bank":data.data.Bank, 
        "BankAccountNumber":data.data.BankAccountNumber,
        "BankBranch":data.data.BankBranch,
        "BackDatedPayment" : data.data.BackDatedPayment,
        "Allowance" : data.data.Allowance,
        "Incentive":data.data.Incentive,
        "PaidLeave":data.data.PaidLeave,
        "TakeHomePay":data.data.TakeHomePay

      })
    })
  }

  handleUpdatePayroll = (id)=>{
    const Data = {
      "Salary":this.state.Salary,
      "Tax" :this.state.Tax,
      "BPJSKesehatan" :this.state.BPJSKesehatan,
      "BPJSTenagaKerja":this.state.BPJSTenagaKerja,
      "NameBankAccount" : this.state.NameBankAccount,
      "Bank":this.state.Bank, 
      "BankAccountNumber":this.state.BankAccountNumber,
      "BankBranch":this.state.BankBranch,
      "BackDatedPayment" : this.state.BackDatedPayment,
      "Allowance" : this.state.Allowance,
      "Incentive":this.state.Incentive,
      "PaidLeave":this.state.PaidLeave,
      "TakeHomePay":this.state.TakeHomePay,
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
      url:urlPayroll+'/'+id,
      headers:Header,
      data:Data
    }).then(data=>{
      console.log("Berhasil");
      alert('berhasil diedit');
      window.location.reload();
    })
  }

  // handleDetailPayroll = () => {
  //   this.setState({
  //     showDetailPayroll : true
  //   })
  // }

  handleRunPayroll = () => {
    this.setState({
      showRunPayroll : true
    })
  }

  handleClose = () => {
		this.setState({ showDetailPayroll: false, showEditPayroll: false, showRunPayroll : false});
	}

  handleGetDivision = () => {
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
      url: urlJobtitle + '?page=1&size=25',
      headers: Header,
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
          listDivison: data.data.data,
          //loading: true,
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

    const {listPayroll} = this.state;
    let num = 1;
    let jumlah  =0;
    let jumlahHomepay  =0;
    const renderpayroll = listPayroll.map((payroll,index)=>{
      var salary = payroll.Salary;
      jumlah +=salary;
      var homepay = payroll.TakeHomePay;
      jumlahHomepay +=homepay;
      return(
        <tr key={payroll.Id} data-category = {payroll.Id}>
          <td>{payroll.EmployeeID}</td>
          <td>{payroll.FullName}</td>
          <td>{payroll.AssetName}</td>
          <td>{payroll.JobTitle}</td>
          <td>{"IDR "+salary.toString()}</td>
          <td>{"IDR "+homepay.toString()}</td>
          <td>
          <Button
              className="btn btn-warning"
              onClick={() => this.editPayrollData(payroll.Id)}>
              Edit
            </Button>
            &nbsp;
          <Button
              color="primary"
              onClick={() => this.detailPayrollData(payroll.Id)}>
              Details
            </Button>

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
      {/*Modal buat detail */}
      <Modal show={this.state.showRunPayroll} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title >Run Payroll</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>

          <label style={{ fontSize: '20px'}}><strong>Period</strong></label>
        
          <div class="row">
           <div class="col">
       
          <InputGroup className="mb-3" style={{ width: '13rem'}}>
          <Input  type="select" onChange={this.handleName}  >
          <option>Select month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="Maret">Maret</option>
          <option value="April">April</option>
          <option value="Mei">Mei</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Agustus">Agustus</option>
          <option value="September">September</option>
          <option value="Oktober">Oktober</option>
          <option value="November">November</option>
          <option value="Desember">Desember</option>
          

          </Input>
          </InputGroup>
          </div>

          <div class="col">
        
          <InputGroup className="mb-3" style={{ width: '13rem'}}>
          <Input  type="select" onChange={this.handleName}  >
          <option>Select year</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>


          </Input>
          </InputGroup>
          </div>
           </div>

          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-danger" onClick={this.handleClose}>
							Cancel
                        </Button>
                        <Button className="btn btn-success" onClick={this.handleClose}>
							Continue
                        </Button>
					</Modal.Footer>
				</Modal>

                <Modal size="lg" show={this.state.showDetailPayroll} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title >Detail Payroll</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
        <Form>
        
        Name in Bank Account 
        <InputGroup className="mb-3">
        <Input value={this.state.NameBankAccount?this.state.NameBankAccount:""}   type="text" onChange={this.handleNameBankAccount} disabled />
        </InputGroup>
        
        Bank 
        <InputGroup className="mb-3">
        <Input value={this.state.Bank?this.state.Bank:""}   type="text" onChange={this.handleBank} disabled/>
        </InputGroup>
        
        Bank Account Number
        <InputGroup className="mb-3">
        <Input value={this.state.BankAccountNumber?this.state.BankAccountNumber:""}  type="text" onChange={this.handleBankAccountNumber} disabled />
        </InputGroup>

        Bank Branch
        <InputGroup className="mb-3">
        <Input value={this.state.BankBranch?this.state.BankBranch:""}   type="text" onChange={this.handleBankBranch} disabled/>
        </InputGroup>

        Tax
        <InputGroup className="mb-3">
        <Input value={this.state.Tax?this.state.Tax:""}   type="text" onChange={this.handleTax} disabled/>
        </InputGroup>

        BPJS Kesehatan
        <InputGroup className="mb-3">
        <Input value={this.state.BPJSKesehatan?this.state.BPJSKesehatan:""}   type="text" onChange={this.handleBPJSKesehatan} disabled/>
        </InputGroup>

        BPJS Tenaga Kerja
        <InputGroup className="mb-3">
        <Input value={this.state.BPJSTenagaKerja?this.state.BPJSTenagaKerja:""}   type="text" onChange={this.handleBPJSTenagaKerja} disabled/>
        </InputGroup>

        Backdated Payment
        <InputGroup className="mb-3">
        <Input value={this.state.BackDatedPayment?this.state.BackDatedPayment:""}   type="date" onChange={this.handleBackDatedPayment} disabled/>
        </InputGroup>

        Allowance
        <InputGroup className="mb-3">
        <Input value={this.state.Allowance?this.state.Allowance:""}   type="text" onChange={this.handleAllowance} disabled/>
        </InputGroup>

        Incentive
        <InputGroup className="mb-3">
        <Input value={this.state.Incentive?this.state.Incentive:""}   type="text" onChange={this.handleIncentive} disabled/>
        </InputGroup>

        Paid Leave
        <InputGroup className="mb-3">
        <Input value={this.state.PaidLeave?this.state.PaidLeave:""}   type="text" onChange={this.handlePaidleave} disabled/>
        </InputGroup>

        Unpaid Leave
        <InputGroup className="mb-3">
        <Input value={this.state.UnPaidLeave?this.state.UnPaidLeave:""}   type="text" onChange={this.handleUnPaidleave} disabled/>
        </InputGroup>

        Salary
        <InputGroup className="mb-3">
        <Input value={this.state.Salary?this.state.Salary:""}   type="text" onChange={this.handleSalary} disabled/>
        </InputGroup>

        Take Home Pay
        <InputGroup className="mb-3">
        <Input value={this.state.TakeHomePay?this.state.TakeHomePay:""}   type="text" onChange={this.handleTakeHomePay} disabled/>
        </InputGroup>

        </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
                        </Button>

					</Modal.Footer>
				</Modal>



            	<Modal size="lg"show={this.state.showEditPayroll} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Payroll</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
        
          Name in Bank Account 
        <InputGroup className="mb-3">
        <Input value={this.state.NameBankAccount?this.state.NameBankAccount:""}   type="text" onChange={this.handleNameBankAccount}  />
        </InputGroup>
      
        Bank 
        <InputGroup className="mb-3">
        <Input value={this.state.Bank?this.state.Bank:""}   type="text" onChange={this.handleBank} />
        </InputGroup>
        
        Bank Account Number
        <InputGroup className="mb-3">
        <Input value={this.state.BankAccountNumber?this.state.BankAccountNumber:""}  type="text" onChange={this.handleBankAccountNumber}  />
        </InputGroup>

        Bank Branch
        <InputGroup className="mb-3">
        <Input value={this.state.BankBranch?this.state.BankBranch:""}   type="text" onChange={this.handleBankBranch} />
        </InputGroup>

        Tax
        <InputGroup className="mb-3">
        <Input value={this.state.Tax?this.state.Tax:""}   type="text" onChange={this.handleTax} />
        </InputGroup>

        BPJS Kesehatan
        <InputGroup className="mb-3">
        <Input value={this.state.BPJSKesehatan?this.state.BPJSKesehatan:""}   type="text" onChange={this.handleBPJSKesehatan} />
        </InputGroup>

        BPJS Tenaga Kerja
        <InputGroup className="mb-3">
        <Input value={this.state.BPJSTenagaKerja?this.state.BPJSTenagaKerja:""}   type="text" onChange={this.handleBPJSTenagaKerja} />
        </InputGroup>

        Backdated Payment
        <InputGroup className="mb-3">
        <Input value={this.state.BackDatedPayment?this.state.BackDatedPayment:""}   type="date" onChange={this.handleBackDatedPayment}/>
        </InputGroup>

        Allowance
        <InputGroup className="mb-3">
        <Input value={this.state.Allowance?this.state.Allowance:""}   type="text" onChange={this.handleAllowance} />
        </InputGroup>

        Incentive
        <InputGroup className="mb-3">
        <Input value={this.state.Incentive?this.state.Incentive:""}   type="text" onChange={this.handleIncentive} />
        </InputGroup>

        Paid Leave
        <InputGroup className="mb-3">
        <Input value={this.state.PaidLeave?this.state.PaidLeave:""}   type="text" onChange={this.handlePaidleave} />
        </InputGroup>

        Unpaid Leave
        <InputGroup className="mb-3">
        <Input value={this.state.UnPaidLeave?this.state.UnPaidLeave:""}   type="text" onChange={this.handleUnPaidleave} />
        </InputGroup>

        Salary
        <InputGroup className="mb-3">
        <Input value={this.state.Salary?this.state.Salary:""}   type="text" onChange={this.handleSalary} />
        </InputGroup>

        Take Home Pay
        <InputGroup className="mb-3">
        <Input value={this.state.KTPNumber?this.state.TakeHomePay:""}   type="text" onChange={this.handleTakeHomePay} disabled/>
        </InputGroup>
          </Form>
          </Modal.Body>
					<Modal.Footer>
            <Button color="primary" onClick={()=>this.handleUpdatePayroll(this.state.PayrollId)}>
              Save Changes
            </Button>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>

					</Modal.Footer>
				</Modal>


        
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
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-folder" /> <b>&nbsp;Payroll Info</b>
                        <div class="btn-group">
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleRunPayroll}>
                          Run Payroll
                        </Button>
                        <div style={{marginLeft:10}}>
                                <ReactHTMLTableToExcel 
                                className="btn btn-danger"
                                table="myTable"
                                filename="Report"
                                sheet="Sheet"
                                buttonText="Export"
                                />
                                </div>
                        {/* <Button
                          style={{ marginLeft: 10 }}
                          color="warning"
                          className="px-4"
                          onClick={this.handleAddDivision}>
                          Export
                        </Button> */}                        
                        <Button
                          style={{ marginLeft: 10 }}
                          color="primary"
                          className="px-4"
                          onClick={this.handleAddDivision}>
                          Run Payslip
                        </Button>
                        </div>                  
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
                    {/* <DateRange
              format="DD/MM/YYYY"
              startDate={rangePicker["startDate"]}
              endDate={rangePicker["endDate"]}
              linkedCalendars={true}
              disableDaysBeforeToday={true}
              date={now => now}
              onInit={this.handleChange}
              onChange={this.handleChange} /> */}
                &emsp; <b style={{ fontSize: '20px'}}>July 2020</b>
                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Full Name</th>
                          <th>Job Title</th>
                          <th>Departement</th>
                          <th>Salary</th>
                          <th>Take Home Pay</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{
                       renderpayroll
                        }</tbody>
                    </Table>
                  </CardBody>
                  <CardFooter className="p-4">    
                  &emsp; <b style={{ fontSize: '20px'}}>Grand Total &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;   
                  {"IDR " + jumlah}  &ensp; &ensp;{"IDR " + jumlahHomepay}</b>
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
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;



