<script setup lang="ts" name="Home">
import { ref } from 'vue'
import * as adal from "@/scripts/adal";
import * as msal from "@/scripts/msal";


const idToken: any = ref("")


function loginInADAL() {
    adal.login();
}

function logOutInADAL() {
    adal.logOut();
}

async function getIdToken() {
    const temp = await msal.getIdToken()
    idToken.value = temp
}

/** 更新Azure AD當下狀態 */
async function handleRedirectPromise() {
    msal.handleRedirectPromise()
}

/** 操作登入 */
async function loginRedirect() {
    msal.loginRedirect()
}

/** 操作登出 */
async function logoutRedirect() {
    msal.logoutRedirect()
}

/** 清除瀏覽器 cache 緩存 */
async function clearCache() {
    msal.clearCache()
}


</script>

<template>
    <div class="col">
        <v-container>
            <v-row justify="center">

                <v-col cols="12" md="4" sm="6">
                    <v-btn @click="loginInADAL()">AAD 登入(ADAL)</v-btn>
                    <v-btn @click="logOutInADAL()">AAD 登出(ADAL)</v-btn>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <!-- <v-btn @click="loginInMSAL()">AAD 登入(MSAL)</v-btn> -->
                    <v-btn @click="loginRedirect()">loginRedirect</v-btn>
                    <!-- <v-btn @click="logOutInMSAL()">AAD 登出(MSAL)</v-btn> -->
                    <v-btn @click="logoutRedirect()">logoutRedirect</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-btn @click="getIdToken()">getIdToken</v-btn>
                <v-btn @click="handleRedirectPromise()">handleRedirectPromise</v-btn>
                <v-btn @click="clearCache()">clearCache</v-btn>
            </v-row>
            {{ idToken }}
        </v-container>
    </div>
</template>

<style lang="scss" scoped></style>