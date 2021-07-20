<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <span class="text-black">Board</span>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Free</strong>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <container
      class="text-light text-center col-lg-8 col-md-8"
      style=" display:block; margin: 0 auto; background-color: #f1f5f8;
              border-radius: 50px; border: none;">
      <br /><br /><br />
      <div>
        <b-table
          striped
          hover
          style="background-color:#fff; margin:auto;"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          @row-clicked="rowClick"
          align="center"
        ></b-table>
        <br /><br /><br />
        <div class="col-lg-10 col-md-11 col-sm-11" style="text-align:right;">
          <b-button pill variant="warning" @click="writeContent" offset-md="3"
            >Write</b-button
          >
        </div>
        <br />

        <b-pagination
          variant="warning"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
          class="customPagination"
        ></b-pagination>
      </div>

      <br /><br />
      <b-row style="float: none; margin:0 auto;">
        <div class="col-md-8" style=" display:block; margin: 0 auto; ">
          <b-button pill variant="warning" @click="fetch">전체보기</b-button>
          &nbsp; &nbsp;

          <b-form-select
            v-model="category"
            :options="['title', 'content', 'user_id']"
            :value="null"
          >
          </b-form-select>
          <input v-model="to_find" @keyup.enter="find" />

          <!-- <b-input-group-append> -->
          &nbsp;&nbsp;
          <b-button pill text="Button" variant="warning" @click="find"
            >Find</b-button
          >
          <!-- </b-input-group-append> -->
        </div>
      </b-row>
      <br /><br /><br />
      <b-row align-h="end"> </b-row>
    </container>
  </div>
</template>

<script>
import { fetchData, findData } from "@/service";
import { mapGetters } from "vuex";

export default {
  name: "Board",
  data() {
    return {
      to_find: "",
      category: "title",
      fields: [
        {
          key: "idx",
          label: "번호",
          sortable: true,
        },
        {
          key: "user_id",
          label: "작성자",
          sortable: true,
        },
        {
          key: "title",
          label: "제목",
          sortable: true,
        },
        {
          key: "created_at",
          label: "작성일",
          sortable: true,
        },
      ],

      currentPage: 1,
      perPage: 10,
      items: [],
    };
  },
  async created() {
    this.fetch();
    console.log(this.$store.getters["account/getLoginId"]);
  },
  computed: {
    ...mapGetters("account", ["getLoginState"]),
    rows() {
      return this.items.length;
    },
  },
  methods: {
    rowClick(item) {
      this.$router.push({
        path: `/board/free/detail/${item.id}`,
        query: { idx: `${item.idx}` },
      });
    },
    writeContent() {
      if (!this.getLoginState) alert("로그인 후 글쓰기 가능합니다.");
      else {
        this.$router.push({
          path: "/board/free/create",
        });
      }
    },
    async find() {
      const resp = await findData(this.category, this.to_find);
      if (resp.data.code > 0) this.items = resp.data.list;
    },
    async fetch() {
      const resp = await fetchData();
      if (resp.data.code > 0) {
        this.items = resp.data.list;
        const len = this.items.length;
        this.items.map((item, idx) => {
          console.log(item);
          return (item["idx"] = len - idx);
        });
      }
    },
  },
};
</script>

<style>
.sr-only {
  display: none;
}
.table {
  max-width: 800px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}
.background {
  font: 900 100px/0.65 system-ui;
  margin: 0;
  overflow: hidden;
  width: 100%;
}
span {
  display: inline-block;
  text-indent: 0rem;
  position: relative;
}
.abs {
  position: absolute;
  top: 100px;
  left: auto;
  bottom: auto;
  right: auto;
}
.input-field {
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  color: #252a32;
  background: #fff;
  display: block;
  margin: 0 auto;
}
.customPagination > li > a {
  color: #ffc107;
}
</style>
