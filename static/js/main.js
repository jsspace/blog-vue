/**
 * Created by minyi on 2018/5/4.
 */
(function () {
    var indexTask = {
        data: {
            page: 1,
            size: 10,
        },
        init: function () {
            this.getPosts(this.data.page, this.data.size);
            this.registerEvent();
        },
        registerEvent: function () {
            this.showMoreEvent();
            this.articleEvent();
        },
        getPosts: function (page, size, cb) {
            var url = '/posts?page=' + page + '&size=' + size;
            var that = this;
            $.get(url, function (res) {
                if (res.hasMore) {
                    that.showMore();
                } else {
                    that.hideMore();
                }
                if (cb) cb(res);
            })
        },
        showMore: function () {
            $('#more').show();
        },
        hideMore: function () {
            $('#more').hide();
        },
        showMoreEvent: function () {
            var that = this;
            $('#more').on('click', function () {
                that.getPosts(++that.data.page, that.data.size, that.fillPage.bind(that))
            })
        },
        fillPage: function (res) {
            var data = res.data || [];
            var str = '';
            data.forEach(post => {
                str +=
                    '<article class="post post-width-tags">' +
                    '                <header class="post-title">' +
                    '                    <a href="/post/' + post.url + '">' +  post.title + '</a>' +
                    '                </header>' +
                    '                <div class="post-meta">' +
                    '                    <span>' + post.createdAt + '</span>' +
                    '                </div>' +
                    '                <p class="post-abstract">' + post.abstract + '</p>' +
                    '                <footer class="post-tags">' +
                                        post.tags.map(function (tag) {
                                            return '<a href="/tags/' + tag + '" class="tag"> + tag + </a>'
                                        }).join(' ') +
                    '                </footer>' +
                    '            </article>'
            });
            $('#postMain').append(str);
        },
        articleEvent: function () {
            $('#postMain').on('click', 'article', function (event) {
                var url = $(this).find('header').find('a').attr('href');
                location.href = url;
            })
        }
    };
    indexTask.init();
})();
