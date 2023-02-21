(function ($) {
    "use strict";



    var line = "";
    var overlay = "";
    var i = 1;
    var c = 1;

    while (i < 4) {
        line += '<span class="line line-' + i + '"></span>';
        i++;
    }

    $('.lines').prepend(line);

    while (c < 5) {
        overlay += '<span class="overlay overlay-' + c + '"></span>';
        c++;
    }

    $('.overlays').prepend(overlay);

    if ($('.fullscreen-footer').length < 1) {

        $('.site-footer').prepend('<span class="footer-ov"></span><span class="footer-ov"></span><span class="footer-ov"></span><span class="footer-ov"></span>')

    }

    if ($('.projects-nav').length > 0) {

        $('.projects-nav').prepend('<span class="np-ov"></span><span class="np-ov"></span><span class="np-ov"></span><span class="np-ov"></span>')
    }


    var body = $('body');
    var pageSettings = $('.page-settings');

    var dataLayout = pageSettings.data('layout');

    if (dataLayout != null) {
        var siteLayout = 'layout-' + dataLayout;

        body.addClass(siteLayout)
    }

    var dataHeaderStyle = pageSettings.data('header-style');

    if (dataHeaderStyle != null) {
        var headerStyle = 'header-style-' + dataLayout;

        $('.site-header').addClass(dataHeaderStyle)
    }

    var dataMenuStyle = pageSettings.data('menu-style');

    if (dataMenuStyle != null) {
        var menuStyle = 'menu-style-' + dataMenuStyle;

        $('.site-navigation').addClass(dataMenuStyle)

    }

    var dataMenuLayout = pageSettings.data('menu-layout');

    if (dataMenuLayout != null) {
        var menuLayout = dataMenuLayout;

        $('.site-navigation').addClass(dataMenuLayout)

    }

    var dataBackground = pageSettings.data('background');

    if (dataBackground != null) {
        var bodyBg = dataBackground

        body.css('background', dataBackground);
        $('.np-ov').css('background', dataBackground);

    }


    if ($('.single-project').length > 0) {

        $('.site-footer').addClass('project-footer');

    }

    ///////////////////////////////////////////// Page Layout  /////////////////////////////////////////////

    ///////////////////////////////////////////// Site Navigation  /////////////////////////////////////////////

    $('.menu > li > a').each(function () {
        var dataHover = $(this).text();

        var attrHref = $(this).attr('href');

        if (attrHref === '#') {

            $(this).addClass('no-trans')
        }

        if ($('.site-navigation').hasClass('classic')) {

            $(this).wrapInner('<span data-hover="' + dataHover + '"></span>')

        } else {
            $(this).attr('data-hover', dataHover);
        }

    });

    $('.menu > li').on('mouseenter', function () {

        $('.menu > li').removeClass('menu-item-hover')
        $(this).addClass('menu-item-hover');

    });

    $('.menu > li').on('mouseleave', function () {

        $('.menu > li').removeClass('menu-item-hover')
        $('.menu > li.menu-item-active').addClass('menu-item-hover');

    });

    var scA = $('.scrolling-button a').marquee({
        duplicated: true,
        delayBeforeStart: 0,
    });

    scA.marquee('pause');

   

    if ($(window).outerWidth() < 850) {
        $('.site-navigation').removeClass('classic')
    }


    $('.site-navigation .menu > li.menu-item.has-children').each(function () {

        $(this).prepend('<i class="sub-toggle  icon-plus"><i>');

    })

    $('.sub-toggle').on('click', function () {

        $(this).toggleClass('st-active')

        var parentLi = $(this).parent('li');
        var openSub = parentLi.children('.sub-menu');

        openSub.toggleClass('sub-menu-in')


    });





    

    $(window).on('load', function () {



        var loadingAn = anime({
            targets: '.line',
            height: '100%',
            duration: 10,
            delay: 0,
            easing: 'easeInOutCubic',
            begin: function (anim) {
                $('.cygni-loader').addClass('in');
            },
            complete: function (anim) {

                $('.cygni-loader').addClass('out');

                setTimeout(function () {

                    $('#main').addClass('loaded');

                }, 100);

                setTimeout(function () {

                    var peScroll = new LocomotiveScroll({
                        el: document.querySelector('#main'),
                        smooth: false,

                    });

                    window.peScroll = peScroll;

                }, 10);

                if ($('.portfolio-showcase').length < 1) {
                    setTimeout(function () {

                        if ($('.site-navigation').hasClass('classic')) {
                            $('.site-navigation.classic .menu > li > a > span').each(function (i, element) {
                                $(element).delay(i * 75).queue(function (next) {
                                    $(this).addClass('span-in');
                                    next();
                                });
                            });

                        } else {
                            $('.toggle-line').addClass('toggle-line-in');
                        }


                    }, 10)

                    setTimeout(function () {

                        $('.site-branding img ').addClass('logo-in');
                    }, 10)

                }


                setTimeout(function () {

                    $('.menu-item-active').addClass('menu-item-hover');

                }, 10);



            }
        })

        if ($('.list-v2').length > 0) {

            var project = $('.listv2-project');

            Scrollbar.init(document.querySelector('.listv2-wrapper'));

            project.each(function (i) {
                i++

                let $this = $(this),
                    listv2Img = $this.find('.project-image');

                listv2Img.addClass('image_' + i)



                $('.lv2-images').append(listv2Img);


                if (i < 10) {

                    $this.attr('data-index', '0' + i);

                } else if (i > 9) {
                    $this.attr('data-index', i);
                }

                $this.attr('data-image', '.image_' + i)



            })


            $('.listv2-project a').on('mouseenter', function (i) {



                let $this = $(this),
                    image = $this.parent('.listv2-project').attr('data-image'),
                    allImages = $('.project-image'),
                    allProjects = $('.listv2-project');

                allImages.removeClass('active');
                $(image).addClass('active');

                $('.listv2-wrapper').addClass('hovered')

                allProjects.removeClass('hover')
                $this.parent(allProjects).addClass('hover');




            })

            $('.listv2-project a').on('mouseleave', function () {

                let $this = $(this),
                    image = $this.children('.project-image'),
                    allImages = $('.project-image'),
                    allProjects = $('.listv2-project')

                $('.listv2-wrapper').removeClass('hovered');
                allProjects.removeClass('hover');
                allImages.removeClass('active');

            })
            


            loadingAn.finished.then(function () {


                setTimeout(function () {

                    var lvaCome = anime({
                        autoplay: true,
                        loop: false,
                        translateY: [120, 0],
                        opacity: [0, 1],
                        easing: "easeOutCubic",
                        duration: 800,
                        targets: '.listv2-project a',
                        delay: anime.stagger(100),
                        complete: function (anim) {
                            $('.listv2-wrapper').addClass('loaded');
                        }
                    });


                }, 500);

                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1200);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');


                }, 1700);

                setTimeout(function () {

                    $('.fullscreen-footer a').each(function (i, element) {
                        $(element).delay(i * 75).queue(function (next) {
                            $(this).addClass('span-in');
                            next();
                        });
                    });


                }, 1250);


            });
        }
    });




})(jQuery);
