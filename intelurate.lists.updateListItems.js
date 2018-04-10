/*
	$.intelurate.core.api.lists.updateListItems({
		updateItems: [ { item: [7, ["Title", "Hello Robs"], ["States", "Texas;#Florida"] ] }, { item: [7, ["Title", "Hello Robs"], ["States", "Texas;#Florida"]]} ],
	});
*/


$.intelurate.core.api.lists.updateListItems = (function (options) {
	
	var defaults = {
		webSite: null,
		listName: null,
		updateItems: null,
		fields: null,
		richText: true,
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
	
	if(o.updateItems != null)
	{
		$.each(o.updateItems, function(ci, cv){
				commandBuilder += '<Method ID="' + ci + '" Cmd="Update">';
				commandBuilder += '<Field Name="ID">' + cv.item[0] + '</Field>';
				$.each(cv.item, function (i, v) {								
					if (i > 0) {
						commandBuilder += '<Field Name="' + v[0] + '">' + $.intelurate.utilities.charConverter.convertTagsToCodes(v[1]) + '</Field>';
					}
				});				
				commandBuilder += '</Method>';	
		});
	
		if(o.fields != null)
		{
			var returnFields = new Array();
			$.each(o.fields, function (i, v) {
				returnFields[i] = "ows_" + v.replace(/\s/g, '_x0020_');
			});
		}
		
		function IsJsonString(str) {
			try {
				$.parseJSON(str);
			} catch (e) {
				return false;
			}
			return true;
		}
		
		
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
						
				var myJSONObject = { Rows : [ ] };
				
				if(o.fields != null)
				{	
				
					$(data.responseXML).find("z\\:row, row").each(function (index, v) {
	
						var orgIndex = index;											
	
						myJSONObject.Rows[index] = {};
						
						xmlObj = $(this);
	
						var jsonFields = '';
	
						$.each(o.fields, function (index, key) {
	
							var ValueArray = '';
							var Value = '';
	
							if (xmlObj.attr(returnFields[index]) != undefined) {
								if (xmlObj.attr(returnFields[index]).search("#") > -1) {
	
									ValueArray = xmlObj.attr(returnFields[index]).split("#");
	
									$.each(ValueArray, function (i, v) {
										if (i > 0) {
											Value += v;
										}
									});
								}
								else {
									Value = xmlObj.attr(returnFields[index]);
								}
							} else {
								Value = "NoData"
							}
							
							if (o.mapping != null) {
								$.each(o.mapping, function (index, mapValue) {
									var mapV = mapValue.split("=");
									if (key == mapV[1]) {
										key = mapV[0];
									}
								});
							}
								
							if(IsJsonString(Value))
							{											
								myJSONObject.Rows[orgIndex][key] = Value;
							}
							else
							{
								if(o.richText == true)
								{
									myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.richText(Value);
								}
								else
								{
									myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.displayHTML(Value);
								}																														
							}		
						});
					});
				}
				else
				{
					myJSONObject = "no return values";
				}
				
				o.complete(myJSONObject); 					    
				
				
			},
			contentType: "text/xml; charset=\"utf-8\""
		});				
	}
	else
	{
		alert("Your new list items has no commands associated with it");
	}
});