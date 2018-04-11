import { Promise } from 'es6-promise';


if (parent.__encode__iframe__callback__) { // 判断当前页面是否为子窗口
    parent.__encode__iframe__callback__(location.search.split('=')[1]);
    //直接关闭当前子窗口
    window.close();
}

function _encode(str, charset, callback) {
    //创建form通过accept-charset做encode
    var form = document.createElement('form');
    form.method = 'get';
    form.style.display = 'none';
    form.acceptCharset = charset;
    if (document.all) {
        //如果是IE那么就调用document.charset方法
        window.oldCharset = document.charset;
        document.charset = charset;
    }
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'str';
    input.value = str;
    form.appendChild(input);
    form.target = '__encode__iframe__'; // 指定提交的目标的iframe
    document.body.appendChild(form);
    //隐藏iframe截获提交的字符串
    // if (!window['__encode__iframe__']) {
    var iframe;
    if (document.all) {
        try {
            iframe = document.createElement('<iframe name="__encode__iframe__"></iframe>');
        } catch (e) {
            iframe = document.createElement('iframe');
            iframe.setAttribute('name', '__encode__iframe__');
        }
    } else {
        iframe = document.createElement('iframe');
        iframe.setAttribute('name', '__encode__iframe__');
    }
    iframe.style.display = 'none';
    iframe.width = "0";
    iframe.height = "0";
    iframe.scrolling = "no";
    iframe.allowtransparency = "true";
    iframe.frameborder = "0";
    iframe.src = 'about:blank'; // 设置为空白
    document.body.appendChild(iframe);
    // }
    //
    window.__encode__iframe__callback__ = function (str) {
        callback(str);
        if (document.all) {
            document.charset = window.oldCharset;
        }
    }
    //设置回调编码页面的地址，这里需要用户修改
    form.action = window.location.href;
    form.submit();
    setTimeout(function () {
        form.parentNode.removeChild(form);
        iframe.parentNode.removeChild(iframe);
    }, 1000) // 0.5秒后移除节点
}



function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function _decode(str, charset, callback) {
    var script = document.createElement('script');
    var id = randomId();
    script.id = `_urlDecodeFn_${id}`;
    window[`_urlDecodeFn_${id}`] = callback;
    var src = 'data:text/javascript;charset=' + charset + `,_urlDecodeFn_${id}("` + str + '");';
    src += `document.getElementById("_urlDecodeFn_${id}").parentNode.removeChild(document.getElementById("_urlDecodeFn_${id}"));`;
    script.src = src;
    document.body.appendChild(script);
}



const decode = (str, charset = 'gbk') => new Promise((resolve, reject) => {
    try {
        _decode(str, charset, data => {
            resolve(data);
        });
    } catch (e) {
        resolve('字符解码错误.', e.toString());
    }

})
const encode = (str, charset = 'gbk') => new Promise((resolve, reject) => {
    try {
        _encode(str, charset, data => {
            resolve(data);
        });
    } catch (e) {
        resolve('字符编码错误.', e.toString());
    }

})

export default { decode, encode }