import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required } from "vee-validate/dist/rules";


extend('email', {
    ...email,
    message: 'Not Valid Email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

