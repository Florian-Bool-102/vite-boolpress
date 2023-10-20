<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
        attachment: "",
      },
      errors: null,
      success: null,
      loading: false,
    };
  },
  methods: {
    onFormSubmit() {
      // Nel caso di upload i dati devono essere inviati al form 
      // sotto forma di multipart/form-data altrimenti il server non riuscirà a leggere gli allegati
      // tramite l'istanza della classe FormData, possiamo codificare i dati in questo formato
      const dataToSend = new FormData();
      dataToSend.append("name", this.formData.name);
      dataToSend.append("email", this.formData.email);
      dataToSend.append("message", this.formData.message);
      dataToSend.append("attachment", this.formData.attachment);

      // come secondo argomento della funzione POST, PUT e PATCH dobbiamo
      // passare un oggetto con i dati da inviare al server.
      axios
        .post(import.meta.env.VITE_API_URL + "/api/contacts", dataToSend)
        .then((resp) => {
          this.success = resp.data.message;

          // vado a cancellare eventuali errori precedenti così nascondo l'eventuale alert
          this.errors = null;
        })
        .catch((e) => {
          this.errors = e.response?.data?.message ?? e.message;
        });
    },

    onAttachmentChange(event) {
      // array di file scelti dall'utente
      const files = event.target.files;

      if (files.length > 0) {
        this.formData.attachment = files[0];
      } else {
        this.formData.attachment = null;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>Ecco come contattarci!</h1>

    <div class="alert alert-danger" v-if="errors">
      Sembra che qualcosa sia andato storto: {{ errors }}
    </div>

    <form @submit.prevent="onFormSubmit" v-if="!success">
      <div class="mb-3">
        <label>Nome</label>
        <input type="text" class="form-control" v-model="formData.name" />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input type="text" class="form-control" v-model="formData.email" />
      </div>

      <div class="mb-3">
        <label>Messaggio</label>
        <textarea class="form-control" v-model="formData.message"></textarea>
      </div>

      <div class="mb-3">
        <label>Allegato</label>
        <input class="form-control" type="file" @change="onAttachmentChange" />
      </div>

      <button type="submit" class="btn btn-primary">Invia</button>
    </form>

    <div class="alert alert-success" v-else>
      {{ this.success }}
    </div>
  </div>
</template>

<style scoped></style>
