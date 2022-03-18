<template>
  <div>
    <q-layout>
      <q-header reveal class="no-box-shadow">
        <q-card-section class="bg-grey-1">
          <q-input
            rounded
            outlined
            dense
            v-model="JOB_Number"
            placeholder="หมายเลขงาน เช่น CJOB....."
            type="JOB_Number"
            @keydown.enter="getJOB"
          >
            <template v-slot:append>
              <q-icon
                type="submit"
                unelevated
                color="purple-4"
                class="text-white full-width"
                label="Check"
                name="search"
                @click="getJOB"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-header>
      <q-scroll-area :delay="1200" style="height: 675px">
        <q-page-container>
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              v-model="open"
              label="หมายเลขงาน"
            >
              <q-card>
                <q-card-section>
                  {{ JobNumber }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator v-model="open" label="ทะเบียนรถ">
              <q-card>
                <q-card-section>
                  {{ JobCarID }}
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item expand-separator v-model="open" label="คำอธิบาย">
              <q-card>
                <q-card-section>
                  {{ JOBDescription }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <q-card-actions>
            <q-btn
              icon="photo_camera"
              color="purple-4"
              class="text-white"
              label="ถ่ายภาพ"
              @click="takePicture"
            >
            </q-btn>
          </q-card-actions>

          <q-expansion-item expand-separator v-model="open2" label="รูปภาพ">
            <q-card-section>
              <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                  <q-img
                    center
                    :src="url"
                    spinner-color="white"
                    style="height: 140px; max-width: 150px"
                  />
                </div>
                <div class="col-4"></div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-px-md" style="max-width: 500px">
                <q-input
                  placeholder="รายละเอียดของงาน"
                  v-model="Remark"
                  outlined
                  type="textarea"
                />
              </div>
            </q-card-section>
          </q-expansion-item>
        </q-page-container>
      </q-scroll-area>
      <q-footer reveal class="bg-grey-1 text-purple-4">
        <q-card-actions>
          <q-btn
            icon="save"
            color="purple-4"
            class="text-white"
            label="บันทึก"
            @click="saveDataInTable"
          />
          <q-btn
            flat
            color="purple-4"
            class="text-white"
            label="ย้อนกลับ"
            @click="goHome"
          />
        </q-card-actions>
      </q-footer>

      <image-uploader
        class="hidden"
        id="pic"
        :maxWidth="600"
        ref="upload"
        :quality="0.7"
        :autoRotate="false"
        outputFormat="blob"
        :preview="false"
        :capture="true"
        accept="image/*"
        @input="addImage"
      >
      </image-uploader>
    </q-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      JOB_Number: "",
      dataJOB: {},
      JOBDescription: "",
      JobNumber: "",
      JobCarID: "",
      Remark: "",
      url: "",
      open: false,
      open2: false,
      xfile: null,
    };
  },
  methods: {
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
      });
    },
    ...mapActions("login", [
      "checklogin",
      "checkUser",
      "checkJOB",
      "getJOB",
      "UploadIMG",
    ]),
    getJOB() {
       this.ChackEmpID = localStorage.getItem("EmpID");
      if (this.ChackEmpID == "") {
        this.showError("กรุณาล็อคอิน");
        this.$nextTick(() => {
          this.$router.replace({ path: "/" });
        });
        return;
      }
      if (this.JOB_Number == "") {
        this.showError("กรุณาใส่รหัสงาน");
        return;
      }
      this.checkJOB({
        JOB_Number: this.JOB_Number,
        EmpID: localStorage.getItem("EmpID"),
      })
        .then((e) => {
          if (e.status === 200) {
            console.log(e.data);
            this.dataJOB = e.data;
            this.JobNumber = e.data.joB_Number;
            this.JobCarID = e.data.joB_CARID;
            this.JOBDescription = e.data.joB_DESCRIPTION;

            this.open = true;
          }
        })
        .catch((error) => this.showError(error.response.data));
    },

    takePicture() {
      if (this.JobNumber == "") {
        this.showError("ใส่รหัสหมายเลขของงานที่เปิด");
        return;
      }
      document.getElementById("pic").click();
    },
    addImage(blob) {
      this.open2 = true;
      var data = this.$refs.upload._data.currentFile;
      console.log(data);

      this.xfile = new File([blob], data.name, {
        type: data.type,
        lastModified: data.lastModified,

      });
      console.log(data.lastModified);
      // var reader = new FileReader();
      // reader.onload = (e) => (this.url = e.target.result);
      // reader.readAsDataURL(this.xfile);
    },
    saveDataInTable() {
      if (this.xfile == null) {
        this.showError("กรุณาถ่ายรูปก่อนบันทึก");
        return;
      }

      let imgName =
        this.dataJOB.joB_Number +
        "_" +
        this.dataJOB.joB_STA +
        "_" +
        localStorage.getItem("EmpID") +
        ".jpg";
      let formData = new FormData();
      formData.append("Image", this.xfile);
      formData.append("Name", imgName);
      formData.append("JOB_Number", this.dataJOB.joB_Number);
      formData.append("EmpID", localStorage.getItem("EmpID"));
      formData.append("SpcName", localStorage.getItem("SpcName"));

      if (this.Remark == "") {
        this.showError("กรุณาใส่รายละเอียดของรูปภาพ");
        return;
      }
      formData.append("Remark", this.Remark.replace("'", ""));

      this.UploadIMG(formData)
        .then((e) => {
          if (e.status === 200) {
            console.log(e.data);
            this.showSuccess("บันทึกสำเร็จ");
            this.JOB_Number = "";
            this.dataJOB = "";
            this.JOBDescription = "";
            this.JobNumber = "";
            this.JobCarID = "";
            this.Remark = "";
            this.url = "";
            this.open = false;
            this.open2 = false;
            this.xfile = null;
            this.$router.push({ path: "/Home" });
          }
        })
        .catch((error) => this.showError(error.response.data));
    },
    goHome() {
      this.$router.push({ path: "/Home" });
    },
  },
};
</script>
