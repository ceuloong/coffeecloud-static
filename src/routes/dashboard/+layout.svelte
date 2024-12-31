<script lang="ts">
  import DashboardLayout from '$lib/components/DashboardLayout.svelte';

  export let data;
  
  // 确保数据存在并包含所需字段
  $: user = {
    username: data?.user?.username || '',
    email: data?.user?.email || '',
    status: data?.user?.status || 0
  };
  $: verifyStatus = data?.verifyStatus?.status || 'none';

</script>

<DashboardLayout {user} {verifyStatus}>
  <slot />
</DashboardLayout> 