////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getCurrentUserInfo = (function (options) {
	
	var defaults = {
		webSite: null,
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
						<GetCurrentUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />\
					  </soap:Body>\
					</soap:Envelope>';
	
	$.ajax({
		url: o.webSite + "_vti_bin/UserGroup.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetCurrentUserInfo");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
				
			var UserInfoObj  = { "UserInfo": {
				ID: $(data.responseXML).find("User").attr("ID"),
				Sid: $(data.responseXML).find("User").attr("Sid"),
				Name: $(data.responseXML).find("User").attr("Name"),
				LoginName: $(data.responseXML).find("User").attr("LoginName"),
				Email: $(data.responseXML).find("User").attr("Email"),
				Notes: $(data.responseXML).find("User").attr("Notes"),
				IsSiteAdmin: $(data.responseXML).find("User").attr("IsSiteAdmin"),
				IsDomainGroup: $(data.responseXML).find("User").attr("IsDomainGroup"),
				Flags: $(data.responseXML).find("User").attr("Flags")
			}};

			o.complete(UserInfoObj);
				
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
