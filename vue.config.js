module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            "primary-color": "#1da57a",
            "link-color": "#198d68",
            //   "border-radius-base": "2px",
          },
        },
      },
    },
  },
};
