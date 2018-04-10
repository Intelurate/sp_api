$.intelurate.utilities.charConverter = {						
	
	convertTagsToCodes: function(str)
	{						
		var tags = [{ char: ['<', '&lt;'] },{ char: ['>', '&gt;'] } ];
					
		$.each(tags, function(i, v){	
			var re = new RegExp(v.char[0], "g");
			str = str.replace(re, v.char[1]);										
		});					
		
		return str;
	},
	displayHTML: function(str)
	{
		var chars = [{ char: ['"', '&quot;'] }, { char: ['<', '&lt;'] },{ char: ['>', '&gt;'] } ];
		
		$.each(chars, function(i, v){	
			var re = new RegExp(v.char[0], "g");
			str = str.replace(re, v.char[1]);										
		});	
		
		return $.intelurate.utilities.charConverter.addRequiredChars(str);
		
	},
	richText: function(str)
	{
		var chars = [{ char: ['"', '\"'] }];
		
		$.each(chars, function(i, v){	
			var re = new RegExp(v.char[0], "g");
			str = str.replace(re, v.char[1]);										
		});	
		
		return str;	
	},
	addRequiredChars: function(str)
	{
		var chars = [{ char: ['\n', '<br/>'] }, { char: ['\r', '<br/>'] }];
		
		$.each(chars, function(i, v){	
			var re = new RegExp(v.char[0], "g");
			str = str.replace(re, v.char[1]);										
		});	
		
		return str;
	}	
}