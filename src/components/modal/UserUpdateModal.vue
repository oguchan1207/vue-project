<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useForm } from "vee-validate";
import { object, string, setLocale } from "yup";
import * as yup from "yup";
import { Core as YubinBangoCore } from "yubinbango-core2";
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();

const props = defineProps({
  show: Boolean,
});

const requiredMessage = "を入力してください。";
const errorMessage = "を正しく入力してください。";

setLocale({
  mixed: {
    required: ({ label }) => `${label}` + requiredMessage,
  },
  string: {
    email: ({ label }) => `${label}` + errorMessage,
    matches: ({ label }) => `${label}` + errorMessage,
    min: ({ label }) => `${label}` + errorMessage,
    // max: ({ label }) => `${label}` + errorMessage,
  },
});

const validationSchema = object({
  lastName: string().required().label("姓"),
  firstName: string().required().label("名"),
  postCode: string()
    .required()
    .matches(/^[0-9]*$/)
    .max(7, "郵便番号は7文字で入力してください。")
    .label("郵便番号"),
  address: string().required().label("住所"),
  phoneNumber: string()
    .required()
    .matches(/^0[5789]0[0-9]{4}[0-9]{4}$/)
    .max(11, "電話番号は11文字で入力してください。")
    .label("電話番号"),
  email: string().required().email().label("メールアドレス"),
  password: string()
    .required()
    .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]*$/)
    .min(8)
    .max(
      20,
      "パスワードは8文字以上20文字以内で数字とアルファベットを使用してください。",
    )
    .label("パスワード"),
  passwordConfirm: string()
    .required()
    .min(8)
    .oneOf(
      [yup.ref("password")],
      "入力されたパスワードが一致しません。確認してください。",
    )
    .label("パスワード確認用"),
});

//useForm 関数から戻されるオブジェクトに含まれる errors からメッセージを取得
const { errors, meta, useFieldModel } = useForm({
  validationSchema: validationSchema,
});

const [
  lastName,
  firstName,
  postCode,
  address,
  phoneNumber,
  email,
  password,
  passwordConfirm,
] = useFieldModel([
  "lastName",
  "firstName",
  "postCode",
  "address",
  "phoneNumber",
  "email",
  "password",
  "passwordConfirm",
]);

const code = user ? JSON.stringify(user.value, null, 2) : "";
const json = JSON.parse(code);

const getUrl = "http://localhost:8080/api/user/" + json.email;
const updateUrl = "http://localhost:8080/api/user/update";

function fetchAddress() {
  new YubinBangoCore(postCode.value, function (addr: {
    region: any;
    locality: any;
    street: any;
  }) {
    // region=都道府県, locality=市区町村, street=町域
    address.value = addr.region + addr.locality + addr.street;
  });
};

const getUser = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      getUrl,
    );
    const data = await response.data;
    lastName.value = data.lastName;
    firstName.value = data.firstName;
    postCode.value = data.postCode;
    address.value = data.address;
    phoneNumber.value = data.phoneNumber;
    email.value = data.email;
    password.value = data.password;
    passwordConfirm.value = data.passwordConfirm;
  console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
    } else {
      console.log(error);
    }
  }
};
getUser();

const updateUser = async () => {
  try {
    const response: AxiosResponse = await axios.patch(updateUrl, {
      lastName: lastName.value,
      firstName: firstName.value,
      address: address.value,
      postCode: postCode.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    });
    alert("更新完了しました");
    location.href = 'http://localhost:5173';
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
    alert("更新できませんでした");
      console.log(error.response?.status);
    } else {
    alert("更新できませんでした");
      console.log(error);
    }
  }
};

</script>


<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="lastName">氏名</label>
            <input
              v-model="lastName"
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              placeholder="姓"
            />
            <div class="error-message">{{ errors.lastName }}</div>
            <input
              v-model="firstName"
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="名"
            />
            <div class="error-message">{{ errors.firstName }}</div>
          </div>
          <div class="form-group">
            <label for="postCode">郵便番号</label>
            <input
              v-model="postCode"
              type="text"
              class="form-control"
              id="postCode"
              placeholder="0009999"
              :blur="fetchAddress()"
            />
            <div class="error-message">{{ errors.postCode }}</div>
            <label for="address">住所</label>
            <input
              v-model="address"
              type="address"
              class="form-control"
              id="address"
              name="address"
              placeholder="住所"
            />
            <div class="error-message">{{ errors.address }}</div>
          </div>
          <div class="form-group">
            <label for="phoneNumber">電話番号</label>
            <input
              v-model="phoneNumber"
              type="tel"
              class="form-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="電話番号"
            />
            <div class="attention-font">ハイフンなしで入力してください。</div>
            <div class="error-message">{{ errors.phoneNumber }}</div>
          </div>
          <div class="form-group">
            <label for="email">メールアドレス</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="メールアドレス"
              readonly
            />
            <div class="error-message">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="password">パスワード</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="････････"
            />
            <div class="attention-font">
              パスワードは8文字以上20文字以内で入力してください。
            </div>
            <div class="error-message">{{ errors.password }}</div>
          </div>
          <div class="form-group">
            <label for="passwordConfirm">パスワード(確認用)</label>
            <input
              v-model="passwordConfirm"
              type="password"
              class="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="パスワード(確認用)"
            />
            <div class="error-message">{{ errors.passwordConfirm }}</div>
          </div>
          <button
            class="btn-updateUser"
            @click="updateUser()"
          >
            更新
          </button>
          <!-- <button class="btn-primary" ng-disabled="myForm.$invalid" @click="createNewUser">登録</button> -->
          <button class="modal-default-button" @click="$emit('close')">
            閉じる
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.form-group {
  width: 350px;
  padding: 0.4em 0;
}

.form-control {
  width: 100%;
  display: inline-block;
  background-color: #fff;
  padding: 0.3em 0;
  border: 2px solid #ccc;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
}

.attention-font {
  font-size: 11px;
}

.error-message {
  font-size: 12px;
  color: red;
}
.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
