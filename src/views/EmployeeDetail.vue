<template>
  <div>
    <div class="container">
      <div class="row">
        <form>
          <fieldset>
            <legend>従業員情報</legend>
            <table>
              <tr>
                <th nowrap>従業員名</th>
                <td>
                  <span>{{ currentEmployee.name }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>写真</th>
                <td>
                  <img v-bind:src="currentEmployeeImage" />
                </td>
              </tr>
              <tr>
                <th nowrap>性別</th>
                <td>
                  <span>{{ currentEmployee.gender }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>入社日</th>
                <td>
                  <span>{{ currentEmployee.hireDate }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>メールアドレス</th>
                <td>
                  <span>{{ currentEmployee.mailAddress }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>郵便番号</th>
                <td>
                  <span>{{ currentEmployee.zipCode }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>住所</th>
                <td>
                  <span>{{ currentEmployee.address }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>電話番号</th>
                <td>
                  <span>{{ currentEmployee.name }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>給料</th>
                <td>
                  <span>{{ currentEmployee.salary }}円</span>
                </td>
              </tr>
              <tr>
                <th nowrap>特性</th>
                <td>
                  <span>{{ currentEmployee.characteristics }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>扶養人数</th>
                <td>
                  <div class="input-field col s12">
                    <div class="error">{{ errorMessage }}</div>
                    <input
                      v-model="currentDependentsCount"
                      id="dependentsCount"
                      type="text"
                      class="validate"
                      value="3"
                      required
                    />
                  </div>
                </td>
              </tr>
            </table>

            <button
              v-on:click="update"
              type="button"
              class="btn btn-register waves-effect waves-light"
            >
              更新
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
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
      "http://153.127.48.168:8080/ex-emp-api/img/" + this.currentEmployee.image;

    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }

  /**
   * 扶養人数を更新する.
   *
   * @returns Promiseオブジェクト
   */
  async update(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/employee/update",
      {
        id: this.currentEmployee.id,
        dependentsCount: this.currentDependentsCount,
      }
    );
    if (response.data.status === "success") {
      this.$router.push("/employeeList");
    } else {
      this.errorMessage = "更新できませんでした";
    }
  }
}
</script>

<style scoped></style>
