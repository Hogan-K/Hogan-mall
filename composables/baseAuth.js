import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    deleteUser as firebaseDeleteUser,
    sendEmailVerification
} from "firebase/auth"

export default function () {
    const $q = useQuasar()
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()
    const auth = getAuth()

    const notify = (message, color = 'negative') => {
        $q.notify({
            message,
            position: 'top-right',
            color
        })
    }

    // 一般註冊
    const authRegister = async (registerInfo) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            store.UPDATE_AUTH(res.user)
            notify(t('register_success'), 'secondary')
        } catch (err) {
            console.log(err)
            notify(t('register_fail'))
        }
    }

    // 登入
    const authLogin = async (loginInfo) => {
        try {
            const res = await signInWithEmailAndPassword(auth, loginInfo.account, loginInfo.password)
            store.UPDATE_AUTH(res.user)
            notify(t('login_success'), 'secondary')
        } catch (err) {
            console.log(err)
            notify(t('login_fail'))
        }
    }

    // email 驗證信
    const authEmailVerify = () => {
        sendEmailVerification(store.auth).then(() => {
            notify(t('sendEmailVerify_success'), 'secondary')
        }).catch((err) => {
            console.log(err)
            notify(t('sendEmailVerify_fail'))
        })
    }

    // 驗證登入狀態
    const authVerifyStatus = () => {
        try {
            onAuthStateChanged(auth, (res) => {
                console.log(res)
            })
        } catch (err) {
            console.log(err)
        }
    }

    // 登出
    const authSignOut = (showNotify = true, routerPush) => {
        firebaseSignOut(auth).then(() => {
            store.UPDATE_AUTH({})
            sessionStorage.removeItem('auth')
            store.UPDATE_CART_AMOUNT(0)
            if (showNotify) {
                notify(t('sign_out_success'), 'secondary')
            }
            if (routerPush) {
                router.push({path: '/'})
            }
        }).catch((err) => {
            console.log(err)
            notify(t('sign_out_fail'))
        })
    }

    // 刪除帳號
    const authDeleteUser = async () => {
        const user = await auth.currentUser
        firebaseDeleteUser(user).then(() => {
            authSignOut()
            store.UPDATE_AUTH({})
            notify(t('delete_account_success'), 'secondary')
        }).catch((err) => {
            console.log('err :', err)
            notify(t('delete_account_fail'))
        })
    }

    return {
        authRegister,
        authLogin,
        authVerifyStatus,
        authSignOut,
        authDeleteUser,
        authEmailVerify
    }
}
