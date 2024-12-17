<script setup>
import IconArrowRight from './icons/IconArrowRight.vue';
import IconTransport from './icons/IconTransport.vue';
import IconSuccess from './icons/IconSuccess.vue';

const grey = "#b2bbbe";
const green = '#45b787';
const routeMess = defineModel()

// const routeMess = [
//     {
//         on: true,
//         time: '2024-07-13 00:04',
//         txt: '深圳市，快件到达处理中心【深圳市】'
//     },
//     {
//         on: true,
//         time: '2024-07-13 00:04',
//         txt: '深圳市，快件到达处理中心【深圳市】'
//     },
//     {
//         on: false,
//         time: '2024-07-13 00:04',
//         txt: '深圳市，快件到达处理中心【深圳市】'
//     },
// ]

// 复制到剪贴板
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Text copied to clipboard');
    }).catch(function(err) {
      console.error('Failed to copy text: ', err);
    });
  } else {
    console.error('Clipboard API not available');
  }
}

function copyLink() {
    copyToClipboard(window.location)
    alert('复制成功')
}

function copyDetail() {
    let message = '';
    for (let i = 0, len = routeMess.value.length; i < len; i++) {
        const item = routeMess.value[i];
        message += (item.on? "【完成】":"【当前状态】" )+ item.time + '  ' + item.txt + '\n';
    }
    message += '=========================\n中瀚物流'
    copyToClipboard(message)
    alert('复制成功')
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
                        <p class="order-id">单号：<i class="copy"></i></p>
                        <p class="short-mess">运输中</p>
                    </div>
                </div>
                <div class="country">中国-> </div>
                <div class="mess">已签收-签收时间 00-00</div>
            </div>
            <div class="details">
                <div class="stit">当前状态：已签收-签收时间 00-00</div>
                <h3>历史轨迹：</h3>
                <ul>
                    <li v-for="item in routeMess">
                        <i class="icon-box" :class="{ 'on': item.on }">
                            <IconArrowRight :fill="item.on ? green : grey"></IconArrowRight>
                        </i>
                        <span class="txt">{{ item.time }} {{ item.txt }}</span>
                    </li>
                </ul>
                <div class="details-bottom">
                    <div class="btn"><a class="copy-detail" href="javascript:;" @click="copyDetail">复制详细</a></div>
                    <div class="btn"><a class="copy-link" href="javascript:;" @click="copyLink">复制链接</a></div>
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