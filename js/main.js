$(document).ready(function(){

   $('.bolshe').click(function(e){
   	e.preventDefault();
   	$(this).parent().children('.hidden-projects').fadeIn();
   	$(this).fadeOut();
   	$(this).parent().parent().height($(this).parent().height());
   });

   $('.proekt_left a').click(function(e){
   	e.preventDefault();
   	$('.hidden-projects').hide();
   	$('.bolshe').show();
   	$('.proekt_right').removeAttr('style');
   	$('.proekt_left a').removeClass('active');
   	$(this).addClass('active');
   	$('.project-frame').removeClass('active');
   	$('.project-frame[data-category="'+$(this).data('category')+'"]').addClass('active');
   });

   slider1 = $('#slid1').bxSlider({pager:false,controls:false, auto:false, speed: 400,slideWidth:221,maxSlides:4,minSlides:4,slideMargin:30,moveSlides:1});
   $('#slid1l').click(function(e){e.preventDefault();slider1.goToPrevSlide();});
	$('#slid1r').click(function(e){e.preventDefault();slider1.goToNextSlide();});

	$('.fancy').fancybox({helpers:{overlay:{locked:false},title:null}});

	$('.zz-btn').click(function(e){
		e.preventDefault();
		$('#zz_pop').arcticmodal();		
	});

	function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }
    $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

  	$('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
  	$('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

    $('form').submit(function(e){
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if(!$(this).find('input[type="text"]').hasClass('error-input')){
            var type=$(this).attr('method');
            var url=$(this).attr('action');
            var data=$(this).serialize();
            $.ajax({type: type, url: url, data: data,
            success : function(){
                $.arcticmodal('close');$('#okgo').arcticmodal();
            }
        }); 
        }
    });

});