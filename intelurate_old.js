////////////////////////////////////////////////////////////////////////////
// Main Namespace //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
(function ($) {

	$.intelurate = {		
		core: {
			api: {			
				lists: {
				},
				userGroup: {
				},
				versions: {
				}
			}
		},
		utilities: {
				
		}
	}
})(jQuery);


////////////////////////////////////////////////////////////////////////////
// Tested 11-20-2012 ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.items = {	
	currentIndex: -1,
	Execute: function(){
		var completeItemArray = this.ItemArray;
		this.ItemArray = [];
		this.currentIndex = -1;
		return completeItemArray;
	},
	ItemArray: new Array(),
	NewItem: function()
	{
		this.currentIndex++;		
		this.ItemArray[this.currentIndex] = { item: []};
		return this;
	},
	UpdateItem: function(itemID)
	{
		this.currentIndex++;		
		this.ItemArray[this.currentIndex] = { item: [itemID]};
		return this;
	},
	DeleteItem: function(itemID, file) // New File delete needs to be tested 
	{		
		var isFile = undefined;
		if(file != undefined)
		{	
			isFile = file;
		}
		
		this.currentIndex++;		
		this.ItemArray[this.currentIndex] = { item: itemID , file: isFile };
		return this;
	},			
	Field: function(field, value)
	{
		this.ItemArray[this.currentIndex].item.push([field,value])
		return this;
	}
}

////////////////////////////////////////////////////////////////////////////
// $.intelurate.core.api.query /////////////////////////////////////////////
// Tested 10-10-2012 ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

$.intelurate.core.api.query = {	
	QueryBuilder: "",
	OrderByBuilder: "",
	GroupByBuilder: "",
	CommandBuilder: "",
	Filter: "",
	Field: "",
	FieldType: "", //Text (default), Number, DateTime
	Operator: "",
	Value: "",
	Exist: false,
	Execute: function(){
		var CAML = this.OrderByBuilder + '<Where>' + this.QueryBuilder + '</Where>' + this.GroupByBuilder;
		this.Clear();
		return CAML;
	},		
	Clear: function()
	{
		this.OrderByBuilder = "";
		this.QueryBuilder = "";
		this.GroupByBuilder = "";
		this.Exist = false;
		return this;
	},
	Where: function (Field) {	
		this.Filter = "";
		this.Field = Field;						
		return this;
	},	 		 		 	 	 		 	 	 
	And: function(Field){
		this.Filter = "And";
		this.Field = Field;
		return this;
	},
	Or: function(Field){
		this.Filter = "Or";
		this.Field = Field;
		return this;
	},
	Equal: function(Value){
		this.Operator = "Eq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},
	Eq: function(Value){
		this.Operator = "Eq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},		
	NotEqual: function(Value){  //Neq
		this.Operator = "Neq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},	
	Neq: function(Value){  //Neq
		this.Operator = "Neq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},			
	GreaterThan: function(Value){  //Gt
		this.Operator = "Gt";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;		
	},
	Gt: function(Value){  //Gt
		this.Operator = "Gt";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;		
	},				
	GreaterThanOrEqual: function(Value){  //Geq
		this.Operator = "Geq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},
	Geq: function(Value){  //Geq
		this.Operator = "Geq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;
	},
	LessThan: function(Value){  //Lt
		this.Operator = "Lt";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;		
	},
	Lt: function(Value){  //Lt
		this.Operator = "Lt";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;		
	},			
	LessThanOrEqual: function(Value){  //Leq
		this.Operator = "Leq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;			
	},	
	Leq: function(Value){  //Leq
		this.Operator = "Leq";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;			
	},				
	IsNull: function(Value){  //IsNull
		this.Operator = "IsNull";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;		
	},	
	BeginsWith: function(Value){  //BeginsWith
		this.Operator = "BeginsWith";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;			
	},	
	Contains: function(Value){  //Contains
		this.Operator = "Contains";
		this.Value = Value;
		this.QueryBuilderFunc();					 
		return this;			
	},	
	ContainsEach: function(Value){  //ContainsEach

		var containsMultiValue = Value.split(/ /g);				
		var thisObj = this;
							
		$.each(containsMultiValue, function (i, Value) {
			
			if(this.Filter == undefined)
			{
				thisObj.Operator = "Contains";
				thisObj.Value = Value;
				thisObj.QueryBuilderFunc();	
				thisObj.Filter = "Or";
			}
			else
			{
				thisObj.Operator = "Contains";
				thisObj.Value = Value;
				thisObj.QueryBuilderFunc();
			}
			
		});		
			
		return this;
	},
	OrderBy: function(fields, ascending)
	{
		var AscDesc = "True";
		
		if(ascending == "Desc")
		{
			AscDesc = "False";
		}
		
		var OrderByBuilder = "";	
				
		OrderByBuilder += "<OrderBy>";	
				
		if(typeof(fields) == "string")
		{
			OrderByBuilder += '<FieldRef Name="' + fields + '" Ascending="' + AscDesc + '" />';
		}
		else if(typeof(fields) == "object")
		{
			$.each(fields, function (index, value) {
				OrderByBuilder += '<FieldRef Name="' + value + '" Ascending="' + AscDesc + '" />';
			});
		}
		
		OrderByBuilder += "</OrderBy>";
		
		this.OrderByBuilder = OrderByBuilder;
		
		if(this.OrderByBuilder != "")
		{
			this.Exist = true;
		}
		
		return this;

	},
	GroupBy: function(fields, ascending)
	{
		var AscDesc = "True";
		
		if(ascending == "Desc")
		{
			AscDesc = "False";
		}
		
		var GroupByBuilder = "";	
				
		GroupByBuilder += '<GroupBy Collapse="FALSE">';	
				
		if(typeof(fields) == "string")
		{
			GroupByBuilder += '<FieldRef Name="' + fields + '" Ascending="' + AscDesc + '" />';
		}
		else if(typeof(fields) == "object")
		{
			$.each(fields, function (index, value) {
				GroupByBuilder += '<FieldRef Name="' + value + '" Ascending="' + AscDesc + '" />';
			});
		}
		
		GroupByBuilder += '</GroupBy>';
		
		this.GroupByBuilder = GroupByBuilder;
		
		if(this.GroupByBuilder != "")
		{
			this.Exist = true;
		}
		
		
		return this;

	},
	QueryBuilderFunc: function()
	{
		this.CommandBuilder = "";
		
		fType = "Text";
		dateType = "";
		
		var checkdate = $.intelurate.utilities.checkForDate.CAMLDateConverter(this.Value);
		
		if(checkdate != null)
		{
			fType = 'DateTime';
			dateType = ' IncludeTimeValue="TRUE" ';
			this.Value = checkdate;
		}
			
		if(this.Filter != "")
		{	
			this.CommandBuilder += '<' + this.Filter + '>';
			this.CommandBuilder += this.QueryBuilder;
			this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '"  ' + dateType + ' /><Value Type="' + fType + '">' + this.Value + '</Value></' +  this.Operator + '>';
			this.CommandBuilder += '</' + this.Filter + '>';
			this.QueryBuilder = this.CommandBuilder;	
		}
		else
		{
			this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '"  ' + dateType + ' /><Value Type="' + fType + '">' + this.Value + '</Value></' +  this.Operator + '>';				
			this.QueryBuilder = this.CommandBuilder;	
		}
		
		if(this.QueryBuilder != "")
		{
			this.Exist = true;
		}
		
		return this;
	}
					
};



////////////////////////////////////////////////////////////////////////////
// Tested 12/12/2012 ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.listFields = {	
	newFields: {
		FieldBuilder: "",
		Count: 0,
		Clear: function()
		{
			this.Count = 0;
			this.FieldBuilder = '';
		},		
		Field: function(type, displayName) //Text, DateTime, Counter
		{
			this.Count++;
			this.FieldBuilder += '<Method ID="'+ this.Count +'"><Field ReadOnly="FALSE" Type="'+ type +'" DisplayName="'+ displayName +'" FromBaseType="TRUE" /></Method>';
			return this;
		},
		Add: function()
		{
			var finished = '<Fields>' + this.FieldBuilder + '</Fields>';
			this.Clear();
			return finished;
		}		
	},
	updateFields: {
	},
	deleteFields: {
		
	}
}


////////////////////////////////////////////////////////////////////////////
// $.intelurate.core.api.lists.getListItems ////////////////////////////////
// Tested 10/25/2012 ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.getListItems = (function (options) { 

	var defaults = {
		webSite: null, 
		listName: null,
		fields: null,
		mapping: null,
		query: null, 
		folderPath: null,
		scope: null,
		rowLimit: 100,					
		complete: function (data) { },
		next: null,
		richText: true,  
		printXml: false,
		cache: false,
		cacheTime: 60000
	}

	var options = $.extend(defaults, options);
	var o = options;

	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
	
	var viewFields = '';
	var QueryFields = new Array();

	$.each(o.fields, function (index, value) {
		viewFields += "<FieldRef Name='" + value.replace(/\s/g, '_x0020_') + "' />";
		QueryFields[index] = "ows_" + value.replace(/\s/g, '_x0020_');
	});

	var soapEnv = '';

	soapEnv +=
	"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>" +
	"<soapenv:Body>" +
	"<GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>" +
	"<listName>" + o.listName + "</listName>";

	soapEnv += "<query><Query>";
	
	if(o.query != null)
	{
		soapEnv += o.query;			
	}
	
	soapEnv += "</Query></query>";

	soapEnv += "<viewFields><ViewFields>";
	soapEnv += viewFields;
	soapEnv += "</ViewFields></viewFields>";

	soapEnv += "<rowLimit>" +  o.rowLimit + "</rowLimit>";

	var folderLink = '';
  
	if (o.folderPath != null) {   
		folderLink = '<Folder>' + window.location.protocol + '//' + document.domain + o.webSite + o.folderPath + '</Folder>';
	}

	var thisScope = '';
	
	if (o.scope == "Default") {
		thisScope = "<ViewAttributes Scope='Default' />";
	}
	else if (o.scope == "Recursive") {
		thisScope = "<ViewAttributes Scope='Recursive' />";
	}
	else if (o.scope == "RecursiveAll") {
		thisScope = "<ViewAttributes Scope='RecursiveAll' />";
	}
	else if (o.scope == "FilesOnly") {
		thisScope = "<ViewAttributes Scope='FilesOnly' />";
	}
	
	soapEnv += "<queryOptions><QueryOptions>";
	//soapEnv += "<IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns>";
	soapEnv += thisScope;
	soapEnv += folderLink;
	
	
	if(o.next != null)
	{					
		o.next = o.next.replace(/&/g, "&amp;");
		soapEnv += '<Paging ListItemCollectionPositionNext="' + o.next + '" />';
	}
	
	soapEnv += "</QueryOptions></queryOptions>";		

	soapEnv += "</GetListItems>" +
	"</soapenv:Body>" +
	"</soapenv:Envelope>";
	
	
	//MD5 algorithm used for creating md5hash key for Caching
	var MD5 = function (string) {
	 
		function RotateLeft(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		}
	 
		function AddUnsigned(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
	 
		function F(x,y,z) { return (x & y) | ((~x) & z); }
		function G(x,y,z) { return (x & z) | (y & (~z)); }
		function H(x,y,z) { return (x ^ y ^ z); }
		function I(x,y,z) { return (y ^ (x | (~z))); }
	 
		function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
	 
		function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
	 
		function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
	 
		function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};
	 
		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		};
	 
		function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		};
	 
		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
	 
			return utftext;
		};
	 
		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;
	 
		string = Utf8Encode(string);
	 
		x = ConvertToWordArray(string);
	 
		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	 
		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}
	 
		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
	 
		return temp.toLowerCase();
	}



	
	var createNewCache = true;		
	
	if(o.cache)
	{
		//Thomas Franks Session variables without cookies
		//http://thomasfrank.se
		//Cache will expire when you leave the window or when the date set expires
		sessvars = function () {
			var x = {};	
			x.$ = {
				prefs: {
					memLimit: 2000,
					autoFlush: true,
					crossDomain: false,
					includeProtos: false,
					includeFunctions: false
				},
				parent: x,
				clearMem: function () {
					for (var i in this.parent) { if (i != "$") { this.parent[i] = undefined } };
					this.flush();
				},
				usedMem: function () {
					x = {};
					return Math.round(this.flush(x) / 1024);
				},
				usedMemPercent: function () {
					return Math.round(this.usedMem() / this.prefs.memLimit);
				},
				flush: function (x) {
					var y, o = {}, j = this.$$;
					x = x || top;
					for (var i in this.parent) { o[i] = this.parent[i] };
					o.$ = this.prefs;
					j.includeProtos = this.prefs.includeProtos;
					j.includeFunctions = this.prefs.includeFunctions;
					y = this.$$.make(o);
					if (x != top) { return y.length };
					if (y.length / 1024 > this.prefs.memLimit) { return false }
					x.name = y;		
					return true;
				},
				getDomain: function () {
					var l = location.href
					l = l.split("///").join("//");
					l = l.substring(l.indexOf("://") + 3).split("/")[0];
					while (l.split(".").length > 2) { l = l.substring(l.indexOf(".") + 1) };
					return l
				},
				debug: function (t) {
					var t = t || this, a = arguments.callee;
					if (!document.body) { setTimeout(function () { a(t) }, 200); return };
					t.flush();
					var d = document.getElementById("sessvarsDebugDiv");
					if (!d) { d = document.createElement("div"); document.body.insertBefore(d, document.body.firstChild) };
					d.id = "sessvarsDebugDiv";
					d.innerHTML = '<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;' +
								'z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px">' +
								'<b style="font-family:Trebuchet MS;font-size:20px">sessvars.js - debug info:</b><br/><br/>' +
								'Memory usage: ' + t.usedMem() + ' Kb (' + t.usedMemPercent() + '%)&nbsp;&nbsp;&nbsp;' +
								'<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>' +
								top.name.split('\n').join('<br/>') + '</div>';
					d.getElementsByTagName('span')[0].onclick = function () { t.clearMem(); location.reload() }
				},
				init: function () {
					var o = {}, t = this;
					try { o = this.$$.toObject(top.name) } catch (e) { o = {} };
					this.prefs = o.$ || t.prefs;
					if (this.prefs.crossDomain || this.prefs.currentDomain == this.getDomain()) {
						for (var i in o) { this.parent[i] = o[i] };
					}
					else {
						this.prefs.currentDomain = this.getDomain();
					};
					this.parent.$ = t;
					t.flush();
					var f = function () { if (t.prefs.autoFlush) { t.flush() } };
					if (window["addEventListener"]) { addEventListener("unload", f, false) }
					else if (window["attachEvent"]) { window.attachEvent("onunload", f) }
					else { this.prefs.autoFlush = false };
				}
			};
		
			x.$.$$ = {
				compactOutput: false,
				includeProtos: false,
				includeFunctions: false,
				detectCirculars: true,
				restoreCirculars: true,
				make: function (arg, restore) {
					this.restore = restore;
					this.mem = []; this.pathMem = [];
					return this.toJsonStringArray(arg).join('');
				},
				toObject: function (x) {
					if (!this.cleaner) {
						try { this.cleaner = new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$') }
						catch (a) { this.cleaner = /^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/ }
					};
					if (!this.cleaner.test(x)) { return {} };
					eval("this.myObj=" + x);
					if (!this.restoreCirculars || !alert) { return this.myObj };
					if (this.includeFunctions) {
						var x = this.myObj;
						for (var i in x) {
							if (typeof x[i] == "string" && !x[i].indexOf("JSONincludedFunc:")) {
								x[i] = x[i].substring(17);
								eval("x[i]=" + x[i])
							} 
						}
					};
					this.restoreCode = [];
					this.make(this.myObj, true);
					var r = this.restoreCode.join(";") + ";";
					eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
					eval(r);
					return this.myObj
				},
				toJsonStringArray: function (arg, out) {
					if (!out) { this.path = [] };
					out = out || [];
					var u; // undefined
					switch (typeof arg) {
						case 'object':
							this.lastObj = arg;
							if (this.detectCirculars) {
								var m = this.mem; var n = this.pathMem;
								for (var i = 0; i < m.length; i++) {
									if (arg === m[i]) {
										out.push('"JSONcircRef:' + n[i] + '"'); return out
									}
								};
								m.push(arg); n.push(this.path.join("."));
							};
							if (arg) {
								if (arg.constructor == Array) {
									out.push('[');
									for (var i = 0; i < arg.length; ++i) {
										this.path.push(i);
										if (i > 0)
											out.push(',\n');
										this.toJsonStringArray(arg[i], out);
										this.path.pop();
									}
									out.push(']');
									return out;
								} else if (typeof arg.toString != 'undefined') {
									out.push('{');
									var first = true;
									for (var i in arg) {
										if (!this.includeProtos && arg[i] === arg.constructor.prototype[i]) { continue };
										this.path.push(i);
										var curr = out.length;
										if (!first)
											out.push(this.compactOutput ? ',' : ',\n');
										this.toJsonStringArray(i, out);
										out.push(':');
										this.toJsonStringArray(arg[i], out);
										if (out[out.length - 1] == u)
											out.splice(curr, out.length - curr);
										else
											first = false;
										this.path.pop();
									}
									out.push('}');
									return out;
								}
								return out;
							}
							out.push('null');
							return out;
						case 'unknown':
						case 'undefined':
						case 'function':
							if (!this.includeFunctions) { out.push(u); return out };
							arg = "JSONincludedFunc:" + arg;
							out.push('"');
							var a = ['\n', '\\n', '\r', '\\r', '"', '\\"'];
							arg += ""; for (var i = 0; i < 6; i += 2) { arg = arg.split(a[i]).join(a[i + 1]) };
							out.push(arg);
							out.push('"');
							return out;
						case 'string':
							if (this.restore && arg.indexOf("JSONcircRef:") == 0) {
								this.restoreCode.push('this.myObj.' + this.path.join(".") + "=" + arg.split("JSONcircRef:").join("this.myObj."));
							};
							out.push('"');
							var a = ['\n', '\\n', '\r', '\\r', '"', '\\"'];
							arg += ""; for (var i = 0; i < 6; i += 2) { arg = arg.split(a[i]).join(a[i + 1]) };
							out.push(arg);
							out.push('"');
							return out;
						default:
							out.push(String(arg));
							return out;
					}
				}
			};
		
			x.$.init();
			return x;
		} ()


		var d = new Date();
		var n = d.getTime()
		
		if(typeof sessvars != 'undefined'){
			
			if(n > (sessvars.Timer + o.cacheTime))
			{
				sessvars.$.clearMem();
			}	
				
			if(typeof sessvars.Cache == 'undefined')
			{
				sessvars.Cache = [];
				sessvars.Timer = n;
			}
							
			$.each(sessvars.Cache, function(i, v)
			{						
				if(v.cacheID ==  MD5(soapEnv))
				{
					createNewCache = false;
					o.complete(v.cachedJSON);
					return false;
				}						
			});
			
			if(createNewCache == true)
			{
				sendRequest();
			}		   
		}
	}
	else
	{
		sendRequest();
	}
	
	function IsJsonObject(str) {
		try {
			$.parseJSON(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	function sendRequest()
	{
		$.ajax({
			url: o.webSite + "_vti_bin/Lists.asmx",
			beforeSend: function (xhr) {
				xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetListItems");
			},
			type: "POST",
			dataType: "xml",
			data: soapEnv,
			complete: function (data) {
			
				var nextStr = $(data.responseXML).find("rs\\:data, data").attr("ListItemCollectionPositionNext");		
				//<rs:data ItemCount="10" ListItemCollectionPositionNext="Paged=TRUE&amp;p_FileLeafRef=CMRA%20Form%20Instructions%2edoc&amp;p_ID=29">							
				o.next = nextStr;

				if(o.printXml == true)
				{
					console.log(data.responseXML.xml);
				}
				
				var myJSONObject = { Rows : [ ] };
				
				$(data.responseXML).find("z\\:row, row").each(function (index, v) {


					var orgIndex = index;											

					myJSONObject.Rows[index] = {};
					
					xmlObj = $(this);

					var jsonFields = '';

					$.each(o.fields, function (index, key) {
						
						key = key.replace(/ /g, "");
						
						var ValueArray = '';
						var Value = '';

						if (xmlObj.attr(QueryFields[index]) != undefined) {
							if (xmlObj.attr(QueryFields[index]).search("#") > -1) {

								ValueArray = xmlObj.attr(QueryFields[index]).split("#");

								$.each(ValueArray, function (i, v) {
									if (i > 0) {
										Value += v;
									}
								});
							}
							else {
								Value = xmlObj.attr(QueryFields[index]);
							}
						} else {
							Value = " "
						}
						
						if (o.mapping != null) {
							$.each(o.mapping, function (index, mapValue) {
								var mapV = mapValue.split("=");
								if (key == mapV[1]) {
									key = mapV[0];
								}
							});
						}
		
		                if (key == "FileRef") {
                            Value = window.location.protocol + "//" + window.location.host + "/" + Value;
                        }
						
						if(IsJsonObject(Value))
						{											
							myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
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
						
				if(o.cache)
				{
					if(createNewCache == true)
					{
						sessvars.Cache.push({cacheID: MD5(soapEnv), cachedJSON: myJSONObject} ); 
					}
				}
		
				o.complete(myJSONObject);

			},
			contentType: "text/xml; charset=\"utf-8\""
		});
	}
});


/////////////////////////////////////////////////////////////////////////
// Tested 10/25/2012 ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.newListItems = (function (options) {
	
	var defaults = {
		webSite: null,
		listName: null,
		newItems: null,
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
	
	if(o.newItems != null)
	{
		$.each(o.newItems, function(ci, cv){
			commandBuilder += '<Method ID="' + ci + '" Cmd="New">';
			$.each(cv.item, function (i, v) {
				commandBuilder += '<Field Name="' + v[0].replace(/ /g, "_x0020_") + '">' + $.intelurate.utilities.charConverter.convertTagsToCodes(v[1]) + '</Field>';
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
		
		function IsJsonObject(str) {
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
							
							key = key.replace(/ /g, "");
	
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
							
			                if (key == "FileRef") {
                            	Value = window.location.protocol + "//" + window.location.host + "/" + Value;
                        	}
						
							if(IsJsonObject(Value))
							{											
								myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
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
		alert("Your update list items has no commands associated with it");
	}
});


/////////////////////////////////////////////////////////////////////////
// Tested 11/26/2012 ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
						commandBuilder += '<Field Name="' + v[0].replace(/ /g, "_x0020_") + '">' + $.intelurate.utilities.charConverter.convertTagsToCodes(v[1]) + '</Field>';
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
		
		function IsJsonObject(str) {
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
							
							key = key.replace(/ /g, "");
	
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
	
			                if (key == "FileRef") {
                            	Value = window.location.protocol + "//" + window.location.host + "/" + Value;
                        	}								
							
							if(IsJsonObject(Value))
							{											
								myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
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



/////////////////////////////////////////////////////////////////////////
// Tested ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
				
				o.complete(); 			    
			},
			contentType: "text/xml; charset=\"utf-8\""
		});				
	}
	else
	{
		alert("Your delete has no commands associated with it");
	}
});

/////////////////////////////////////////////////////////////////////////
// Tested  //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.getItemAttachments = (function (options) {
	
	var defaults = {
		webSite: null,  //SPWeb Url ex. http://sharepoint.com/sites/currentWeb/
		listName: null,  //ListName
		itemID: null,
		complete: function(json){}
	}

	var options = $.extend(defaults, options);
	var o = options;

	var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
		<soap:Body>\
			<GetAttachmentCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
				<listName>'+o.ListName+'</listName>\
				<listItemID>'+o.ItemID+'</listItemID>\
			</GetAttachmentCollection>\
		</soap:Body>\
	</soap:Envelope>';
	
	
	$.ajax({
		url: o.SPWebSite + "_vti_bin/Lists.asmx",
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




///////////////////////////////////////////////////////////////////////
// Not Tested /////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
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
				//alert($(v).attr("DocTemplateUrl") );
				
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


////////////////////////////////////////////////////////////////////
// Tested 12/13/2012 ///////////////////////////////////////////////
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
				
			var searchErrors = $(data.responseXML).find("errorstring").text().match("List does not exist");
			
			if(searchErrors)
			{
				listObj.List.Exist = false;
			}
			else
			{			
				var v = $(data.responseXML).find("List");		
				
				listObj.List.Exist = true;
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
			}
			
			o.complete(listObj);
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});




$.intelurate.core.api.lists.listConfiguration = (function (options) {
	
	var defaults = {
		webSite: null,
		lists: [{ list: { name: "CoolList", templateID: 100,  description: "cool list description", fields: [ { name: "CoolField", type: "Text" },{name: "CoolField", type: "Text" },{name: "CoolField", type: "Text" } ]} }],
		complete: function (data) { 
		
		}
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	var index = -1;
	
	testList();
	
	function testList()
	{		
		index++;
		var v = lists[index];
		
		var name = v.name;
		var description = v.description;
		var templateID = v.templateID;
		
		$.intelurate.core.api.lists.getList({
			webSite: o.webSite,
			listName: name,
			complete: function (data) {
				 
				if(data.List.Exist == true)
				{
					alert("exist");
				}
				else
				{
					alert("doesnt exist");
					
					$.intelurate.core.api.lists.AddList({
						webSite: o.webSite,
						listName: name,
						description: description,
						template: templateID,
						complete: function(data)
						{
							var xmlStr = '<Fields>'+ 
								'<Method ID="2">'+
									'<Field Type="Text" Name="CoolTitle" DisplayName="CoolTitle" Required="FALSE" FromBaseType="TRUE" MaxLength="255" Description="Title of your document" />'+
								'</Method>'+	
								'<Method ID="3">' +
									'<Field Type="DateTime" Name="Address" DisplayName="Address" Required="FALSE" FromBaseType="FALSE" MaxLength="255" Description="Your Address" />' +
								'</Method>'+
								'</Fields>';
							
							$.intelurate.core.api.lists.UpdateList({
							listName: name,
							listProperties: null,
							newFields: xmlStr,
							updateFields: null,
							deleteFields: null,
							listVersion: null,
							complete: function(json){}
							});

						}
					});
				}
			}
		});	
			
	}
	
});

/////////////////////////////////////////////////////////////////////////
// NOt Tested  //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.AddList = (function (options) {
	
	var defaults = {
		webSite: null,  //SPWeb Url ex. http://sharepoint.com/sites/currentWeb/
		listName: null,  //ListName
		description: null,
		template: null, //ID or ListTemplateName
		complete: function(json){}
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
	
	var templateID = "";
	
	if(typeof(o.template) == number)
	{
		templateID = o.template;
	}
	else{
			
		switch(o.template)
		{
			case "GenericList":
				templateID = 100;	
			break;
			case "DocumentLibrary":
				templateID = 101;	
			break;
			case "Survey":
				templateID = 102;	
			break;
			case "Links":
				templateID = 103;	
			break;
			case "Announcements":
				templateID = 104;	
			break;
			case "Contacts":
				templateID = 105;	
			break;
			case "Events":
				templateID = 106;	
			break;	
			case "Tasks":
				templateID = 107;	
			break;
			case "DiscussionBoard":
				templateID = 108;	
			break;
			case "PictureLibrary":
				templateID = 109;	
			break;											
		}
	}
	
	var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
			  <soap:Body>\
				<AddList xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
				  <listName>'+ o.listName +'</listName>\
				  <description>'+ o.description +'</description>\
				  <templateID>'+ templateID +'</templateID>\
				</AddList>\
			  </soap:Body>\
			</soap:Envelope>';
	
	
	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/AddList");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
			
			
			//console.log(data.responseXML.xml);
			
				
			/*
			
			var attachmentJsonObj  = { "Attachment": [] };
			
			$(data.responseXML).find("Attachment").each(function (index, val) {
				if($(val).text() != undefined)
				{
					attachmentJsonObj.Attachment[index] = $(val).text();
				}
			});
			*/
			
			
			o.complete();					
			
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});



/////////////////////////////////////////////////////////////////////////
// Not Tested  //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.UpdateList = (function (options) {
	
	var defaults = {
		webSite: null,
		listName: null,
		listProperties: null,
		newFields: null,
		updateFields: null,
		deleteFields: null,
		listVersion: null,
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
						<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <listName>'+ o.listName +'</listName>';
						  
						  if(o.listProperties != null)
						  {
						  	soapEnv += '<listProperties>'+ o.listProperties +'</listProperties>';
						  }
						  if(o.newFields != null)
						  {
						  	soapEnv += '<newFields>'+ o.newFields +'</newFields>';
						  }
						  
						  if(o.updateFields != null)
						  {						  
						  	soapEnv += '<updateFields>'+ o.updateFields +'</updateFields>';
						  }
						  
						  if(o.deleteFields != null)
						  {
						  	soapEnv += '<deleteFields>'+ o.deleteFields +'</deleteFields>';
						  }
						  
						  if(o.listVersion != null)
						  {
						  	soapEnv += '<listVersion>'+ o.listVersion +'</listVersion>';
						  }
						  
				soapEnv += '</UpdateList>\
					  </soap:Body>\
					</soap:Envelope>';
						
	
	$.ajax({
		url: o.webSite + "_vti_bin/Lists.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/UpdateList");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {
			
			
			console.log(data.responseXML.xml);
			
				
			/*
			
			var attachmentJsonObj  = { "Attachment": [] };
			
			$(data.responseXML).find("Attachment").each(function (index, val) {
				if($(val).text() != undefined)
				{
					attachmentJsonObj.Attachment[index] = $(val).text();
				}
			});
			
			o.Complete(attachmentJsonObj);					
			*/
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});



















































////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 ////////////////////////////////////////////////
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



/////////////////////////////////////////////////////////////////////////
// Tested 11/21/2012 ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getCurrentUserInfo = (function (options) {
	
	var defaults = {
		webSite: null,  //SPWeb Url ex. http://sharepoint.com/sites/currentWeb/
		complete: function(userInfo){}
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


////////////////////////////////////////////////////////////////////
// Tested 11-21-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getGroupCollectionFromUser = (function (options) {
	
	var defaults = {
		webSite: null,
		userLoginName: null,
		complete: function(groups){}
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
		
			var GroupsObj = { "Groups": [] };

			$(data.responseXML).find("Group").each(function (i, v) {
				GroupsObj.Groups[i] = {};						
				GroupsObj.Groups[i].ID = $(v).attr("ID");
				GroupsObj.Groups[i].Name = $(v).attr("Name");
				GroupsObj.Groups[i].Description = $(v).attr("Description");
				GroupsObj.Groups[i].OwnerID = $(v).attr("OwnerID");
				GroupsObj.Groups[i].OwnerIsUser = $(v).attr("OwnerIsUser");
			});
			
			o.complete(Groups);
				
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});

////////////////////////////////////////////////////////////////////
// Not Tested //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.userGroup.getUserCollectionFromGroup = (function (options){
	
		
	var defaults = {
		webSite: null,
		groupName: null,
		complete: function(data){}
	}

	var options = $.extend(defaults, options);
	var o = options;
	
	if(o.webSite == null)
	{
		o.webSite = (L_Menu_BaseUrl + "/")
	}
	
	var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
					  <soap:Body>\
						<GetUserCollectionFromGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">\
						  <groupName>' + o.groupName + '</groupName>\
						</GetUserCollectionFromGroup>\
					  </soap:Body>\
					</soap:Envelope>';
	
	$.ajax({
		url: o.webSite + "_vti_bin/UserGroup.asmx",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/GetUserCollectionFromGroup");
		},
		type: "POST",
		dataType: "xml",
		data: soapEnv,
		complete: function (data) {

			var UsersObj = { "Users": [] };

			$(data.responseXML).find("User").each(function (i, v) {
				UsersObj.Users[i] = {};						
				UsersObj.Users[i].ID = $(v).attr("ID");
				UsersObj.Users[i].Name = $(v).attr("Name");
				UsersObj.Users[i].LoginName = $(v).attr("LoginName");
				UsersObj.Users[i].Email = $(v).attr("Email");
				UsersObj.Users[i].IsSiteAdmin = $(v).attr("IsSiteAdmin");
				UsersObj.Users[i].IsDomainGroup = $(v).attr("IsDomainGroup");
			});

			o.complete(UsersObj);
	
		},
		contentType: "text/xml; charset=\"utf-8\""
	});
});


////////////////////////////////////////////////////////////////////
// Tested 11/21/2012////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
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



////////////////////////////////////////////////////////////////////
// Tested 10/25/2012  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.utilities.charConverter = ({						
	
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
		var chars = [ { char: ['\n', '<br/>'] }, { char: ['\r', '<br/>'] }];
		
		$.each(chars, function(i, v){	
			var re = new RegExp(v.char[0], "g");
			str = str.replace(re, v.char[1]);										
		});	
		
		return str;
	}	
});



////////////////////////////////////////////////////////////////////
// Tested  11/26/2012 //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.utilities.checkForDate = ({						
	
	CAMLDateConverter: function(str)
	{				
		var dateBuilder = null;
				
		//2008-08-10T10:00:00Z 
		if(typeof(str) != "number")
		{
			
			if( (str).match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/) ) //month-day-year, 10-2-2012
			{
				var dataArray = (str).split(/-/g);
				var year = dataArray[2];
				var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
				var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];									
				dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";					
			}
			else if( (str).match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/) ) //month/day/year, 10/02/2012
			{
				var dataArray = (str).split(/\//g);
				var year = dataArray[2];
				var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
				var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";					
			}
			else if( (str).match(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/) ) // year/month/day, 2012/08/02
			{
				var dataArray = (str).split(/\//g);
				var year = dataArray[0];
				var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
				dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";					
			}
			else if( (str).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/) ) // year-month-day, 2012-08-02
			{
				var dataArray = (str).split(/-/g);
				var year = dataArray[0];
				var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
				dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";					
			}									
			else if( (str).match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/) ) //month-day-year 10:00:23
			{
				var datTimeArray = (str).split(/ /g);
				var dataArray = datTimeArray[0].split(/-/g);					
				var year = dataArray[2];
				var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
				var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";	
												
			}
			else if( (str).match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/) ) // month/day/year 10:00:23
			{
				var datTimeArray = (str).split(/ /g);
				var dataArray = datTimeArray[0].split(/\//g);					
				var year = dataArray[2];
				var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
				var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";	
												
			}
			else if( (str).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/) ) //year-month-day 10:00:23
			{
				var datTimeArray = (str).split(/ /g);
				var dataArray = datTimeArray[0].split(/-/g);					
				var year = dataArray[0];
				var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
				dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";	
												
			}
			else if( (str).match(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/) ) // year/month/day 10:00:23
			{
				var datTimeArray = (str).split(/ /g);
				var dataArray = datTimeArray[0].split(/\//g);					
				var year = dataArray[0];
				var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
				var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
				dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";	
												
			}				
			else if(str == "Now()") // Now will return the exact date and time
			{
				var date = new Date();
				var year = date.getFullYear();
				var month = ((date.getMonth() + 1).length == 1) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
				var day = (date.getDate().length == 1) ? "0" + date.getDate() : date.getDate();
				var hours = (date.getHours().length == 1) ? "0" + date.getHours() : date.getHours();
				var minutes = (date.getMinutes().length == 1) ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = (date.getSeconds().length == 1) ? "0" + date.getSeconds() : date.getSeconds();
				
				dateBuilder = year + '-' + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "Z";	
				
			}
			else if(str == "Today()") // Today will return the start of the date
			{
				var date = new Date();
				var year = date.getFullYear();
				var month = ((date.getMonth() + 1).length == 1) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
				var day = (date.getDate().length == 1) ? "0" + date.getDate() : date.getDate();
				
				dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";					
			}		
		}
		
		return dateBuilder;
	}	
});
