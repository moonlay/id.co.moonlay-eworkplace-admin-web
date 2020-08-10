import React, { Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input, InputGroup,
  Button
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import {urlJobtitle, urlDivision, urlBlob, urlRole, urlAssets, permisionRoleIdList} from '../../../Constant'
import { da } from 'date-fns/locale';
import assets from './Asset';
//const $ = require('jquery');
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      listAssets: [],
      listDivison : [],
      loading: false,
      isLaptop:false,
      url: urlRole,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      showEditAsset : false,
      selectedDivision :{},
      stream : null,
      listJobtitle : {},
      selectedRolePermisiion : {},
      showDetailAsset : false,
    };
    this.handleClick = this.handleClick.bind(this);
  }      
  
    //handle detail asset
    detailAssetData = (id)=>{
      const Header = {
        accept: 'application/json',
        Authorization: `Bearer ` + this.state.token,
      };
      this.setState({
        showDetailAsset:true
      })
      axios({
        url:urlAssets+'/'+id,
        method:'get',
        headers:Header
      }).then(data=>{
        this.setState({
          "AcquisitionDate" : data.data.AcquisitionDate, 
        })
      })
    }
  
    //handle edit asset
    editAssetData = (id)=>{
      const Header = {
        accept: 'application/json',
        Authorization: `Bearer ` + this.state.token,
      };
      this.setState({
        showEditAsset:true
      })
      axios({
        url:urlAssets+'/'+id,
        method:'get',
        headers:Header
      }).then(data=>{
        this.setState({
          "AssetNumber":data.data.AssetNumber,
          "AssetId":data.data.Id,
          "AssetType":data.data.AssetType,
          "AssetName" : data.data.AssetName,
          "AcquisitionDate" : data.data.AcquisitionDate, 
        })
      })
    }
  
    handleUpdateAsset = (id)=>{
      const Data = {
        "AssetNumber":this.state.AssetNumber,
        "AssetType":this.state.AssetType,
        "AssetName" :this.state.AssetName,
        "AcquisitionDate" :this.state.AcquisitionDate, 
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
        url:urlAssets+'/'+id,
        headers:Header,
        data:Data
      }).then(data=>{
        console.log("Berhasil");
        alert('berhasil diedit');
        window.location.reload();
      })
    }
  
  //For Delete Asset
  deleteAsset(asset) {
    this.setState({
      showDeleteAsset:true,
      assetId:asset
    })
  }

  //Handle Delete Asset Form
  handledeleteasset = ()=>{
    const Header = {
      accept: 'application/json',
      Authorization: `Bearer ` + this.state.token,
    };
    axios({
      method: 'delete',
      url: urlAssets + '/' + this.state.assetId,
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
  handleGetAssetData(){
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
      url:urlAssets,
      headers:Header,
    }).then(data=>{
      this.setState({
        listAssets:data.data
      })
      console.log(data.data);
    })
  }

  //For Submit Data
  handlesubmitAddAssetData= ()=>{
    const Data = {
      "AssetType":this.state.AssetType,
      "AssetNumber":this.state.AssetNumber,
      "AssetName":this.state.AssetName,
      "AcquisitionDate":"",
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
      url:urlAssets,
      headers:Header,
      data:Data
    }).then(data=>{
      console.log("Berhasil");
      alert('berhasil ditambahkan');
      window.location.reload();
    })
  }

  //For Field
  handleAssetNumber = (e)=>{
    this.setState({
      AssetNumber:e.target.value,
    })
  }
  handleAssetType = (e)=>{
    console.log(e.target.value);
    this.setState({
      AssetType:e.target.value,
      isLaptop : e.target.value === "Laptop" ? true:false,
    })
  }
  handleAssetName = (e)=>{
    this.setState({
      AssetName:e.target.value,
    })
  }
  handleAcquisitionDate = (e)=>{
    this.setState({
      AcquisitionDate:e.target.value,
    })
  }

  //For Show Modals

  handleAddAsset = () => {
    this.setState({
      showAdd : true
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleJS = () => {
   // function filterRows() {
    var from = $('#datefilterfrom').val();
    var to = $('#datefilterto').val();

    if (!from && !to) {
      // no value for from and to
      return;
    }

    from = from || '2020-02-25'; // default from to a old date if it is not set
    to = to || '2020-02-25';

    var dateFrom = moment(from);
    var dateTo = moment(to);

    $('#myTable tr').each(function(i, tr) {
      var val = $(tr)
        .find('td:nth-child(3)')
        .text();
      var dateVal = moment(val, 'YYYY/MM/DD');

      var visible = dateVal.isBetween(dateFrom, dateTo, null, []) ? '' : 'none'; // [] for inclusive
      $(tr).css('display', visible);

      console.log(dateVal);
    });

   // $('#datefilterfrom').on("change", filterRows);
   // $('#datefilterto').on("change", filterRows);
 // };
}
  componentDidMount() {
    this.handleGetAssetData();
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

  handleDateChange = (event) =>{
    this.handleJS();
  }

  filterList = event => {
    //var updatedList = this.state.results;
    // updatedList = updatedList.filter(function(item){
    //   return item.toString().toLowerCase().search(
    //     event.target.value.toLowerCase()) !== -1;
    // });
    // this.setState({results: updatedList});
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
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


  handleClose = () => {
		this.setState({ show: false,  showEditAsset : false, showAdd: false, showDeleteAsset: false, showDetailAsset: false});
	}


  handleSelect = range => {
    console.log(range);
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };

  render() {
    let options = this.state.listDivison.map(function (division) {
      return { value: division.Id, label: division.Name };
    })

    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);

    const {listAssets} = this.state;
    let num = 1;
    const renderasset = listAssets.map((asset,index)=>{
      return(
        <tr key={asset.Id} data-category = {asset.Id}>
          <td>{asset.AssetType}</td>
          <td>{asset.AssetNumber}</td>
          <td>{asset.AssetName}</td>
          <td>{asset.FullNameEmployeeAsset}</td>
          <td>
          <Button
              color="primary"
              onClick={() => this.detailAssetData(asset.Id)}>
              Details
            </Button>

          &nbsp;
          <Button
              className="btn btn-warning"
              onClick={() => this.editAssetData(asset.Id)}>
              Edit
            </Button>

          &nbsp;
          <Button
              className="btn btn-danger"
              onClick={() => this.deleteAsset(asset.Id)}>
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
      {/*Detail Assets Modal */}
    <Modal size="sm" show={this.state.showDetailAsset} onHide={this.handleClose}>
		<Modal.Header closeButton>
		    <Modal.Title>Details</Modal.Title>
		</Modal.Header>
			<Modal.Body>
                <Form>
                Employee ID
                <InputGroup className="mb-3">
                <Input type="text" onChange={this.handleAcquisitionDate} />
                </InputGroup>

                Acquisition Date
                <InputGroup className="mb-3">
                <Input value={this.state.AcquisitionDate?this.state.AcquisitionDate:""}
                type="date" onChange={this.handleAcquisitionDate} />
                </InputGroup>
                </Form>
            </Modal.Body>
		<Modal.Footer>
			<Button className="btn btn-secondary" onClick={this.handleClose}>
			    Close
            </Button>
		</Modal.Footer>
		</Modal>
        {/*End of Detail Assets Modal */}

    {/*Edit Assets Modal */}
    <Modal size="md" show={this.state.showEditAsset} onHide={this.handleClose}>
		<Modal.Header closeButton>
		    <Modal.Title>Edit Assets</Modal.Title>
		</Modal.Header>
			<Modal.Body>
                <Form>
                Assets
                <InputGroup className="mb-3">
                <Input value={this.state.AssetType?this.state.AssetType:""} type="select" 
                onChange={this.handleAssetType}  >
                <option></option>
                <option value="Laptop">Laptop</option>
                <option value="Card">Card</option>
                <option value="Locker">Locker</option>
                </Input>
                </InputGroup>

                Assets Number
                <InputGroup className="mb-3">
                <Input value={this.state.AssetNumber?this.state.AssetNumber:""} type="text" 
                onChange={this.handleAssetNumber}   />
                </InputGroup>

                Assets Name
                <InputGroup className="mb-3">
                <Input value={this.state.AssetName?this.state.AssetName:""} type="text" 
                onChange={this.handleAssetName}  />
                </InputGroup>

                Full Name
                <InputGroup className="mb-3">
                <Input type="text" onChange={this.handleName}  />
                &nbsp;
                <Button color="danger" onClick={this.handleClose}>
					      Delete
                </Button>
                </InputGroup>

                EmployeeID
                <InputGroup className="mb-3">
                <Input type="text" onChange={this.handleName}  autoComplete="Name" />
                </InputGroup>

                Acquisition Date
                <InputGroup className="mb-3">
                <Input type="date" onChange={this.handleAcquisitionDate}  />
                </InputGroup>
                </Form>
            </Modal.Body>
		<Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
				Cancel
            </Button>
			<Button color="primary"  onClick={()=>this.handleUpdateAsset(this.state.AssetId)}>
				Save
            </Button>
		</Modal.Footer>
	</Modal>
    {/*End of Edit Assets Modal */}

    {/*Add Assets Modal */}
    <Modal size="sm" show={this.state.showAdd} onHide={this.handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>Add New Assets</Modal.Title>
		</Modal.Header>
		    <Modal.Body>
                <Form>
                    Assets
                    <InputGroup className="mb-3">
                    <Input type="select" onChange={this.handleAssetType} >
                    <option></option>
                    <option value="Laptop">Laptop</option>
                    <option value="Card">Card</option>
                    <option value="Locker">Locker</option>
                    </Input>
                    </InputGroup>
                    
                    <div style={{display: this.state.isLaptop?'':'none'}}>Asset Name
                    <InputGroup className="mb-3">
                    <Input type="text" style={{display: this.state.isLaptop?'':'none'}} onChange={this.handleAssetName} />
                    </InputGroup>
                    </div>

                    Asset Number
                    <InputGroup className="mb-3">
                    <Input type="text" onChange={this.handleAssetNumber} />
                    </InputGroup>
                </Form>
            </Modal.Body>
		<Modal.Footer>
			<Button color="danger" onClick={this.handleClose}>
				Cancel
            </Button>
			<Button color="primary" onClick={this.handlesubmitAddAssetData}>
				Save
            </Button>
		</Modal.Footer>
	</Modal>
    {/*End of Add Assets Modal */}

      {/*Asset Delete Modal*/}
          <Modal size="sm" show={this.state.showDeleteAsset} onHide={this.handleClose}>
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
            <Button color="danger" onClick={this.handledeleteasset}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      {/*End of Asset Delete Modal*/}



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
                        <i className="fa fa-folder" /> <b>&nbsp;Assets</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleAddAsset}>
                          Add New Assets
                        </Button>
                        &nbsp;
                        <Button
                          style={{ marginLeft: 10 }}
                          color="warning"
                          className="px-4"
                          onClick={this.handleAddDivision}>
                          Filter by Assets
                        </Button>

                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: '100%' }}
                          placeholder="Search By Assets"
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

                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>Assets</th>
                          <th>Assets Number</th>
                          <th>Assets Name</th>
                          <th>Full Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{
                       renderasset
                        }</tbody>
                    </Table>
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
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
