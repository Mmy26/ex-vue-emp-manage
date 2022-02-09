<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row register-page">
          <div class="error">{{ errorMessage }}</div>
          <form class="col s12" id="reg-form">
            <div class="row">
              <div class="input-field col s6">
                <input
                  v-model="lastName"
                  id="last_name"
                  type="text"
                  class="validate"
                  required
                />
                <label for="last_name">姓</label>
              </div>
              <div class="input-field col s6">
                <input
                  v-model="firstName"
                  id="first_name"
                  type="text"
                  class="validate"
                  required
                />
                <label for="first_name">名</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="mailAddress"
                  id="email"
                  type="email"
                  class="validate"
                  required
                />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <button
                  v-on:click="registerAdmin"
                  type="button"
                  class="btn btn-large btn-register waves-effect waves-light"
                >
                  登録
                  <i class="material-icons right">done</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ResisterAdmin extends Vue {
  // 登録時のエラーメッセージ
  private errorMessage = "";
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";

  /**
   * 管理者情報を登録する.
   */
  async registerAdmin(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/insert",
      {
        name: this.lastName + " " + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );

    if (response.data.status === "success") {
      this.$router.push("/loginAdmin");
    } else {
      this.errorMessage = "登録が失敗しました";
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}
</style>
