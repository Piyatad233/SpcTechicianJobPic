<template>
  <q-layout>
    <q-toolbar >
      <q-item-section>
        <q-item-label class="text-weight-bold text-h4 text-primary" >
          รายละเอียดของงาน</q-item-label
        >
      </q-item-section>
    </q-toolbar>

    <q-scroll-area :delay="1200" style="height: 1000px">
      <q-page-container>
        <q-list bordered class="rounded-borders">
          <q-expansion-item expand-separator v-model="open1" label="รหัสงาน">
            <q-card>
              <q-card-section>
                {{ JobNumber }} 
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator v-model="open1" label="สถานะ">
            <q-card>
              <q-card-section>
                {{JobStaTest}}
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator v-model="open1" label="ประเภทรถ">
            <q-card>
              <q-card-section>
                {{ groupsub }} 
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator v-model="open" label="รายละเอียด">
            <q-card>
              <q-card-section>
                {{ jobDescription }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator v-model="open" label="วันที่อัพเดตล่าสุด">
            <q-card>
              <q-card-section>
                {{ Datains }}
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-list>

           <q-card-actions>
                <q-btn
                        label="อัพเดท"
                        icon="update"
                        size="15px"
                        color="primary"
                        @click="showDialog = true"
                 />
                 <q-btn
                        v-if="showBtn"
                        label="ปิดงาน"
                        icon="do_disturb"
                        size="15px"
                        color="red-4"
                        @click="showDialog2 = true"
                 />
          </q-card-actions>
      </q-page-container>
    </q-scroll-area>

        <q-dialog v-model="showDialog">
            <q-card style="width: 1024px; max-width: 80vw">
              <q-toolbar>
                <q-toolbar-title class="text-h4 text-weight-bold">
                  อัพเดทงาน</q-toolbar-title
                >
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>

                <q-card-section >
                  <q-item-label class="text-subtitle1">รหัสงาน:</q-item-label>
                  <q-input
                    square
                    outlined
                    disable
                    readonly
                    v-model="JobNumber"
                    class="text-subtitle1"
                    :placeholder="JobNumber"
                  />
                </q-card-section>

                <q-card-section >
                  <q-item-label class="text-subtitle1">สถานะของงาน:</q-item-label>
                  <q-select
                    square
                    outlined
                     v-model="JobSta" 
                     :options="options"
                    class="text-subtitle1"
                   
                  />
                </q-card-section>
       
              <q-card-section>
                <q-item-label class="text-subtitle1">รายละเอียด:</q-item-label>
                <q-input
                  square
                  outlined
                  class="text-subtitle1"
                  placeholder="รายละเอียด"
                  v-model="NewDescription"
                  type="textarea"
                />
              </q-card-section>

              <q-card-actions>
                <q-btn
                  icon="save"
                  color="purple-4"
                  class="text-white"
                  v-close-popup
                  :label="btnSavelabel"
                  @click="updateJob"
                  :disable="disableBtn"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

         <q-dialog v-model="showDialog2">
            <q-card style="width: 1024px; max-width: 80vw">
              <q-toolbar>
                <q-toolbar-title class="text-h4 text-weight-bold">
                  ปิดงาน</q-toolbar-title
                >
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>

                <q-card-section >
                  <q-item-label class="text-subtitle1">รหัสงาน:</q-item-label>
                  <q-input
                    square
                    outlined
                    disable
                    readonly
                    v-model="JobNumber"
                    class="text-subtitle1"
                    :placeholder="JobNumber"
                  />
                </q-card-section>

                <q-card-section >
                  <q-item-label class="text-subtitle1">สถานะของงาน:</q-item-label>
                  <q-input
                    square
                    outlined
                    disable
                    readonly
                    v-model="JobStaTest"
                    class="text-subtitle1"
                    :placeholder="JobStaTest"
                  />
                </q-card-section>
       
              <q-card-section>
                <q-item-label class="text-subtitle1">รายละเอียด:</q-item-label>
                <q-input
                  square
                  outlined
                  class="text-subtitle1"
                  placeholder="รายละเอียด"
                  v-model="NewDescription"
                  type="textarea"
                />
              </q-card-section>

              <q-card-actions>
                <q-btn
                  label="ปิดงาน"
                   icon="do_disturb"
                   size="15px"
                   color="red-4"
                  v-close-popup
                  @click="closeJob"
                  :disable="disableBtn"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

    <q-footer reveal class="bg-grey-1 text-purple-4">
      <q-btn
        flat
        color="purple-4"
        class="text-white"
        size="20px"
        label="ย้อนกลับ"
        @click="returnToAlljob"
      />
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { QSpinnerGears } from 'quasar'
export default {
  data() {
    return {
      techID: "",
      techName :"",
      dataJOB: [],
      JobNumber: "",
      groupsub: "",
      Datains: "",
      open: false,
      open1: true,
      jobDescription: "",
      JobSta:"",
      NewDescription:"",
      JobStaTest:"",
      showBtn: false,
      disableBtn: false,
      showDialog:false,
      showDialog2:false,
      btnSavelabel: "บันทึก",
      options: [
        '01:เปิดจ๊อบ ', '02:รอซ่อม', '03:กำลังซ่อม', '04:ซ่อมเสร็จ'
      ]
    };
  },
  mounted() {
    this.showLoading();
    this.getJOB();
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
        timeout: 3000,
      });
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'purple-2',
        messageColor: 'purple-2',
        message: 'กำลังดึงข้อมูล กรุณารอ'
      })
      // hiding in 2s
    },
    ...mapActions("login", ["getCarMachineById","updateJobHandlift","closeJobHandlift"]),
    getJOB() {
      this.getCarMachineById({
        JOB_Number: localStorage.getItem("JOB_Number"),
      })
        .then((e) => {
          if (e.status === 200) {
            this.dataJOB = e.data;
            this.JobNumber = e.data[0].joB_Number;
            this.groupsub = e.data[0].jobgroupsuB_DESCRIPTION;
            this.Datains = e.data[0].joB_DATEUPD.replace(/T/g, ", ");
            this.jobDescription = e.data[0].joB_DESCRIPTION;
            this.techID = e.data[0].joB_TECHID;
            this.techName = e.data[0].joB_TECHNAME;
            if(e.data[0].joB_STA == '01')
              {
                 this.JobStaTest =  '01:เปิดจ๊อบ';
                 this.showBtn =false
              }
            else if(e.data[0].joB_STA == '02')
            {
                 this.JobStaTest =  '02:รอซ่อม';
                 this.showBtn =false
            }
            else if(e.data[0].joB_STA == '03')
            {
                 this.JobStaTest =  '03:กำลังซ่อม';
                 this.showBtn =false
            }
            else if(e.data[0].joB_STA == '04')
            {
                 this.JobStaTest =  '04:ซ่อมเสร็จ';
                 this.showBtn = true
            }
             this.$q.loading.hide()
          }
        })
        .catch((error) => this.showError(error.response.data));
    },
    updateJob(){
        let data = {
        SpcName: localStorage.getItem("SpcName"),
        EmpID: localStorage.getItem("EmpID"),
        NickName: localStorage.getItem("NickName"),
        JOB_STA: this.JobSta.substring(2, -2),
        NewDescription: this.NewDescription,
        JOB_NUMBER: localStorage.getItem("JOB_Number"),
      };
   
      if (this.NewDescription == "") {
        this.showError("กรุณาใส่รายละเอียดของงาน");
        return;
      }

      this.disableBtn = true;
      this.btnSavelabel = "กำลังบันทึก";
      this.updateJobHandlift(data)
        .then((e) => {
          if (e.status === 200) {
            this.showSuccess("บันทึกสำเร็จ");
            this.btnSavelabel = "บันทึก";
            this.getJOB();
            this.JobSta == "";
            this.NewDescription == ""; 
            this.disableBtn = false;
          }
        })
        .catch((error) => this.showError(error.response.data))
        .finally(() => {
          this.disableBtn = false;
        });
    },
    closeJob(){
        let data = {
        SpcName: localStorage.getItem("SpcName"),
        EmpID: localStorage.getItem("EmpID"),
        NickName: localStorage.getItem("NickName"),
        NewDescription: this.NewDescription,
        JOB_NUMBER: localStorage.getItem("JOB_Number"),
      };
      if(this.JobStaTest != "04:ซ่อมเสร็จ")
      {
        this.showError("งานนี้ยังซ่อมไม่เสร็จ");
        return;
      }
      if(this.techID == "" && this.techName == "")
      {
          this.showError("ไม่มีช่างที่รับผิดชอบ");
        return;
      }
      if (this.NewDescription == "") {
        this.showError("กรุณาใส่รายละเอียดปิดงาน");
        return;
      }
     
      this.disableBtn = true;
      this.closeJobHandlift(data)
        .then((e) => {
          if (e.status === 200) {
         
            this.showSuccess("ปิดงานสำเร็จ"); 
            this.NewDescription == "";
            this.disableBtn = false; 
            this.$router.replace({ path: "/alljobopen" });
          }
        })
        .catch((error) => this.showError(error.response.data))
        .finally(() => {
          this.disableBtn = false;
        });
    },
    returnToAlljob() {
      this.$router.replace({ path: "/alljobopen" });
      localStorage.setItem("JOB_Number", "");
    },
    pullRefresh(done) {
      setTimeout(() => {
        this.getJOB();
        this.model = null;
        done();
      }, 1000);
    },
  },
};
</script>

<style></style>
