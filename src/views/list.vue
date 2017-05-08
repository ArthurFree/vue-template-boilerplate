<template>
    <div>
        <div>hello, this is list page</div>
        <ul>
            <li v-for='item in lists'>{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
// mapActions
import { mapGetters } from 'vuex';

export default {
    name: 'list',
    computed: mapGetters({
        lists: 'allInfoLists',
    }),
    // methods: mapActions([
    //     'getAllList'
    // ]),
    created() {
        this.$store.dispatch('getAllList');
    },
};
</script>
