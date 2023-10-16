<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      pagination: {},
    };
  },
  methods: {
    fetchData(url) {
      axios.get(url ?? "http://127.0.0.1:8000/api/posts").then((response) => {
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <header>
    <nav class="container">
      <div class="py-3 d-flex">
        LOGO

        <ul class="ms-auto d-flex list-unstyled">
          <li><a href="http://127.0.0.1:8000/login">Accedi</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <div class="container">
      <h1>Benvenut* sul mio blog!</h1>
      <p>Ecco tutti i miei articoli</p>

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
  </main>
</template>

<style scoped>
.card-img-top {
  height: 20vh;
  overflow: hidden;
  object-fit: cover;
}
</style>
