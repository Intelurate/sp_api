////////////////////////////////////////////////////////////////////
// Tested 9-20-2012 - Passed ///////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.checkInFile = (function (options) {
	
	var defaults = {
		webSite: null,
		url: null,
		comment: null,
		checkinType: 0, //A string representation of the values 0, 1 or 2, where 0 = MinorCheckIn, 1 = MajorCheckIn, and 2 = OverwriteCheckIn.
		complete: function (json) { }
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
		
	var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
					  <soap:Body>\
						<CheckInFile xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <pageUrl>'+o.url+'</pageUrl>\
						  <comment>'+o.comment+'</comment>\
						  <CheckinType>'+o.checkinType+'</CheckinType>\
						</CheckInFile>\
					  </soap:Body>\
					</soap:Envelope>';       

	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/CheckInFile");
		},		
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {                   
				
			var CheckInResult = $(data.responseXML).find("CheckInFileResult").text();
			var checkInResObj = { "CheckInResult": CheckInResult };				
			o.complete(checkInResObj);

		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
