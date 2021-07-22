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
                  >도로명 주소를 검색합니다.<br />
                  동/읍/면의 이름을 입력하시고 '주소찾기'를 클릭하세요.<br /> </b
                >(예:야탑 또는 월계동 또는 조리읍)
              </p>

              <form method="post">
                <div align="center">
                  <table border="0" width="350" cellspacing="0" cellpadding="3">
                    <tbody>
                      <tr>
                        <td width="160" align="right">
                          <p align="left">
                            <input
                              v-model="user_dong"
                              name="Dong"
                              id="Dong"
                              size="80"
                              value=""
                            />
                          </p>
                          <p align="left">
                            <input
                              v-model="find_address"
                              name="Address"
                              id="Address"
                              size="80"
                            />
                          </p>
                          <b-button @click="AddressList">주소검색</b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <b-table
                    striped
                    hover
                    head-variant="th"
                    style="
                      background-color: #e9ecef;
                      margin: auto;
                      text-align: center;
                    "
                    :items="items"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                    @row-clicked="rowClick"
                    align="center"
                  ></b-table>
                  <br />
                  <br />
                  <b-pagination
                    variant="warning"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    align="center"
                  ></b-pagination>
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
      <b-button @click="beforeDestroy">완료</b-button>
    </div>
  </div>
</template>

<script>
import { findAddressList } from "@/service";

export default {
  name: "AddressPopup",
  model: {
    prop: "open",
    event: "close"
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
      user_dong: this.user_dong,
      find_address: "",
      fields: [
        {
          key: "do_sc_mc",
          label: "도/특별시/광역시",
          sortable: true,
        },
        {
          key: "si_gu",
          label: "시/구",
          sortable: true,
        },
        {
          key: "dong",
          label: "동/읍",
          sortable: true,
        },
        {
          key: "ro",
          label: "도로명",
          sortable: true,
        },
      ],

      currentPage: 1,
      perPage: 20,
      items: [],
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
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    rowClick(item) {
      this.find_address =
        `${item.do_sc_mc} ` + `${item.si_gu}` + ` ${item.dong}` + ` ${item.ro}`;
      console.log(this.find_address);
    },
    openPopup() {
      this.windowRef = window.open(
        "",
        "",
        "width=600,height=600,left=600,top=600"
      );
      this.windowRef.document.body.appendChild(this.$el);
    },
    closePopup() {
      if (this.windowRef) {
        this.windowRef.close();
        //this.windowRef.removeEventListener("beforeunload", this.closePopup);
        this.windowRef = null;
        this.$emit("close", false);
      }
    },

    async AddressList() {
      const resp = await findAddressList(this.user_dong);
      if (resp.data.code > 0) this.items = resp.data.list;
    },
  mounted() {
    if (this.open) {
      this.openPopup();
    }
  },
  beforeDestroy() {
    this.$emit('setAddress', this.find_address)
    if (this.windowRef) {
      this.closePopup();
    }
    }
  },
};
</script>
<style>

.table {
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
