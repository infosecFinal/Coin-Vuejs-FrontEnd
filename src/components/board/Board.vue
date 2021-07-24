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
              border-radius: 50px; border: none;"
    >
      <br /><br /><br />
      <div>
        <b-table
          striped
          hover
          head-variant="th"
          style="background-color:#e9ecef;; margin:auto; text-align:center;"
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
      <!-- <b-row style="float: none; margin:0 auto;"> -->
      <div
        class="col-md-7"
        style=" border-radius: 50px; display:block; margin: 0 auto; padding:20px;"
      >
        <!-- background-color:#e9ecef; -->
        <span class="col">
          <!-- <b-button pill variant="warning" style="float:left; margin-left:10px;" @click="fetch">전체보기</b-button> -->

          <span class="input-group">
            <span class="input-group-btn">
              <b-button
                variant="warning"
                style="float:left; margin-left:10px; border-top-left-radius: 50px;
                            border-bottom-left-radius: 50px; width:90px;height:40px;"
                @click="fetch"
                >전체보기</b-button
              >
            </span>
            <b-form-select
              v-model="category"
              :options="['title', 'content', 'user_id']"
              :value="null"
              style="width:80px; height:40px; border:none;"
            >
            </b-form-select>
            <input
              v-model="to_find"
              style="border:none; width:200px; height:40px;"
              @keyup.enter="find"
            />
            <span class="input-group-btn">
              <!-- <b-input-group-append> -->
              <b-button
                style="float:right; margin-right:10px; border-top-right-radius: 50px;
                            border-bottom-right-radius: 50px; height:40px; width:90px;"
                text="Button"
                variant="warning"
                @click="find"
                >찾기</b-button
              >
            </span>
            <!-- </b-input-group-append> -->
          </span></span
        >
      </div>
      <!-- </b-row> -->
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
    this.fetch(false);
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
    async fetch(isFind) {
      const resp = isFind ? await findData(this.category, this.to_find) : await fetchData()
      if( resp.data.code > 0 ) {
        this.items = resp.data.list;
        const len = this.items.length;
        this.items.map((item, idx) => {
          return (item["idx"] = len - idx);
        });
      }
    },
    methods: {
      rowClick(item) {
        this.$router.push({
          path: `/board/free/detail/${item.id}`,
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
        console.log(resp);
        this.items = resp.data.list;
      },
      async fetch() {
        const resp = await fetchData();
        this.items = resp.data.list;
      },
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

.th {
  background-color: #ffc107;
}
</style>
