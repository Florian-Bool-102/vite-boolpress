<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      posts: [],
      pagination: {},
      search: {
        title: "",
      },
    };
  },
  methods: {
    fetchData(url) {
      axios.get(url ?? "http://127.0.0.1:8000/api/posts", {
        params: this.search,
      })
      .then((response) => {
        const risultati = response.data;

        // salvo la lista dei post
        this.posts = risultati.data;

        // prima cancello la chiave data dall'oggetto risultati
        delete risultati.data;

        // salvo i dati relativi alla paginazione dentro la variabile pagination
        this.pagination = risultati;
      });
    },
    getImageUrl(post) {
      return `http://127.0.0.1:8000/storage/${post.image}`;
    },
    formatDate(data) {
      return dayjs(data).format("DD/MM/YYYY");
    },
    onSearch() {
      this.fetchData();
    },
    onReset() {
      this.search.title = "";
      this.fetchData();
    },

  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <div class="container">
    <h1>Ecco tutti gli articoli!</h1>

    <form class="my-4 border-black" @submit.prevent="onSearch" @reset="onReset">
      <input
        type="text"
        placeholder="Titolo articolo"
        class="form-control"
        v-model="search.title"
      />
      <button class="btn btn-secondary" type="reset">Svuota</button>
      <button class="btn btn-primary" type="submit">Cerca</button>
    </form>

    <div class="mt-5">
      <div class="card mb-4" v-for="post in posts" :key="post.id">
        <img :src="getImageUrl(post)" class="card-img-top" alt="..." />

        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">
            {{ post.body }}
          </p>

          <div class="mb-3">
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
        </div>

        <div class="card-footer">
          <router-link :to="{ name: 'blog.show', params: { slug: post.slug } }"
            >Vedi dettagli</router-link
          >
        </div>
      </div>
    </div>

    <!-- paginazione -->
    <div>
      <a
        v-for="pageLink in pagination.links"
        class="btn btn-link"
        @click="fetchData(pageLink.url)"
        v-html="pageLink.label"
      ></a>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 20vh;
  overflow: hidden;
  object-fit: cover;
}
</style>
