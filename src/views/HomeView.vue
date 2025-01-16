<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/Header.vue'
import SearchBox from '@/components/SearchBox.vue'
import ContentBox from '@/components/ContentBox.vue'
import IconEmpty from '@/components/icons/IconEmpty.vue';
import Footer from '@/components/Footer.vue';
import { apiGetTrack } from '@/api/api';

const cargo = ref([]);

onMounted(() => {
  const url = new URL(window.location);
  const order_id = url.searchParams.get('order_id')

  getTrack(order_id);
})

function getTrack(id) {
  apiGetTrack(id).then(res => {
    if (res.code == 0) {
      cargo.value = res.data.map(ele => {
        const temp = JSON.parse(ele.history);
        const history = temp.sort((a, b) => new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime()).map(ele => ({
          ...ele,
          on: true
        }))
        history[history.length - 1].on = false;

        return {
          ...ele,
          history: history,
          historyLen: history.length,
          lastState: history[history.length - 1]
        }
      })
    }
  })
}
</script>

<template>
  <Header></Header>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <SearchBox @search="getTrack"></SearchBox>

  <ContentBox v-model="cargo" v-if="cargo.length > 0"></ContentBox>
  <div v-else>
    <div class="container">
      <IconEmpty></IconEmpty>
      <p>数据为空，请重新输入运单号</p>
    </div>

  </div>
  <div class="space"></div>
  <Footer></Footer>
</template>


<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
  padding-top: 50px;
  border-top: 3px solid #45b787;
  font-size: 16px;

  svg {
    width: 200px;
    height: 200px;
  }

  p {
    padding-top: 10px;
    font-weight: 600;
  }
}

.space {
  height: 600px;
}

@media screen and (max-width: 968px) {
  .space {
    height: 200px;
  }
}
</style>