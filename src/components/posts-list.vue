<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {},
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let url = '/posts';
                this.$http.get(url).then(res => {
                    let data = res.body;
                    console.log(data);
                });
            }
        }
    }
</script>