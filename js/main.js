$(document).ready(function() {
    
    // sliders
    var sudoSlider = $(".slider-main").sudoSlider({ 
      effect: "boxRandom",
      continuous: true,
      prevNext:false,
      numeric: true,
      speed: 800,
      pause: 4000,
      auto:true,
      startSlide: "random"
  });
  
  $('.carousel-info').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        adaptiveHeight: true,
        responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    });

  // popup
  var items = $('.btn-popup');
  for(var i=0;i<items.length;i++){
      $(items[i]).click(function () {
      var id = $(this).attr('href');
          $(id).toggleClass("active");
          return false;
      });
  }
    $(".popup-mask, .popup-close").click(function(event) {
          $('.popup.active').removeClass("active");
    });


  // scroll
  var $menu = $(".header");
  var $rows = $('.blocks-row');
  $rows.on('load',function(){
    $rows.each(function(_index,_dom){
      //$(_dom).data('left',parseFloat($(_dom).css('left').replace(/px/,'')));
      var _width = 0;
      $(_dom).find('>*').each(function(__index,__dom){
        _width =_width + $(__dom).outerWidth();
      });
      $(_dom).width(_width);
    }); 
  });
  
  var scrollRange = [1000,2000];
  var lastScrollTop = 0;
  var terminated = false;
    $(window).scroll(function(){
    
        if ( $(this).scrollTop() > 45 && $menu.hasClass("header-def") ){
            $menu.fadeOut(350,function(){
                $(this).removeClass("header-def")
                   .addClass("header-fix")
                   .fadeIn(350);
            });
        } else if($(this).scrollTop() <= 45 && $menu.hasClass("header-fix")) {
            $menu.fadeOut(350,function(){
                $(this).removeClass("header-fix")
                   .addClass("header-def")
                   .fadeIn(350);
            });
        }
        
    
    lastScrollTop = $(this).scrollTop();
    });

    // drag
    $( ".blocks-row" ).draggable({ 
      axis: "x"
    });

    // animates
    /*  wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       false,       // default
        live:         false        // default
      }
      )
      wow.init();*/



    
    

});


intervals = function(value,intervals){
    var result = [],
        current = 0;
    ;
    for(var i=0;i<intervals.length;i++){
        var loc = intervals[i],
            length = loc.length,
            offset = loc.offset||0,
            offsetReal = current+ offset;
            console.log(length,offsetReal,value);
            var
            res = value<offsetReal?0:value<=length+offsetReal?(value-offsetReal)/length:1
        ;
        current+=length;
        result.push(res);
    }
    return result;
}

$(window).load(function(){
  var
        $slide1 = $('.slide-style'),
        $slide2 = $('.blocks-row-wrap'),
        $slide3 = $('.border-block2'),
        duration = $slide1.data('duration'),


        $screen1 = $('.site-screen_set3'),
        $screen2 = $('.site-screen_set2,.site-screen_set1'),
        $screen3 = $('.site-screen_set4,.site-screen_set5'),
        $title1 = $('.title-block-1'),
        $title2 = $('.title-block-2'),
        $title3 = $('.title-block-3')

    ;

  $slide1.parent().height($slide1.height()+duration);
  
  
  var controller = new ScrollMagic.Controller();

// create a scene

  var offset = $slide1.offset().top-50;
	console.log(offset);
  var scene = new ScrollMagic.Scene({
      duration: duration,    // the scene should last for a scroll distance of 100px
      offset: offset        // start this scene after scrolling for 50px
    })
    .addTo(controller)
    ; // a
    
    scene.on('enter',function(e){
      
      $slide1.removeClass('sa-bottom').addClass('sa-fixed');  
      if(e.scrollDirection=='FORWARD'){
        
      }
      console.log('enter',e);
      
    });
    
    scene.on('leave',function(e){
      if(e.scrollDirection=='FORWARD'){
        $slide1.removeClass('sa-fixed').addClass('sa-bottom');  
      }else{
        $slide1.removeClass('sa-fixed');  
      }
      console.log('enter',e);
      
    });
    
    scene.on("progress", function (event) {
        var p = event.progress;
        var percent = 100*event.progress;

        var rate1 = p<0.7?p/0.7:1;
        var percent1 = rate1*100;
        var rate2 = p<0.3?0:(p-0.3)/0.7;
            var percent2 = rate2*100;

            var titlesIntervals = intervals(p,[{length:0.15},{length:0.15},{length:0.15}]);
            $title1.css('opacity',titlesIntervals[0]);
            $title2.css('opacity',titlesIntervals[1]);
            $title3.css('opacity',titlesIntervals[2]);

            $screen2.css({
                opacity: rate1,
                transform:'translateX(-'+(100-percent1)+'%)'
            });

            $screen3.css({
                opacity: rate1,
                transform:'translateX('+(100-percent1)+'%)'
            });

            $screen1.css({
                opacity: rate2,
                transform:'translateY('+(100-percent2)+'%)'
            });
    });


    var scene1 = new ScrollMagic.Scene({
            duration: window.innerHeight*0.75,    // the scene should last for a scroll distance of 100px
            offset: $slide2.offset().top-window.innerHeight*0.75        // start this scene after scrolling for 50px
        })
            .addTo(controller)
    ; // a

    scene1.on("progress", function (event) {
        $slide2.find('>*').each(function(_index,_dom){
            var
                pos = event.progress,
                $dom = $(_dom),
                speed = $dom.data('speed')+1,
                position = speed*pos,
                rate = event.progress*speed
            ;

            if(rate>1){
                rate = 1;
            }



            var percent = 100 - (rate *100);
            if(_index==1){
                var translate = '-'+percent;
            }else{
                var translate = percent;
            }
            $(_dom).css('transform','translateX('+translate+'%)').css('opacity',rate);
        });
    });

    var scene2 = new ScrollMagic.Scene({
            duration: 700,    // the scene should last for a scroll distance of 100px
            offset: $slide3.offset().top-window.innerHeight*0.15        // start this scene after scrolling for 50px
        })
            .addTo(controller)
    ; // a

    $slide3.find('.wow').each(function(_index,_dom){
       var $dom = $(_dom);

       $dom.css({
           visibility: 'hidden',
           'animation-duration':$dom.data('wowDuration'),
           'animation-delay':$dom.data('wowDelay'),
           'animation-name':'none',

       }).addClass('animated');
    });

    var animationList = ['zoomIn','fadeIn']
    scene2.on('enter',function(e){

        $slide3.find('.wow').each(function(_index,_dom){
            var $dom = $(_dom);
            var animationName = '';
            for(var j=0;j<animationList.length;j++){
                if($dom.hasClass(animationList[j])){
                    animationName = animationList[j];
                    break;
                }
            }


            $dom.css({
                visibility: 'visible',
                'animation-name':animationName
            })
        });

    });


    var scene3 = new ScrollMagic.Scene({
            duration: window.innerHeight - $('.scheme').innerHeight()-100,    // the scene should last for a scroll distance of 100px
            offset: $('.scheme').offset().top+$('.scheme').innerHeight()-(window.innerHeight-50)  // start this scene after scrolling for 50px
        })
            .addTo(controller)
    ; // a
        scene3.on('progress',function(e){
            if(window.innerWidth<1300){
                var p = e.progress;
                //var interval = intervals(p,[{length:0.6},{length:0.4}]);
                var shift = p*($('.scheme').innerWidth()-window.innerWidth);
                $('.scheme-inner').css('transform','translateX(-'+shift+'px)');
                //$('.scheme-inner').css('left','calc('+(interval[1]*35)+' * (100%  - 100vw) * 1px)');
            }


        });
	
	$('.services-banners__slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
		adaptiveHeight: true
	});
})