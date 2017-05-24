<template>
    <div class="flexbox" :class="className" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        gutter: {
            type: Number,
            default: 8
        },
        direction: {
            type: String,
            default: 'horizontal'
        },
        justify: String,
        align: String,
        wrap: String,
        class: String,
    },
    computed: () {
        styles() {
            const styles = {
                'justify-content': this.justify,
                '-webkit-justify-content': this.justify,
                'align-items': this.align,
                '-webkit-align-items': this.align,
                'flex-wrap': this.wrap,
                '-webkit-flex-wrap': this.wrap,
                'flex-direction': this.direction,
                '-webkit-flex-direction': this.direction,
            };

            return styles;
        },
        className() {
            return this.class
        }
    }
}
</script>

<style>
    .flexbox {
        width: 100%;
        text-align: left;
        display: flex;
        display: -webkit-flex;
        /*box-align: center;*/
        align-items: center;
    }

    .flexbox .flexbox-item {
        flex: 1;
        -webkit-flex: 1;
        min-width: 20px;
        width: 0%;
    }

    .flexbox flexbox-item:first-child {
        margin-left: 0 !important;
        margin-top: 0 !important;
    }
</style>

