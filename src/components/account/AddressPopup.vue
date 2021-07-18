<template>
  <div v-if="open">
    <div align="center">
      <table
        border="0"
        width="440"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#FFFFFF"
      >
        <tbody>
          <tr>
            <td width="12" align="left" valign="top"></td>
            <td></td>
            <td width="13" align="right" valign="top">
              <p align="right"></p>
            </td>
          </tr>
          <tr>
            <td width="12"></td>
            <td>
              <p align="center">
                <br />
                <font color="#3187BD" size="1">▶</font
                ><b
                  >동/읍/면의 이름을 입력하시고 '주소찾기'를 클릭하세요.<br /> </b
                >(예:야탑 또는 월계동 또는 조리읍)
              </p>

              <form name="PostForm" method="post" action="findNewaddr.asp">
                <div align="center">
                  <table border="0" width="350" cellspacing="0" cellpadding="3">
                    <tbody>
                      <tr>
                        <td width="160" align="right">
                          <p align="left">
                            <input name="Dong" id="Dong" size="21" value="" />
                          </p>
                        </td>
                        <input type="hidden" name="Action" value="주소찾기" />
                        <td width="224">
                          <input
                            type="button"
                            onclick=""
                            value="주소찾기"
                            class="button2"
                            name="button2"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
              <center></center>
            </td>
            <td width="13"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export default {
  name: "AddressPopup",
  model: {
    prop: "open",
    event: "close",
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windowRef: null,
    };
  },
  watch: {
    open(newOpen) {
      if (newOpen) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    },
  },
  methods: {
    openPopup() {
      this.windowRef = window.open(
        "",
        "",
        "width=600,height=400,left=200,top=200"
      );
      this.windowRef.document.body.appendChild(this.$el);
      copyStyles(window.document, this.windowRef.document);
      this.windowRef.addEventListener("beforeunload", this.closePopup);
    },
    closePopup() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef.removeEventListener("beforeunload", this.closePopup);
        this.windowRef = null;
        this.$emit("close", false);
      }
    },
  },
  mounted() {
    if (this.open) {
      this.openPopup();
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePopup();
    }
  },
};
</script>
<style>
p {
  font-size: 12px;
  font-family: 굴림;
  text-decoration: none;
  color: black;
}
td {
  font-size: 12px;
  font-family: 굴림;
  text-decoration: none;
  color: black;
}
a:link {
  font-size: 12px;
  font-family: 굴림;
  text-decoration: none;
  color: black;
}
a:visited {
  font-size: 12px;
  font-family: 굴림;
  text-decoration: none;
  color: black;
}
a:hover {
  font-size: 12px;
  text-decoration: blink;
  color: red;
}
table {
  border-collapse: separate;
  text-indent: initial;
  white-space: normal;
  line-height: normal;
  font-weight: normal;
  font-size: medium;
  font-style: normal;
  color: -internal-quirk-inherit;
  text-align: start;
  border-spacing: 2px;
  font-variant: normal;
}
.button2 {
  height: 20;
  padding-top: 1pt;
  border-right: #000000 1px solid;
  font-family: "Tahoma";
  border-top: #000000 1px solid;
  font-size: 12px;
  border-left: #000000 1px solid;
  border-bottom: #000000 1px solid;
  background-color: #3186bd;
  font-family: tahoma, arial;
  color: #ffffff;
  border-color: #3186bd;
}
input:not([type="image" i]) {
  box-sizing: border-box;
}
input[type="button" i] {
  appearance: auto;
  user-select: none;
  white-space: pre;
  align-items: flex-start;
  text-align: center;
  cursor: default;
  color: -internal-light-dark(black, white);
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
  box-sizing: border-box;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
input {
  text-rendering: auto;
  color: -internal-light-dark(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
</style>
