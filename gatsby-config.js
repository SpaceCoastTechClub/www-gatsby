module.exports = {
  siteMetadata: {
    title: `Space Coast Tech Club`,
    description: `The SCTC is dedicated to the tech and creative community of the Space Coast of Florida. We provide a free and public Slack and share tech events happening in the area.`,
    author: `@gilcreque`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `./src/data/meetupMeetings`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Space Coast Tech Club`,
        short_name: `SCTC`,
        start_url: `/`,
        background_color: `#6610f2`,
        theme_color: `#6610f2`,
        display: `minimal-ui`,
        icon: `src/images/sctc-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "",

        // The url, this should be the endpoint you are attempting to pull data from
        url: `https://api.meetup.com/2/events?fields=group_photo,series&offset=0&format=json&limited_events=False&group_id=8209012,5292112,27505347,30015014,26468962,8099832,3381942,31892636,17108342,1570697,20150455,28714554,18448785,30790098,31284731,32240720,30816774,1728277&photo-host=secure&page=500&order=time&desc=false&status=upcoming`,

        method: "get",

        headers: {
          "Content-Type": "application/json",
        },

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `meetupEvents`,

        // Optional payload key name if your api returns your payload in a different key
        // Default will use the full response from the http request of the url
        payloadKey: `results`,

        // Optionally re-source data when it changes and
        // `gatsby develop` is running.
        // Requires `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.
        // See https://www.gatsbyjs.org/docs/environment-variables/#reserved-environment-variables
        // Default is false
        enableDevRefresh: true,

        // Optionally override key used to re-source data
        // when `gatsby develop` is running.
        // Requires `enableDevRefresh: true`.
        // See setting directly above this one.
        // See also https://github.com/gatsbyjs/gatsby/issues/14653
        // Default is `id`
        refreshId: `id`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `Json`, // a fixed string
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "meetupEvents",
        imagePath: "photo_url",
        name: "eventPhoto",
        prepareUrl: url => (url ? url.replace("global_", "highres_") : url),
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "meetupEvents",
        imagePath: "group.group_photo.highres_link",
        name: "groupPhoto",
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Ubuntu Mono`,
            variants: [`700`],
          },
          {
            family: `Roboto`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/markdown`,
        name: `markdown`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
