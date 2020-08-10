import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const AddAccount = React.lazy(() => import('./views/Pages/Account/AddAccount'));
const ListAccount = React.lazy(() => import('./views/Pages/Account/ListAccount'));
const Editaccount = React.lazy(() => import('./views/Pages/Account/EditAccount'));
const ListAtOffice = React.lazy(() => import('./views/Pages/Absensi/AtOffice/ListAtOffice'));
const ListWorkFromHome = React.lazy(() => import('./views/Pages/Absensi/WorkFromHome/ListWorkFromHome'));
const ListBelomAbsen = React.lazy(() => import('./views/Pages/Absensi/BelomAbsen/ListBelomAbsen'));
const ListAllAbsen = React.lazy(() => import('./views/Pages/Absensi/ListAllAbsensi/ListAllAbsensi'));
const ListApproval = React.lazy(() => import('./views/Pages/Absensi/Approval/ListApproval'));
const ListWorkAtClient = React.lazy(() => import('./views/Pages/Absensi/WorkAtClient/ListWorkAtClient'));
const ListSick = React.lazy(() => import('./views/Pages/Absensi/Sick/ListSick'));
const ListDivision = React.lazy(() => import('./views/Pages/Division/ListDivision'));
const ListJobtitle = React.lazy(() => import('./views/Pages/Jobtitle/ListJobtitle'));
const ListRole = React.lazy(() => import('./views/Pages/Role/ListRole'));
const TestLur = React.lazy(() => import('./views/Pages/Test/index'));
const Details = React.lazy(() => import('./views/Pages/Details/details'));
const Edit = React.lazy(() => import('./views/Pages/Edit/editacc'));
const CAccount = React.lazy(() => import('./views/Pages/CAccount/CAccount'));
const Payroll = React.lazy(() => import('./views/Pages/Payroll/ListPayroll'));
const Assets = React.lazy(() => import('./views/Pages/Assets/Asset'));


class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>

            <Route exact path="/absensi/listallabsen" name="Test Page" render={props => <ListAllAbsen {...props}/>} />
            <Route exact path="/absensi/testlur" name="Test Page" render={props => <TestLur {...props}/>} />
            <Route exact path="/absensi/workfromhome" name="Edit Account Page" render={props => <ListWorkFromHome {...props}/>} />
            <Route exact path="/absensi/workatclient" name="Edit Account Page" render={props => <ListWorkAtClient {...props}/>} />
            <Route exact path="/absensi/sick" name="Edit Account Page" render={props => <ListSick {...props}/>} />
            <Route exact path="/absensi/belumabsen" name="Edit Account Page" render={props => <ListBelomAbsen {...props}/>} />
            <Route exact path="/absensi/atoffice" name="Edit Account Page" render={props => <ListAtOffice {...props}/>} />
            <Route exact path="/absensi/approval" name="Edit Account Page" render={props => <ListApproval {...props}/>} />
            <Route exact path="/details/detailsacc" name="Details Page" render={props => <Details {...props}/>} />
            <Route exact path="/edit/editacc" name="Edit Page" render={props => <Edit {...props}/>} />
            <Route exact path="/caccount/caccounts" name="CAccount Page" render={props => <CAccount {...props}/>} />
            <Route exact path="/payroll/payrollinfo" name="Payroll Page" render={props => <Payroll {...props}/>} />
            <Route exact path="/assets/asset" name="Assets Page" render={props => <Assets {...props}/>} />
            <Route path="/account/detailaccount/:id" render={props => <Details {...props}/> } />
            <Route path="/account/editaccount/:id" render={props => <Edit {...props}/> } />
            
            
            <Route exact path="/division/listdivision" name="List Division Page" render={props => <ListDivision {...props}/>} />
            <Route exact path="/jobtitle/listjobtitle" name="List Division Page" render={props => <ListJobtitle {...props}/>} />
            <Route exact path="/role/listrole" name="List Division Page" render={props => <ListRole {...props}/>} />
            
            {/* <Route exact path="/account/editaccount/:id" name="Edit Account Page" render={props => <Editaccount {...props}/>} /> */}
            <Route exact path="/account/listaccount" name="List Account Page" render={props => <ListAccount {...props}/>} />
            <Route exact path="/account/addaccount" name="Add Account Page" render={props => <AddAccount {...props}/>} />
              
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
