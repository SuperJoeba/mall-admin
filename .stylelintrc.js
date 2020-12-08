module.exports = {
  extends: "stylelint-config-standard", // 这是官方推荐的方式
  rules: {
    "at-rule-no-unknown": null,
    "function-url-quotes": "always",
    "indentation": 2, //缩进4位
    "number-leading-zero": null,
    "unit-whitelist": [
      "em",
      "rem",
      "s",
      "%",
      "px",
      "deg",
      "vw",
      "vh"
    ]
  }
}