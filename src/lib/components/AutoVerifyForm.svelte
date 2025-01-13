<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    window.addEventListener("message", receiveMessage, false);
  });

  function receiveMessage(event: MessageEvent) {
    console.log(event);
    // ... 处理消息
  }
</script>

<div class="auto-verify-container">
  <iframe 
    id="iframe" 
    allowfullscreen
    title="Identity Verification"
    style="width:100%; height:800px;" 
    src="https://ui.idenfy.com/?authToken=3FA5TFPA2ZE3LMPGGS1EGOJNJE"
    allow="camera"
  ></iframe>
  
  <p id="display"></p>
</div>