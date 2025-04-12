const axios = require('axios');

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;
  
  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing authorization code" })
    };
  }

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.access_token) {
      console.error('GitHub response:', response.data);
      throw new Error('No access token received');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.data.access_token })
    };
  } catch (error) {
    console.error('Full error:', {
      message: error.message,
      response: error.response?.data,
      config: error.config
    });
    
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: "Auth failed",
        details: error.message,
        github_response: error.response?.data
      })
    };
  }
};
