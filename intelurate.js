//JSON 2
if (typeof JSON !== 'object') { JSON = {} } (function () { 'use strict'; function f(n) { return n < 10 ? '0' + n : n } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key) } if (typeof rep === 'function') { value = rep.call(holder, key, value) } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null' } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null' } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === 'string') { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v) } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' ' } } else if (typeof space === 'string') { indent = space } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify') } return str('', { '': value }) } } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j } throw new SyntaxError('JSON.parse') } } }());


//Base64
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } };
//Query String
(function (e) { e.QueryString = function (e) { if (e == "") return {}; var t = {}; for (var n = 0; n < e.length; ++n) { var r = e[n].split("="); if (r.length != 2) continue; t[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")) } return t }(window.location.search.substr(1).split("&")) })(jQuery);
//MD5
var MD5 = function (e) { function t(e, t) { return e << t | e >>> 32 - t } function n(e, t) { var n, r, i, s, o; i = e & 2147483648; s = t & 2147483648; n = e & 1073741824; r = t & 1073741824; o = (e & 1073741823) + (t & 1073741823); if (n & r) { return o ^ 2147483648 ^ i ^ s } if (n | r) { if (o & 1073741824) { return o ^ 3221225472 ^ i ^ s } else { return o ^ 1073741824 ^ i ^ s } } else { return o ^ i ^ s } } function r(e, t, n) { return e & t | ~e & n } function i(e, t, n) { return e & n | t & ~n } function s(e, t, n) { return e ^ t ^ n } function o(e, t, n) { return t ^ (e | ~n) } function u(e, i, s, o, u, a, f) { e = n(e, n(n(r(i, s, o), u), f)); return n(t(e, a), i) } function a(e, r, s, o, u, a, f) { e = n(e, n(n(i(r, s, o), u), f)); return n(t(e, a), r) } function f(e, r, i, o, u, a, f) { e = n(e, n(n(s(r, i, o), u), f)); return n(t(e, a), r) } function l(e, r, i, s, u, a, f) { e = n(e, n(n(o(r, i, s), u), f)); return n(t(e, a), r) } function c(e) { var t; var n = e.length; var r = n + 8; var i = (r - r % 64) / 64; var s = (i + 1) * 16; var o = Array(s - 1); var u = 0; var a = 0; while (a < n) { t = (a - a % 4) / 4; u = a % 4 * 8; o[t] = o[t] | e.charCodeAt(a) << u; a++ } t = (a - a % 4) / 4; u = a % 4 * 8; o[t] = o[t] | 128 << u; o[s - 2] = n << 3; o[s - 1] = n >>> 29; return o } function h(e) { var t = "", n = "", r, i; for (i = 0; i <= 3; i++) { r = e >>> i * 8 & 255; n = "0" + r.toString(16); t = t + n.substr(n.length - 2, 2) } return t } function p(e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t } var d = Array(); var v, m, g, y, b, w, E, S, x; var T = 7, N = 12, C = 17, k = 22; var L = 5, A = 9, O = 14, M = 20; var _ = 4, D = 11, P = 16, H = 23; var B = 6, j = 10, F = 15, I = 21; e = p(e); d = c(e); w = 1732584193; E = 4023233417; S = 2562383102; x = 271733878; for (v = 0; v < d.length; v += 16) { m = w; g = E; y = S; b = x; w = u(w, E, S, x, d[v + 0], T, 3614090360); x = u(x, w, E, S, d[v + 1], N, 3905402710); S = u(S, x, w, E, d[v + 2], C, 606105819); E = u(E, S, x, w, d[v + 3], k, 3250441966); w = u(w, E, S, x, d[v + 4], T, 4118548399); x = u(x, w, E, S, d[v + 5], N, 1200080426); S = u(S, x, w, E, d[v + 6], C, 2821735955); E = u(E, S, x, w, d[v + 7], k, 4249261313); w = u(w, E, S, x, d[v + 8], T, 1770035416); x = u(x, w, E, S, d[v + 9], N, 2336552879); S = u(S, x, w, E, d[v + 10], C, 4294925233); E = u(E, S, x, w, d[v + 11], k, 2304563134); w = u(w, E, S, x, d[v + 12], T, 1804603682); x = u(x, w, E, S, d[v + 13], N, 4254626195); S = u(S, x, w, E, d[v + 14], C, 2792965006); E = u(E, S, x, w, d[v + 15], k, 1236535329); w = a(w, E, S, x, d[v + 1], L, 4129170786); x = a(x, w, E, S, d[v + 6], A, 3225465664); S = a(S, x, w, E, d[v + 11], O, 643717713); E = a(E, S, x, w, d[v + 0], M, 3921069994); w = a(w, E, S, x, d[v + 5], L, 3593408605); x = a(x, w, E, S, d[v + 10], A, 38016083); S = a(S, x, w, E, d[v + 15], O, 3634488961); E = a(E, S, x, w, d[v + 4], M, 3889429448); w = a(w, E, S, x, d[v + 9], L, 568446438); x = a(x, w, E, S, d[v + 14], A, 3275163606); S = a(S, x, w, E, d[v + 3], O, 4107603335); E = a(E, S, x, w, d[v + 8], M, 1163531501); w = a(w, E, S, x, d[v + 13], L, 2850285829); x = a(x, w, E, S, d[v + 2], A, 4243563512); S = a(S, x, w, E, d[v + 7], O, 1735328473); E = a(E, S, x, w, d[v + 12], M, 2368359562); w = f(w, E, S, x, d[v + 5], _, 4294588738); x = f(x, w, E, S, d[v + 8], D, 2272392833); S = f(S, x, w, E, d[v + 11], P, 1839030562); E = f(E, S, x, w, d[v + 14], H, 4259657740); w = f(w, E, S, x, d[v + 1], _, 2763975236); x = f(x, w, E, S, d[v + 4], D, 1272893353); S = f(S, x, w, E, d[v + 7], P, 4139469664); E = f(E, S, x, w, d[v + 10], H, 3200236656); w = f(w, E, S, x, d[v + 13], _, 681279174); x = f(x, w, E, S, d[v + 0], D, 3936430074); S = f(S, x, w, E, d[v + 3], P, 3572445317); E = f(E, S, x, w, d[v + 6], H, 76029189); w = f(w, E, S, x, d[v + 9], _, 3654602809); x = f(x, w, E, S, d[v + 12], D, 3873151461); S = f(S, x, w, E, d[v + 15], P, 530742520); E = f(E, S, x, w, d[v + 2], H, 3299628645); w = l(w, E, S, x, d[v + 0], B, 4096336452); x = l(x, w, E, S, d[v + 7], j, 1126891415); S = l(S, x, w, E, d[v + 14], F, 2878612391); E = l(E, S, x, w, d[v + 5], I, 4237533241); w = l(w, E, S, x, d[v + 12], B, 1700485571); x = l(x, w, E, S, d[v + 3], j, 2399980690); S = l(S, x, w, E, d[v + 10], F, 4293915773); E = l(E, S, x, w, d[v + 1], I, 2240044497); w = l(w, E, S, x, d[v + 8], B, 1873313359); x = l(x, w, E, S, d[v + 15], j, 4264355552); S = l(S, x, w, E, d[v + 6], F, 2734768916); E = l(E, S, x, w, d[v + 13], I, 1309151649); w = l(w, E, S, x, d[v + 4], B, 4149444226); x = l(x, w, E, S, d[v + 11], j, 3174756917); S = l(S, x, w, E, d[v + 2], F, 718787259); E = l(E, S, x, w, d[v + 9], I, 3951481745); w = n(w, m); E = n(E, g); S = n(S, y); x = n(x, b) } var q = h(w) + h(E) + h(S) + h(x); return q.toLowerCase() };

////////////////////////////////////////////////////////////////////////////
// Main Namespace //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
(function ($) { $.intelurate = {} })(jQuery);
$.intelurate.core = {};
$.intelurate.utilities = {};
$.intelurate.core.api = {};
$.intelurate.core.api.lists = {};
$.intelurate.core.api.userGroup = {};
$.intelurate.core.api.webPartPages = {};

////////////////////////////////////////////////////////////////////////////
// Tested 11-20-2012 ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.items = {
    currentIndex: -1,
    Execute: function () {
        var completeItemArray = this.ItemArray;
        this.ItemArray = [];
        this.currentIndex = -1;
        return completeItemArray;
    },
    ItemArray: new Array(),
    NewItem: function () {
        this.currentIndex++;
        this.ItemArray[this.currentIndex] = { item: [] };
        return this;
    },
    UpdateItem: function (itemID) {
        this.currentIndex++;
        this.ItemArray[this.currentIndex] = { item: [itemID] };
        return this;
    },
    DeleteItem: function (itemID, file) // New File delete needs to be tested 
    {
        var isFile = undefined;
        if (file != undefined) {
            isFile = file;
        }

        this.currentIndex++;
        this.ItemArray[this.currentIndex] = { item: itemID, file: isFile };
        return this;
    },
    Field: function (field, value) {
        this.ItemArray[this.currentIndex].item.push([field, value])
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
    Execute: function () {
        var CAML = this.OrderByBuilder + '<Where>' + this.QueryBuilder + '</Where>' + this.GroupByBuilder;
        this.Clear();
        return CAML;
    },
    Clear: function () {
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
    And: function (Field) {
        this.Filter = "And";
        this.Field = Field;
        return this;
    },
    Or: function (Field) {
        this.Filter = "Or";
        this.Field = Field;
        return this;
    },
    Equal: function (Value) {
        this.Operator = "Eq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Eq: function (Value) {
        this.Operator = "Eq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    NotEqual: function (Value) {  //Neq
        this.Operator = "Neq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Neq: function (Value) {  //Neq
        this.Operator = "Neq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    GreaterThan: function (Value) {  //Gt
        this.Operator = "Gt";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Gt: function (Value) {  //Gt
        this.Operator = "Gt";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    GreaterThanOrEqual: function (Value) {  //Geq
        this.Operator = "Geq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Geq: function (Value) {  //Geq
        this.Operator = "Geq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    LessThan: function (Value) {  //Lt
        this.Operator = "Lt";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Lt: function (Value) {  //Lt
        this.Operator = "Lt";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    LessThanOrEqual: function (Value) {  //Leq
        this.Operator = "Leq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Leq: function (Value) {  //Leq
        this.Operator = "Leq";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    IsNull: function (Value) {  //IsNull
        this.Operator = "IsNull";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    BeginsWith: function (Value) {  //BeginsWith
        this.Operator = "BeginsWith";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    Contains: function (Value) {  //Contains
        this.Operator = "Contains";
        this.Value = Value;
        this.QueryBuilderFunc();
        return this;
    },
    ContainsEach: function (Value) {  //ContainsEach

        var containsMultiValue = Value.split(/ /g);
        var thisObj = this;

        $.each(containsMultiValue, function (i, Value) {

            if (this.Filter == undefined) {
                thisObj.Operator = "Contains";
                thisObj.Value = Value;
                thisObj.QueryBuilderFunc();
                thisObj.Filter = "Or";
            }
            else {
                thisObj.Operator = "Contains";
                thisObj.Value = Value;
                thisObj.QueryBuilderFunc();
            }

        });

        return this;
    },
    OrderBy: function (fields, ascending) {
        var AscDesc = "True";

        if (ascending == "Desc") {
            AscDesc = "False";
        }

        var OrderByBuilder = "";

        OrderByBuilder += "<OrderBy>";

        if (typeof (fields) == "string") {
            OrderByBuilder += '<FieldRef Name="' + fields + '" Ascending="' + AscDesc + '" />';
        }
        else if (typeof (fields) == "object") {
            $.each(fields, function (index, value) {
                OrderByBuilder += '<FieldRef Name="' + value + '" Ascending="' + AscDesc + '" />';
            });
        }

        OrderByBuilder += "</OrderBy>";

        this.OrderByBuilder = OrderByBuilder;

        if (this.OrderByBuilder != "") {
            this.Exist = true;
        }

        return this;

    },
    GroupBy: function (fields, ascending) {
        var AscDesc = "True";

        if (ascending == "Desc") {
            AscDesc = "False";
        }

        var GroupByBuilder = "";

        GroupByBuilder += '<GroupBy Collapse="FALSE">';

        if (typeof (fields) == "string") {
            GroupByBuilder += '<FieldRef Name="' + fields + '" Ascending="' + AscDesc + '" />';
        }
        else if (typeof (fields) == "object") {
            $.each(fields, function (index, value) {
                GroupByBuilder += '<FieldRef Name="' + value + '" Ascending="' + AscDesc + '" />';
            });
        }

        GroupByBuilder += '</GroupBy>';

        this.GroupByBuilder = GroupByBuilder;

        if (this.GroupByBuilder != "") {
            this.Exist = true;
        }


        return this;

    },
    QueryBuilderFunc: function () {
        this.CommandBuilder = "";

        fType = "Text";
        dateType = "";

        var checkdate = $.intelurate.utilities.checkForDate.CAMLDateConverter(this.Value);

        if (checkdate != null) {
            fType = 'DateTime';
            dateType = ' IncludeTimeValue="TRUE" ';
            this.Value = checkdate;
        }

        if (this.Filter != "") {
            this.CommandBuilder += '<' + this.Filter + '>';
            this.CommandBuilder += this.QueryBuilder;
            this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '"  ' + dateType + ' /><Value Type="' + fType + '">' + this.Value + '</Value></' + this.Operator + '>';
            this.CommandBuilder += '</' + this.Filter + '>';
            this.QueryBuilder = this.CommandBuilder;
        }
        else {
            this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '"  ' + dateType + ' /><Value Type="' + fType + '">' + this.Value + '</Value></' + this.Operator + '>';
            this.QueryBuilder = this.CommandBuilder;
        }

        if (this.QueryBuilder != "") {
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
        FieldBuilder: new Array(),
        Count: 0,
        Clear: function () {
            this.Count = 0;
            this.FieldBuilder.length = 0;
        },
        Field: function (type, displayName) //Text, DateTime, Counter
        {
            this.Count++;
            this.FieldBuilder.push('<Method ID="' + this.Count + '"><Field ReadOnly="FALSE" Type="' + type + '" DisplayName="' + displayName + '" FromBaseType="TRUE" /></Method>');
            return this;
        },
        Add: function () {
            var finished = '<Fields>' + this.FieldBuilder.join('') + '</Fields>';
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
        scope: null,//Default - Show only the files and subfolders of a specific folder. Recursive - Show all files of all folders. RecursiveAll - Show all files and all subfolders of all folders. FilesOnly - Show only the files of a specific folder.
        rowLimit: 100,
        complete: function (data) { },
        next: null,
        richText: true,
        printXml: false
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    var viewFields = '';
    var QueryFields = new Array();

    $.each(o.fields, function (index, value) {
        viewFields += "<FieldRef Name='" + value.replace(/\s/g, '_x0020_') + "' />";
        QueryFields[index] = "ows_" + value.replace(/\s/g, '_x0020_');
    });

    var soapEnv = new Array();

    soapEnv.push("<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>");
    soapEnv.push("<soapenv:Body>");
    soapEnv.push("<GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>");
    soapEnv.push("<listName>" + o.listName + "</listName>");

    soapEnv.push("<query><Query>");

    if (o.query != null) {
        soapEnv.push(o.query);
    }

    soapEnv.push("</Query></query>");

    soapEnv.push("<viewFields><ViewFields>");
    soapEnv.push(viewFields);
    soapEnv.push("</ViewFields></viewFields>");

    soapEnv.push("<rowLimit>" + o.rowLimit + "</rowLimit>");

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

    soapEnv.push("<queryOptions><QueryOptions>");
    //soapEnv += "<IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns>";
    soapEnv.push(thisScope);
    soapEnv.push(folderLink);


    if (o.next != null) {
        o.next = o.next.replace(/&/g, "&amp;");
        soapEnv.push('<Paging ListItemCollectionPositionNext="' + o.next + '" />');
    }

    soapEnv.push("</QueryOptions></queryOptions>");

    soapEnv.push("</GetListItems></soapenv:Body></soapenv:Envelope>");

    sendRequest();

    function IsJsonObject(str) {
        try {
            $.parseJSON(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function sendRequest() {
        $.ajax({
            url: o.webSite + "_vti_bin/Lists.asmx",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/GetListItems");
            },
            type: "POST",
            dataType: "xml",
            data: soapEnv.join(''),
            complete: function (data) {

                var nextStr = $(data.responseXML).find("rs\\:data, data").attr("ListItemCollectionPositionNext");
                //<rs:data ItemCount="10" ListItemCollectionPositionNext="Paged=TRUE&amp;p_FileLeafRef=CMRA%20Form%20Instructions%2edoc&amp;p_ID=29">							
                o.next = nextStr;

                if (o.printXml == true) {
                    console.log(data.responseXML.xml);
                }
        
                var myJSONObject = { Rows: [] };

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

                        if (IsJsonObject(Value)) {
                            myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
                        }
                        else {
                            if (o.richText == true) {
                                myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.richText(Value);
                            }
                            else {
                                myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.displayHTML(Value);
                            }
                        }
                    });
                });

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

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    if (o.newItems != null) {
        $.each(o.newItems, function (ci, cv) {
            commandBuilder += '<Method ID="' + ci + '" Cmd="New">';
            $.each(cv.item, function (i, v) {
                commandBuilder += '<Field Name="' + v[0].replace(/ /g, "_x0020_") + '">' + $.intelurate.utilities.charConverter.convertTagsToCodes(v[1]) + '</Field>';
            });
            commandBuilder += '</Method>';
        });

        if (o.fields != null) {
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


        var soapEnv = new Array();

        soapEnv.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
			"<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
				"<soap:Body>" +
					"<UpdateListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>" +
						"<listName>" + o.listName + "</listName>" +
						"<updates>" +
							"<Batch OnError='Continue' >");

        soapEnv.push(commandBuilder);

        soapEnv.push("</Batch>" +
						"</updates>" +
					"</UpdateListItems>" +
				"</soap:Body>" +
			"</soap:Envelope>");

        $.ajax({
            url: o.webSite + "_vti_bin/Lists.asmx",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems");
            },
            type: "POST",
            dataType: "xml",
            data: soapEnv.join(''),
            complete: function (data) {

                if (o.printXml == true) {
                    console.log(data.responseXML.xml);
                }

                var myJSONObject = { Rows: [] };

                if (o.fields != null) {

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

                            if (IsJsonObject(Value)) {
                                myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
                            }
                            else {
                                if (o.richText == true) {
                                    myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.richText(Value);
                                }
                                else {
                                    myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.displayHTML(Value);
                                }
                            }
                        });
                    });
                }
                else {
                    myJSONObject = "no return values";
                }

                o.complete(myJSONObject);


            },
            contentType: "text/xml; charset=\"utf-8\""
        });
    }
    else {
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

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    if (o.updateItems != null) {
        $.each(o.updateItems, function (ci, cv) {
            commandBuilder += '<Method ID="' + ci + '" Cmd="Update">';
            commandBuilder += '<Field Name="ID">' + cv.item[0] + '</Field>';
            $.each(cv.item, function (i, v) {
                if (i > 0) {
                    commandBuilder += '<Field Name="' + v[0].replace(/ /g, "_x0020_") + '">' + $.intelurate.utilities.charConverter.convertTagsToCodes(v[1]) + '</Field>';
                }
            });
            commandBuilder += '</Method>';
        });

        if (o.fields != null) {
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

                if (o.printXml == true) {
                    console.log(data.responseXML.xml);
                }

                var myJSONObject = { Rows: [] };

                if (o.fields != null) {

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

                            if (IsJsonObject(Value)) {
                                myJSONObject.Rows[orgIndex][key] = $.parseJSON(Value);
                            }
                            else {
                                if (o.richText == true) {
                                    myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.richText(Value);
                                }
                                else {
                                    myJSONObject.Rows[orgIndex][key] = $.intelurate.utilities.charConverter.displayHTML(Value);
                                }
                            }
                        });
                    });
                }
                else {
                    myJSONObject = "no return values";
                }

                o.complete(myJSONObject);

            },
            contentType: "text/xml; charset=\"utf-8\""
        });
    }
    else {
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

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    if (o.deleteItems != null) {
        $.each(o.deleteItems, function (i, v) {
            commandBuilder += '<Method ID="' + i + '" Cmd="Delete">';
            commandBuilder += '<Field Name="ID">' + v.item + '</Field>';
            if (v.file != undefined) {
                commandBuilder += '<Field Name="FileRef">' + v.file + '</Field>';
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

                if (o.printXml == true) {
                    console.log(data.responseXML.xml);
                }

                o.complete();
            },
            contentType: "text/xml; charset=\"utf-8\""
        });
    }
    else {
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
        complete: function (json) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
		<soap:Body>\
			<GetAttachmentCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
				<listName>' + o.ListName + '</listName>\
				<listItemID>' + o.ItemID + '</listItemID>\
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

            var attachmentJsonObj = { "Attachment": [] };

            $(data.responseXML).find("Attachment").each(function (index, val) {
                if ($(val).text() != undefined) {
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

    if (o.webSite == null) {
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

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
					  <soap:Body>\
						<GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <listName>'+ o.listName + '</listName>\
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

            if ($(v).attr("ID") == undefined) {
                listObj.List.Exist = false;
            }
            else {                

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



$.intelurate.core.api.lists.appConfiguration = (function (options) {

    var defaults = {
        webSite: null,
        lists: null,
        complete: function () {

        }
    }

    var options = $.extend(defaults, options);
    var o = options;

    var index = -1;
 
    testList();
    
    function testList() {
        
        index++;

        if (index > (o.lists.length - 1)) {
            o.complete();
            return false;
        }
        else {
            
            var v = o.lists[index];            
            var name = v.name;
            var description = v.description;
            var templateID = v.templateID;        

         
            $.intelurate.core.api.lists.getList({
                webSite: o.webSite,
                listName: name,
                complete: function (data) {
                
                    if (data.List.Exist == true) {
                        testList();                       
                    }
                    else {

                        $.intelurate.core.api.lists.AddList({
                            listName: name,
                            description: description,
                            template: templateID,
                            complete: function (data) {

                                //alert(data.responseXML.xml);

                                if (o.lists[index].fields.length > 0) {

                                    var newFields = $.intelurate.core.api.listFields.newFields;

                                    $.each(o.lists[index].fields, function (i, v) {
                                        newFields.Field(v.type, v.name);
                                    });

                                    newFields = newFields.Add();

                                    var fieldType = o.lists[index].fields.type;
                                    var fieldName = o.lists[index].fields.name;

                                    $.intelurate.core.api.lists.UpdateList({
                                        webSite: o.webSite,
                                        listName: name,
                                        listProperties: null,
                                        newFields: newFields,
                                        updateFields: null,
                                        deleteFields: null,
                                        listVersion: null,
                                        complete: function (json) {
                                            testList();
                                        }
                                    });

                                }
                                else {
                                    testList();
                                }
                            }
                        });
                    }
                }
            });
        }

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
        complete: function (json) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    var templateID = "";
   
    if (typeof (o.template) == "number") {
        templateID = o.template;
    }
    else {

        switch (o.template) {
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
				  <listName>'+ o.listName + '</listName>\
				  <description>'+ o.description + '</description>\
				  <templateID>'+ templateID + '</templateID>\
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
        complete: function (json) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
					  <soap:Body>\
						<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <listName>'+ o.listName + '</listName>';

    if (o.listProperties != null) {
        soapEnv += '<listProperties>' + o.listProperties + '</listProperties>';
    }
    if (o.newFields != null) {
        soapEnv += '<newFields>' + o.newFields + '</newFields>';
    }

    if (o.updateFields != null) {
        soapEnv += '<updateFields>' + o.updateFields + '</updateFields>';
    }

    if (o.deleteFields != null) {
        soapEnv += '<deleteFields>' + o.deleteFields + '</deleteFields>';
    }

    if (o.listVersion != null) {
        soapEnv += '<listVersion>' + o.listVersion + '</listVersion>';
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





////////////////////////////////////////////////////////////////////
// Tested 9-19-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.lists.checkInFile = (function (options) {

    var defaults = {
        webSite: null,
        url: null,
        comment: null,
        checkinType: 1, //A string representation of the values 0, 1 or 2, where 0 = MinorCheckIn, 1 = MajorCheckIn, and 2 = OverwriteCheckIn.
        complete: function (json) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
					  <soap:Body>\
						<CheckInFile xmlns="http://schemas.microsoft.com/sharepoint/soap/">\
						  <pageUrl>' + o.url + '</pageUrl>\
						  <comment>' + o.comment + '</comment>\
						  <CheckinType>' + o.checkinType + '</CheckinType>\
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
        complete: function (userInfo) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
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

            if ($(data.responseXML).find("User").attr("ID") == undefined) {
                /////////////////////////////////////////////////////
                //For getting current user in SHarePoint 2007 ///////
                /////////////////////////////////////////////////////
                if (_spUserId != undefined) {
                    $.intelurate.core.api.lists.getListItems({
                        listName: "UserInfo",
                        fields: ["ID", "Name", "Title", "EMail", "IsSiteAdmin"],
                        query: $.intelurate.core.api.query.Where("ID").Eq(_spUserId.toString()).Execute(),
                        complete: function (data) {                         
                            var UserInfoObj = {
                                "UserInfo": {
                                    ID: data.Rows[0].ID,
                                    Name: data.Rows[0].Title,
                                    LoginName: data.Rows[0].Name,
                                    Email: data.Rows[0].EMail,
                                    IsSiteAdmin: data.Rows[0].IsSiteAdmin
                                }
                            };
                            o.complete(UserInfoObj);
                        }
                    });
                }

            }
            else {

                var UserInfoObj = {
                    "UserInfo": {
                        ID: $(data.responseXML).find("User").attr("ID"),
                        Sid: $(data.responseXML).find("User").attr("Sid"),
                        Name: $(data.responseXML).find("User").attr("Name"),
                        LoginName: $(data.responseXML).find("User").attr("LoginName"),
                        Email: $(data.responseXML).find("User").attr("Email"),
                        Notes: $(data.responseXML).find("User").attr("Notes"),
                        IsSiteAdmin: $(data.responseXML).find("User").attr("IsSiteAdmin"),
                        IsDomainGroup: $(data.responseXML).find("User").attr("IsDomainGroup"),
                        Flags: $(data.responseXML).find("User").attr("Flags")
                    }
                };            
                o.complete(UserInfoObj);
            }
            

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
        complete: function (groups) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
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
$.intelurate.core.api.userGroup.getUserCollectionFromGroup = (function (options) {


    var defaults = {
        webSite: null,
        groupName: null,
        complete: function (data) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
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
        complete: function (groups) { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    $.intelurate.core.api.userGroup.getCurrentUserInfo({
        webSite: o.webSite,
        complete: function (data) {
            $.intelurate.core.api.userGroup.getGroupCollectionFromUser({
                webSite: o.webSite,
                userLoginName: data.UserInfo.LoginName,
                complete: function (data) {
                    o.complete(data.Groups)
                }
            });
        }
    });
});



////////////////////////////////////////////////////////////////////
// Tested 11-21-2012 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.core.api.webPartPages.addWebPart = (function (options) {

    var defaults = {
        webSite: null,
        pageUrl: null,
        webPartXml: null,
        storage: null,
        zoneId: null,
        zoneIndex: null,
        userLoginName: null,
        complete: function () { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    o.pageUrl = window.location.href.split("?")[0];

/*
    o.webPartXml = '<![CDATA[\
<?xml version="1.0" encoding="utf-8"?>\
<WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">\
	<Assembly>Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>\
	<TypeName>Microsoft.SharePoint.WebPartPages.PageViewerWebPart</TypeName>\
	<Title>Page Viewer</Title>\
    <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/PageViewer">app=12345678</ContentLink>\
	<Description>Displays another Web page on this Web page. The other Web page is presented in an IFrame.</Description>\
	<PartImageLarge>/_layouts/images/mscntvwl.gif</PartImageLarge>\
    <Width>500</Width>\
    <Height>500</Height>\
</WebPart>\
]]>';


    alert(o.webPartXml)


//None or Personal or Shared<
var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                <soap:Body>\
                <AddWebPartToZone xmlns="http://microsoft.com/sharepoint/webpartpages">\
                    <pageUrl>' + o.pageUrl + '</pageUrl>\
                    <webPartXml>' + o.webPartXml + '</webPartXml>\
                    <storage>Shared</storage>\
                    <zoneId>FullPage</zoneId>\
                    <zoneIndex>1</zoneIndex>\
                </AddWebPartToZone>\
                </soap:Body>\
            </soap:Envelope>';
*/


  var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                  <soap:Body>\
                    <AddWebPart xmlns="http://microsoft.com/sharepoint/webpartpages">\
                      <pageUrl>' + o.pageUrl + '</pageUrl>\
                      <webPartXml>' + o.webPartXml + '</webPartXml>\
                      <storage>Shared</storage>\
                    </AddWebPart>\
                  </soap:Body>\
                </soap:Envelope>';

    /*
    
    var soapEnv = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
                  <soap:Body>\
                    <DeleteWebPart xmlns="http://microsoft.com/sharepoint/webpartpages">\
                      <pageUrl>' + o.pageUrl + '</pageUrl>\
                      <storageKey>D076AC60-CEF6-4DF2-B047-286EB850FB0F</storageKey>\
                      <storage>Shared</storage>\
                    </DeleteWebPart>\
                  </soap:Body>\
                </soap:Envelope>';
    
  */

    $.ajax({
        url: o.webSite + "_vti_bin/WebPartPages.asmx",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("SOAPAction", "http://microsoft.com/sharepoint/webpartpages/AddWebPart");
        },
        type: "POST",
        dataType: "xml",
        data: soapEnv,
        complete: function (data) {

            o.complete();

            //o.complete(Groups);

        },
        contentType: "text/xml; charset=\"utf-8\""
    });
});



$.intelurate.core.api.webPartPages.installApp = (function (options) {

    var defaults = {
        webSite: null,
        appTitle: null,
        appID: null,
        appDescription: "No Description",
        appWidth: "400",
        appHeight: "500",
        complete: function () { }
    }

    var options = $.extend(defaults, options);
    var o = options;

    if (o.webSite == null) {
        o.webSite = (L_Menu_BaseUrl + "/")
    }

    /*
    var webPartXml = '<![CDATA[<?xml version="1.0" encoding="utf-8"?>\
    <WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">\
    <Assembly>Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>\
    <TypeName>Microsoft.SharePoint.WebPartPages.PageViewerWebPart</TypeName>\
    <Title>' + o.appTitle + '</Title>\
    <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/PageViewer">app=' + o.appID + '</ContentLink>\
    <Description>' + o.appDescription + '</Description>\
    <PartImageLarge>/_layouts/images/mscntvwl.gif</PartImageLarge>\
    <Width>' + o.appWidth + '</Width>\
    <Height>' + o.appHeight + '</Height>\
    </WebPart>]]>';
    */

    
    var webPartXml = '<![CDATA[<?xml version="1.0" encoding="utf-8"?>\
    <WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">\
	    <Assembly>Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>\
	    <TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>\
	    <Title>' + o.appTitle + '</Title>\
	    <Description>Allows authors to enter rich text content.</Description>\
	    <PartImageLarge>/_layouts/images/mscontl.gif</PartImageLarge>\
	    <Content xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\">app=' + o.appID + '</Content>\
    </WebPart>]]>';
    

    var pageUrl = window.location.href.split("?")[0];

    $.intelurate.core.api.webPartPages.addWebPart({
        webSite: o.webSite,
        pageUrl: pageUrl,
        webPartXml: webPartXml,
        complete: function (data) {
            window.location = pageUrl;
            o.complete(data);
        }
    });

});


////////////////////////////////////////////////////////////////////
// Tested 10/25/2012  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
$.intelurate.utilities.charConverter = ({

    convertTagsToCodes: function (str) {
        var tags = [{ char: ['<', '&lt;'] }, { char: ['>', '&gt;'] }];

        $.each(tags, function (i, v) {
            var re = new RegExp(v.char[0], "g");
            str = str.replace(re, v.char[1]);
        });

        return str;
    },
    displayHTML: function (str) {
        var chars = [{ char: ['"', '&quot;'] }, { char: ['<', '&lt;'] }, { char: ['>', '&gt;'] }];

        $.each(chars, function (i, v) {
            var re = new RegExp(v.char[0], "g");
            str = str.replace(re, v.char[1]);
        });

        return $.intelurate.utilities.charConverter.addRequiredChars(str);

    },
    richText: function (str) {
        var chars = [{ char: ['"', '\"'] }];

        $.each(chars, function (i, v) {
            var re = new RegExp(v.char[0], "g");
            str = str.replace(re, v.char[1]);
        });

        return str;
    },
    addRequiredChars: function (str) {
        var chars = [{ char: ['\n', '<br/>'] }, { char: ['\r', '<br/>'] }];

        $.each(chars, function (i, v) {
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

    CAMLDateConverter: function (str) {
        var dateBuilder = null;

        //2008-08-10T10:00:00Z 

        if (typeof (str) == "string") {
            if ((str).match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/)) //month-day-year, 10-2-2012
            {
                var dataArray = (str).split(/-/g);
                var year = dataArray[2];
                var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
                var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";
            }
            else if ((str).match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)) //month/day/year, 10/02/2012
            {
                var dataArray = (str).split(/\//g);
                var year = dataArray[2];
                var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
                var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";
            }
            else if ((str).match(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/)) // year/month/day, 2012/08/02
            {
                var dataArray = (str).split(/\//g);
                var year = dataArray[0];
                var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
                dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";
            }
            else if ((str).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/)) // year-month-day, 2012-08-02
            {
                var dataArray = (str).split(/-/g);
                var year = dataArray[0];
                var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
                dateBuilder = year + '-' + month + "-" + day + "T00:00:00Z";
            }
            else if ((str).match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/)) //month-day-year 10:00:23
            {
                var datTimeArray = (str).split(/ /g);
                var dataArray = datTimeArray[0].split(/-/g);
                var year = dataArray[2];
                var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
                var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";

            }
            else if ((str).match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/)) // month/day/year 10:00:23
            {
                var datTimeArray = (str).split(/ /g);
                var dataArray = datTimeArray[0].split(/\//g);
                var year = dataArray[2];
                var month = (dataArray[0].length == 1) ? "0" + dataArray[0] : dataArray[0];
                var day = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";

            }
            else if ((str).match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/)) //year-month-day 10:00:23
            {
                var datTimeArray = (str).split(/ /g);
                var dataArray = datTimeArray[0].split(/-/g);
                var year = dataArray[0];
                var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
                dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";

            }
            else if ((str).match(/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}[ ][0-9]{2}:[0-9]{2}:[0-9]{2}$/)) // year/month/day 10:00:23
            {
                var datTimeArray = (str).split(/ /g);
                var dataArray = datTimeArray[0].split(/\//g);
                var year = dataArray[0];
                var month = (dataArray[1].length == 1) ? "0" + dataArray[1] : dataArray[1];
                var day = (dataArray[2].length == 1) ? "0" + dataArray[2] : dataArray[2];
                dateBuilder = year + '-' + month + "-" + day + "T" + datTimeArray[1] + "Z";

            }
            else if (str == "Now()") // Now will return the exact date and time
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
            else if (str == "Today()") // Today will return the start of the date
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

