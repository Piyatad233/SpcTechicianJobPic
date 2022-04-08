<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="no-box-shadow">
      <q-toolbar>
        <q-toolbar-title class="text-h5 text-sm-h6 text-weight-bold q-pa-sm"
          >เลือกโหมด</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding style="background: linear-gradient(#8274c5, #5a4a9f)">
        <div class="q-pa-sm">  
        <q-btn
          color="purple-1"
          size="lg"
          align="left"
          class="text-black full-width "
          label="แสดงงานประเภทรถลาก"
          icon="assignment"
          @click="goToAllJob"
        >
        </q-btn>
        <q-btn
          color="purple-1"
          size="lg"
          align="left"
          class="text-black full-width q-mt-lg"
          icon="add_a_photo"
          label="ถ่ายรูปงานช่าง"
          @click="goToHome"
        />
        </div>
        <!-- <div class="row q-pa-sm">
            <q-btn class="col-12 " color="indigo" text-color="white">haha</q-btn>

              <q-btn class="col-12 q-mt-lg" color="indigo" text-color="white">haha2</q-btn>
          </div> -->
      </q-page>
    </q-page-container>

    <q-footer reveal class="bg-grey-1 text-purple-4">
      <q-btn
        flat
        color="purple-4"
        class="text-white"
        size="20px"
        label="ออกจากระบบ"
        @click="returnLogin"
      />
    </q-footer>
  </q-layout>
</template>
<script>
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
    goToAllJob() {
      this.$router.replace({ path: "/alljobopen" });
    },
    goToHome() {
      this.$router.replace({ path: "/Home" });
    },
    returnLogin() {
      this.$router.replace({ path: "/" });
      localStorage.setItem("EmpID", "");
      localStorage.setItem("SpcName", "");
      localStorage.setItem("NickName", "");
    },
  },
};
</script>

<style scoped>
.row {
  display: inline-block;
}
</style>
