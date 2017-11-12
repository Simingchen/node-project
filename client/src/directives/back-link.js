export default {
  inserted (el) {
    el.addEventListener('click', function () {
        // 解决退回上一页返回登录页的死循环跳转
        if(window.previousPath && window.previousPath.fullPath == "/login"){
            window.location.href="/";
            return false;
        }
        window.history.back();
    })
  }
}
