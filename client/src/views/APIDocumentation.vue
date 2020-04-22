<template>
  <b-container fluid>
    <b-row class="content-top mb-4 justify-content-center">
      <b-col class="col-12 col-xl-8">
        <!-- Intro -->
        <b-row class="content-top justify-content-center">
          <b-col lass="col-12">
            <h1 class="pb-2 text-center">
              <img
                :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo.svg`"
                class="img-fluid logo-filter mr-2"
                height="35"
                width="35"
              />
              API Documentation
            </h1>
          </b-col>
        </b-row>
        <!-- Getting Started -->
        <b-row class="mt-5 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <h4 class="text-uppercase font-weight-bold">Getting Started</h4>
          </b-col>
        </b-row>
        <!-- Intro -->
        <b-row class="d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="py-4">
              Thi API is hosted on
              <a
                class="text-color-dark font-weight-bold"
                href="https://rapidapi.com/uphere.space/api/uphere-space1"
                target="_blank"
              >
                Rapid API</a
              >. You will need an account there before accessing any of the
              resources. Rapid API also provides live endpoint testing. This API
              is a freemium model WITH 10,000 requests per month for free.
            </p>
          </b-col>
        </b-row>
        <!-- SECTION BREAK -->
        <!-- Authentication -->
        <b-row class="mt-5 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <h4 class="text-uppercase font-weight-bold">Authentication</h4>
          </b-col>
        </b-row>
        <b-row class="mt-2 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Headers</p>
            <p>
              As stated above an account with
              <a
                class="text-color-dark font-weight-bold"
                href="https://rapidapi.com"
                target="_blank"
              >
                Rapid API</a
              >
              is required for accessing resouces on this API. On every request
              the following two headers must always be sent:
            </p>
            <ul>
              <li>
                <code>x-rapidapi-host: uphere-space1.p.rapidapi.com</code>
              </li>
              <li>
                <code>x-rapidapi-key: { YOUR RAPID API KEY }</code>
              </li>
            </ul>
          </b-col>
        </b-row>
        <!-- Base Url -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="4" xl="3">
            <p class="text-uppercase font-weight-bold">Base Url</p>
          </b-col>
          <b-col cols="12" lg="6" xl="6">
            <code class="float-right">https://uphere.space/api</code>
          </b-col>
        </b-row>
        <!-- SECTION BREAK -->
        <!-- Endpoints -->
        <b-row class="mt-5 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <h4 class="text-uppercase font-weight-bold">Endpoints</h4>
          </b-col>
        </b-row>
        <!-- 
          Location 
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Location</p>
            <p>
              Find the current location of a satellite by its
              <a
                class="text-color-dark font-weight-bold"
                href="https://en.wikipedia.org/wiki/Satellite_Catalog_Number"
                target="_blank"
                >NORAD ID</a
              >. Latitude and logitude can be provided to get the elevation and
              azimuth relative to the coordinates provided. The return for this
              resource is JSON containing the current location and detials of
              the selected satellite.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right"
              >/satellites/{satellite_number}/location</code
            >
          </dd>
        </dl>
        <!-- Query Params -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >QUERY PARAMS</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <div class="float-right">
              <span class="text-muted small font-weight-bold"
                >NUMBER (optional)</span
              >
              <code class="ml-2">lng</code>
            </div>
            <br />
            <div class="float-right pt-2">
              <span class="text-muted small font-weight-bold"
                >NUMBER (optional)</span
              >
              <code class="ml-2">lat</code>
            </div>
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >JSON</span
              >
              <pre>
                <code>
                  {
                    "coordinates": [-69.34455439843211,-2.834841089920333],
                    "norad_id":"20580","height":332.558835040733,
                    "speed":16996.970517404618,
                    "visibility":{
                      "azimuth":16.32274243382461,
                      "elevation":-65.93303612662568
                    },
                    "footprint_radius":2524684.5107199484
                  }
                </code>
              </pre>
            </span>
          </dd>
        </dl>
        <!-- 
          Orbit 
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Orbit</p>
            <p>
              Get the orbital track for a satellite using the
              <a
                class="text-color-dark font-weight-bold"
                href="https://en.wikipedia.org/wiki/Satellite_Catalog_Number"
                target="_blank"
                >NORAD ID</a
              >. The orbital period (minutes) is required as a query parameter.
              The return value is an array of objects, each containing latitude,
              longitude and timestamp (utc) of the satellite orbit.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right"
              >/satellites/{satellite_number}/orbit</code
            >
          </dd>
        </dl>
        <!-- Query Params -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >QUERY PARAMS</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <div class="float-right">
              <span class="text-muted small font-weight-bold"
                >NUMBER (required)</span
              >
              <code class="ml-2">period (minutes)</code>
            </div>
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >ARRAY</span
              >
              <pre>
                <code>
                  [
                    {
                      "lat":-33.93133532271444,
                      "lng":-44.60116050969679,
                      "date":"17:47"
                    },
                    {
                      "lat":-31.305458724687607,
                      "lng":-41.48076241844742,
                      "date":"17:48"
                    },
                    {
                      "lat":-28.594418883809514,
                      "lng":-38.54422396404904,
                      "date":"17:49"
                    }
                  ]
                </code>
              </pre>
            </span>
          </dd>
        </dl>
        <!-- 
          Details 
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Details</p>
            <p>
              Get the details for a satellite using the
              <a
                class="text-color-dark font-weight-bold"
                href="https://en.wikipedia.org/wiki/Satellite_Catalog_Number"
                target="_blank"
                >NORAD ID</a
              >. The return is JSON which includes details about the seltected
              satellite.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right"
              >/satellites/{satellite_number}/details</code
            >
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >JSON</span
              >
              <pre>
                <code>
                  {
                    "name":"GOES 17",
                    "number":"43226",
                    "type":"PAYLOAD",
                    "country":"US",
                    "intldes":"2018-022A",
                    "orbital_period":"1436.11",
                    "launch_date":"2018-03-01T00:00:00.000Z",
                    "links":[
                      {
                        "link_name":"wikipedia",
                        "link_url":"https://en.wikipedia.org/wiki/GOES-17"
                      }
                    ]
                  }
                </code>
              </pre>
            </span>
          </dd>
        </dl>
        <!-- 
          Satellite List
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Satellite List</p>
            <p>
              Get a list of satellites with details. There are two optional
              query parameters available. The <code>text</code> option will
              filter the returned list by the text value. The
              <code>country</code> will filter the list by country which
              launched the satellite.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">/satellite/list</code>
          </dd>
        </dl>
        <!-- Query Params -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >QUERY PARAMS</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <div class="float-right">
              <span class="text-muted small font-weight-bold"
                >NUMBER (required)</span
              >
              <code class="ml-2">page</code>
            </div>
            <br />
            <div class="float-right">
              <span class="text-muted small font-weight-bold"
                >STRING (optional)</span
              >
              <code class="ml-2">text</code>
            </div>
            <br />
            <div class="float-right">
              <span class="text-muted small font-weight-bold"
                >STRING (optional)</span
              >
              <code class="ml-2">country</code>
            </div>
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >ARRAY</span
              >
              <pre>
                <code>
                  [
                    {
                      "name":"GOES 17"
                      "number":"43226"
                      "classification":"U"
                      "launch_date":"2018-03-01T00:00:00.000Z"
                      "country":"US"
                      "type":"PAYLOAD"
                      "size":"LARGE"
                      "orbital_period":"1436.11"
                      "intldes":"2018-022A"
                      "selected":true
                      "categories":[]
                    }
                  ]
                </code>
              </pre>
            </span>
          </dd>
        </dl>
        <!-- 
          Launch Sites 
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Launch Sites</p>
            <p>
              Get a list of satellite launch sites from around the world. This
              list includes details like name, description and coordinates.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">/satellite/list/launch-sites</code>
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >ARRAY</span
              >
              <pre>
                <code>
                  [
                    {
                      "id":"1"
                      "abbreviation":"AFETR"
                      "name":"Air Force Eastern Test Range, Florida, USA"
                      "description":NULL
                      "latitude":28.4929137
                      "longitude":-80.6013383
                    }
                    {
                      "id":"2"
                      "abbreviation":"AFWTR"
                      "name":"Air Force Western Test Range, California, USA"
                      "description":NULL
                      "latitude":34.7244835
                      "longitude":-120.59294
                    }
                  ]
                </code>
              </pre>
            </span>
          </dd>
        </dl>
        <!-- 
          Countries 
        -->
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col cols="12" lg="10" xl="9">
            <p class="text-uppercase font-weight-bold">Country List</p>
            <p>
              List of countires available to filter
              <code>/satellite/list</code>. The value used to filter is the
              <code>abbreviation</code> field.
            </p>
          </b-col>
        </b-row>
        <!-- Method -->
        <dl class="row mt-3 justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >METHOD</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">GET</code>
          </dd>
        </dl>
        <!-- Url -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-3">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >URL</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-6">
            <code class="float-right">/satellite/list/countries</code>
          </dd>
        </dl>
        <!-- Return -->
        <dl class="row justify-content-center">
          <dt class="col-12 col-lg-4 col-xl-2">
            <span class="text-muted small font-weight-bold pr-1 float-left"
              >RETURN</span
            >
          </dt>
          <dd class="col-12 col-lg-4 col-xl-7">
            <span class="float-right">
              <span class="text-muted small font-weight-bold float-right"
                >ARRAY</span
              >
              <pre>
                <code>
                  [
                    {
                      "id":"1"
                      "name":"ARGENTINA"
                      "abbreviation":"ARGN"
                    }
                    {
                      "id":"2"
                      "name":"AUSTRIA"
                      "abbreviation":"ASRA"
                    }
                  ]
                </code>
              </pre>
            </span>
          </dd>
        </dl>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "API-Documentation",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    return {
      title: "API Documentation",
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/development/api/documentation`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "api,documentation,satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite"
        },
        // Open Graph
        {
          vmid: "og:type",
          name: "og:type",
          content: "website"
        },
        {
          vmid: "og:url",
          name: "og:url",
          content: `${process.env.VUE_APP_URL}/development/api/documentation`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Contact Us`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        // Twitter
        {
          vmid: "twitter:card",
          name: "twitter:card",
          content: "summary"
        },
        {
          vmid: "twitter:site",
          name: "twitter:site",
          content: "@upheredotspace"
        },
        {
          vmid: "twitter:title",
          name: "twitter:title",
          content: `Contact Us`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
        },
        {
          vmid: "twitter:image",
          name: "twitter:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        {
          vmid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `ISS (ZARYA) in orbit`
        },
        {
          vmid: "twitter:creator",
          name: "twitter:creator",
          content: "@upheredotspace"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content-top {
  padding-top: 75px;
}
.content-bottom {
  padding-bottom: 50px;
}
</style>
