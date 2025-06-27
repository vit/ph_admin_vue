
<script setup>

    import { ref, reactive, watch } from 'vue'

    //   import DocPage from '../components/lib/doc/DocPage.vue';

    // const data = reactive({login: '', password: ''})
    const data = ref({login: '', password: ''})

    import { useAuthStore } from '../stores/auth'
    const authStore = useAuthStore()

    const login = async (event) => {
        // event.preventDefault()
        // console.log(data.value)
        try {
            await authStore.login(data.value.login, data.value.password)
            // После успешного логина можно сделать редирект
            // router.push('/dashboard') - если используете vue-router
        } catch (error) {
            console.error('Login failed:', error)
            // Можно добавить отображение ошибки пользователю
        }
    }

</script>


<template>

    <div>

        <h2>Login form</h2>

        <form @submit.prevent="login">
            <div class="login-form">
                <div>
                    <label>
                        Login:
                        <input
                            name="login"
                            v-model="data.login"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            v-model="data.password"
                        />
                    </label>
                </div>
            </div>
            <p>
                <button type="submit" @click=" () => login() ">Login</button>
            </p>
        </form>

    </div>

</template>

