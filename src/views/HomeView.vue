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

  apiGetTrack(order_id).then(res => {
    console.log(res);
    cargo.value = res.data
  })
})
</script>

<template>
  <Header></Header>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <SearchBox></SearchBox>

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