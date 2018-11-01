// let baseUrl = 'https://qfsblyjmed.zwjk.com/'  //测试
// let baseUrl =  'https://qfsblyj.zwjk.com/'  //生产
let baseUrl = 'https://testjsb.zwjk.com/'

export const api = {
  getAddress: baseUrl + 'address/getaddressinfo',         //获取地址信息
  addAddress: baseUrl + 'address/addaddressinfo',         //新增地址
  deleteAddress: baseUrl + 'address/deleteaddressinfo',   //删除地址
  updateAddress: baseUrl + 'address/updateaddressinfo',   //编辑地址
  setDefaultAddress: baseUrl + 'address/setaddressstate',  //设置默认地址
  getApplicationList: baseUrl + 'manage/getapplicationmanage', //获取打印列表
  getAskRecord: baseUrl + 'medical/getmedicalrecord', // 获取申请记录

  fillPatientInfo: baseUrl + 'medical/info',  //填写用户信息
  getMessageCode: baseUrl + 'mhmessage/sendMsg',   //获取短信验证码
  uploadFront: baseUrl + 'medical/uploadImage1',   //上传图片1
  uploadBehind: baseUrl + 'medical/uploadImage2',  //上传图片2
  uploadInHand: baseUrl + 'medical/uploadImage3',  //上传图片3
  submit: baseUrl + 'medical/send',                //提交请求

  cancelApplication: baseUrl + 'medical/cancelapplication'  //取消请求
}
