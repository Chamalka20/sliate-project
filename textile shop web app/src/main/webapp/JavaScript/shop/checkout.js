(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
           
           
			
        });
        if ($('.product__filter').length > 0) {
          
            var mixer = mixitup(Bestproduct);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*-----------------------
        Hero Slider
    ------------------------*/
    $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*-------------------
	
    /*-------------------
		Scroll
	--------------------- */
    $(".nice-scroll").niceScroll({
        cursorcolor: "#0d0d0d",
        cursorwidth: "5px",
        background: "#e5e5e5",
        cursorborder: "",
        autohidemode: true,
        horizrailenabled: false
    });

    //*------------------   

})(jQuery)


//----------------------------------------------------------
var basket= [];
var localStrorage = JSON.parse(localStorage.getItem("cartData"));

//get localStorage data------------------------------------
if(localStrorage !== null){
	
	for(var i=0;i<localStrorage.length;i++){
	
	basket.push(localStrorage[i]);
					
	}
	
}

console.log(basket);

if(localStrorage !== null){
	
	var cartIcon = document.querySelector('.cart-amount');
	cartIcon.style.display = "block";
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y ,0);
	
	
}else{
	
	window.location='shopping-cart.jsp';
}
//------------------------------------------------------------


//get products data from database------------------------------------------
var proList = [];
var listHolder=document.querySelector('.checkout__total__products');

function getDatalist(){
	
		$.getJSON("../getPro", function(getData) {
			
			for(var i=0;i<getData.length;i++){
					proList.push(getData[i]);
					
			}
			displayoderList(proList);
			totalAomunt(proList);
			console.log(proList);	
		});

};		
getDatalist();




function displayoderList(data){
	var no =0;
	return(listHolder.innerHTML = basket.map((x)=>{
		
		var{id,item,size,limit} = x;
		var search = data.find((el)=> el.id === id )|| [];
		console.log(search);
		no += 1;
		var subtotalPrice = search.price * item;  
	
		return`<li>${no}. ${search.name} <span>Rs ${subtotalPrice.toLocaleString("en-US")}.00</span><p><i>Quantity &#xd7 ${item}</i></p></li>`
		
		
	}).join(" "))
	
}


function totalAomunt(data){
	
 	if(basket.length!== 0){
	
		total = basket.map((x)=>{
			
			var{id,item}=x;
			var search = data.find((el)=> el.id === id )|| [];
			
			return search.price*item
			
			
		}).reduce((x,y) => x+y ,0);
	
		//display total---------------------------
		document.querySelector('.checkout__total__all').innerHTML = `<li>Total <span>Rs ${total.toLocaleString("en-US")}.00</span></li>`;
	
	}else return
	
	
}

//select payment type-----------------------------------------------------------------------

var payType = document.querySelectorAll(".checkout__input__checkbox #payment");

payType.forEach(input=>{
	
	input.addEventListener("click",(e)=>{
	
		if(e.target.value === "Cash-on-delivery"){
			
			console.log("gttttedede");
			
		}else if(e.target.value === "Pay-Online"){
			
			console.log("mac");
		}
	
	})
	
	
})


// get user input data------------------------------------------------------


function getUserInfor(){
	
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var country = document.getElementById('country').value;
	var street = document.getElementById('street').value;
	var apartment = document.getElementById('apartment').value;
	var city = document.getElementById('city').value;
	var zip = document.getElementById('zip').value;
	var phone = document.getElementById('phone').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	
	
} 





