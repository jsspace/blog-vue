<template>
    <div>
        <div class="left-bar">
            <el-form :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.abstract"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select
                            v-model="form.tags"
                            multiple
                            filterable
                            allow-create
                            placeholder="请选择文章标签">
                        <el-option
                                v-for="item in options5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">发布</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <div class="right-bar">
            <div class="markdown-wrapper">
                <el-input type="textarea" class="md-input" v-model="markdown"></el-input>
            </div>
            <div class="html-wrapper" v-html="htmlContent"></div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });
    export default {
        data() {
            return {
                form: {
                    title: '',
                    url: '',
                    abstract: '',
                    tags: ''
                },
                markdown: '',
                postId: this.$route.params.id,
                options5: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
            };
        },
        computed: {
            htmlContent() {
                return marked(this.markdown);
            },
            isEdit() {
                return !!this.postId;
            }
        },
        created() {
            if (this.isEdit) {
                this.getItem();
            }
        },
        methods: {
            handleSubmit() {
                if (this.isEdit) {
                    this.update();
                } else {
                    this.create();
                }
            },
            create() {
                let data = {
                    title: this.form.title,
                    url: this.form.url,
                    abstract: this.form.abstract,
                    tags: this.form.tags,
                    content: this.markdown
                };
                this.$http.post('/posts', data).then(res => {
                    if (res.body.err_code === 0) {
                        this.$message({type: 'success', message: 'push success'});
                        this.$router.push('/space/admin/posts-list');
                    } else {
                        this.$message({type: 'error', message: res.body.err_msg});
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            update() {
                let data = {
                    title: this.form.title,
                    url: this.form.url,
                    abstract: this.form.abstract,
                    tags: this.form.tags,
                    content: this.markdown,
                    id: this.postId
                };
                this.$http.put('/posts/modify', data).then(res => {
                    if (res.body.err_code === 0) {
                        this.$message({type: 'success', message: 'push success'});
                        this.$router.push('/space/admin/posts-list');
                    } else {
                        this.$message({type: 'error', message: res.body.err_msg});
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            getItem() {
                let url = `/posts/item?id=${this.postId}`;
                this.$http.get(url).then(res => {
                    let body = res.body;
                    if (body.err_code !== 0) {
                        this.$message({type: 'error', message: 'no this file'});
                        this.$router.push('/space/admin/posts-list');
                        return;
                    }
                    let data = body.data;
                    this.form = {
                        title: data.title,
                        url: data.url,
                        abstract: data.abstract,
                        tags: data.tags
                    };
                    this.markdown = data.content;
                })
            }
        }
    }
</script>

<style>
    .el-select {
        width: 100%;
    }
    .left-bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 400px;
        padding: 30px 30px 30px 0;
    }

    .right-bar {
        position: absolute;
        top: 30px;
        left: 430px;
        right: 30px;
        bottom: 30px;
        border: 1px solid #bfcbd9;
        background: #eee;
    }

    .markdown-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 50%;

        background: #fff;
    }

    .md-input textarea {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 15px;
        resize: none;
        border: none;
        box-shadow: 1px 0 0 0 #bfcbd9;
        z-index: 2;
        border-radius: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .html-wrapper {
        position: absolute;
        left: 50%;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 15px;
        overflow: auto;
        font-size: 14px;
        line-height: 1.7;
        color: #333;
        background: #fff;
    }

    p {
        margin: 0 0 10px;
    }

    pre {
        display: block;
        padding: 9.5px;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 1.42857143;
        color: #333;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    pre code {
        padding: 0;
        font-size: inherit;
        color: inherit;
        white-space: pre-wrap;
        background-color: transparent;
        border-radius: 0;
    }

    code {
        padding: 2px 4px;
        font-size: 90%;
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 4px;
    }
</style>
