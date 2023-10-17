<script>


export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  
};
</script>

<template>
  <header>
    <nav class="container">
      <div class="py-3 d-flex">
        LOGO

        <ul class="ms-auto d-flex list-unstyled gap-3">
          <li><router-link :to="{name: 'home'}">Home</router-link></li>
          <li><router-link :to="{name: 'blog'}">Blog</router-link></li>
          <li><router-link :to="{name: 'contacts'}">Contatti</router-link></li>
          <li><router-link :to="{name: 'about'}">Su di noi</router-link></li>
          <li><router-link :to="{name: 'login'}">Accedi</router-link></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <!-- E' l'equivalente di @yield("content") di blade -->
    <router-view></router-view>
  </main>

  <footer class="bg-dark py-5">
    <div class="container">
      <h3>Questo è il footer</h3>
    </div>
  </footer>
</template>

<style>

</style>
