<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";
@Component
export default class EmployeeDetail extends Vue {
  // エラーメッセージ
  private errorMessage = "";
  // 対象の従業員オブジェクト
  private currentEmployee = new Employee(
    0,
    "",
    "",
    "",
    new Date(),
    "",
    "",
    "",
    "",
    0,
    "",
    0
  );
  // 対象の従業員のimageパス
  private currentEmployeeImage = "";
  // 対象の従業員の扶養人数
  private currentDependentsCount = 0;

  /**
   * VuexストアのGetter経由で受け取ったリクエストパラメーターIDから１件の従業員情報を取得する.
   */
  created(): void {
    const employeeId = Number(this.$route.params.id);
    this.currentEmployee = this.$store.getters.getEmployeeById(employeeId);
    this.currentEmployeeImage =
      "http://153.127.48.168:8080/ex-emp-api/img/e" +
      this.currentEmployee +
      "png";

    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }
}
</script>

<style scoped></style>
