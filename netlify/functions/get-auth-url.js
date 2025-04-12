// netlify/functions/get-auth-url.js
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent('https://nullbinds.netlify.app/')}&scope=repo`
    })
  };
};
