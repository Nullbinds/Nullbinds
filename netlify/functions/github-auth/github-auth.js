exports.handler = async (event) => {
  const { code } = JSON.parse(event.body);
  
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, {
      headers: { Accept: 'application/json' }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.data.access_token })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Auth failed" })
    };
  }
};
