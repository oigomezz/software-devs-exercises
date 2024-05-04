<template>
  <Home />
</template>

<script>
import { Home } from "@/components/Home.vue";
export default {
  components: {
    Home,
  },
};
</script>

<style>
html,
body,
.app {
  min-height: 100vh;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  --brand-green: #04b500;
  --brand-blue: #0689b0;
}
</style>
