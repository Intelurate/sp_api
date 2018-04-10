////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getGroupCollectionFromUser = (function (options) {
	
	var defaults = {
		webSite: null,
		userLoginName: null,
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
						<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">\
						  <userLoginName>' + o.userLoginName + '</userLoginName>\
						</GetGroupCollectionFromUser>\
					  </soap:Body>\
					</soap:Envelope>';
	
	$.ajax({
		url: o.webSite + "_vti_bin/UserGroup.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetGroupCollectionFromUser");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
		
			var GroupObj = { "Groups": [] };

			$(data.responseXML).find("Group").each(function (i, v) {
			
				GroupObj.Groups[i] = {};						
				GroupObj.Groups[i].ID = $(v).attr("ID");
				GroupObj.Groups[i].Name = $(v).attr("Name");
				GroupObj.Groups[i].Description = $(v).attr("Description");
				GroupObj.Groups[i].OwnerID = $(v).attr("OwnerID");
				GroupObj.Groups[i].OwnerIsUser = $(v).attr("OwnerIsUser");
			});
			
			o.complete(GroupObj);
				
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
