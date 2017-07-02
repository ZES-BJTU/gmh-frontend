$(document).ready(function () {
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
        onSuccess: function(data) {
            if(data.error != null){
                $('#login').form('add errors',[data.error]);
            }else{
                alert(1);
            }
        },
    });
})