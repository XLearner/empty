<script setup>
import IconArrowRight from './icons/IconArrowRight.vue';
import IconTransport from './icons/IconTransport.vue';
import IconSuccess from './icons/IconSuccess.vue';
import { countryMap } from '@/utils/country';
import IconCopy from './icons/IconCopy.vue';
import QRCode from 'qrcode';
import { ref } from 'vue';

const grey = "#b2bbbe";
const green = '#45b787';
const routeMess = defineModel();
const enumState = ["待上网", "运输中", "派送中", "投递失败", "成功签收", "可能异常"];
const qrcode = ref('');

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
            console.log('Text copied to clipboard');
        }).catch(function (err) {
            console.error('Failed to copy text: ', err);
        });
    } else {
        console.error('Clipboard API not available');
    }
}

function copyId() {
    copyToClipboard(routeMess.value[0].id);
    alert('复制成功');
}

function copyLink() {
    copyToClipboard(window.location);
    alert('复制成功');
}

function toQRCode() {
    const url = location.href;
    QRCode.toString(url, { type: 'terminal' }, (err, url) => {
        qrcode.value = url;
    })
}

function copyDetail() {
    let message = '';
    const history = routeMess.value[0].history;
    for (let i = 0, len = history.length; i < len; i++) {
        const item = history[i];
        message += (item.on ? "【完成】" : "【当前状态】") + transTime(item.updateTime) + '  ' + item.txt + '\n';
    }
    message += '=========================\n中瀚物流'
    copyToClipboard(message)
    alert('复制成功')
}
function transTime(date) {
    const d = new Date(date);
    const y = d.getFullYear(),
        mon = toTwo(d.getMonth() + 1),
        D = toTwo(d.getDate()),
        h = toTwo(d.getHours()),
        m = toTwo(d.getMinutes()),
        s = toTwo(d.getSeconds());
    return `${y}/${mon}/${D} ${h}:${m}:${s}`;

    function toTwo(p) {
        return p.toString().padStart(2, '0');
    }
}

</script>

<template>
    <div class="content-box">
        <div class="container">
            <div class="tit-box">
                <div class="order">
                    <div class="state">
                        <!-- <IconTransport fill="#fff"></IconTransport> -->
                        <IconSuccess></IconSuccess>
                    </div>
                    <div>
                        <p class="order-id">单号：{{ routeMess[0].id }}<i class="copy" @click="copyId">
                                <IconCopy />
                            </i></p>
                        <p class="short-mess">{{ enumState[routeMess[0].state] }}</p>
                    </div>
                </div>

                <div class="country">{{ countryMap[routeMess[0].origin] }}-> {{ countryMap[routeMess[0].destination] }}
                </div>

                <div class="mess">{{ routeMess[0].lastState.txt }} {{ transTime(routeMess[0].lastState.updateTime) }}
                </div>
            </div>

            <div class="details">
                <div class="stit">当前状态：{{ routeMess[0].lastState.txt }} {{ transTime(routeMess[0].lastState.updateTime)
                    }}</div>
                <h3>历史轨迹：</h3>
                <ul>
                    <li v-for="item in routeMess[0].history">
                        <i class="icon-box" :class="{ 'on': item.on }">
                            <IconArrowRight :fill="item.on ? green : grey"></IconArrowRight>
                        </i>
                        <span class="txt">{{ transTime(item.updateTime) }}&nbsp;&nbsp;{{ item.txt }}</span>
                    </li>
                </ul>
                <div class="details-bottom">
                    <div class="btn"><a class="copy-detail" href="javascript:;" @click="copyDetail">复制详细</a></div>
                    <div class="btn"><a class="copy-link" href="javascript:;" @click="copyLink">复制链接</a></div>
                    <div class="btn"><a class="copy-link" href="javascript:;" @click="toQRCode">生成二维码</a></div>
                </div>
                <div class="qrcode-box" v-if="qrcode">
                    <div class="qrcode" v-html="qrcode"></div>
                    <p>单号：{{ routeMess[0].id }}</p>
                    <p>手机扫码查看物流信息</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tit-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    padding-right: 40%;

    .order {
        display: flex;
    }

    .state {
        margin-right: 10px;
        height: 50px;
        width: 50px;
        border-radius: 3px;
    }
}

.copy {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: sub;
    margin-left: 10px;
    cursor: pointer;

    svg {
        width: 100%;
        height: 100%;
    }
}

.country {
    font-size: 28px;

}

.details {
    .stit {
        font-size: 22px;
        font-weight: 600;
        padding: 8px 0;
        margin-bottom: 10px;
    }

    h3 {
        margin-bottom: 10px;
    }

    ul {
        border-bottom: 1px solid #b2bbbe;
        margin-bottom: 20px;
    }

    li {
        cursor: pointer;
        padding: 8px 0 8px 8px;
        padding-left: 36px;
        position: relative;
        margin-bottom: 10px;
        transition: all .3s;

        .icon-box {
            display: block;
            line-height: 0;
            width: 22px;
            height: 22px;
            padding: 2px;
            position: absolute;
            left: 8px;
            top: 50%;
            border-radius: 50%;
            border: 2px solid #b2bbbe;
            background-size: 10px;
            text-decoration: none;
            transform: translateY(-50%);
            transition: all .7s;

            &.on {
                border-color: #45b787;
            }
        }

        .txt {
            display: block;
            border-left: 2px solid #b2bbbe;
            padding-left: 8px;
            line-height: 1.5;
        }

        &:hover {
            box-shadow: 0 0 5px #b2bbbe;
            border-radius: 5px;
        }
    }

    .icon-box svg {
        width: 100%;
        height: 100%;
    }
}

.details-bottom {
    display: flex;

    .btn {
        margin-right: 10px;
    }
}

.qrcode-box {
    width: 200px;
    margin-top: 10px;

    .qrcode {
        width: 200px;
        height: 200px;
    }
    p {
        text-align: center;
    }
}

@media (max-width: 1200px) {
    .tit-box {
        padding-right: 0;
        width: 100%;
    }
}

@media (max-width: 768px) {
    .tit-box {
        display: block;

        .order {
            border-bottom: 1px solid #ccc;
        }

        .country {
            border-bottom: 1px solid #ccc;
            padding: 15px 0;
            text-align: center;
        }

        .mess {
            padding: 15px 0;
        }
    }
}
</style>