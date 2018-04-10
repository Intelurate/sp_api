        (function ($) {

            $.intelurateXD = {

                items: {
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
                },
                query: {
                    stringBuilder: "",
                    Execute: function () {
                        var strCo = '$.intelurate.core.api.query' + this.stringBuilder + '.Execute()';
                        this.Clear();
                        return strCo;
                    },
                    Clear: function () {
                        this.stringBuilder = "";
                        return this;
                    },
                    Where: function (Field) {
                        this.stringBuilder += '.Where("' + Field + '")';
                        return this;
                    },
                    And: function (Field) {
                        this.stringBuilder += '.And("' + Field + '")';
                        return this;
                    },
                    Or: function (Field) {
                        this.stringBuilder += '.Or("' + Field + '")';
                        return this;
                    },
                    Equal: function (Value) {
                        this.stringBuilder += '.Equal("' + Value + '")';
                        return this;
                    },
                    Eq: function (Value) {
                        this.stringBuilder += '.Eq("' + Value + '")';
                        return this;
                    },
                    NotEqual: function (Value) {
                        this.stringBuilder += '.NotEqual("' + Value + '")';
                        return this;
                    },
                    Neq: function (Value) {
                        this.stringBuilder += '.Neq("' + Value + '")';
                        return this;
                    },
                    GreaterThan: function (Value) {
                        this.stringBuilder += '.GreaterThan("' + Value + '")';
                        return this;
                    },
                    Gt: function (Value) {
                        this.stringBuilder += '.Gt("' + Value + '")';
                        return this;
                    },
                    GreaterThanOrEqual: function (Value) {
                        this.stringBuilder += '.GreaterThanOrEqual("' + Value + '")';
                        return this;
                    },
                    Geq: function (Value) {
                        this.stringBuilder += '.Geq("' + Value + '")';
                        return this;
                    },
                    LessThan: function (Value) {
                        this.stringBuilder += '.LessThan("' + Value + '")';
                        return this;
                    },
                    Lt: function (Value) {
                        this.stringBuilder += '.GreaterThan("' + Value + '")';
                    },
                    LessThanOrEqual: function (Value) {
                        this.stringBuilder += '.LessThanOrEqual("' + Value + '")';
                    },
                    Leq: function (Value) {
                        this.stringBuilder += '.Leq("' + Value + '")';
                    },
                    IsNull: function (Value) {
                        this.stringBuilder += '.IsNull("' + Value + '")';
                        return this;
                    },
                    BeginsWith: function (Value) {
                        this.stringBuilder += '.BeginsWith("' + Value + '")';
                        return this;
                    },
                    Contains: function (Value) {
                        this.stringBuilder += '.Contains("' + Value + '")';
                        return this;
                    },
                    ContainsEach: function (Value) {
                        this.stringBuilder += '.ContainsEach("' + Value + '")';
                        return this;
                    },
                    OrderBy: function (fields, ascending) {
                        this.stringBuilder += '.OrderBy("' + fields + '")';
                        return this;

                    },
                    GroupBy: function (fields, ascending) {
                        this.stringBuilder += '.GroupBy("' + fields + '")';
                        return this;
                    }

                },
                lists: {

                    getListItems: function (proxy, options) {

                        var defaults = {
                            webSite: null,
                            listName: null,
                            fields: null,
                            mapping: null,
                            query: null,
                            folderPath: null,
                            scope: null,
                            rowLimit: 100,
                            complete: function (data) { }
                        }

                        var options = $.extend(defaults, options);
                        var o = options;

                        var strData = JSON.stringify(options);

                        $.intelurateXD.utilities.dataCall({
                            proxy: proxy,
                            data: strData,
                            type: "getListItems",
                            complete: function (data) {
                                o.complete(data);
                            }
                        });
                    },
                    newListItems: function (proxy, options) {

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

                        var strData = JSON.stringify(options);

                        $.intelurateXD.utilities.dataCall({
                            proxy: proxy,
                            data: strData,
                            type: "newListItems",
                            complete: function (data) {
                                o.complete(data);
                            }
                        });
                    },
                    updateListItems: function (proxy, options) {

                        var defaults = {
                            webSite: null,
                            listName: null,
                            updateItems: null,
                            fields: null,
                            richText: true,
                            complete: function (data) { }
                        }

                        var options = $.extend(defaults, options);
                        var o = options;

                        var strData = JSON.stringify(options);

                        $.intelurateXD.utilities.dataCall({
                            proxy: proxy,
                            data: strData,
                            type: "updateListItems",
                            complete: function (data) {
                                o.complete(data);
                            }
                        });
                    }
                },
                userGroup: {

                },
                utilities: {

                    dataCall: function (options) {

                        var defaults = {
                            proxy: null,
                            data: null,
                            type: null,
                            complete: function (data) { }
                        }

                        var options = $.extend(defaults, options);
                        var o = options;
                        var iFrameID = Math.random().toString().split(".")[1];

                        $('body').prepend('<iframe id="' + iFrameID + '" name="' + iFrameID + '" src="about:blank" style="display:none;"></iframe>');
                        var dataStrBuilder = "?";

                        dataStrBuilder += "methodType=" + o.type;
                        dataStrBuilder += "&data=" + o.data;
                        dataStrBuilder += "&origin=" + window.location.protocol + "//" + window.location.host;

                        var dataStringURL = o.proxy + dataStrBuilder;

                        $('body #' + iFrameID).attr("src", dataStringURL);

                        var obj = document.getElementById(iFrameID);
                        var num = 0;

                        $('body #' + iFrameID).load(function () {
                            num++;

                            if (num == 2) {

                                o.complete($.parseJSON(obj.contentWindow.name));

                                $(this).remove();
                            }

                        });
                    }
                }

            }
        })(jQuery);



        ///Application
        $(document).ready(function () {

            var proxySite = "http://sharepoint.ethamatics.net/Demo/SitePages/Test.aspx";

            $.intelurateXD.lists.getListItems(proxySite, {
                webSite: "http://sharepoint.ethamatics.net/Demo/",
                listName: "TestList",
                fields: ["ID", "Title", "Cool Test Text"],
                query: $.intelurateXD.query.Where("Title").Eq("Hello").Or("Title").Contains("World").Execute(),
                complete: function (data) {

                    var strBuilder = "";
                    $.each(data.Rows, function (i, v) {
                        strBuilder += '<li style="overflow:hidden;border-bottom:1px solid green;">\
                        <span style="width:50px;float:left;">ID: ' + v.ID + '</span>\
                        <span style="width:200px;float:left;">Title: ' + v.Title + '</span>\
                        <span style="width:200px;float:left;">Description: ' + v.CoolTestText + '</span>\
                        </li>';
                    });

                    $("#list").html(strBuilder);
                }
            });

            /*
            $.intelurateXD.lists.newListItems(proxySite, {
            webSite: "http://sharepoint.ethamatics.net/Demo/",
            listName: "TestList",
            newItems: $.intelurateXD.items.NewItem().Field("Title", "zzzzzzzzzzzzzzzzzz beans").Field("Cool Test Text", "nnnnnnnnnnnnnnnnnnnnnnn").Execute(),
            fields: ["ID", "Title", "Cool Test Text"],    
            complete: function (data) {

            alert(data);
            }
            });
            

 
            $.intelurateXD.lists.updateListItems(proxySite, {
            webSite: "http://sharepoint.ethamatics.net/Demo/",
            listName: "TestList",
            updateItems: $.intelurateXD.items.UpdateItem(9).Field("Title", "yoooooooooooooooooooooo").Field("Cool Test Text", "foooooooooooooooooo").Execute(),
            fields: ["ID", "Title", "Cool Test Text"],
            complete: function (data) {

            alert(data);
            }
            });
            */
        });
