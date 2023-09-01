module.exports = {
  extends: "lighthouse:default",
  settings: {
    psiToken: process.env.PSI_APIKEY,
  },
};
