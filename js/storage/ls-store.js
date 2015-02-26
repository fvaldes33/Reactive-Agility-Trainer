var LocalStorageStore = function(successCallback, errorCallback) {

	this.getPresets = function(callback){
		var presets = JSON.parse(window.localStorage.getItem("presets"));
		
		callLater(callback, presets);
	}
	
	this.fillSettings = function(id, callback){
		var presets = JSON.parse(window.localStorage.getItem("presets"));
		var results = presets.filter(function(element) {
            var settings = element.id;
            if( settings == id ) {
            	return element;
            }
        });
		callLater(callback, results);
	}

	//Add shit here
	var presets = [
		{"id":1, "preset_name":"Default 1", "preset_shapes":["square", "triangle", "circle"], "preset_total_time":"300", "preset_image_time":"5", "preset_down_time":"5"},
		{"id":2, "preset_name":"Default 2", "preset_shapes":["square", "triangle", "circle"], "preset_total_time":"600", "preset_image_time":"3", "preset_down_time":"3"}
	];
		
	window.localStorage.setItem("presets", JSON.stringify(presets));
	
	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
    
    callLater(successCallback);
}