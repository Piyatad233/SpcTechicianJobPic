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
            style="background: linear-gradient(#ff9999,#e60000)"
          >
           
              <div class="column q-pa-lg">
                <div class="row">
                  <q-card
                    square
                    class="shadow-24"
                    style="width: 300px; height: 500px"
                  >
                    <q-card-section class="bg-pink-7">
                      
                      <h4 class="text-h5 text-white q-my-md">ลงทะเบียน</h4>
                    </q-card-section>
                    <q-card-section>
                      <q-form class="q-px-sm q-pt-xl">
                     <q-input
                          square
                          clearable
                          v-model="EmpID"
                          type="EmpID"
                          label="รหัสพนักงาน"
                        ></q-input>

                        <q-input
                          square
                          clearable
                          v-model="password"
                          type="password"
                          label="รหัสผ่าน"
                        ></q-input>

                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-form>
                    </q-card-section>
                     <form @submit.prevent="register">
                    <q-card-actions class="q-px-lg">
                      <q-btn
                        type="submit"
                        unelevated
                        size="lg"
                        color="pink-4"
                        class="full-width text-white"
                        label="ลงทะเบียน"
                      />
                    </q-card-actions>
                    </form>
                     <form @submit.prevent="returnLogin">
                    <q-card-actions class="q-px-lg">
                      <q-btn
                          type="returnLogin"
                          unelevated
                          size="lg"
                          class="full-width text-grey-6"
                          label="กลับไปหน้าล็อกอิน"
                      />
                    </q-card-actions>
                    </form>

                  </q-card>
                </div>
              </div>
            
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
 
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {

      password: "",
      EmpID: "",

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
      "registerUser",
      "checkUser",
    ]),
    register() {
        if(this.EmpID == ""){

          this.showError("กรุณาใส่รหัสพนักงาน")
          return;

      }
      this.registerUser({
        EmpID: this.EmpID,
        Password: this.password,
        
      })
        .then((e) => {
        
          console.log(e.data);
          this.dataUser = e.data;
          this.$router.push({ path: "/" });
        })
        .catch((error) => this.showError(error.response.data));
    },
    returnLogin() {
      this.$router.push({ path: "/" });
    },
  },

};
</script>

<style></style>
