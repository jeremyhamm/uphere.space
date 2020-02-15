<template>
  <div id="fourzerofour-overlay">
    <b-container
      fluid
      id="fourzerofour"
      class="d-flex align-items-center justify-content-center"
    >
      <b-row>
        <b-col cols="12" class="text-center text-color-light">
          <h1 class="font-weight-bold">404</h1>
          <h1>Lost in space.</h1>
          <b-nav align="center">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/list">Satellite List</b-nav-item>
            <b-nav-item to="/contact">Contact</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "FourZeroFour",
  data() {
    return {
      config: process.env
    };
  },
  methods: {}
};
</script>

<style lang="scss"></style>
