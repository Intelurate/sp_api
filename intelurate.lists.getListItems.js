////////////////////////////////////////////////////////////////////
// Tested 10-9-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
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
	

	var createNewCache = true;		
	
	if(o.cache)
	{				
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
	
	function IsJsonString(str) {
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




