export const urlAbsen = "https://eworkmoonlay-absen-dev.azurewebsites.net/v1/Absensis";
export const urlBlob = "https://eworkmoonlay-absen-dev.azurewebsites.net/api/BlobStorage/InsertFile";
export const urlUser = "https://eworkmoonlay-user-dev.azurewebsites.net/v1/accounts";
//export const urlUser ='http://localhost:60213/v1/accounts';
export const urlLogin = 'https://eworkmoonlay-user-dev.azurewebsites.net/v1/authenticate';
//export const urlDivision = 'https://divison.appspot.com/v1/divisions';
export const urlDivision = 'https://eworkmoonlay-core-dev.azurewebsites.net/v1/divisions'
export const urlJobtitle = 'https://eworkmoonlay-core-dev.azurewebsites.net/v1/job-titles';
export const urlRole = 'https://eworkmoonlay-user-dev.azurewebsites.net/v1/roles';
export const urlMe = 'https://eworkmoonlay-user-dev.azurewebsites.net/v1/me'
//dari sini
export const urlProject = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/Projects';
export const urlActiviyCategory = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/ActivityCategory';
export const urlActivity = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/Activity';
export const urlReport = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/Reports';
export const urlTimeSheet = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/TimeSheet';
export const urlTaskManagement = 'https://eworkmoonlay-absen-dev.azurewebsites.net/v1/Task';
//Sampe sini udah APi kami
export const urlFamilyData = 'https://345f28ad2886.ngrok.io/v1/familydata';
export const urlContact = 'https://345f28ad2886.ngrok.io/v1/familydata/emergencyContact';
export const urlInformalEducationData = 'https://345f28ad2886.ngrok.io/v1/informaleducation';
export const urlWorkingExperienceData = 'https://345f28ad2886.ngrok.io/v1/workingExperience';
export const urlAssets = 'https://345f28ad2886.ngrok.io/v1/assets';
export const urlAccount = 'https://345f28ad2886.ngrok.io/v1/accountprofile';
  export const appovedList = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Declined', label: 'Declined' },
  ];

  export const stateList = [
    { value: 'Work at Office', label: 'At Office' },
    { value: 'Work from home', label: 'Work from home' },
    { value: 'Sick Leave', label: 'Sick' },
    { value : 'Work at client', label:'Work At Client'}
  ];

  export const stateHeadDivision = [
    { value: 'A', label: 'AAAAAA' },
    { value: 'B', label: 'BBBBBB' },
    { value: 'C', label: 'CCCCCCC' },
    { value : 'D', label:'DDDDDD'}
  ];

  export const divisionList = [
    { value: 'A', label: 'AAAAAA' },
    { value: 'B', label: 'BBBBBB' },
    { value: 'C', label: 'CCCCCCC' },
    { value : 'D', label:'DDDDDD'}
  ];


  export const jobtitleList = [
    { value: 'E', label: 'EEEEE' },
    { value: 'F', label: 'FDDDD' },
    { value: 'G', label: 'GFFFFF' },
    { value : 'H', label:'HGGGG'}
  ];

  export const permisionRoleIdList = [
    { value: '1', label: 'Can Appove' },
    { value: '2', label: 'Cannot Approve' }
  ];