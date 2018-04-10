$.intelurate.flot = {};

$.intelurate.flot.pie = {
	
	Default: function(options){
		
		var defaults = {
			targetObj: null,
			data: null
		}	
		
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;

		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true
				}
			}
		});
	
	},
	Graph1: function(options){
		
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
	
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true
				}
			},
			legend: {
				show: false
			}
		});	
	},
	Graph2: function(options){
		
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 1,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						background: { opacity: 0.8 }
					}
				}
			},
			legend: {
				show: false
			}
		});
		
	},
	Graph3: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 3/4,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						background: { opacity: 0.5 }
					}
				}
			},
			legend: {
				show: false
			}
		});
	},
	Graph4: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 3/4,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						background: { 
							opacity: 0.5,
							color: '#000'
						}
					}
				}
			},
			legend: {
				show: false
			}
		});
	},
	Graph5: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 3/4,
					label: {
						show: true,
						radius: 3/4,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						background: { 
							opacity: 0.5,
							color: '#000'
						}
					}
				}
			},
			legend: {
				show: false
			}
		});
	},
	Graph6: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 2/3,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			}
		});
	},
	Graph7: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					combine: {
						color: '#999',
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			}
		});
	},	
	Graph8: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius:300,
					label: {
						show: true,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			}
		});
	
	},
	Graph9: function(options){
	
		var defaults = {
			targetObj: null,
			data: null
		}	
		
		var options = $.extend(defaults, options);
		var o = options;
		var data = o.data.Rows;
		
		$.plot($(o.targetObj), data, 
		{
			series: {
				pie: { 
					show: true,
					radius: 1,
					tilt: 0.5,
					label: {
						show: true,
						radius: 1,
						formatter: function(label, series){
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						background: { opacity: 0.8 }
					},
					combine: {
						color: '#999',
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			}
		});
	}				
}