<template>
    <div class="bg-white">
        <el-table :data="tableData" border>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="tags" label="标签"></el-table-column>
            <el-table-column prop="url" label="url"></el-table-column>
            <el-table-column prop="visited" label="访问量"></el-table-column>
            <el-table-column prop="created" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.row._id)">编辑</el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-sizes="[5, 10, 30, 50]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            class="paginatin">
        </el-pagination>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                tableData: [],
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                }
            };
        },
        props: {},
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let url = `/posts?page=${this.pagination.page}&size=${this.pagination.size}`;
                this.$http.get(url).then(res => {
                    let data = res.body.data;
                    data.forEach(item => {
                        item.created = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.pagination.total = res.body.total;
                    this.tableData = data;
                });
            },
            handleSizeChange(size) {
                this.pagination.size = size;
                this.getList();
            },
            handleCurrentChange(page) {
                this.pagination.page = page;
                this.getList();
            },
            handleEdit(id) {
                this.$router.push(`/space/admin/posts-edit/${id}`);
            },
            handleDelete(postId) {
                this.$confirm('确认删除此文件吗', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletePost(postId);
                }).catch(e => {
                    console.log('canceled delete');
                })
            },
            deletePost(postId) {
                let url = `/posts/item/${postId}`;
                this.$http.delete(url).then(res => {
                    let body = res.body;
                    if (body.err_code !== 0) {
                        this.$message({type: 'error', message: body.err_msg});
                        return;
                    }
                    this.$message({type: 'success', message: 'delete success'});
                })
            }
        }
    }
</script>

<style>
    .paginatin {
        margin-top: 15px;
        float: right;
    }

    .bg-white {
        background: #fff;
        padding: 15px;
        overflow: hidden;
        border-radius: 2px;
    }
</style>