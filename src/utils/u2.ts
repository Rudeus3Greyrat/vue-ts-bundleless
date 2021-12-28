export default {
  // u2登录参数
  app: {
    appId: process.env.VUE_APP_CLIENT_ID,
    appKey: process.env.VUE_APP_CLIENT_SECRET,
    appUrl: process.env.VUE_APP_REDIRECT_URL,
    loginUrl: process.env.VUE_APP_U2_LOGIN_URL,
    logoutUrl: process.env.VUE_APP_U2_LOGOUT_URL,
    ehrOrgId: process.env.VUE_APP_EHR_ORG_ID
  },
  login: function(path) {
    this.clearCookie();
    let appUrl = path || this.app.appUrl;
    window.location.href = `${this.app.loginUrl}?app_id=${this.app.appId}&redirect_uri=${appUrl}&response_type=code&scope=login&state=${this.app.appKey}&ehr_org_id=105`;
  },
  logout: function() {
    this.clearCookie(); // 防止退出登陆u2不清cookie
    window.location.href = `${this.app.logoutUrl}?app_id=${this.app.appId}&redirect_uri=${this.app.appUrl}&response_type=code&scope=logout&state=${this.app.appKey}&ehr_org_id=105`;
  },
  clearCookie: function() {
    this._removeCookie("U2NickName");
    this._removeCookie("E2Token");
    this._removeCookie("U2AT");
    this._removeCookie("E2Email");
  },
  getUserInfo() {
    let result = {
      U2User: this._getCookie("U2User"),
      U2NickName:
        this._getCookie("U2NickName") || process.env.VUE_APP_USER_NICK_NAME,
      U2UserId: this._getCookie("U2UserId"),
      U2AT: this._getCookie("U2AT") || process.env.VUE_APP_TOKEN,
      U2Email: this._getCookie("U2Email")
    };
    return result;
  },
  _getCookie(name) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arrMatch = document.cookie.match(reg);
    if (arrMatch) {
      return decodeURIComponent(arrMatch[2]);
    }
    return null;
  },
  _removeCookie(name) {
    const expDate = new Date();
    expDate.setTime(expDate.getTime() - 1);
    const cookieVal = this._getCookie(name);
    if (cookieVal != null) {
      document.cookie =
        name + "=" + cookieVal + ";expires=" + expDate.toUTCString();
    }
  }
};
