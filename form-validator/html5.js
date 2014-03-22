(function($,window){"use strict";var SUPPORTS_PLACEHOLDER="placeholder"in document.createElement("input");$(window).bind("validatorsLoaded formValidationSetup",function(evt,$form){if(!$form){$form=$("form")}$form.each(function(){var $f=$(this),$formInputs=$f.find("input,textarea,select"),foundHtml5Rule=false;$formInputs.each(function(){var validation=[],$input=$(this),isRequired=$input.attr("required"),attrs={};switch(($input.attr("type")||"").toLowerCase()){case"url":validation.push("url");break;case"email":validation.push("email");break;case"number":validation.push("number");var max=$input.attr("max"),min=$input.attr("min");if(min||max){if(!min)min=0;if(!max)max=9007199254740992;attrs["data-validation-allowing"]="range["+min+";"+max+"]";if(min.indexOf("-")===0||max.indexOf("-")===0){attrs["data-validation-allowing"]+=",negative"}if(min.indexOf(".")>-1||max.indexOf(".")>-1){attrs["data-validation-allowing"]+=",float"}}break}if($input.attr("pattern")){validation.push("custom");attrs["data-validation-regexp"]=$input.attr("pattern")}if($input.attr("maxlength")){validation.push("length");attrs["data-validation-length"]="max"+$input.attr("maxlength")}if(validation.length){if(!isRequired){attrs["data-validation-optional"]="true"}foundHtml5Rule=true;$input.attr("data-validation",validation.join(" "));$.each(attrs,function(attrName,attrVal){$input.attr(attrName,attrVal)})}});if(foundHtml5Rule){$f.trigger("html5ValidationAttrsFound")}if(!SUPPORTS_PLACEHOLDER){$formInputs.filter("input[placeholder]").each(function(){this.defaultValue=this.getAttribute("placeholder");$(this).bind("focus",function(){if(this.value==this.defaultValue){this.value="";$(this).removeClass("showing-placeholder")}}).bind("blur",function(){if($.trim(this.value)==""){this.value=this.defaultValue;$(this).addClass("showing-placeholder")}})})}})})})(jQuery,window);