<template>
  <b-container fluid id="list-container">
    <!-- Filters -->
    <b-nav align="left" class="w-100 filter-nav position-fixed">
      <b-nav-item class="ml-md-3" @click="toggleFilters()">
        <font-awesome-icon icon="filter" size="lg" />
        <span class="mr-1">Filters</span>
        <font-awesome-icon icon="caret-right" v-if="!filters" />
        <font-awesome-icon icon="caret-down" v-else />
      </b-nav-item>
      <b-nav-item-dropdown
        id="sort"
        text="Order by"
        toggle-class="nav-link-custom"
        right
      >
        <b-dropdown-item-button
          v-for="option in sortOptions"
          :key="option.value"
          @click="sortBy(option.value)"
          :active="option.active"
        >
          <font-awesome-icon :icon="option.icon" />
          <span class="pl-2">{{ option.text }}</span>
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-nav>
    <satellite-filters @filters="closeFilters" v-show="filters" />
    <!-- List -->
    <b-row v-if="satelliteList && categoryList" class="justify-content-center">
      <b-col cols="12" md="9" xl="8" class="mt-5">
        <!-- Satellite List -->
        <satellite-list />
        <!-- Infinate loader -->
        <b-row class="pb-5 pt-1">
          <b-col cols="12">
            <infinite-loading
              :identifier="infiniteReset"
              @infinite="loadMoreSatellites"
            >
              <div slot="spinner"><loader /></div>
              <div slot="no-more" class="text-center mb-3">No more results</div>
              <div slot="no-results" class="text-center mb-3">
                No more results
              </div>
            </infinite-loading>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <loader class="pt-4" v-else />
  </b-container>
</template>

<script>
import ListMixin from "@/mixins/list.mixin";
import SatelliteFilters from "@/components/SatelliteFilters";
import SatelliteList from "@/components/SatelliteList";
import InfiniteLoading from "vue-infinite-loading";
import Loader from "@/views/Loader";
export default {
  name: "ListLayout",
  mixins: [ListMixin],
  components: {
    "satellite-filters": SatelliteFilters,
    "satellite-list": SatelliteList,
    "infinite-loading": InfiniteLoading,
    loader: Loader
  },
  data() {
    return {
      config: process.env,
      filters: false,
      sortOptions: [
        {
          value: "popular",
          text: "Popular",
          icon: "fire-alt",
          active: true
        },
        {
          value: "launch",
          text: "Recently Launched",
          icon: "calendar-alt",
          active: false
        },
        {
          value: "asc",
          text: "Ascending",
          icon: "sort-alpha-down",
          active: false
        },
        {
          value: "desc",
          text: "Decending",
          icon: "sort-alpha-up",
          active: false
        }
      ]
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query);
    next();
  },
  created() {
    this.init(this.$route.query);
  },
  computed: {
    satellitePageNumber: {
      get() {
        return this.$store.getters["satellite/getSatellitePage"];
      },
      set(val) {
        this.$store.commit("satellite/setSatellitePage", val);
      }
    },
    satelliteTextFilter: {
      get() {
        return this.$store.getters["satellite/getSatelliteTextFilter"];
      },
      set(val) {
        this.$store.commit("satellite/setSatelliteTextFilter", val);
      }
    },
    satelliteCategoryFilter: {
      get() {
        return this.$store.getters["satellite/getSatelliteCategoryFilter"];
      },
      set(val) {
        this.$store.commit("satellite/setSatelliteCategoryFilter", val);
      }
    },
    satelliteSort: {
      get() {
        return this.$store.getters["satellite/getSatelliteSort"];
      },
      set(val) {
        this.$store.commit("satellite/setSatelliteSort", val);
      }
    },
    satelliteList() {
      return this.$store.getters["satellite/getSatelliteList"];
    },
    categoryList() {
      return this.$store.getters["satellite/getCategoryList"];
    },
    infiniteReset() {
      return this.$store.getters["satellite/getInfinateReset"];
    }
  },
  methods: {
    init(query) {
      this.satellitePageNumber = 1;
      this.loading = true;
      if (query && query.search) {
        this.satelliteTextFilter = query.search;
      }
      let satellite = this.$store.dispatch("satellite/fetchSatelliteList");
      let category = this.$store.dispatch("satellite/fetchCategoryList");
      let country = this.$store.dispatch("satellite/fetchCountryList");
      Promise.all([satellite, category, country]).then(response => {
        this.loading = response;
      });
    },
    toggleFilters() {
      this.filters = !this.filters;
      if (this.filters) {
        document.body.classList.add("overlay-open");
        document
          .getElementById("footer")
          .setAttribute("style", "visibility: hidden;");
      } else {
        document.body.classList.remove("overlay-open");
        document
          .getElementById("footer")
          .setAttribute("style", "visibility: initial;");
      }
    },
    sortBy(val) {
      this.satellitePageNumber = 1;
      this.satelliteSort = val;
      this.sortOptions.forEach(option => {
        if (val === option.value) {
          option.active = true;
        } else {
          option.active = false;
        }
      });
      this.$store.dispatch("satellite/fetchSatelliteList");
    },
    loadMoreSatellites($state) {
      this.$store.dispatch("satellite/fetchSatelliteList").then(response => {
        if (response.data.length === 0) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },
    closeFilters() {
      this.toggleFilters();
    }
  }
};
</script>

<style lang="scss"></style>
