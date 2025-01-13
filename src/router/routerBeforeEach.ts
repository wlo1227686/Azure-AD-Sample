import * as adal from '@/scripts/adal'
import * as msal from '@/scripts/msal'

/**
 * 路由守衛 
 * 
 * 觸發點 : 畫面渲染前
 */
export default async function routerBeforeEach(to: any, from: any) {
    // --------------------
    //  1. 從哪來?、想去哪?
    // --------------------
    console.log(`1. 從哪來 = ${from.fullPath} 想去哪 = ${to.fullPath}`)

    if (to.fullPath.includes('#id_token=')) {
        console.log('#id_token')
        const url = to.hash;
        if (adal.isCallback(url)) {
            const requestInfo = adal.getRequestInfo(url)
            adal.saveTokenFromHash(requestInfo)
            const authToken = adal.getCachedToken()
            console.log('authToken=', authToken)
        }
    } else if (to.fullPath.includes('#code')) {
        console.log('#code')
        msal.handleRedirectPromiseForLoginRedirect(to.hash).then().catch((error) => { console.log(error) })
    } else {
        console.log('do nothing')
        const id_token = await msal.getIdToken();
        console.log('id_token', id_token)
    }

    return
}