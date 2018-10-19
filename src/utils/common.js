export const common = {
  test () {
    console.log(`test`)
  },
  setUserInfo2Local( obj ){
    localStorage.setItem('userInfo', JSON.stringify(obj))
  },
  getUserInfoFMLocal() {
    return JSON.parse(localStorage.getItem('userInfo'))
  }
}
//this.$common
