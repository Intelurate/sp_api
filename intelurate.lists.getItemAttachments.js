////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.getAttachmentCollection = (function (options) {
	
	var defaults = {
		webSite: null,  //SPWeb Url ex. http://sharepoint.com/sites/currentWeb/
		listName: null,  //ListName
		itemID: null,
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
			<GetAttachmentCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
				<listName>'+o.listName+'</listName>\
				<listItemID>'+o.itemID+'</listItemID>\
			</GetAttachmentCollection>\
		</soap:Body>\
	</soap:Envelope>';
	
	
	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetAttachmentCollection");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
			
			var attachmentJsonObj  = { "Attachment": [] };
			
			$(data.responseXML).find("Attachment").each(function (index, val) {
				if($(val).text() != undefined)
				{
					attachmentJsonObj.Attachment[index] = $(val).text();
				}
			});
			
			o.complete(attachmentJsonObj);					
			
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
