<template>
    <div class="home">
        <div v-for="route in routes">
            <a href="javascript:void(0)"@click="goToRoute(route.path)">
                {{route.name}}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            routes: [
                {
                    name: 'honeycomb',
                    path: '/honeycomb'
                },
                {
                    name: 'fightgame',
                    path: '/fight'
                }
            ]
        }
    },
    methods: {
        goToRoute(route) {
            this.$router.push(route);
        }
    }
};
</script>
<style></style>