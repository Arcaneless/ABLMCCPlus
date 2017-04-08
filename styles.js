import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
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
    }
});