<script setup>
import { ref, onMounted } from 'vue';
import IconSearch from './icons/IconSearch.vue';

const orderId = ref('');
const historyIds = ref([]);
const emit = defineEmits(['search'])

onMounted(() => {
    const url = new URL(window.location);
    const order_id = url.searchParams.get('order_id')
    orderId.value = order_id;

    loadHistoryIds()
})

function fillId(id) {
    orderId.value = id;
}

function searchHandler() {
    addToStore(orderId.value);
    addParameterToURL('order_id', orderId.value);
    emit('search', orderId.value);
}

function addToStore(val) {
    try {
        const orderIds = JSON.parse(localStorage.getItem('orderIds') || "[]");
        if (orderIds.indexOf(val) < 0) {
            orderIds.push(val);
        }
        localStorage.setItem('orderIds', JSON.stringify(orderIds));
    } catch (error) {
        console.error(new Error('AddToStore Error'));
    }
}

function loadHistoryIds() {
    const orderIds = JSON.parse(localStorage.getItem('orderIds') || "[]");
    historyIds.value = orderIds.slice(0, 3);
}

function addParameterToURL(paramName, paramValue) {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    params.set(paramName, paramValue);
    url.search = params.toString();
    window.location.href = url
}
</script>

<template>
    <div class="search-box">
        <div class="container">
            <div class="box">
                <div class="left-box">
                    <textarea v-model="orderId" name="orderId" id="orderId"></textarea>
                </div>
                <div class="btn-box">
                    <a @click="searchHandler" href="javascript:;">
                        <IconSearch fill="#fff"></IconSearch>
                    </a>
                </div>
            </div>
            <ul class="history">
                <li v-for="item in historyIds"><a href="javascript:;" @click="fillId(item)">{{ item }}</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0;
    align-items: center;
}

.box {
    display: flex;
    justify-content: center;
}

.history {
    width: 610px;
    display: flex;
    flex-flow: wrap;

    li {
        margin-right: 8px;
    }
}

.left-box {
    width: 500px;
}

textarea {
    border-radius: 3px;
    border-color: #ccc;
    padding: 5px;
    width: 100%;
    height: 80px;
}

.btn-box {
    margin-left: 50px;

    a {
        display: block;
        width: 60px;
        height: 60px;
        padding: 10px;
        background: #f9a633;
        border-radius: 3px;

        &:hover {
            transform: scale(1.03);
        }
    }

    svg {
        width: 100%;
        height: 100%;
    }
}

@media (max-width: 768px) {
    .box {
        width: 80%;
    }

    .left-box {
        width: 100%;

        textarea {
            height: 80%;
        }
    }

    .history {
        width: 80%;
    }

    .btn-box {
        margin-left: 10px;

        a {
            width: 40px;
            height: 40px;
        }
    }
}
</style>