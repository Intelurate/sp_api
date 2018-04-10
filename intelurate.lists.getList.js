////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.getList = (function (options) {
	
	var defaults = {
		webSite: null,
		listName: null,
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
						<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <listName>'+o.listName+'</listName>\
						</GetList>\
					  </soap:Body>\
					</soap:Envelope>';         

	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetList");
		},			
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {                   
		
			var listObj = { "List": {} };
				
			var v = $(data.responseXML).find("List");		
			
			listObj.List.DocTemplateUrl = $(v).attr("DocTemplateUrl");
			listObj.List.DefaultViewUrl = $(v).attr("DefaultViewUrl");
			listObj.List.MobileDefaultViewUrl = $(v).attr("MobileDefaultViewUrl");
			listObj.List.ID = $(v).attr("ID");
			listObj.List.Title = $(v).attr("Title");
			listObj.List.Description = $(v).attr("Description"); 
			listObj.List.ImageUrl = $(v).attr("ImageUrl");
			listObj.List.Name = $(v).attr("Name");
			listObj.List.BaseType = $(v).attr("BaseType");
			listObj.List.FeatureId = $(v).attr("FeatureId");
			listObj.List.ServerTemplate = $(v).attr("ServerTemplate");
			listObj.List.Created = $(v).attr("Created");
			listObj.List.Modified = $(v).attr("Modified");
			listObj.List.LastDeleted = $(v).attr("LastDeleted");
			listObj.List.Version = $(v).attr("Version");
			listObj.List.Direction = $(v).attr("Direction");
			listObj.List.ThumbnailSize = $(v).attr("ThumbnailSize");
			listObj.List.WebImageWidth = $(v).attr("WebImageWidth");
			listObj.List.WebImageHeight = $(v).attr("WebImageHeight");
			listObj.List.Flags = $(v).attr("Flags");
			listObj.List.ItemCount = $(v).attr("ItemCount");
			listObj.List.AnonymousPermMask = $(v).attr("AnonymousPermMask");
			listObj.List.RootFolder = $(v).attr("RootFolder");
			listObj.List.ReadSecurity = $(v).attr("ReadSecurity");
			listObj.List.WriteSecurity = $(v).attr("WriteSecurity");
			listObj.List.Author = $(v).attr("Author");
			listObj.List.EventSinkAssembly = $(v).attr("EventSinkAssembly");
			listObj.List.EventSinkClass = $(v).attr("EventSinkClass");
			listObj.List.EventSinkData = $(v).attr("EventSinkData");
			listObj.List.EmailAlias = $(v).attr("EmailAlias");
			listObj.List.WebFullUrl = $(v).attr("WebFullUrl");
			listObj.List.WebId = $(v).attr("WebId");
			listObj.List.SendToLocation = $(v).attr("SendToLocation");
			listObj.List.ScopeId = $(v).attr("ScopeId");
			listObj.List.MajorVersionLimit = $(v).attr("MajorVersionLimit");
			listObj.List.MajorWithMinorVersionsLimit = $(v).attr("MajorWithMinorVersionsLimit");
			listObj.List.WorkFlowId = $(v).attr("WorkFlowId");
			listObj.List.HasUniqueScopes = $(v).attr("HasUniqueScopes");
			listObj.List.NoThrottleListOperations = $(v).attr("NoThrottleListOperations");
			listObj.List.HasRelatedLists = $(v).attr("HasRelatedLists");
			listObj.List.AllowDeletion = $(v).attr("AllowDeletion");
			listObj.List.AllowMultiResponses = $(v).attr("AllowMultiResponses");
			listObj.List.EnableAttachments = $(v).attr("EnableAttachments");
			listObj.List.EnableModeration = $(v).attr("EnableModeration");
			listObj.List.EnableVersioning = $(v).attr("EnableVersioning");
			listObj.List.HasExternalDataSource = $(v).attr("HasExternalDataSource");
			listObj.List.Hidden = $(v).attr("Hidden");
			listObj.List.MultipleDataList = $(v).attr("MultipleDataList");
			listObj.List.Ordered = $(v).attr("Ordered"); 
			listObj.List.ShowUser = $(v).attr("ShowUser");
			listObj.List.EnablePeopleSelector = $(v).attr("EnablePeopleSelector"); 
			listObj.List.EnableResourceSelector = $(v).attr("EnableResourceSelector"); 
			listObj.List.EnableMinorVersion = $(v).attr("EnableMinorVersion");
			listObj.List.RequireCheckout = $(v).attr("RequireCheckout");
			listObj.List.ThrottleListOperations = $(v).attr("ThrottleListOperations");
			listObj.List.ExcludeFromOfflineClient = $(v).attr("ExcludeFromOfflineClient"); 
			listObj.List.EnableFolderCreation = $(v).attr("EnableFolderCreation");
			listObj.List.IrmEnabled = $(v).attr("IrmEnabled");
			listObj.List.IsApplicationList = $(v).attr("IsApplicationList");
			listObj.List.PreserveEmptyValues = $(v).attr("PreserveEmptyValues"); 
			listObj.List.StrictTypeCoercion = $(v).attr("StrictTypeCoercion");
			listObj.List.EnforceDataValidation = $(v).attr("EnforceDataValidation"); 
			listObj.List.MaxItemsPerThrottledOperation = $(v).attr("MaxItemsPerThrottledOperation");
		
			o.complete(listObj);

		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});
