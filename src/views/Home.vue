<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <form action="" @submit.prevent="login">
            <input type="text" name="Username" v-model="username" placeholder="Username"> <br><br>
            <input type="password" name="Username" v-model="password"> <br><br>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Api from '../services/api'

    export default {
        name: 'home',
        data() {
            return {username: '', password: ''}
        },
        components: {
            HelloWorld
        },
        methods: {
            async login() {
                await Api.authenticateUser(this.username, this.password)
                    .then((res) => this.$store.dispatch('SAVE_AUTH', res.data.data.token))
                    .catch((err) => window.console.log(err));

                this.$router.push('/about');
            }
        }
    }
</script>
