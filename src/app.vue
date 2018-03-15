<template>
    <div>
        <header class="header">
            <el-menu :default-active="router" class="el-menu-demo" mode="horizontal" :router="true">
                <el-menu-item index="/space/admin/posts-list">文章管理</el-menu-item>
                <el-menu-item index="/space/admin/posts-create">新增文章</el-menu-item>
            </el-menu>
        </header>
        <section class="main-content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        computed: {
            router() {
                return this.$router.path
            }
        },
        methods: {}
    }
</script>

<style>
    /* reset */
    * {
        margin: 0;
        padding: 0;
    }

    .clearfix {
        content: '';
        clear: both;
    }
    ul, li {
        list-style: none;
    }
    .el-menu {
        background: #fff;
    }

    body {
        background: #edf0f5;
    }

    .header {
        padding: 0 25px;
        background: #fff;
        border-bottom: 1px solid #bdbdbd;
        box-shadow: 0 0 5px 0 #bdbdbd;
        position: fixed;
        top: 0;
        z-index: 2;
        left: 0;
        right: 0;
    }

    .main-content {
        position: absolute;
        top: 57px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 30px 25px;
    }

    .user-box {
        background: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 3px 3px rgba(219, 219, 219, .28);
        -moz-box-shadow: 0 0 3px 3px rgba(219, 219, 219, .28);
        box-shadow: 0 0 3px 3px rgba(219, 219, 219, .28);
    }

    .user-box-title {
        height: 50px;
        border-bottom: 1px solid #e7e7e7;
        line-height: 50px;
        font-size: 16px;
        padding: 0 25px;
        color: #000;
    }

    .user-box-content {
        padding: 15px 25px 25px;
    }
    .el-menu-item.is-active {
        border-bottom: 5px solid #20a0ff;
    }
</style>