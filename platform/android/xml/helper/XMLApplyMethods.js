module.exports = {
    applyAndroidLayoutSize: {
        WidthSize: function(code, applyObject){
            var widthString = "android:layout_width="+applyObject.quote+"48";
            return code.replace("android:layout_width="+applyObject.quote+applyObject.size, widthString);
        },
        NoWidthDp: function(code, applyObject){
            return code.replace(
                code.substring(
                    code.match("android:layout_width")[0].length,
                    code.length
                ).match(applyObject.unit),
                "dp"
            )
        },
        HeightSize: function(code, applyObject){
            return code.replace(
                code.substring(
                    code.match("android:layout_height")[0].length,
                    code.length
                ).match(applyObject.unit),
                "dp"
            )
        },
        NoHeightDp: function(code, applyObject){
            var widthString = "android:layout_width="+applyObject.quote+"48";
            return code.replace("android:layout_height="+applyObject.quote+applyObject.size, widthString);
        }
    }
}