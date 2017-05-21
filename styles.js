import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "center": {
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "nav": {
        "backgroundColor": "#81D4FA"
    },
    "titleM": {
        "flexDirection": "row"
    },
    "icon": {
        "resizeMode": "stretch",
        "width": 30,
        "height": 30
    },
    "menu": {
        "backgroundColor": "#FFFFFF",
        "alignItems": "center"
    },
    "menu list": {
        "alignSelf": "center",
        "alignItems": "center"
    },
    "settingsImage": {
        "alignSelf": "flex-start",
        "resizeMode": "stretch",
        "width": 25,
        "height": 25
    },
    "title": {
        "paddingTop": 8,
        "fontSize": 8
    },
    "hamButton": {
        "paddingLeft": 10,
        "resizeMode": "stretch",
        "width": 30,
        "height": 30
    },
    "leftNavButtonText": {},
    "rightNavButtonText": {},
    "blur": {},
    "bgImage": {
        "flex": 1
    },
    "container": {
        "paddingTop": 70
    },
    "seperator": {
        "flex": 1,
        "height": 1,
        "backgroundColor": "#FFFFFF"
    },
    "greyseperator": {
        "flexDirection": "row",
        "flex": 1,
        "height": 1,
        "backgroundColor": "#000000"
    },
    "normalNews": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "backgroundColor": "transparent"
    },
    "normalNews left": {
        "fontSize": 20
    },
    "normalNews right": {
        "fontSize": 20
    },
    "select": {
        "width": "30%",
        "backgroundColor": "transparent",
        "borderColor": "#FFFFFF",
        "shadowColor": "#000000"
    },
    "selectFocus": {
        "width": "30%",
        "backgroundColor": "#FFFFFF",
        "borderColor": "#FFFFFF",
        "shadowColor": "#000000",
        "shadowOpacity": 0.8,
        "shadowRadius": 1,
        "shadowOffset": {width: 0.5, height: 0.5}
    },
    "selectSeperator": {
        "width": "100%",
        "height": 1,
        "backgroundColor": "#BDBDBD"
    },
    "selectText": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "flexDirection": "row",
        "justifyContent": "space-between"
    },
    "selectList": {
        "width": "27.5%",
        "shadowOpacity": 0.8,
        "shadowRadius": 1,
        "shadowOffset": {width: 0.5, height: 0.5}
    },
    "selectListText": {
        "color": "black"
    },
    "assignment": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "backgroundColor": "transparent"
    },
    "assFont": {}
});