<template>
  <div>
    <q-layout>
      <q-header reveal class="no-box-shadow">
        <q-card-section class="bg-grey-1">
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
        </q-card-section>
      </q-header>

      <q-scroll-area :delay="1200" style="height: 675px">
        <q-page-container class="bg-white">
          <q-pull-to-refresh @refresh="pullRefresh">
            <q-list>
              <q-card-section>
                <q-item
                  v-for="(items, i) in options"
                  :key="`${items.joB_Number}-${i}`"
                  class="q-mb-sm col-12 col-md-8 bg-grey-1"
                  clickable
                  v-ripple
                  @click="onclick(items)"
                >
                  <q-item-section>
                    <q-item-label>
                      งานที่{{ i + 1 }}: {{ items.joB_Number }}
                    </q-item-label>
                    <q-item-label caption lines="1">
                      ประเภทรถ : {{ items.jobgroupsuB_DESCRIPTION }}
                    </q-item-label>
                    <q-item-label caption lines="2">
                      วันที่อัพเดตล่าสุด :
                      {{
                        items.joB_DATEUPD.replace(/T/g, ", ").replace(/-/g, "/")
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-list>
          </q-pull-to-refresh>
        </q-page-container>
      </q-scroll-area>

      <q-footer reveal class="bg-grey-1 text-purple-4">
        <q-btn
          flat
          color="purple-4"
          class="text-white"
          size="20px"
          label="ย้อนกลับ"
          @click="returnToSelect"
        />
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { QSpinnerGears } from "quasar";

export default {
  data() {
    return {
      JOB_Number: "",
      options: [],
      model: null,
      alert: false,
      caption: [],
      overlay: false,
      showData: [],
      showDialog: false,
      NumberJob: "",
    };
  },
  mounted() {
    this.showLoading();
    this.getJOB();
  },
  methods: {
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: "purple-2",
        messageColor: "purple-2",
        message: "กำลังดึงข้อมูล กรุณารอ",
      });
      // hiding in 2s
    },

    showError(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
    showSuccess(message) {
      this.$q.notify({
        message: message,
        color: "green",
        timeout: 3000,
      });
    },
    ...mapActions("login", ["getCarMachine"]),
    getJOB() {
      this.getCarMachine({})
        .then((e) => {
          if (e.status === 200) {
            this.options = e.data;
            this.dataJOB = e.data;
            this.$q.loading.hide();
          }
        })
        .catch((error) => this.showError(error.response.data));
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
    pullRefresh(done) {
      this.showLoading();
      setTimeout(() => {
        this.getJOB();
        this.model = null;
        done();
      }, 1000);
    },
    onclick(e) {
      this.NumberJob = e.joB_Number;
      localStorage.setItem("JOB_Number", this.NumberJob);
      this.$router.push({ path: "/ShowHandlift" });
    },
    returnToSelect() {
      this.$router.replace({ path: "/select" });
    },
    //  dialogClose(result) {
    //   this.dialoggalleryindex = result.index;
    //   this.dialog = result.dialog;
    // },
  },
};
</script>
