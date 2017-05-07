<template>
    <div id="app">
        <div>Welcome to learn VUE!!!</div>
        <router-link to='/home'>Go to Home</router-link>
        <router-link to='/list'>Go to List</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
};
</script>

<style>
#app {
    color: #2c3e50;
}
</style>
