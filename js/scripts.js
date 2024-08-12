function checkQCForm(){
	var error='';
	var ret=false;
	var fname = document.getElementById("your-fname").value;
	var phone = document.getElementById("your-phone").value;
	var email = document.getElementById("your-email").value;
	var code = document.getElementById("6_letters_code").value;
	document.getElementById("contact_form_errorloc").innerHTML = '';
	error +='<ul>';
	if(fname=='' || fname==null || fname=='* Full Name'){
		error +='<li>Please enter your full name</li>';
	}
	if(phone=='' || phone==null || phone=='* Phone Number'){
		error +='<li>Please enter your phone number</li>';
	}
	if(email=='' || email==null || email=='* Email Address'){
		error +='<li>Please enter your email address</li>';
	}else{
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
		{
			error +='<li>Please enter a valid email</li>';
		}
	}
	if(code=='' || code==null || code=='* Enter security code'){
		error +='<li>Please enter security code</li>';
	}
	
	error +='</ul>';
	
	if(error!='<ul></ul>'){
		document.getElementById("contact_form_errorloc").innerHTML = error;
	}else{
		checkCaptchaQC();
	}
	
}



function checkForm(){
	var error='';
	var ret=false;
	var fname = document.getElementById("your-fname").value;
	var lname = document.getElementById("your-lname").value;
	var phone = document.getElementById("your-phone").value;
	var email = document.getElementById("your-email").value;
	var code = document.getElementById("6_letters_code").value;
	document.getElementById("contact_form_errorloc").innerHTML = '';
	error +='<ul>';
	if(fname=='' || fname==null || fname=='* First Name'){
		error +='<li>Please enter your first name</li>';
	}
	if(lname=='' || lname==null || lname=='* Last Name'){
		error +='<li>Please enter your last name</li>';
	}
	if(phone=='' || phone==null || phone=='* Phone Number'){
		error +='<li>Please enter your phone number</li>';
	}
	if(email=='' || email==null || email=='* Email Address'){
		error +='<li>Please enter your email address</li>';
	}else{
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
		{
			error +='<li>Please enter a valid email</li>';
		}
	}
	if(code=='' || code==null || code=='* Enter security code'){
		error +='<li>Please enter security code</li>';
	}
	
	error +='</ul>';
	
	if(error!='<ul></ul>'){
		document.getElementById("contact_form_errorloc").innerHTML = error;
	}else{
		checkCaptcha();
	}
	
}



function refreshCaptcha()
{
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
}
function makeHttpRequestObj(){
    var ajaxRequest;
    try {ajaxRequest=new XMLHttpRequest();}catch(Error){try{ajaxRequest=new ActiveXObject('msxml.XMLHTTP');}catch(Error) {try{ajaxRequest=new ActiveXObject('Msxml2.XMLHTTP');}catch(Error){try{ajaxRequest=new ActiveXObject('Microsoft.XMLHTTP');}catch(Error){ajaxRequest=null;}}}}
    return ajaxRequest;
}
function checkCaptchaQC()
{
	document.getElementById("contact_form_errorloc").innerHTML = "<ul><li>Please wait...</li></ul>";
	var code = document.getElementById("6_letters_code").value;
	var ajaxRequest = makeHttpRequestObj();
	if(ajaxRequest != null){
		ajaxRequest.onreadystatechange = function(){
			if(ajaxRequest.readyState == 4){
					//alert(code+'=='+ajaxRequest.responseText);
					if(code==ajaxRequest.responseText){
						document.getElementById("is_bot").value=ajaxRequest.responseText;
						document.forms["contact"].submit();
					}else{
						document.getElementById("contact_form_errorloc").innerHTML = "<ul><li>Invalid security code</li></ul>";
					}
			}
		}
	}
	var qString="/check.php";
	ajaxRequest.open("GET", qString, true);
	ajaxRequest.send(qString);
}

function checkCaptcha()
{
	document.getElementById("contact_form_errorloc").innerHTML = "<ul><li>Please wait...</li></ul>";
	var code = document.getElementById("6_letters_code").value;
	var ajaxRequest = makeHttpRequestObj();
	if(ajaxRequest != null){
		ajaxRequest.onreadystatechange = function(){
			if(ajaxRequest.readyState == 4){
					//alert(code+'=='+ajaxRequest.responseText);
					if(code==ajaxRequest.responseText){
						document.getElementById("is_bot").value=ajaxRequest.responseText;
						document.forms["contact"].submit();
					}else{
						document.getElementById("contact_form_errorloc").innerHTML = "<ul><li>Invalid security code</li></ul>";
					}
			}
		}
	}
	var qString="/check.php";
	ajaxRequest.open("GET", qString, true);
	ajaxRequest.send(qString);
}


function clearText(thefield) {
  if (thefield.defaultValue==thefield.value) { thefield.value = "" }
} 
function replaceText(thefield) {
  if (thefield.value=="") { thefield.value = thefield.defaultValue }
}

function responsiveVideos() {
    var $allVideos = $(
            "iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"
        ),
        $fluidEl = $("figure");
    $allVideos.each(function() {
        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height').removeAttr('width');
    });
    $(window).resize(function() {
        var newWidth = $fluidEl.width();
        $allVideos.each(function() {
            var $el = $(this);
            $el.width(newWidth).height(newWidth * $el.attr(
                'data-aspectRatio'));
        });
    }).resize();
}