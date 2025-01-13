import AuthenticationContext from 'adal-angular'

/**
 * Azure AD相關操作(二次封裝'adal-angular')
 * 參考資訊:
 * 
 * https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki
 */

/** Azure AD 導轉後帶有(登入資訊)的(前綴/識別錨點) '#id_token=' */
export const AAD_REDIRECTURI_PREFIX: string = '#id_token='

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


const config: AuthenticationContext.Options = {
    tenant: tenant,   // AAD Tenant
    clientId: clientId, // AAD Client Id
    redirectUri: redirectUri, // base uri for this application
    postLogoutRedirectUri: postLogoutRedirectUri,
    cacheLocation: cacheLocation,
};

/**
 * 初始化
 */
const authContext = new AuthenticationContext(config);

/**
 * Azure AD 登出
 */
export function logOut() {
    authContext.logOut()
}
/**
 * Azure AD 登入
 */
export function login() {
    authContext.login()
}

/**
 * 是否為 Azure AD 的指定格式 (1) id token (2) error description
 * 
 * (範例格式)
 * 
 * 1) '#id_token=XXX&state=XXX&session_state=XXX'
 * @param hash 
 * @returns 
 */
export function isCallback(hash: string) {
    return authContext.isCallback(hash)
}

/**
 * 處理從 Azure AD 導轉而來的回應，提取hash、解析error、處理token。並將結果保存於cache中，並重新導轉。
 * 
 * 保存位置參照 Options.cacheLocation 設定
 * 
 */
export function handleWindowCallback() {
    authContext.handleWindowCallback()
}

/**
 * 處理從 Azure AD 導轉而來的回應
 * @param hash 
 */
export function getRequestInfo(hash: string): AuthenticationContext.RequestInfo {
    return authContext.getRequestInfo(hash)
}

/**
 * 將 RequestInfo 保存於cache中
 * @param requestInfo 
 */
export function saveTokenFromHash(requestInfo: AuthenticationContext.RequestInfo) {
    authContext.saveTokenFromHash(requestInfo)
}

/**
 * 從 Azure AD 的登入資訊，取得當前有效的Token。 
 * @returns 當前有效的Token or null
 */
export function getCachedToken(): string | null {
    return authContext.getCachedToken(clientId);
}
