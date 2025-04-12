exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: 'https://nullbinds.netlify.app/auth'
    })
  };
};
