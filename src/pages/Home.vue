<template>
  <q-layout>
    <q-header reveal class="col no-box-shadow">
      <q-toolbar class="bg-purple-4">
        <q-toolbar-title>แสดงข้อมูลล่าสุด </q-toolbar-title>
      </q-toolbar>

      <q-card-section class="row bg-grey-1">
        <q-input
          rounded
          outlined
          dense
          v-model="model"
          class="col-10 col-md-11"
          placeholder="CJOB.../TJOB..."
          @keydown.enter="filterFn"
        >
          <template v-slot:append>
            <q-icon
              unelevated
              color="purple-4"
              class="text-white"
              label="Check"
              name="search"
              @click="filterFn"
            />
          </template>
        </q-input>

        <q-btn
          flat
          dense
          color="purple-4"
          class="col-auto"
          label="รีเฟรช"
          @click="getData"
        />
      </q-card-section>
    </q-header>

    <q-scroll-area :delay="1200" style="height: 675px">
      <q-page-container class="bg-white">
        <q-pull-to-refresh @refresh="pullRefresh">
          <q-list>
            <q-card-section>
              <q-item-label>ล่าสุด</q-item-label>
              <q-item
                v-for="(items, i) in options"
                :key="`${items.joB_Number}-${i}`"
                class="q-mb-sm col-12 col-md-8 bg-grey-1"
                clickable
                v-ripple
                @click="onclick(items)"
              >
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img :src="items.pathPicture" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label> {{ items.joB_Number }}</q-item-label>
                  <q-item-label caption lines="1"
                    >วันที่:
                    {{ items.createDateTime.replace(/T/g, ", ") }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-list>
        </q-pull-to-refresh>
      </q-page-container>
    </q-scroll-area>

    <q-dialog v-model="alert">
      <q-card style="width: 400px">
        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-img :src="src" style="max-width: 300px; height: 100%" cover>
            </q-img>
          </div>

          <q-card-actions>
            <q-item-label class="col-12">{{ caption }}</q-item-label>
            <q-item-label caption lines="2"> {{ captionRemark }}</q-item-label>

            <q-space />
            <q-btn flat label="ปิด" color="primary" v-close-popup />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>

    <q-footer reveal class="bg-grey-1 text-purple-4 col">
      <q-card-actions>
        <q-btn
          color="purple-4"
          class="text-white"
          label="บันทึกข้อมูลใหม่"
    
          @click="goSaveData"
        />
        <q-btn
          flat
          color="purple-4"
          class="text-white"
          label="ย้อนกลับ"
         
          @click="returnSelect"
        />
      </q-card-actions>
    </q-footer>
  </q-layout>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      JOB_Number: "",
      dataJOB: [],
      model: null,
      options: [],
      alert: false,
      src: "",
      caption: "",
      captionRemark: "",
      ChackEmpID: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    showError(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
    ...mapActions("login", ["getDataTableTrans"]),
    getData() {
      this.ChackEmpID = localStorage.getItem("EmpID");
      if (this.ChackEmpID == "") {
        this.showError("กรุณาล็อคอิน");
        this.$nextTick(() => {
          this.$router.replace({ path: "/" });
        });
        return;
      }
      this.getDataTableTrans({
        EmpID: this.ChackEmpID,
        TopRow: 10,
      })
        .then((e) => {
          if (e.status === 200) {
            this.dataJOB = e.data;
            this.options = this.dataJOB;
          }
        })
        .catch((error) => this.showError(error.response.data));
    },
    pullRefresh(done) {
      setTimeout(() => {
        this.getData();
        this.model = null;
        done();
      }, 1000);
    },
    returnSelect() {
      this.$router.replace({ path: "/select" });
     
    },
    goSaveData() {
      this.$router.push({ path: "/StatusJOB" });
    },
    onclick(e) {
      this.src = e.pathPicture;
      this.caption = e.joB_Number;
      this.captionRemark = e.remark;
      this.$nextTick(() => {
        this.alert = true;
      });
    },

    filterFn() {
      setTimeout(() => {
        if (this.model === "") {
          this.options = this.dataJOB;
        } else {
          this.options = this.dataJOB.filter((v) =>
            v.joB_Number.toUpperCase().startsWith(this.model.toUpperCase())
          );
        }
      }, 300);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
