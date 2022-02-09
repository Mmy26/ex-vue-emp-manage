import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 従業員の人数が入る変数
    totalEmployeeCount: 0,
    // 従業員一覧が入る変数
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    // 従業員一覧情報をWebAPIから取得してmutationを呼び出す
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      // WebAPIの仕様を確認しながら,axiosを使用して、WebAPIを呼ぶ

      // 取得したresponse.dateを変数payloadに代入
      const payload = response.data;
      // contextオブジェクトのcommitメソッドを使用し、データが入っているpayload変数を渡す
      context.commit("addEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    // 従業員一覧情報を作成してstateに格納する
    showEmployeeList(state, payload) {
      // payloadの中のtotalCountをstateのtotalCountの代入
      state.totalEmployeeCount = payload.totalEmployeeCount;
      // payload内のemployeesをfor...of文で回して都度Employeeオブジェクトを作成し、stateのemployeesにpush
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
    },
  }, // end mutations
  getters: {
    // 従業員数を返す
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    // 従業員数を返す
    getEmployees(state) {
      return state.employees;
    },
    // IDから従業員を１件検索し、返す
    getEmployeeById(state) {
      return state.employees[0];
    },
  }, // end getters
  modules: {}, // end modules
});
