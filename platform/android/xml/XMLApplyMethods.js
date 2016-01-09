module.exports = {
    applyAndroidLayoutSize: {
        widthSize: function(code, applyObject){
            var widthString = "android:layout_width="+applyObject.quote+"48";
            return code.replace("android:layout_width="+applyObject.quote+applyObject.size, widthString);
        },
        noWidthDp: function(code, applyObject){
            return code;
        },
        heightSize: function(code, applyObject){
            return code;
        },
        noHeightDp: function(code, applyObject){
            return code;
        }
    }
}