<script setup>
import { ref, onMounted } from 'vue';
import IconSearch from './icons/IconSearch.vue';

const orderId = ref('');

onMounted(() => {
    const url = new URL(window.location);
    const order_id = url.searchParams.get('order_id')
    orderId.value = order_id;
})

function searchHandler() {
    addParameterToURL('order_id', orderId.value)
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
            <div class="left-box">
                <textarea v-model="orderId" name="orderId" id="orderId"></textarea>
            </div>
            <div class="btn-box">
                <a @click="searchHandler" href="javascript:;"><IconSearch fill="#fff"></IconSearch></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    align-items: center;
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
    .left-box {
        width: 70%;
    }
}
</style>