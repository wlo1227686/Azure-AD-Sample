<script setup lang="ts" name="Layout">
import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>
    <div>
        <v-navigation-drawer v-model="drawer">
            <!-- ddd -->
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer" />

            <v-app-bar-title>Application</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <RouterView />
        </v-main>
    </div>
</template>

<style lang="scss" scoped></style>