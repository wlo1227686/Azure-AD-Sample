<script setup lang="ts">
import { ref, onMounted } from 'vue'

import * as msal from "@/scripts/msal";
const obj = ref({});

onMounted(async () => {
    const temp: any = await msal.getIdTokenClaims();
    if (temp !== undefined && temp !== null) {
        obj.value = Object.entries(temp)
    }
})

</script>

<template>
    <div v-if="!obj">
        尚無資料
    </div>
    <v-table density="compact" v-else>
        <thead>
            <tr>
                <th class="text-left">
                    Key
                </th>
                <th class="text-left">
                    Value
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value, key) in obj" :key="key">
                <td>{{ value[0] }}</td>
                <td>{{ value[1] }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<style lang="scss" scoped></style>