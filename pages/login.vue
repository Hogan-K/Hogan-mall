<script setup>
const router = useRouter()
const store = useStore()
const { required, name, email } = baseInput()
const { saveUserInfo } = baseController()
const { authRegister, authLogin, authEmailVerify, authSignOut, googleRedirectLogin, getGoogleRedirectLoginResult } = baseAuth()
const $q = useQuasar()
const { t } = useI18n()

const tab = ref(1)

const registerInputList = ref([
  { title: 'email', rules: [required, email] },
  { title: 'name', rules: [required, name] },
  { title: 'birthday', rules: [required] },
  { title: 'password', rules: [required] },
  { title: 'check_password', rules: [required] }
])
const quickLoginAndRegisterBtn = [
  // { icon: 'fa-brands fa-facebook', onClick: () => '' },
  { icon: 'fa-brands fa-google', onClick: () => googleRedirectLogin() },
  { icon: 'fa-regular fa-envelope', onClick: () => tab.value = 2 }
]
const quickLoginAndLoginBtn = [
  // { icon: 'fa-brands fa-facebook', onClick: () => '' },
  { icon: 'fa-brands fa-google', onClick: () => googleRedirectLogin() },
  { icon: 'fa-regular fa-user', onClick: () => tab.value = 1 }
]

// birthday 沒給預設值,開啟選擇器會報錯
const registerInfo = ref({ birthday: '' })

const loginInfo = ref({})

const register = async () => {
  if (registerInfo.value.password !== registerInfo.value.check_password) {
    return $q.notify({
      message: t('register_password_different'),
      position: 'top-right',
      color: 'negative'
    })
  }

  await authRegister(registerInfo.value)
  if (store.auth) {
    await authEmailVerify()
    await saveUserInfo(store.auth.uid, {
      email: registerInfo.value.email,
      name: registerInfo.value.name,
      birthday: registerInfo.value.birthday
    })
    await authSignOut(false)
    tab.value = 1
  }
}

const login = async () => {
  try {
    const toPath = useState('toPath')
    await authLogin(loginInfo.value)
    sessionStorage.setItem('auth', JSON.stringify(store.auth))
    if (toPath.value) {
      return router.push({ path: toPath.value.path, query: toPath.value.query })
    }
    router.push({ path: '/' })
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const loginMethod = sessionStorage.getItem('login_method')
  if (loginMethod === 'google') {
    await getGoogleRedirectLoginResult()
    await saveUserInfo(store.auth.uid, {
      email: store.auth.email
    })
    sessionStorage.setItem('auth', JSON.stringify(store.auth))
    sessionStorage.removeItem('login_method')
    router.push({ path: '/' })
  }
})
</script>

<template>
  <QPage class="bg-accent">
    <QTabPanels v-model="tab" animated class="bg-accent q-mb-xl">
      <QTabPanel class="row justify-center q-mt-xl" :name="1">
        <QForm ref="loginForm" class="col-10 col-sm-5" @submit="login()">
          <h1 class="text-center text-size-8 text-weight-medium text-primary q-mb-lg">{{ $t('account_login') }}</h1>
          <Base-input v-model="loginInfo.account" width="auto" label="email" :rules="[required]" />
          <Base-input v-model="loginInfo.password" width="auto" label="password" :rules="[required]" />
          <QBtn rounded class="full-width" type="submit" color="primary" :label="$t('login')" />

          <QSeparator class="q-my-lg" />

          <div class="flex justify-around">
              <QBtn
                  v-for="(item, index) in quickLoginAndRegisterBtn"
                  :key="index"
                  round
                  glossy
                  class="q-mr-sm"
                  color="secondary"
                  text-color="accent"
                  :icon="item.icon"
                  @click="item.onClick()"
              />
          </div>
        </QForm>
      </QTabPanel>

      <QTabPanel class="row justify-center q-mt-xl" :name="2">
        <QForm ref="registerForm" class="col-10 col-sm-5" @submit="register()">
          <h1 class="text-center text-size-8 text-weight-medium text-primary q-mb-lg">{{ $t('register_account') }}</h1>
          <template v-for="(item, index) in registerInputList" :key="index">
            <QInput
                v-if="item.title === 'birthday'"
                v-model="registerInfo[item.title]"
                outlined
                rounded
                dense
                width="auto"
                mask="date"
                :label="$t(item.title)"
                :rules="item.rules"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="registerInfo[item.title]">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </QInput>
            <Base-input v-else v-model="registerInfo[item.title]" width="auto" :label="item.title" :rules="item.rules"  />
          </template>
          <QBtn rounded class="full-width" type="submit" color="primary" :label="$t('register')" />
          <QSeparator class="q-my-lg" />
          <div class="flex justify-around">
            <QBtn
                v-for="(item, index) in quickLoginAndLoginBtn"
                :key="index"
                round
                glossy
                class="q-mr-sm"
                color="secondary"
                text-color="accent"
                :icon="item.icon"
                @click="item.onClick()"
            />
          </div>
        </QForm>
      </QTabPanel>
    </QTabPanels>
  </QPage>
</template>
