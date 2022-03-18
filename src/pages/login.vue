<template>
  <div>
   
      <q-layout
        view="lHh lpr lFf"
        style="height: 100px"
        class="shadow-2 rounded-borders"
      >

        <q-page-container>
          <q-page
            class="window-height window-width row justify-center items-center"
            style="background: linear-gradient(#8274c5, #5a4a9f)"
          >
            <form @submit.prevent="login">
              <div class="column q-pa-lg">
                <div class="row">
                  <q-card
                    square
                    class="shadow-24"
                    style="width: 300px; height: 485px"
                  >
                    <q-card-section class="bg-deep-purple-7">
                      <h4 class="text-h5 text-white q-my-md">CARMACHINEAPP</h4>
                    </q-card-section>
                    <q-card-section>
                      <q-form class="q-px-sm q-pt-xl">
                        <q-input
                          square
                          clearable
                          v-model="username"
                          type="username"
                          label="รหัสพนักงาน"
                        >
                        </q-input>
                        <q-input
                          square
                          clearable
                          v-model="password"
                          type="password"
                          label="รหัสผ่าน"
                        >
                        </q-input>
                      </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-lg">
                      <q-btn
                        icon="login"
                        type="submit"
                        unelevated
                        size="lg"
                        color="purple-4"
                        class="full-width text-white"
                        label="ล็อคอิน"
                      />
                    </q-card-actions>
                    <form @submit.prevent="register">
                      <q-card-actions>
                        <q-btn
                          type="register"
                          unelevated
                          size="lg"
                          class="full-width text-grey-6"
                          label="ลงทะเบียน"
                        />
                      </q-card-actions>
                    </form>
  
               </q-card>
                </div>
              </div>
            </form>
           
          </q-page>
        </q-page-container>
      </q-layout>
    </div>

</template>
<script>
import { mapActions } from "vuex";


export default {
  
  name: "Login",
  data() {
    return {
      dataUser: [],
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    showError (message) {
      this.$q.notify({
        message: message,
        color: 'red'
      })
    },

    ...mapActions("login", [
      "checklogin",
      "checkUser",
    ]),
    login() {
      if(this.username == ""){

          this.showError("กรุณาใส่รหัสพนักงาน")
          return;

      }
     
      this.checkUser({
        Username: this.username,
        Password: this.password,
      })
        .then((e) => {
          if (e.status === 200) {
            console.log(e.data)
            localStorage.setItem("EmpID",e.data[0].empID)
            localStorage.setItem("SpcName",e.data[0].spcName)
            this.$router.push({ path: "/Home" });

          }
        })
        .catch((error) => this.showError(error.response.data));

    },
    register() {
      this.$router.push({ path: "/register" });
    },
  },
  
};
</script>
