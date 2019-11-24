<template>
  <b-container id="contact-form">
    <!-- Intro -->
    <b-row class="justify-content-center" v-if="!success">
      <b-col cols="12" md="6" xl="4">
        <h2 class="text-center">Contact Us</h2>
        <p class="text-center">
          Have questions? Want to advertise with us? Send us a line and we will
          get back to you as soon as possible.
        </p>
      </b-col>
    </b-row>
    <!-- Contact form -->
    <b-form @submit="sendMessage" v-if="!success">
      <!-- Name -->
      <b-row class="mt-3 justify-content-center">
        <b-col cols="12" md="6" xl="4">
          <b-form-input
            v-model="form.name"
            placeholder="Enter your name"
            required
          />
        </b-col>
      </b-row>
      <!-- Email -->
      <b-row class="mt-4 justify-content-center">
        <b-col cols="12" md="6" xl="4">
          <b-form-input
            v-model="form.email"
            placeholder="Enter your email"
            type="email"
            required
          />
        </b-col>
      </b-row>
      <!-- Message -->
      <b-row class="mt-4 justify-content-center">
        <b-col cols="12" md="6" xl="4">
          <b-form-textarea
            id="textarea"
            v-model="form.message"
            placeholder="Enter your message"
            rows="4"
            max-rows="6"
            required
          />
        </b-col>
      </b-row>
      <!-- Submit -->
      <b-row class="mt-4 justify-content-center text-center">
        <b-col cols="12" md="6" xl="4">
          <b-button type="submit" block variant="primary" v-if="!sending">
            Send Message
          </b-button>
          <loader v-else />
        </b-col>
      </b-row>
      <!-- Error Message -->
      <b-row class="justify-content-center mt-4">
        <b-col cols="12" md="6" xl="4">
          <b-alert variant="danger" :show="error" dismissible fade>
            There was an error, please try again.
          </b-alert>
        </b-col>
      </b-row>
    </b-form>
    <!-- Thanks Message -->
    <b-row class="justify-content-center mt-4" v-else>
      <b-col cols="12" md="6" xl="4">
        <p>
          Thanks for your message, we will get back to you as soon as possible!
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Loader from "@/views/Loader";
export default {
  name: "Contact",
  components: {
    loader: Loader
  },
  data() {
    return {
      config: process.env,
      form: {
        name: null,
        email: null,
        message: null
      },
      sending: false,
      success: null,
      error: null
    };
  },
  methods: {
    sendMessage(e) {
      this.sending = true;
      e.preventDefault();
      this.$store.dispatch("user/sendContactMessage", this.form).then(
        response => {
          this.sending = false;
          this.success = response;
        },
        error => {
          this.sending = false;
          this.error = error;
        }
      );
    }
  }
};
</script>

<style lang="scss"></style>
