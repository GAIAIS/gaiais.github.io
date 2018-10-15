$(function () {
    FastClick.attach(document.body);
    var top = window.pageYOffset;


    function see(elem) {
        $(elem).css('display', 'block');
    }

    //display:none
    function hiding(elem) {
        $(elem).css('display', 'none');
    }

    //轮播图按钮显示和隐藏
    $('.carousel').mouseenter(function () {
        see(".carousel-control");
    })
    $('.carousel').mouseleave(function () {
        hiding(".carousel-control");
    })
    //图片轮播的时间
    $('.carousel').carousel({
        interval: 2000
    });

    var gaiaLinkL = $('.products #gaia-link-L');
    var gaiaLinkM = $('.products #gaia-link-M');
    var gaiaLinkR = $('.products #gaia-link-R');
    var moreL = $('.gaia-moreL');
    var moreM = $('.gaia-moreM');
    var moreR = $('.gaia-moreR');
    var proLinkL = $('.pro-linkL');
    var proLinkM = $('.pro-linkM');
    var proLinkR = $('.pro-linkR');
    var gaiaBtmL = $('.gaia-btmL');
    var gaiaBtmM = $('.gaia-btmM');
    var gaiaBtmR = $('.gaia-btmR');

    //01部分动画封装
    function link(elemA, elemB, elemC, elemD) {
        elemA.mouseenter(function () {
            elemA.stop(false, true).animate({
                "margin-top": "82px"
            })
            elemB.stop(false, true).animate({
                "height": "62px",
                "borderRadius": "62px",
                "marginBottom": '40px'
            })
            elemC.css('color', '#222');
            elemD.css('display', 'block');
        })
    }

    function leav(elemA, elemB, elemC, elemD) {
        elemA.mouseleave(function () {
            elemA.stop(false, true).animate({
                "margin-top": "108px"
            })
            elemB.stop(false, true).animate({
                "height": "2px",
                "marginBottom": "74px"
            })
            elemC.css('color', '#c5c5c5');
            elemD.css('display', 'none');
        })
    }

    link(gaiaLinkL, moreL, gaiaBtmL, proLinkL);
    leav(gaiaLinkL, moreL, gaiaBtmL, proLinkL);
    link(gaiaLinkM, moreM, gaiaBtmM, proLinkM);
    leav(gaiaLinkM, moreM, gaiaBtmM, proLinkM);
    link(gaiaLinkR, moreR, gaiaBtmR, proLinkR);
    leav(gaiaLinkR, moreR, gaiaBtmR, proLinkR);

    //05动画、
    var imgL = $('#gaia-news-L');
    var imgM = $('#gaia-news-M');
    var imgR = $('#gaia-news-R');

    var shade1 = $('.news .gaia-05-con .shade1');
    var shade2 = $('.news .gaia-05-con .shade2');
    var shade3 = $('.news .gaia-05-con .shade3');

    function mouseon(elem1, elem2) {
        elem1.mouseenter(function () {
            elem2.stop().animate({
                'height': '68px'
            })
        })
    };

    function mouleav(elem1, elem2) {
        elem1.mouseleave(function () {
            elem2.stop().animate({
                'height': '0'
            })
        })
    }

    if ($(window).width() > 768) {
        mouseon(imgL, shade1);
        mouseon(imgM, shade2);
        mouseon(imgR, shade3);
        mouleav(imgL, shade1);
        mouleav(imgM, shade2);
        mouleav(imgR, shade3);
    }
 
    //导航文字颜色
    function col() {
        $('.col1').css('color', '#fff');
        $('.col2').css('color', '#fff');
        $('.col3').css('color', '#fff');
        $('.col4').css('color', '#fff');
        $('.col5').css('color', '#fff');
        $('.col6').css('color', '#fff');
        $('.col7').css('color', '#fff');
    }

    //视频

    var video = document.querySelector('video');
    var total = $('.total');
    var current = $('.current');
    var play = $('.switch');
    var expand = $('.expand');
    var line = $('.line');
    var bar = $('.bar');

    var formatTime = function (time) {
        /*00:00:00*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.ceil(time % 60);
        return (h > 10 ? h : '0' + h) + ':' + (m > 10 ? m : '0' + m) + ':' + (s > 10 ? s : '0' + s);
    }
    video.oncanplay = function () {
        video.style.display = 'block';
        total.html(formatTime(video.duration));
    }
    /*2.播放*/
    /*3.暂停*/
    play.on('click', function () {
        if (video.paused) {
            video.play();
            $('.play').attr('src', 'images/stop.png')
            play.addClass('fa-pause');
        } else {
            video.pause();
            $('.play').attr('src', 'images/play.png')
            play.removeClass('fa-pause');
        }
        //play.toggleClass('fa-pause');
    });

    /*4.全屏*/
    expand.on('click', function () {
        video.webkitRequestFullScreen();
        if (video.paused) {
            video.pause();
            $('.play').attr('src', 'images/play.png');
            play.removeClass('fa-pause');
        } else {
            video.play();
            $('.play').attr('src', 'images/stop.png');
            play.addClass('fa-pause');
        }

    });

    /*5.跃进*/
    bar.on('click', function (e) {
        video.currentTime = e.offsetX / bar.width() * video.duration;
        var pre = e.offsetX / bar.width() * 100 + '%';
        line.width(pre);
        current.html(formatTime(video.currentTime));
    })
    /*6.播放的时候需要改变进度 和时间*/
    video.ontimeupdate = function () {
        current.html(formatTime(video.currentTime));
        var pre = video.currentTime / video.duration * 100 + '%';
        line.width(pre);
    }

    /*7.当视频播放完毕的时候*/
    video.onended = function () {
        play.removeClass('fa-pause');
        line.width(0);
        video.currentTime = 0;
    }

    //小视频切换
    $(".videoRight li").each(function (i, item) {
        $(this).click(function () {
            $("#vid").attr("src", "");
            $("#vid").attr("src", "video/"+$(this).attr("video"));
            $('.progress .loaded').css('width', '0');
            $('.progress .line').css('width', '0');
            video.play();
            $('.play').attr('src', 'images/stop.png');
            play.addClass('fa-pause');
        });
    });

    //视频白
    $('#vid').on('click', function () {
        if (video.paused) {
            video.play();
            $('.play').attr('src', 'images/stop.png');
            play.addClass('fa-pause');
        } else {
            video.pause();
            $('.play').attr('src', 'images/play.png');
            play.removeClass('fa-pause');
        }
    });
    $('.play').on('click', function () {
        if (video.paused) {
            video.play();
            $('.play').attr('src', 'images/stop.png');
            play.addClass('fa-pause');
        } else {
            video.pause();
            $('.play').attr('src', 'images/play.png');
            play.removeClass('fa-pause');
        }
    });

    window.onscroll = function () {
        if (top >= 0 && top < 490) {
            col();
            $('.col1').css('color', '#93d0ff');
        } else if (top >= 490 && top < 1300) {
            col();
            $('.col2').css('color', '#93d0ff');
        } else if (top >= 1300 && top < 2499) {
            col();
            $('.col3').css('color', '#93d0ff');
        } else if (top >= 2499 && top < 3201) {
            col();
            $('.col4').css('color', '#93d0ff');
        } else if (top >= 3190 && top < 3656) {
            col();
            $('.col5').css('color', '#93d0ff');
        } else if (top >= 3656 && top < 4161) {
            col();
            $('.col6').css('color', '#93d0ff');

        } else {
            col();
            $('.col7').css('color', '#93d0ff');
        }

        //固定定位导航
        top = window.pageYOffset;
        if (top >= 268) {
            $('#fixedNav').css('display', 'block');
        } else if (top < 270) {
            $('#fixedNav').css('display', 'none');
        }


        $('.videoOne').mouseenter(function () {
            $('.skip').show();
        })
        $('.videoOne').mouseleave(function () {
            $('.skip').hide();
        })

        if ($(window).width() < 768) {
            $('.skip').hide(); 
           
            $('.video .videoRight li p').css('display', 'none');
            $('nav.navbar.gaia_nav').css('display', 'none');
            $('#fixedNav').css({
                'display': 'block',
                'background-color': 'rgba(0,0,0,.5)'
            })
            //在手机端不显示播放和暂停按钮
            
            $(' .partners #gaia-partners-L').hover(function () {
                $(this).css({
                    'box-shadow': 'none',
                    '-webkit-transform': 'none',
                    '-moz-transform': 'none',
                    '-o-transform': 'none',
                    'transform': 'none',
                })
            });
            $(' .partners #gaia-partners-M').hover(function () {
                $(this).css({
                    'box-shadow': 'none',
                    '-webkit-transform': 'none',
                    '-moz-transform': 'none',
                    '-o-transform': 'none',
                    'transform': 'none',
                })
            });

        
            $(' .partners #gaia-partners-R').hover(function () {
                $(this).css({
                    'box-shadow': 'none',
                    '-webkit-transform': 'none',
                    '-moz-transform': 'none',
                    '-o-transform': 'none',
                    'transform': 'none',
                })
            });


        }

    }

});

















