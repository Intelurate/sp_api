$.intelurate.core.api.userGroup.getUserCollectionFromSite = (function (options) {

	//Set the default values
	var defaults = {
		webSite: null,  //SPWeb Url ex. http://sharepoint.com/sites/currentWeb/
		complete: function(json){}
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
						
	var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
				  <soap:Body>\
					<GetUserCollectionFromSite xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />\
				  </soap:Body>\
				</soap:Envelope>';
	
	$.ajax({
		url: o.webSite + "_vti_bin/UserGroup.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetUserCollectionFromSite");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
			
			
			var usersObj  = { "Users": [] };
			
			$(data.responseXML).find("User").each(function (index, val) {
				
				/*
					ID="8649" 
					Sid="S-1-5-21-1076320343-3137401123-2908695819-98465" 
					Name="Aakanksha Singh" 
					LoginName="CITRITE\aakankshas" 
					Email="aakanksha.singh@citrix.com" 
					*/
				
				console.log("Name: " + $(val).attr("Name") + " Email: " + $(val).attr("Email")  + " LoginName: " + $(val).attr("LoginName") )
				
				/*
				if($(val).text() != undefined)
				{
					attachmentJsonObj.Attachment[index] = $(val).text();
				}
				*/
				
			});
			

			
			o.complete(attachmentJsonObj);					
			
			
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});

	