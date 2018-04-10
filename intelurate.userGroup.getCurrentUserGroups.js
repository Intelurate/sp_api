
/*///////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getCurrentUserGroups({
	complete: function(groups){
		alert(JSON.stringify(data));
		
		$.each(data.Groups, function(i, v){										
			v.ID
			v.Name
			v.Description
			v.OwnerID
			v.OwnerIsUser
		});
				
	}	
});	


///////////////////////////////////////////////////////////////////*/

$.intelurate.core.api.userGroup.getCurrentUserGroups = (function (options) {
	
	var defaults = {
		webSite: null,
		complete: function(groups){}
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
	
	$.intelurate.core.api.userGroup.getCurrentUserInfo({
		webSite: o.webSite,
		complete: function(data)
		{
			$.intelurate.core.api.userGroup.getGroupCollectionFromUser({
				webSite: o.webSite,
				userLoginName: data.UserInfo.LoginName,
				complete: function(data)
				{
					o.complete(data.Groups)
				}
			});			
		}
	});	
});
