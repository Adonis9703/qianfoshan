//let baseUrl = 'http://test.zpq.ucmed.cn/'
let baseUrl =  'http://192.168.0.10:8080/'

export const api = {
  getAddress: baseUrl + 'address/getaddressinfo',
  addAddress: baseUrl + 'address/addaddressinfo',
  deleteAddress: baseUrl + 'address/deleteaddressinfo',
  updateAddress: baseUrl + 'address/updateaddressinfo',
  setDefaultAddress: baseUrl + 'address/setaddressstate',
  getApplicationList: baseUrl + 'manage/getapplicationmanage', //获取打印列表
  getAskRecord: baseUrl + 'medical/getmedicalrecord', // 获取申请记录

  fillPatientInfo: baseUrl + 'medical/info',  //填写用户信息
  getMessageCode: baseUrl + 'mhmessage/sendMsg',   //获取短信验证码
  uploadFront: baseUrl + 'medical/uploadImage1',
  uploadBehind: baseUrl + 'medical/uploadImage2',
  uploadInHand: baseUrl + 'medical/uploadImage3',
  submit: baseUrl + 'medical/send',

  cancelApplication: baseUrl + 'medical/cancelapplication'  //取消请求
}
