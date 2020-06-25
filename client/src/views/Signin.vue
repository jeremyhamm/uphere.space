<template>
  <b-container
    id="signin"
    fluid
    class="d-flex align-items-center justify-content-center"
  >
    <b-row class="signin-overlay p-5">
      <!-- Membership Benefits -->
      <b-col cols="12" lg="6" class="text-light pb-3">
        <b-row class="pb-3 text-center text-lg-left">
          <b-col cols="12">
            <h1>Sign In</h1>
          </b-col>
        </b-row>
        <b-list-group fluid class="text-center text-lg-left">
          <b-list-group-item
            ><font-awesome-icon icon="satellite" size="lg" class="mr-1" />
            Bookmark satellites</b-list-group-item
          >
          <b-list-group-item
            ><font-awesome-icon icon="satellite" size="lg" class="mr-1" />
            Change your location</b-list-group-item
          >
          <b-list-group-item
            ><font-awesome-icon icon="satellite" size="lg" class="mr-1" />
            Visible satellite alerts</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <!-- Buttons -->
      <b-col cols="12" lg="6" class="text-center">
        <div>
          <!-- Google -->
          <b-button
            class="font-weight-bold my-3"
            variant="google"
            @click="googleSignin()"
          >
            <b-img
              :src="
                `${config.VUE_APP_SPACES_URL}/images/branding/google-icon.webp`
              "
              height="21.333"
              width="21.333"
              fluid
              alt="Google Login"
            ></b-img>
            <span class="ml-2">Sign in with Google</span>
          </b-button>
        </div>
        <div>
          <!-- Facebook -->
          <b-button
            class="font-weight-bold my-3"
            variant="facebook"
            @click="facebookSignin()"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
            <span class="ml-2">Continue with Facebook</span>
          </b-button>
        </div>
        <div class="small mt-3 text-light">
          <b-link class="text-center" to="/privacy">Privacy policy</b-link> |
          <b-link class="text-center" to="/terms">Terms of Service</b-link>
        </div>
      </b-col>
    </b-row>
    <!-- Background attribution -->
    <b-row class="attribution position-absolute">
      <b-col cols="12">
        <a
          style='background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px'
          href="https://unsplash.com/@spacex?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Photo by SpaceX on Unsplash"
        >
          <span style="display:inline-block;padding:2px 3px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white"
              viewBox="0 0 32 32"
            >
              <title>unsplash-logo</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
          </span>
          <span style="display:inline-block;padding:2px 3px">SPACEX</span>
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Sign-In",
  metaInfo() {
    return {
      title: "Sign In",
      titleTemplate: "%s | uphere.space"
    };
  },
  data() {
    return {
      config: process.env
    };
  },
  methods: {
    googleSignin() {
      this.$store.dispatch("user/googleSignin").then(response => {
        window.location.replace(response.data);
      });
    },
    facebookSignin() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
#signin {
  background-image: url("https://resources-uphere.sfo2.cdn.digitaloceanspaces.com/images/branding/signin.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  .signin-overlay {
    background-color: $overlay;
  }
}
.attribution {
  position: absolute;
  bottom: 52px;
  left: 10px;
}
.content-padding {
  padding-top: 150px;
}
.list-group {
  .list-group-item {
    background-color: transparent;
  }
}
.btn.btn-facebook {
  color: white;
  background-color: #1877f2;
  &:hover,
  &:active,
  &:focus {
    background-color: #29487d;
    border-color: #29487d;
    box-shadow: none;
  }
}
.btn.btn-google {
  color: $dark-grey;
  background-color: $white;
  &:hover,
  &:active,
  &:focus {
    background-color: $white;
    box-shadow: none;
  }
}
/** LG & XL **/
@media (min-width: 993px) {
  .signin-overlay {
    min-width: 650px;
  }
}
</style>
