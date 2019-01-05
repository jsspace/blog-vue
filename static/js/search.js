/**
 * Created by minyi on 2018/5/4.
 */
(function () {
    var $searchList = $('#searchList');

    var indexTask = {
        data: {
            page: 1,
            size: 10,
        },
        init: function () {
            this.registerEvent();
        },
        registerEvent: function () {
            this.search();
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
                        return '<a href="/tags/' + tag + '" class="tag">' + tag + '</a>'
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
        },
        search: function () {
            var that = this;
            var $searchInput = $('#searchInput');
            $searchInput.on('input', function () {
                var key = $.trim($searchInput.val());
                that.getAllPosts(key);
            });
        },
        getAllPosts: function getAllPosts(key) {
            var that = this;
            if (getAllPosts.cache) {
                this.filterData(getAllPosts.cache, key, 'posts');
                return;
            }
            $.ajax({
                url: '/search',
                method: 'post',
                data: JSON.stringify({title: key}),
                contentType: 'application/json'
            }).done(function (res) {
                if (res.err_code !== 0) return;
                that.createList(res.data);
            }).fail(function (err) {
                console.log(err);
            })
        },
        createList: function createList(data) {
            var htmlStr = '';
            data.forEach(function (item) {
                htmlStr += '<li><a href="/post/' + item.url + '">' + item.title + '</a></li>';
            });
            if (htmlStr) {
                $searchList.html(htmlStr).show();
            } else {
                $searchList.hide();
            }

        }
    };
    indexTask.init();
})();
