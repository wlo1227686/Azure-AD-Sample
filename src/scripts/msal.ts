import { PublicClientApplication } from "@azure/msal-browser";

/**
 * Azure AD相關操作(二次封裝'@azure/msal-browser')
 * 參考資訊:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki
 * 設定平台:
 * https://azure.microsoft.com/zh-tw/products/microsoft-entra-ds
 */

/** Azure AD 導轉後帶有(登入資訊)的(前綴/識別錨點) '#code=' */
export const AAD_REDIRECTURI_PREFIX: string = '#code='

/** Azure AD 的租戶單位識別碼(tenant)如:機關/行號/公司 ps:該路徑需符合申請文件 */
const tenant = import.meta.env.VITE_AAD_TENANT

/** Azure AD 的系統識別碼(clientId) ps:該路徑需符合申請文件 */
const clientId = import.meta.env.VITE_AAD_CLIENT_ID

/** Azure AD 導轉回系統時的路徑 ps:該路徑需符合申請文件 */
const redirectUri = window.location.origin + import.meta.env.VITE_BASE

/** Azure AD 登出導轉回系統時的路徑 ps:該路徑需符合申請文件 */
const postLogoutRedirectUri = window.location.origin + import.meta.env.VITE_BASE

/** 將登入資訊保存於 'loalStorage' or 'sessionStorage' */
const cacheLocation = 'localStorage'

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: "https://login.microsoftonline.com/" + tenant,
        redirectUri: redirectUri, // base uri for this application
        postLogoutRedirectUri: postLogoutRedirectUri,
    },
    cache: {
        cacheLocation: cacheLocation,
        storeAuthStateInCookie: true,
    },
};

/** 宣告物件 */
const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize().then(() => {
    console.log('初始化成功')
}).catch((err) => {
    console.log('初始化失敗', err)
})

/**
 * 基本上是用來處理 loginRedirect() 身份驗證流程後的回調，解析重定向的回應。
 * 使用情境 :
 * (1) redirectUri/#code=XXXXXX 驗證成功後立即跳轉
 * (2) 更新 Azure AD 物件狀態
 */
export async function handleRedirectPromiseForLoginRedirect(hash?: string) {
    return new Promise(async function (resolve, reject) {
        /** 更新 Azure AD 狀態 */
        await msalInstance.handleRedirectPromise(hash).then((response) => {
            if (response) {
                console.log('response', response)
                resolve(response)
            }
        }).catch((error) => {
            reject(error)
        });
    })/** end_Promise */
}

/**
 *  更新Azure AD 物件狀態
 *  使用情境:
 *  (1) 登入過 Azure AD 並於瀏覽器保留相關 Accounts 資訊
 */
export async function handleRedirectPromise() {
    await msalInstance.handleRedirectPromise().then(() => { }).catch((error) => {
        console.error("handleRedirectPromise:", error);
    })
}

/**
 * Azure AD 登入
 */
export async function loginRedirect() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts && accounts.length === 0) {
        msalInstance.loginRedirect().then().catch((error) => {
            console.error("loginRedirect:", error);
        });
    }/** end_if */
}

/**
 * Azure AD 登出
 */
export async function logoutRedirect() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts && accounts.length != 0) {
        msalInstance.logoutRedirect().then().catch((error) => {
            console.error("logoutRedirect:", error);
        });
    }/** end_if */
}

/**
 * 取得id_token
 * @returns null || id_token
 */
export async function getIdToken() {
    try {
        await handleRedirectPromise()
        msalInstance.getAllAccounts()
    } catch (err) {
        console.log(err)
    }
    if (msalInstance.getAllAccounts().length != 0) {
        return msalInstance.getAllAccounts()[0].idToken;
    } else {
        return null
    }
}
/**
 * 清除快取
 */
export async function clearCache() {
    msalInstance.clearCache()
}


export async function getIdTokenClaims() {
    try {
        await handleRedirectPromise()
        msalInstance.getAllAccounts()
    } catch (err) {
        console.log(err)
    }

    if (msalInstance.getAllAccounts().length != 0) {
        return msalInstance.getAllAccounts()[0].idTokenClaims;
    } else {
        return null
    }
}