<template>
    <div class="container py-5">
      <div class="row">
          <div class="col-md-6 col-lg-4 m-auto py-4 px-4 mb-5 mt-4 w border border-secondary">
            <Form @submit="toDashboard" :validation-schema="schema">
                <h4 class="pb-2 text-center">Please {{ !type ? 'Sign In' : 'Register' }}</h4>
                <small class="red" v-if="registerErr">{{ registerErr }}</small>
                <Field name="firstName" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    v-if="type"
                    >
                    <div class="mt-2">
                        <label>First Name:</label>
                        <input 
                        type="text"
                        class="form-control mt-1 stylee" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="lastName" type="text"
                    v-slot="{field, errors, errorMessage}"
                    v-if="type" 
                    >
                    <div class="mt-2">
                        <label>Last Name:</label>
                        <input 
                        type="text"
                        class="form-control mt-1 stylee" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="email" type="email"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-2">
                        <label>Email Address:</label>
                        <input 
                        type="email"
                        class="form-control mt-1 stylee" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red pt-1">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="password" type="password"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-2">
                        <label>Password:</label> <br>
                        <small class="tip" v-if="type">Tip: include Number, special character, for a strong password.</small>
                        <input
                        type="password"
                        class="form-control mt-1 stylee" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red pt-1">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="confirm" type="password"
                    v-slot="{field, errors, errorMessage}" 
                    v-if="type"
                    >
                    <div class="mt-2">
                        <label>Confirm password:</label>
                        <input
                        type="password"
                        class="form-control mt-1 stylee" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red pt-1">{{ errorMessage }}</small>
                    </div>
                </Field>
                <base-button type="submit" class="mt-3 w-100">{{ !type ? 'Sign In' : 'Register' }}</base-button>

                <div class="form_swap mt-1" @click="type = !type">
                    <span v-if="type" class="mt-1">
                        Already have an account? <b class="crsr">Sign In</b>
                    </span>
                    <span v-else class="mt-1">
                        Don't have an account? <b class="crsr">Register</b>
                    </span>
                </div>

            </Form>
          </div>
      </div>
  </div>
  </template>

    <script setup>
    //   import firebase from 'firebase/compat/app';
    //   import { db, auth } from '@/firebase';

     import { ref } from 'vue'
      import { useRouter } from 'vue-router';
      const router = useRouter();

      import { Field, Form } from 'vee-validate';
      import * as yup from 'yup';

      import { useUserStore } from '@/stores/user';
      const userStore = useUserStore();

      const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      const schema = yup.object({
        firstName: yup.string().trim()
            .when([], {
            is: () => type.value == true,
            then: () => yup.string().required('First name is required')
            .min(3, 'Please enter minimum 3 characters'),
            otherwise: () => yup.string().notRequired()
        }),
         lastName: yup.string().trim()
            .when([], {
            is: () => type.value == true,
            then: () => yup.string().required('Last name is required')
           .min(5, 'Please enter minimum 5 characters'),
            otherwise: () => yup.string().notRequired()
        }),
        email: yup.string().trim()
        .required('Email is required')
        .matches(emailRegExp, 'Email Address is not valid'),
        password: yup.string().trim()
        .required('Password is required')
        .min(7, 'Please enter minimum 7 characters')
        // .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        // .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
        confirm: yup.string().trim()
         .when([], {
            is: () => type.value == true,
            then: () => yup.string().required('Confirm password is required')
            .oneOf([yup.ref("password"), null], "Passwords must match"),
            otherwise: () => yup.string().notRequired()
        }),
      })
      const registerErr = ref('')

      const toDashboard = (values) => {
        if(type.value) {
             auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(response => {
               const userId = response.user.uid;
               db.collection('users').doc(userId).set({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                role: 'user', // default role
                // createdAt: firebase.firestore.FieldValue.serverTimestamp()
               })
                router.push('/dashboard')
                userStore.auth = true;

                userStore.profileValues = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email
                }
                })
           .catch(err => {
            console.error('Registration error:', err); // 👈 This is important
            if (err.code === 'auth/email-already-in-use') {
                registerErr.value = 'This email is already registered'
            } else {
                registerErr.value = 'Registration failed. Please try again.'
            }
            });
         } else {
            auth.signInWithEmailAndPassword(values.email, values.password)
             .then(response => {
               const userId = response.user.uid;

               db.collection('users').doc(userId).get().then(doc => {
                if(doc.exists) {
                 const data = doc.data();
                 userStore.role = data.role;
                 userStore.profileValues = data;
                }
                 userStore.auth = true
                 router.push('/dashboard')
               })
             })
             .catch(err => {
                console.log('Login error code:', err.code);
                 if (err.code === 'auth/invalid-credential') {
                    registerErr.value = 'Invalid email or password.'
                    } else if (err.code === 'auth/wrong-password') {
                    alert('Incorrect password. Please try again.');
                    } else if (err.code === 'auth/invalid-email') {
                    alert('Invalid email format.');
                    } else {
                    alert('Login failed. Please try again.');
                }
             })
           } 
      }
       const type = ref(false);
    </script>

  <style scoped>
     .red {
        color: red;
    }
    .gray {
        border-color: #828181;
    }
    .stylee {
        background-color: transparent;
        color: #333537;
    }
    .stylee::placeholder{
        color: #828181;
    }
    .tip {
        color: #828181;
    }
    h4 {
        color: #333537;
    }
    .crsr {
        cursor: pointer;
    }

     @media screen and (max-width: 780px) {
        .w {
            width: 75%;
        }
     }
   </style>