# web-iconv
利用前端的能力来进行字符的编解码。支持常用的UTF-8、GBK、GB2312。

## 使用说明
```sh
npm install -S web-iconv
```

```js
import { decode, encode } from "web-iconv";
encode('云在青天水在瓶', 'gbk').then(data => {
    console.log(`GBK编码后的字符串: ${data}`);
    decode(data, 'gbk').then(data => {
        console.log(`GBK解码后的数据：${data}`)
    })
    // 必须等到上一次编解码结束后才能开启新一轮编解码，不然会造成冲突。
    encode('云在青天水在瓶', 'gb2312').then(data => { 
        console.log(`GB2312编码后的字符串: ${data}`);
        decode(data, 'gb2312').then(data => {
            console.log(`GB2312解码后的数据：${data}`)
        })
        encode('云在青天水在瓶', 'utf-8').then(data => {
            console.log(`UTF-8编码后的字符串: ${data}`);
            decode(data, 'utf-8').then(data => {
                console.log(`UTF-8解码后的数据：${data}`)
            })
        })
    })
})

```

## License

MIT