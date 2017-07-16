$(document).ready(function () {
    //下拉框初始化
    $('.ui.dropdown').dropdown();
    //菜单按钮点击事件
    $('#left-menu .item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //判断是否登陆
    $('.fake-button').api({
        action: 'staff info',
        method: 'GET',
        on: 'now',
        beforeXHR: function (xhr) {
            //判断token是否有效
            var token = getCookie('token');
            if (token == null || typeof (token) == undefined) {
                redirect('index.html');
            }
            xhr.setRequestHeader('X-token', getCookie('token'));
        },
        onSuccess: function (response) {
            if (response.error != null) {
                // $('#login').form('add errors', [response.code,response.error]);
            } else {
                $('#user-name').text(response.data.principalName);
            }
        },
        onFailure: function (response) {
            $('#login').form('add errors', '服务器暂无响应');
        }
    })
    //登录
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
        action: 'staff login',
        method: 'POST',
        serializeForm: true,
        onSuccess: function (response) {
            if (response.error != null) {
                $('#login').form('add errors', [response.code, response.error]);
            } else {
                setCookie('token', response.data.token);
                redirect('home.html');
            }
        },
        onFailure: function (response) {
            $('#login').form('add errors', '服务器暂无响应');
        }
    });
    //退出登录
    $('.logout').api({
        action: 'staff logout',
        method: 'GET',
        beforeXHR: function (xhr) {
            // adjust XHR with additional headers
            xhr.setRequestHeader('X-token', getCookie('token'));
        },
        onSuccess: function (response) {
            delCookie('token');
            redirect('index.html');
        }
    })

    //店铺管理
    //读取店铺信息
    loadShopList();

    function loadShopList() {
        $('.loal-shop-list').api({
            action: 'shop getAll',
            method: 'POST',
            on: 'now',
            beforeXHR: function (xhr) {
                //判断token是否有效
                if (getCookie('token') == null) {
                    redirect('index.html');
                }
                xhr.setRequestHeader('X-token', getCookie('token'));
            },
            onSuccess: function (response) {
                if (response.error != null) {
                    alert(response.code + ' : ' + response.error);
                } else {
                    $('#shop-list').empty();
                    $.each(response.data, function (i, data) {
                        var $tr = $('<tr></tr>');
                        var $id = $('<td class="shopId" style="display:none">' + data.id + '</td>');
                        var $shopName = $('<td class="shopName">' + data.shopName + '</td>');
                        var $manager = $('<td class="shopManager">' + data.manager + '</td>');
                        var $phone = $('<td class="shopPhone">' + data.phone + '</td>');
                        var $address = $('<td class="shopAddress">' + data.address + '</td>');
                        var $operate = $('<td><button class="ui tiny orange button mod-shop">修改</button><button class="ui tiny red button del-shop">删除</button></td>')
                        $tr.append($id);
                        $tr.append($shopName);
                        $tr.append($manager);
                        $tr.append($phone);
                        $tr.append($address);
                        $tr.append($operate);
                        $('#shop-list').append($tr);
                    })
                }
            },
            onFailure: function (response) {
                alert(response.code + ' : ' + response.error);
            },
        })
    }
    //新建店铺模态框
    $('.new-shop').on('click', function () {
        $('.new-shop-modal').modal({
                closable: false,
                onDeny: function () {
                    $('#new-shop').form('clear');
                },
                onApprove: function () {
                    $('#new-shop').submit();
                    return false;
                }
            })
            .modal('show');
    })
    //新建店铺信息提交
    $('#new-shop').form({
        on: 'change',
        inline: true,
        fields: {
            newShopName: {
                identifier: 'shopName',
                rules: [{
                    type: 'empty',
                    prompt: '店铺名不能为空'
                }]
            },
            newShopManager: {
                identifier: 'manager',
                rules: [{
                    type: 'empty',
                    prompt: '负责人不能为空'
                }]
            },
            newShopPhone: {
                identifier: 'phone',
                rules: [{
                        type: 'empty',
                        prompt: '电话不能为空'
                    },
                    {
                        type: 'number',
                        prompt: '请输入有效的电话'
                    }
                ]
            },
            newShopAddress: {
                identifier: 'address',
                rules: [{
                    type: 'empty',
                    prompt: '地址不能为空'
                }]
            },
        },
        onSuccess: function (e) {
            //阻止表单的提交
            e.preventDefault();
        }
    }).api({
        action: 'shop insert',
        method: 'POST',
        serializeForm: true,
        beforeXHR: function (xhr) {
            //判断token是否有效
            if (getCookie('token') == null) {
                redirect('index.html');
            }
            xhr.setRequestHeader('X-token', getCookie('token'));
        },
        onSuccess: function (response) {
            if (response.error != null) {
                alert(response.code + ' : ' + response.error);
            } else {
                $('#new-shop').form('clear');
                $('.new-shop-modal').modal('hide');
                loadShopList();
            }
        },
        onFailure: function (response) {
            alert('服务器暂无响应');
        },
    });

    //修改店铺模态框
    $(document).on('click', '.mod-shop', function () {
        $('#mod-shop-id').text($(this).parent().parent().find('.shopId').text())
        $('#mod-shop').find('input[name="shopName"]').val($(this).parent().parent().find('.shopName').text());
        $('#mod-shop').find('input[name="manager"]').val($(this).parent().parent().find('.shopManager').text());
        $('#mod-shop').find('input[name="phone"]').val($(this).parent().parent().find('.shopPhone').text());
        $('#mod-shop').find('input[name="address"]').val($(this).parent().parent().find('.shopAddress').text());
        $('.mod-shop-modal').modal({
                closable: false,
                onDeny: function () {
                    $('#mod-shop').form('clear');
                    $('#mod-shop-id').text('');
                },
                onApprove: function () {
                    $('#mod-shop').submit();
                    return false;
                }
            })
            .modal('show');
    })
    //修改店铺信息提交
    $('#mod-shop').form({
        on: 'change',
        inline: true,
        fields: {
            modShopName: {
                identifier: 'shopName',
                rules: [{
                    type: 'empty',
                    prompt: '店铺名不能为空'
                }]
            },
            modShopManager: {
                identifier: 'manager',
                rules: [{
                    type: 'empty',
                    prompt: '负责人不能为空'
                }]
            },
            modShopPhone: {
                identifier: 'phone',
                rules: [{
                        type: 'empty',
                        prompt: '电话不能为空'
                    },
                    {
                        type: 'number',
                        prompt: '请输入有效的电话'
                    }
                ]
            },
            modShopAddress: {
                identifier: 'address',
                rules: [{
                    type: 'empty',
                    prompt: '地址不能为空'
                }]
            },
        },
        onSuccess: function (e) {
            //阻止表单的提交
            e.preventDefault();
        }
    }).api({
        action: 'shop update',
        method: 'POST',
        serializeForm: true,
        beforeXHR: function (xhr) {
            //判断token是否有效
            if (getCookie('token') == null) {
                redirect('index.html');
            }
            xhr.setRequestHeader('X-token', getCookie('token'));
        },
        beforeSend: function (settings) {
            if ($('#mod-shop-id').text() != '') {
                settings.data.id = $('#mod-shop-id').text();
                return settings;
            } else {
                alert('ID为空')
                return false;
            }
        },
        onSuccess: function (response) {
            if (response.error != null) {
                alert(response.code + ' : ' + response.error);
            } else {
                $('#mod-shop-id').text('');
                $('#mod-shop').form('clear');
                $('.mod-shop-modal').modal('hide');
                loadShopList();
            }
        },
        onFailure: function (response) {
            alert('服务器暂无响应');
        }
    });

    //删除店铺模态框
    $(document).on('click', '.del-shop', function () {
        $('#del-shop-id').text($(this).parent().parent().find('.shopId').text())
        $('.del-shop-modal').modal({
                closable: false,
                onDeny: function () {
                    $('#del-shop-id').text('');
                },
                onApprove: function () {
                    $('.fake-button').api({
                        action: 'shop delByIds',
                        method: 'POST',
                        on: 'now',
                        beforeXHR: function (xhr) {
                            //判断token是否有效
                            if (getCookie('token') == null) {
                                redirect('index.html');
                            }
                            xhr.setRequestHeader('X-token', getCookie('token'));
                        },
                        beforeSend: function (settings) {
                            if ($('#del-shop-id').text() != '') {
                                settings.data.id = $('#del-shop-id').text();
                                return settings;
                            } else {
                                alert('ID为空')
                                return false;
                            }
                        },
                        onSuccess: function (response) {
                            if (response.error != null) {
                                alert(response.code + ' : ' + response.error);
                            } else {
                                $('#del-shop-id').text('');
                                $('.del-shop-modal').modal('hide');
                                loadShopList();
                            }
                        },
                        onFailure: function (response) {
                            alert('服务器暂无响应');
                        }
                    })
                    return false;
                }
            })
            .modal('show');
    })
})