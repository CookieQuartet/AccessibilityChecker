module.exports = {
    applyAndroidLayoutSize: {
        WidthSize: function(code, applyObject){
            var widthString = "android:layout_width="+applyObject.quote+"48";
            return code.replace("android:layout_width="+applyObject.quote+applyObject.size, widthString);
        },
        NoWidthDp: function(code, applyObject){
            return code;
        },
        HeightSize: function(code, applyObject){
            return code;
        },
        NoHeightDp: function(code, applyObject){
            return code;
        }
    }
}