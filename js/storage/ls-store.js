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
				window.localStorage.setItem("chosenpreset", JSON.stringify(element));
				return element;
            }
        });
		callLater(callback, results);
	}

	this.setPreset = function(id, callback){
		var presets = JSON.parse(window.localStorage.getItem("presets"));
		var results = presets.filter(function(element) {
            var settings = element.id;
            if( settings == id ) {
				window.localStorage.setItem("chosenpreset", JSON.stringify(element));
				return element;
            }
        });
		callLater(callback, results);
	}

	this.deletePreset = function(id, callback){
		var presets = JSON.parse(window.localStorage.getItem("presets"));
		for (var i = 0; i < presets.length; i++) {
            var _item = presets[i];
            if( _item['id'] == id ){
            	presets.splice(i, 1);
            }
        }
        window.localStorage.setItem("presets", JSON.stringify(presets));
        callLater(callback, true);

	}

	this.createTempPreset = function(preset, callback){
		window.localStorage.setItem('temp_preset', JSON.stringify(preset));
		callLater(callback, true);
	}

	this.editTempPreset = function(preset, callback){
		window.localStorage.setItem('temp_preset', JSON.stringify(preset));
		callLater(callback, true);
	}

	this.savePreset = function(preset, callback){
		var presets = JSON.parse(window.localStorage.getItem("presets"));
		presets.push(preset);
		window.localStorage.setItem("presets", JSON.stringify(presets));
		window.localStorage.setItem("chosenpreset", JSON.stringify(preset));

		callLater(callback, true);
	}

	//window.localStorage.removeItem("presets");
	var presets = JSON.parse(window.localStorage.getItem("presets"));

	if( presets == null ){
		//Add shit here
		presets = [
			{"id":1, "preset_name":"Default 1", "preset_shapes":["square","triangle", "circle"], "preset_colors": ["Red"], "preset_total_time":"30", "preset_image_time":"2", "preset_down_time":"2"},
			{"id":2, "preset_name":"Default 2", "preset_shapes":["square","triangle", "circle", "diamond"], "preset_colors": ["Red"], "preset_total_time":"45", "preset_image_time":"3", "preset_down_time":"3"}
		];
		window.localStorage.setItem("presets", JSON.stringify(presets));
	}

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    callLater(successCallback);
}
