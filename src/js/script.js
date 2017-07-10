$(document).ready(function () {
    //下拉框初始化
    $('.ui.dropdown').dropdown();
    //菜单按钮点击事件
    $("#left-menu .item").on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
    //2017.07.10.zq 登录
    $('#login').form({
        fields: {
            account: {
                identifier: 'account',
                rules: [{
                        type: 'empty',
                        prompt: '邮箱不能为空'
                    },
                    {
                        type: 'email',
                        prompt: '请输入有效的邮箱'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '密码不能为空'
                }]
            }
        },
        onSuccess: function (e) {
            //阻止表单的提交
            e.preventDefault();
        }
    }).api({
        action: 'login',
        method: 'POST',
        serializeForm: true,
        onSuccess: function (response) {
            if (response.error != null) {
                $('#login').form('add errors', [response.error]);
            } else {
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("name", response.data.principalName);
                setCookie("token", response.data.token);
                redirect("home.html");
            }
        },
    });
})