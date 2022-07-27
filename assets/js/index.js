$(function(){

    getUserInfo()
    renderAvator()

    let layer = layui.layer
    $('#btnLogout').on('click', function(){
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', {icon:3,title:'提示一下'}, function(index){
        // 清空本地存储中的token
        localStorage.removeItem('token')
        //    重新跳转到登录界面
        location.href = '/login.html'
           layer.close(index)
        })
    })
})

function getUserInfo() {
   $.ajax({
       method:'GET',
       url:'/api/login',
    // headers 就是请求头配置对象
       headers: {
           Authorization:localStorage.getItem('token') || ''
       },
       success:function(res) {
          if(res.status !== 0) {
              return layui.layer.msg('获取用户信息失败')
          }
          renderAvator(res.data)
       }
    
   })

}

// 渲染用户的头像
function renderAvator(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
    // 设置欢迎的脚本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if(user.user_pic !== null) {
    // 渲染图片头像
        $('.layui-nav-img')
          .attr('src', user.user_pic)
          .show()
        $('.text-avatar')
          .hide()
    } else {
     // 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar')
           .html(first)
           .show()
    }
}
    
