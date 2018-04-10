////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.getListCollection = (function (options) {
	
	var defaults = {
		webSite: null,
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
						<GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/" />\
					</soap:Body>\
				   </soap:Envelope>';         

	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetListCollection");
		},		
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {                   
		
			var listCollObj = { "List": [] };

			$(data.responseXML).find("List").each(function (i, v) {	
					
				listCollObj.List[i] = {};	
				listCollObj.List[i].DocTemplateUrl = $(v).attr("DocTemplateUrl");
				listCollObj.List[i].DefaultViewUrl = $(v).attr("DefaultViewUrl");
				listCollObj.List[i].MobileDefaultViewUrl = $(v).attr("MobileDefaultViewUrl");
				listCollObj.List[i].ID = $(v).attr("ID");
				listCollObj.List[i].Title = $(v).attr("Title");
				listCollObj.List[i].Description = $(v).attr("Description"); 
				listCollObj.List[i].ImageUrl = $(v).attr("ImageUrl");
				listCollObj.List[i].Name = $(v).attr("Name");
				listCollObj.List[i].BaseType = $(v).attr("BaseType");
				listCollObj.List[i].FeatureId = $(v).attr("FeatureId");
				listCollObj.List[i].ServerTemplate = $(v).attr("ServerTemplate");
				listCollObj.List[i].Created = $(v).attr("Created");
				listCollObj.List[i].Modified = $(v).attr("Modified");
				listCollObj.List[i].LastDeleted = $(v).attr("LastDeleted");
				listCollObj.List[i].Version = $(v).attr("Version");
				listCollObj.List[i].Direction = $(v).attr("Direction");
				listCollObj.List[i].ThumbnailSize = $(v).attr("ThumbnailSize");
				listCollObj.List[i].WebImageWidth = $(v).attr("WebImageWidth");
				listCollObj.List[i].WebImageHeight = $(v).attr("WebImageHeight");
				listCollObj.List[i].Flags = $(v).attr("Flags");
				listCollObj.List[i].ItemCount = $(v).attr("ItemCount");
				listCollObj.List[i].AnonymousPermMask = $(v).attr("AnonymousPermMask");
				listCollObj.List[i].RootFolder = $(v).attr("RootFolder");
				listCollObj.List[i].ReadSecurity = $(v).attr("ReadSecurity");
				listCollObj.List[i].WriteSecurity = $(v).attr("WriteSecurity");
				listCollObj.List[i].Author = $(v).attr("Author");
				listCollObj.List[i].EventSinkAssembly = $(v).attr("EventSinkAssembly");
				listCollObj.List[i].EventSinkClass = $(v).attr("EventSinkClass");
				listCollObj.List[i].EventSinkData = $(v).attr("EventSinkData");
				listCollObj.List[i].EmailAlias = $(v).attr("EmailAlias");
				listCollObj.List[i].WebFullUrl = $(v).attr("WebFullUrl");
				listCollObj.List[i].WebId = $(v).attr("WebId");
				listCollObj.List[i].SendToLocation = $(v).attr("SendToLocation");
				listCollObj.List[i].ScopeId = $(v).attr("ScopeId");
				listCollObj.List[i].MajorVersionLimit = $(v).attr("MajorVersionLimit");
				listCollObj.List[i].MajorWithMinorVersionsLimit = $(v).attr("MajorWithMinorVersionsLimit");
				listCollObj.List[i].WorkFlowId = $(v).attr("WorkFlowId");
				listCollObj.List[i].HasUniqueScopes = $(v).attr("HasUniqueScopes");
				listCollObj.List[i].NoThrottleListOperations = $(v).attr("NoThrottleListOperations");
				listCollObj.List[i].HasRelatedLists = $(v).attr("HasRelatedLists");
				listCollObj.List[i].AllowDeletion = $(v).attr("AllowDeletion");
				listCollObj.List[i].AllowMultiResponses = $(v).attr("AllowMultiResponses");
				listCollObj.List[i].EnableAttachments = $(v).attr("EnableAttachments");
				listCollObj.List[i].EnableModeration = $(v).attr("EnableModeration");
				listCollObj.List[i].EnableVersioning = $(v).attr("EnableVersioning");
				listCollObj.List[i].HasExternalDataSource = $(v).attr("HasExternalDataSource");
				listCollObj.List[i].Hidden = $(v).attr("Hidden");
				listCollObj.List[i].MultipleDataList = $(v).attr("MultipleDataList");
				listCollObj.List[i].Ordered = $(v).attr("Ordered"); 
				listCollObj.List[i].ShowUser = $(v).attr("ShowUser");
				listCollObj.List[i].EnablePeopleSelector = $(v).attr("EnablePeopleSelector"); 
				listCollObj.List[i].EnableResourceSelector = $(v).attr("EnableResourceSelector"); 
				listCollObj.List[i].EnableMinorVersion = $(v).attr("EnableMinorVersion");
				listCollObj.List[i].RequireCheckout = $(v).attr("RequireCheckout");
				listCollObj.List[i].ThrottleListOperations = $(v).attr("ThrottleListOperations");
				listCollObj.List[i].ExcludeFromOfflineClient = $(v).attr("ExcludeFromOfflineClient"); 
				listCollObj.List[i].EnableFolderCreation = $(v).attr("EnableFolderCreation");
				listCollObj.List[i].IrmEnabled = $(v).attr("IrmEnabled");
				listCollObj.List[i].IsApplicationList = $(v).attr("IsApplicationList");
				listCollObj.List[i].PreserveEmptyValues = $(v).attr("PreserveEmptyValues"); 
				listCollObj.List[i].StrictTypeCoercion = $(v).attr("StrictTypeCoercion");
				listCollObj.List[i].EnforceDataValidation = $(v).attr("EnforceDataValidation"); 
				listCollObj.List[i].MaxItemsPerThrottledOperation = $(v).attr("MaxItemsPerThrottledOperation");
			});
			
			o.complete(listCollObj);

		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
