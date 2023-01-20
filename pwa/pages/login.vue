<template>
  <CContainer>
    <CRow class="justify-content-center">
      <CCol :md="8">
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-medium-emphasis">Login ke aplikasi <strong>SIP</strong></p>
                <CAlert color="danger" :visible="!!loginError">
                  {{ loginError }}
                </CAlert>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    autocomplete="email"
                    v-model="email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                    v-model="password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol :xs="6">
                    <CButton color="primary" class="px-4" @click="login"> Login </CButton>
                  </CCol>
                  <CCol :xs="6" class="text-right">
                    <CButton color="link" class="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>
<script lang="ts">
import {useAuthStore} from "~/stores"
definePageMeta({
  layout: 'custom'
})

export default {
  name: 'Login',
  methods: {
    ...mapActions(useAuthStore,{
      doLogin: 'login',
      doLogout: 'logout'
    }),
    checkProfile(){

    },
    async login(){
      await this.doLogin(this.email, this.password)
        .then(() =>  {
          navigateTo('/')
        })
        .catch(error => {
          this.error = error.message
        })
    },
    logout(){
      this.doLogout()
    }
  },
  setup(){
    const auth = useAuthStore
    return {
      auth,
    }
  },
  data(){
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    ...mapState(useAuthStore, ['loginError']),
  }
}
</script>
