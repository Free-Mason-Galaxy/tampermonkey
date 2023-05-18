// ==UserScript==
// @name         SLS-Annotation
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  阿里云SLS注解(转换)
// @author       You-RK
// @match        https://sls.console.aliyun.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document.idle
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    setTimeout(() => {
        // 快速分析区
        var cards = document.querySelectorAll(".sls-style-quick-card")
        for (var i = 0; i < cards.length; ++i) {
            // 每个索引的卡片
            cards[i].oncontextmenu = function (event) {
                // 匹配标题
                var title = this.querySelector(".sls-style-quick-titles").querySelector("span").innerHTML
                if (title == "event" || title == "zj_pm" || title == "message" || title == "source" || title == "state") {
                    // 转换
                    trans(title, this)
                    return false
                }
                return true
            }
        }
        // 内容区域
        document.querySelector(".sls-logOrigin-contanier").oncontextmenu = function (event) {
            var contents = this.querySelectorAll("[class^=style__kv-content__]")
            for (var i = 0; i < contents.length; ++i) {
                var cells = contents[i].querySelectorAll(".break-cell")
                for (var j = 0; j < cells.length; ++j) {
                    var key = cells[j].querySelector("[class*=style__keys__]").innerHTML
                    var value = cells[j].querySelector("a")
                    if(value.innerHTML.startsWith("<span")) {
                        value = value.querySelector("span")
                    }
                    transAndSet(key, value)
                }
            }
            return false
        }
    }, 3000)
})();

function trans(title, card) {
    var keys = card.querySelectorAll(".sls-style-quick-key")
    if (keys.length > 0) {
        for (var j = 0; j < keys.length; ++j) {
            keys[j].innerHTML = convert(title, keys[j].innerHTML)
        }
    }
}

function transAndSet(title, element) {
    element.innerHTML = convert(title, element.innerHTML)
}

function convert(title, content) {

    switch (title) {
        case "event":
            return eventTo(content)
        case "ad_type":
            return adTypeTo(content)
        case "source":
            return sourceTo(content)
        case "message":
            return decodeURIComponent(content)
        case "zj_pm":
            return zjPmTo(content)
        case "state":
            return stateTo(content)
        default:
            return content
    }

}

// 把 state 转换成对应的中文
// 使用 switch 语句
// Tt
// Ks
// Bd
// Jlym
// Sig
function stateTo(content) {
    var val
    switch (content) {
        case "Tt":
            val = "优量汇"
            break
        case "Ks":
            val = "快手"
            break
        case "Bd":
            val = "百度"
            break
        case "Jlym":
            val = "聚力阅盟"
            break
        case "Sig":
            val = "Sigmob"
            break
        default:
            val = content
            break
    }
    return content + "(" + val + ")"
}

// 把 source 转换成对应的中文
// 使用 switch 语句
function sourceTo(content) {
    var val
    switch (content) {
        case "1":
            val = "验证交易号"
            break
        case "2":
            val = "联盟回调"
            break
        case "3":
            val = "补充联盟验证交易号"
            break
        case "4":
            val = "验证交易号触发通知"
            break
        case "5":
            val = "联盟回调触发通知"
            break
        case "6":
            val = "生成交易号"
            break
        default:
            val = content
            break
    }

    return content + "(" + val + ")"
}

// 把 zjPm 转换成对应的中文
// 使用 switch 语句
function zjPmTo(content) {

    var val

    switch (content) {
        case "1":
            val = "优量汇"
            break
        case "2":
            val = "穿山甲"
            break
        case "3":
            val = "DSP"
            break
        case "4":
            val = "快手"
            break
        case "5":
            val = "H5Ad"
            break
        case "6":
            val = "百度"
            break
        case "8":
            val = "爆米花"
            break
        case "9":
            val = "MTG"
            break
        case "10":
            val = "Sigmob"
            break
        case "11":
            val = "YJK"
            break
        case "12":
            val = "UNI-AD"
            break
        case "13":
            val = "万维"
            break
        case "14":
            val = "云码"
            break
        case "15":
            val = "新闻资讯"
            break
        case "16":
            val = "微信小程序"
            break
        case "17":
            val = "17"
            break
        case "18":
            val = "语音红包"
            break
        case "19":
            val = "鱼玩盒子"
            break
        case "20":
            val = "抖音阅读闯关"
            break
        case "21":
            val = "任务墙"
            break
        case "22":
            val = "聚力阅盟"
            break
        case "23":
            val = "Google"
            break
        case "24":
            val = "倍孜"
            break
        case "25":
            val = "ToBid"
            break
        case "26":
            val = "GroMore"
            break
        default:
            val = content
            break
    }

    return content + "(" + val + ")"
}

// 把 ad_type 转换成对应的中文
// 使用 switch 语句
function adTypeTo(content) {
    var val
    switch (content) {
        case "1":
            val = "优量汇"
            break
        case "2":
            val = "穿山甲"
            break
        case "3":
            val = "DSP"
            break
        case "4":
            val = "快手"
            break
        case "5":
            val = "H5Ad"
            break
        case "6":
            val = "百度"
            break
        case "8":
            val = "爆米花"
            break
        case "9":
            val = "MTG"
            break
        case "10":
            val = "Sigmob"
            break
        case "11":
            val = "YJK"
            break
        case "12":
            val = "UNI-AD"
            break
        case "13":
            val = "万维"
            break
        case "14":
            val = "云码"
            break
        case "15":
            val = "新闻资讯"
            break
        case "16":
            val = "微信小程序"
            break
        case "17":
            val = "17"
            break
        case "18":
            val = "语音红包"
            break
        case "19":
            val = "鱼玩盒子"
            break
        case "20":
            val = "抖音阅读闯关"
            break
        case "21":
            val = "任务墙"
            break
        case "22":
            val = "聚力阅盟"
            break
        case "23":
            val = "Google"
            break
        case "24":
            val = "倍孜"
            break
        case "25":
            val = "ToBid"
            break
        case "26":
            val = "GroMore"
            break
        default:
            return content
    }
    return content + "(" + val + ")"
}

// 把事件转换成对应的中文
// 使用 switch 语句
function eventTo(content) {

    var val

    switch (content) {
        case "1":
            val = "eventLoad(填充)"
            break
        case "2":
            val = "eventShow(曝光)"
            break
        case "3":
            val = "eventClick(点击)"
            break
        case "4":
            val = "eventErr(错误)"
            break
        case "5":
            val = "eventOther(IOS激励发奖)"
            break
        case "6":
            val = "eventStart(请求)"
            break
        case "7":
            val = "eventFinish(激励发奖)"
            break
        case "8":
            val = "eventStartShow(激励播放)"
            break
        default:
            return content
    }

    return val
}