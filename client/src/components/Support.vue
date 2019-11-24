<template>
  <b-nav-item
    target="_blank"
    class="bmc-button"
    href="https://www.buymeacoffee.com/Xorb9kwn0"
  >
    <img
      src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
      alt="Buy me a coffee"
    />
    <span class="mr-3">Buy me a coffee</span>
  </b-nav-item>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      config: process.env
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

// Buy me a coffee
.bmc-button {
  display: inline-flex !important;
  color: $white !important;
  background-color: #ff813f !important;
  border-radius: 3px !important;
  letter-spacing: 0.6px !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none !important;
    opacity: 0.85 !important;
    color: $white !important;
  }
  a {
    padding: 2px !important;
    &:hover {
      color: $white !important;
    }
  }
}
</style>
