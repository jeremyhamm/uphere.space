const metaInfo = () => {
  const title = "Real-time satellite tracking and predictions";
  const description =
    "Real-time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
  return {
    title: title,
    titleTemplate: "%s | uphere.space",
    link: [
      {
        rel: "canonical",
        href: `${process.env.VUE_APP_URL}`
      }
    ],
    meta: [
      {
        name: "description",
        content: description
      },
      {
        name: "keywords",
        content:
          "satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite,launch,real-time tracking,space"
      },
      {
        name: "subject",
        content: "Satellite Tracking"
      },
      {
        name: "url",
        content: `${process.env.VUE_APP_URL}`
      },
      // Open Graph
      {
        property: "og:site_name",
        content: "uphere.space"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:url",
        content: `${process.env.VUE_APP_URL}`
      },
      {
        property: "og:title",
        content: title
      },
      {
        property: "og:description",
        content: description
      },
      {
        property: "og:image",
        content: `${
          process.env.VUE_APP_SPACES_URL
        }/images/satellites/ISS (ZARYA).png`
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary"
      },
      {
        name: "twitter:site",
        content: "@upheredotspace"
      },
      {
        name: "twitter:title",
        content: `Real-time tracking and predictions for thousands of satellites currently orbiting earth`
      },
      {
        name: "twitter:description",
        content: description
      },
      {
        name: "twitter:image",
        content: `${
          process.env.VUE_APP_SPACES_URL
        }/images/satellites/ISS (ZARYA).png`
      },
      {
        name: "twitter:image:alt",
        content: `ISS (ZARYA) in orbit`
      },
      {
        name: "twitter:creator",
        content: "@upheredotspace"
      },
      // Google / Schema.org markup:
      {
        itemprop: "name",
        content: title
      },
      {
        itemprop: "description",
        content: description
      },
      {
        itemprop: "image",
        content: `${
          process.env.VUE_APP_SPACES_URL
        }/images/satellites/ISS (ZARYA).png`
      }
    ]
  };
};

export default {
  metaInfo
};
