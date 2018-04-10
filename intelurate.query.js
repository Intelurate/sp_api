////////////////////////////////////////////////////////////////////////////
// $.intelurate.core.api.query /////////////////////////////////////////////
// Fluent Interface Deign //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$.intelurate.core.api.query = {	
	QueryBuilder: "",
	OrderByBuilder: "",
	GroupByBuilder: "",
	CommandBuilder: "",
	Filter: "",
	Field: "",
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
	ContainsEach: function(v){  //ContainsEach
	
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
			
		if(this.Filter != "")
		{	
			this.CommandBuilder += '<' + this.Filter + '>';
			this.CommandBuilder += this.QueryBuilder;
			this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '" /><Value Type="Text">' + this.Value + '</Value></' +  this.Operator + '>';
			this.CommandBuilder += '</' + this.Filter + '>';
			this.QueryBuilder = this.CommandBuilder;	
		}
		else
		{
			this.CommandBuilder += '<' + this.Operator + '><FieldRef Name="' + this.Field + '" /><Value Type="Text">' + this.Value + '</Value></' +  this.Operator + '>';				
			this.QueryBuilder = this.CommandBuilder;	
		}
		
		if(this.QueryBuilder != "")
		{
			this.Exist = true;
		}
		
		return this;
	}
					
};