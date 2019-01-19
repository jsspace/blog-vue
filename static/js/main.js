/**
 * Created by minyi on 2018/5/4.
 */
(function () {
    var $searchList = $('#searchList');
    var $loading = $('#loading');
    var $miniProgram = $('#miniProgram');
    var hasMore = true;
    var page = 1;

    var indexTask = {
        data: {
            page: 1,
            size: 10,
        },
        init: function () {
            this.search();
            this.scrollEvent();
        },
        getPosts: function (page, size, cb) {
            var url = '/posts?page=' + page + '&size=' + size;
            var that = this;
            $.get(url, function (res) {
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
                    '<li class="article-item">\n' +
                    '                                    <a class="space-article-item" href="/post/' + post.url +'">\n' +
                    '                                        <div class="space-article-content">\n' +
                    '                                            <div class="middle"><p class="middle-title">'+ post.title + '</p> <!---->\n' +
                    '                                            </div>\n' +
                    '                                            <div class="article-excerpt">\n' +
                                                                   post.abstract  +
                    '                                            </div>\n' +
                    '                                            <div class="bottom">\n' +
                    '                                                <img src="//static-cdn.ticwear.com/barley/cdc29ae0-f528-11e8-b296-09995b3ba834" alt=""\n' +
                    '                                                     class="handle-icon">\n' +
                    '                                                <span class="value">'+ post.createdAt + '</span>\n' +
                    '                                                <div class="line ivu-divider ivu-divider-vertical"><!----></div>\n' +
                    '                                                <img src="//static-cdn.ticwear.com/barley/f7d3f400-f528-11e8-a602-69b71e51fd58"\n' +
                    '                                                     class="handle-icon"> <span class="value">\n' +
                                                                        post.tags.join() +
                    '                                                </span>\n' +
                    '                                                <div class="line ivu-divider ivu-divider-vertical"><!----></div>\n' +
                    '                                                <img src="//static-cdn.ticwear.com/barley/0953a0e0-f529-11e8-b296-09995b3ba834"\n' +
                    '                                                     alt="" class="handle-icon"> <span class="value">'+ post.visited +'</span></div>\n' +
                    '                                            <div><!----> <!----></div>\n' +
                    '                                        </div> <!----></a>\n' +
                    '                                </li>'
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
        },
        scrollEvent: function () {
            var that = this;
            $(window).scroll(function () {
                var topHeight = $(window).height() + $(document).scrollTop();
                var noLoading = $('#loading').is(':hidden');
                fixBar();
                if (tag !== 'index') return;
                if (topHeight >= $(document).height() && noLoading) {
                    if (hasMore) {
                        $loading.show();
                        page = page + 1;
                        that.getPosts(page, 10, function (data) {
                            if (!data.hasMore) {
                                hasMore = false;
                            } else {
                                that.fillPage(data);
                            }
                            that.hideLoading();
                        });
                    } else {
                        that.hideLoading();
                    }
                }
            });
        },
        hideLoading: function () {
            $loading.hide();
        }
    };
    indexTask.init();
    fixBar();
    function fixBar () {
        if ($(document).scrollTop() > 331) {
            $miniProgram.addClass('fix-bar');
        }

        if ($(document).scrollTop() < 338) {
            $miniProgram.removeClass('fix-bar');
        }
    }

})();
