var saleBasket = document.getElementById('saleItems');
var proList =[];


function getDatalist(){
	
	$.getJSON("../getPro", function(getData) {
			
		for(var i=0;i<getData.length;i++){
					proList.push(getData[i]);
					
		}
				
		loadData();
						
		});

};

getDatalist()


// sale items------------------------------------------------------------------
let loadData= () =>{
	
	return(saleBasket.innerHTML= proList.map((x)=>{
	
		if(x.saleActive=="true"){
		
		return`
			<div class="subContainer" id="items-${x.id}">
			 	
				<div class="id">${x.id}</div>
				<div class="name"><img class="proImage" src="../Images/${x.image}">${x.name}</div>
				<div class="desc">${x.desc}</div>
				<div class="price">Rs ${x.price}.00</div>
				<div class="stock">${x.stock}</div>
				<div class="action"><button  onClick="editProduct(${x.id})">Edit</button><i class="fas fa-trash" id="delete" onClick="deleteItem(${x.id})"></i></div>
			</div>
	
	
		
		`}else{
			
			return`<div>none</div>`
		}
	
	}).join(" "));
		
}



//add new item to sale--------------------------------------------------------------------------
var addNewHolder = document.getElementById('add-new');
var mainSubHolder = document.getElementById('mainHolder');
var hideHeader = document.getElementById('hideHeader');
var popUpHolder = document.getElementById('popup1');
var popUpSubHolder = document.getElementById('popUp-sub-container');
var checkbox = document.getElementById('flexCheckDefault');

var proDetails =[];
var resultProductData =[];

function filterByDate(){
	var selectBox = document.getElementById("selectMonth");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	
	
	//get today date-----------------------------------------
	var today = new Date();
	var mm = String(today.getMonth() + 1); 
	var yyyy = today.getFullYear();
	
	//identify this month,last month and Previous Month-------------------------
	var thisMonth = new Date(yyyy + '-' + mm + '-' + 01);
	var lastMonth = new Date(yyyy + '-' +( mm-1) + '-' + 01);
	var previousMonth = new Date(yyyy + '-' +( mm-2) + '-' + 01);
	
	//filter this month data----------------------------------------- 
	if(selectedValue ==="thisMonth"){
		 resultProductData = proList.filter(function (a) {
			 var hitDates =[];
            hitDates.push(a.add_date);
           
            // convert strings to Date objcts
            hitDates = hitDates.map(function(date) { return new Date(date); });
            // filter this dates by startDate and endDate
            var hitDateMatches = hitDates.filter(function(date) { return date >= thisMonth });
            	
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length>0;
        });
        
        console.log(resultProductData);
		
		showProductList()	
	}
	//filter last month data----------------------------------------- 
	if(selectedValue ==="lastMonth"){
		 resultProductData = proList.filter(function (a) {
			 var hitDates =[];
            hitDates.push(a.add_date);
           
            // convert strings to Date objcts
            hitDates = hitDates.map(function(date) { return new Date(date); });
            // filter this dates by startDate and endDate
            var hitDateMatches = hitDates.filter(function(date) { return date >= lastMonth && date <= thisMonth });
            	
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length>0;
        });
        
        console.log(resultProductData);
		
		showProductList()	
	}
	//filter previous month data----------------------------------------- 
	if(selectedValue ==="previousMonth"){
		 resultProductData = proList.filter(function (a) {
			 var hitDates =[];
            hitDates.push(a.add_date);
           
            // convert strings to Date objcts
            hitDates = hitDates.map(function(date) { return new Date(date); });
            // filter this dates by startDate and endDate
            var hitDateMatches = hitDates.filter(function(date) { return date >= previousMonth && date <= lastMonth });
            	
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length>0;
        });
        
        console.log(resultProductData);
		
		showProductList()	
	}			
		
	
}

function showProductList(){
	addNewHolder.style.display ="block";
	
	if(addNewHolder.style.display ==="block"){
		
		addNewHolder.style.display ="none";
		hideHeader.style.display ="block";
		
		return(mainSubHolder.innerHTML= resultProductData.map((x)=>{
			
		if(x.saleActive!="true"){
		
		return`
			<div class="subContainer" id="items-${x.id}">
			 	<div class="wrapper"><input class="form-check-input" type="checkbox" value=${x.id} id="flexCheckDefault"></div>
			 	<div class="wrapper"><img class="newProImage" src="../Images/${x.image}"></div>
			 	<div class="wrapper">Salles: ${x.salles}</div>
			 	<div class="wrapper">Add date: ${x.add_date}</div>
			 	<div class="wrapper"><a href="#" onclick="productInfor(${x.id})">More info</a></div>
			</div>
	
	
		
		`}else{
			
			return`<div>none</div>`
		}
	
	}).join(" "));
		
		
	}
	
}


//pop up the window and show product informaion-------------------------------------

function productInfor(id){
	proDetails=[];
	$.getJSON("../ProDetails",{id:id},function(getData){
				
			for(var i=0;i<getData.length;i++){
				proDetails.push(getData[i]);
					
			}
			popUpWindow(proDetails);
			console.log(proDetails);
		});
		
	

}

//popup the window---------------------------------------------------------
function popUpWindow(data){
	
	popUpHolder.style.visibility="visible";
	return( popUpSubHolder.innerHTML=`
		
		<div class="popUp-image-wrapper"><img class="popUp-image"src="../Images/${data[0].image}"></div>
		<div class="popUp-product-details">
			<div class="pop_warapper"><h6>Name: </h6><p>${data[0].name}</p></div>
			<div class="pop_warapper"><h6>price: </h6><p>Rs ${data[0].price}.00</p></div>
			<br><br>
			<h6>Stock</h6>
			<div class="Stock">
				<div class="pop_warapper"><h6>Small: </h6><p>${data[0].small}</p></div>
				<div class="pop_warapper"><h6>Medium: </h6><p>${data[0].medium}</p></div>
				<div class="pop_warapper"><h6>Large: </h6><p>${data[0].large}</p></div>
				<div class="pop_warapper"><h6>XL: </h6><p>${data[0].xl}</p></div>
				<div class="pop_warapper"><h6>Total Quantity: </h6><p>${data[0].quantity}</p></div>
			</div><br><br>
			<div class="pop_warapper"><h6>Salles: </h6><p>${data[0].salles}</p></div>
			<div class="pop_warapper"><h6>Add Date: </h6><p>${data[0].addDate}</p></div>
			<div class="pop_warapper"><button type="button" class="btn btn-success" onClick="addToSale(${data[0].id})">Add to sale</button></div>
			
		</div>
		
	
	`)	
	
	
}

function addToSale(id){
	
	
	
	
	
}

function closePop(){
	
	popUpHolder.style.visibility="hidden";
	
}





