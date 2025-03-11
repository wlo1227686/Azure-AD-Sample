<script setup lang="ts" name="Home">
import { ref } from 'vue'
import * as adal from "@/scripts/adal";
import * as msal from "@/scripts/msal";

import UserInfo from '@/views/UserInfo.vue';

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

async function getIdTokenClaims() {
    const obj = await msal.getIdTokenClaims();
    console.log(obj)

}

</script>

<template>
    <div class="col">
        <v-container>
            <v-row>
                <v-col col="6">
                    <!-- adal-angular -->
                    <v-card variant="outlined">
                        <v-card-title>
                            使用 adal-angular 實作 Azure Active Directory
                        </v-card-title>
                        <v-spacer />
                        <v-card-subtitle>
                            <v-chip @click="loginInADAL()">AAD 登入(ADAL)</v-chip>
                            <v-chip @click="logOutInADAL()">AAD 登出(ADAL)</v-chip>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col col="6">
                    <!-- azure/msal-browser -->
                    <v-card variant="outlined">
                        <v-card-title>
                            使用 azure/msal-browser 實作 Azure Active Directory
                        </v-card-title>
                        <v-spacer />
                        <v-card-subtitle>
                            <v-chip @click="loginRedirect()">loginRedirect</v-chip>
                            <v-chip @click="logoutRedirect()">logoutRedirect</v-chip>

                            <v-chip @click="getIdToken()">getIdToken</v-chip>
                            <v-chip @click="handleRedirectPromise()">handleRedirectPromise</v-chip>
                            <v-chip @click="clearCache()">clearCache</v-chip>
                            <v-chip @click="getIdTokenClaims()">getIdTokenClaims</v-chip>
                        </v-card-subtitle>
                        <v-card-text>
                            <UserInfo />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped></style>