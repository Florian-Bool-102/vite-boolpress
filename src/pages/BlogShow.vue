<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      post: {},
    };
  },
  methods: {
    fetchData() {
      // this.$route -> rappresenta un oggetto relativo alla rotta attuale
      // console.log(this.$route);
      axios
        .get(import.meta.env.VITE_API_URL + "/api/posts/" + this.$route.params.slug)
        .then((resp) => {
          this.post = resp.data;
        })
        .catch((e) => {
          console.error(e);

          this.$router.push({ name: "not-found" });
        })
    },
    getImageUrl(post) {
      return `http://127.0.0.1:8000/storage/${post.image}`;
    },
    formatDate(data) {
      return dayjs(data).format("DD/MM/YYYY");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <div class="container">
    <img :src="getImageUrl(post)" class="card-img-top" alt="..." />

    <h1>{{ post.title }}</h1>

    <div class="mb-3" v-if="post.category">
      Categoria:
      <span
        class="badge"
        :style="`background-color: rgb(${post.category.color})`"
        >{{ post.category.name }}</span
      >
    </div>

    <div class="d-flex gap-3">
      <span
        v-for="tag in post.tags"
        :key="tag.id"
        class="badge"
        :style="`background-color: rgb(${tag.color})`"
        >{{ tag.name }}</span
      >
    </div>

    <div>Pubblicato il: {{ formatDate(post.created_at) }}</div>
    <div>
      {{ post.body }}
    </div>
  </div>
</template>

<style scoped></style>
