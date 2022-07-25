$(function() {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击"去登陆"的链接
  $('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从layui中获取form对象
  let form = layui.form
   // 从layui中获取layui对象
  let layer = layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义一个叫做pwd校验规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    // 校验两次密码是否一致的规则
    repwd:  function(value) {
      let pwd = $('.reg-box [name=password]').val()
      if(pwd !== value) {
        return '两次密码不一致!'
      }
    }
  })

  // 监听注册表单的提交功能
  $('.layui-form').on('submit', function(e){
      // 阻止默认的提交行为
      e.preventDefault()
      let data = {username:$('#form_reg  [name=username]').val(),password:$('#form_reg [name=password]').val()}
      // 发Ajax的Post请求
      $.post('/api/reguser',data,function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#link_login').click()
      } 
      )  
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    // let data = $(this).serialize()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data: {username:$('#form_login  [name=user]').val(),password:$('#form_login [name=password]').val()},
      success:function(res) {
      //   if(res.status !== 0) {
      //     return layer.msg('登录失败')
      //   }
        // layer.msg('登录成功')
        // 将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
  

})