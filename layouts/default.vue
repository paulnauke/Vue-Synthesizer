<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-title>Synthesizer</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }} Paul Nauke</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {

}
</script>
