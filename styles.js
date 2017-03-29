import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "nav": {
        "backgroundColor": "rgba(0,184,212,0.2)"
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
    "seperator grey": {
        "flex": 1,
        "height": 1,
        "backgroundColor": "#000000"
    },
    "normalNews": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "normalNews left": {
        "fontSize": 20
    },
    "normalNews right": {
        "fontSize": 20
    }
});