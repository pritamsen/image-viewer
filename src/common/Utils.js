var Utils = {
  "login": {
      "username": "user",
      "password": "pass"
  },
  "auth": {
      "access-token": "IGQVJYeEYzcGtsSTJDbnphRzdBblZAXUXFjQkEtUjdkNHE3dmV2SFpxQy1VRTBjS1VJb201UWpJbG8wQkZA4ZAEtnLWl4LUwzeVlWUGFEOWFOc0hfNjdaUFRFRFZABYU13RWNhd1k4Qkw1dzdjUVBwcW1tSQZDZD"
  },
  "api":
  {
      "mock": false,
      "endpoints":
          [
              {
                  "name": "Get Posts",
                  "uri": "https://graph.instagram.com/me/media?fields=id,caption&access_token=$accessToken"
              },
              {
                  "name": "Get Post Details",
                  "uri": "https://graph.instagram.com/$postId?fields=id,media_type,media_url,username,timestamp&access_token=$accessToken"
              }
          ]
  }
};
export default Utils;