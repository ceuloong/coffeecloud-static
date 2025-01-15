<script lang="ts">
  let payload = {
    reference         : `SP_REQUEST_${Math.random()}`,
    callback_url      : "https://yourdomain.com/profile/sp-notify-callback",
    email             : "johndoe@example.com",
    country           : "GB",
    language          : "EN",
    verification_mode : "any",
  }
  payload['face'] = {
    proof : ""
  }
  var token = btoa("YOUR_CLIENT_ID:YOUR_SECRET_KEY");
  fetch('https://api.shuftipro.com/', {  method : 'post',
    headers : {
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'Authorization' : 'Basic ' +token
    },
    body: JSON.stringify(payload)}).then(function(response) {
      return response.json();
  }).then(function(data) { return data; });
</script>

<div class="auto-verify-container">
  <iframe 
    id="iframe" 
    allowfullscreen
    title="Identity Verification"
    style="width:100%; height:800px;" 
    src=""
    allow="camera"
  ></iframe>
  
  <p id="display"></p>
</div>