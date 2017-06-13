// BEGIN -- for animateCss() from Animate.css
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
// END -- for animateCss() from Animate.css

var searchModule = new Vue({
    el: '#searchModule',
    data: {
        searchBar: '',
        articles: [],
        loading: false,
        message: null,
        sroffset: 0,
        hasMoreArticles: true,
        showSearchButtons: true,
        showMiniSearchButtons: false
    },
    created: function() {
        window.addEventListener('scroll', this.loadMoreAtWindowBottom);
    },
    updated: function() {
        this.hoverArticle();
    },
    methods: {

        search: function(event) {
            var vm = this;

            $('#articles').show();
            $('#message').show();

            // reset search data
            vm.loading = false;
            vm.message = null;
            vm.articles = [];
            vm.sroffset = 0;
            vm.hasMoreArticles = true;

            if (vm.isEmptySearchBar()) {
                // empty input, do nothing
                return;
            }

            if (!vm.showSearchButtons) {
                vm.getArticles();
            }

            // we hide buttons and only after we search (@after-leave)
            vm.showSearchButtons = false;
        },

        openArticle: function(article) {
            window.open(this.getArticleUrl(article.title), '_blank');
        },

        hasMessage: function() {
            return this.message;
        },

        isEmptySearchBar: function() {
            return this.searchBar.length == 0;
        },

        getArticleUrl: function(articleTitle) {
            return 'https://en.wikipedia.org/wiki/' + articleTitle;
        },

        hoverArticle: function() {
            // bind hover animation on each element
            $('#articles').find('.article-container')
                .off() // unbind all events
                .mouseenter(function() {
                    $(this)
                        .velocity('stop') // reset animation
                        .velocity({scale: '+=2%', boxShadowY: '8px'}, 150);
                })
                .mouseleave(function() {
                    $(this)
                        .velocity('stop') // reset animation
                        .velocity({scale: '1', boxShadowY: null}, 150);
                });
        },

        fillResults: function(results) {
            var vm = this;

            // fill the array of found articles
            results.query.search.forEach(function(item) {
                var article = {
                    title: item.title,
                    description: item.snippet + ' ...',
                    url: vm.getArticleUrl(item.title)
                };
                vm.articles.push(article);
            });

            var sroffset = this.sroffset;
            var hasMoreArticles = this.hasMoreArticles;
            if (results.hasOwnProperty('continue')) {
                sroffset = results.continue.sroffset;
                hasMoreArticles = true;
            } else {
                sroffset = null;
                hasMoreArticles = false;
            }

            this.message = this.articles.length == 0 ? 'Sorry... No results.<br>Please try again.' : null;
        },

        getArticles: function(sroffset) {
            var vm = this;

            if (!vm.hasMoreArticles) {
                // API returned it was the last results, do not search further
                return;
            }

            $('.search-buttons').hide();

            sroffset = sroffset || 0;
            vm.loading = true;

            $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                data: {
                    format: 'json',
                    list: 'search',
                    srlimit: 20,
                    action: 'query',
                    origin: '*', // trick to fix 'XMLHttpRequest cannot load' error
                    srsearch: vm.searchBar,
                    sroffset: sroffset
                },
                dataType: 'json',
                type: 'POST',
                success: function(data) {
                    vm.fillResults(data);
                },
                error: function(data) {
                    vm.message = 'Oops... An error occurred.<br>Please try again.';
                },
                complete: function(data) {
                    vm.loading = false;
                }
            });
        },

        loadMore: function() {
            if (!this.isEmptySearchBar()) {
                this.getArticles(this.sroffset);
            }
        },

        loadMoreAtWindowBottom: function() {
            // if a search is not already processing and the user has almost reached the bottom of the page
            if (!this.loading && $(window).scrollTop() >= ($(document).height() - $(window).height() - 300)) {
                this.loadMore();
            }
        },

        showMiniSearch: function(el, done) {
            // keep the search bar responsive
            $('.search-bar').css('width', '100%');
            // trick to keep the right size for search bar
            $('.search-bar-container').addClass('input-group');
            // show search mini-buttons
            $(el).animateCss('slideInLeft');

            done();
        },

        hideSearch: function(el) {
            var vm = this;

            $(el).animateCss('fadeOutUp');

            vm.showSearchButtons = false;

            // resize search bar
            $('.search-bar')
                .velocity(
                    {width: '-=70px'},
                    {
                        duration: 500,
                        // at the end of the velocity animation, show the mini search buttons
                        complete: function(e) {
                            vm.showMiniSearchButtons = true;
                        }
                    });
        }

    }
});
