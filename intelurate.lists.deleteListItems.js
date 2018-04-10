/*
	$.intelurate.lists.updateListItems({
		deleteItems: [ { item: 7}, { item: 9} ]
	});
*/

$.intelurate.core.api.lists.deleteListItems = (function (options) {
	
	var defaults = {
		webSite: null,
		listName: null,
		deleteItems: null,
		printXml: false,
		complete: function (data) { }
	}

	var options = $.extend(defaults, options);
	var o = options;

	var commandBuilder = '';
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
	
	if(o.deleteItems != null)
	{
		$.each(o.deleteItems, function(i, v){
			commandBuilder += '<Method ID="' + i + '" Cmd="Delete">';
			commandBuilder += '<Field Name="ID">' + v.item + '</Field>';
			if(v.file != undefined)
			{	
				commandBuilder += '<Field Name="FileRef">'+ v.file + '</Field>';				
			}							
			commandBuilder += '</Method>';						
		});


		var soapEnv = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
			"<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
				"<soap:Body>" +
					"<UpdateListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>" +
						"<listName>" + o.listName + "</listName>" +
						"<updates>" +
							"<Batch OnError='Continue' >";

		soapEnv += commandBuilder;

		soapEnv += "</Batch>" +
						"</updates>" +
					"</UpdateListItems>" +
				"</soap:Body>" +
			"</soap:Envelope>";

		$.ajax({
			url: o.webSite + "_vti_bin/Lists.asmx",
			beforeSend: function (xhr) {
				xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems");
			},
			type: "POST",
			dataType: "xml",
			data: soapEnv,
			complete: function (data) {
				
				if(o.printXml == true)
				{
					console.log(data.responseXML.xml);
				}
				
				o.complete(myJSONObject); 			    
			},
			contentType: "text/xml; charset=\"utf-8\""
		});				
	}
	else
	{
		alert("Your delete has no commands associated with it");
	}
});