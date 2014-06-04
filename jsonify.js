!function (exports) {

    var toString = Object.prototype.toString,
        objType = function (obj) {
            return toString.call(obj).match(/\[object ([a-zA-Z]+)\]/)[1];
        };

    function HTMLElement (html) {
        this.html = html;
    }

    function jsonify (obj) {
        var jsonObj;
        try {
            jsonObj = JSON.parse(JSON.stringify(obj));

        } catch (e) {
            var type = objType(obj);
            if (type.match('Element')) {
                jsonObj = obj.outerHTML.replace(obj.innerHTML, '');
            } else if (type == 'Text') {
                jsonObj = obj.textContent;
            } else if (type == 'Array' || type == 'NodeList') {
                var array = [];
                obj = slice.call(obj);

                obj.forEach(function (item) {
                    array.push(jsonify(item));
                });
                jsonObj = array;
            } else if (type == 'Object') {
                var keys = Object.keys(obj),
                    object = {};
                keys.forEach(function (key) {
                    object[key] = jsonify(obj[key]);
                });
                jsonObj = object;
            } else if (type == 'Function') {
                jsonObj = obj.toString();
            } else {
                jsonObj = toString.call(obj); 
            }
        }

        return jsonObj;
        
    }

    exports.jsonify = jsonify;
}(this);