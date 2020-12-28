module.exports = {
  siteMetadata: {
    title: `B: Conway's Game of Life`,
    description: `A personal trial of Conway's Game of Life`,
    author: `@baadaa`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `b-game-of-life`,
        short_name: `b-game-of-life`,
        start_url: `/`,
        background_color: `#00a2d9`,
        theme_color: `#00a2d9`,
        display: `minimal-ui`,
        icon: `src/images/circle.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
