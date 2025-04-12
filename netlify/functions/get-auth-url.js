exports.handler = async () => {
  try {
    if (!process.env.GITHUB_CLIENT_ID) {
      throw new Error('Missing client ID');
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent('https://nullbinds.netlify.app/')}&scope=repo`
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
