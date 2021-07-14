<template>
  <div>
    <!-- <css-doodle  class='backgrond'>
          :doodle {
              @grid: 18 / 100vmax;
              background: #0a0c27;
              }
              --hue: calc(180 + 1.5 * @row * @col);
              background: hsl(var(--hue), 50%, 70%);
              margin: -.5px;
              transition: @r(.5s) ease;
              clip-path: polygon(@pick(
                  '0 0, 100% 0, 100% 100%',
                  '0 0, 100% 0, 0 100%',
                  '0 0, 100% 100%, 0 100%',
                  '100% 0, 100% 100%, 0 100%'
                  ));
      </css-doodle>       -->
    <css-doodle class="background">
      :doodle { @grid: 15 / 100vmax; background: #fff; cursor: pointer; }
      :doodle(:hover) { --s: 1 ; } :after { content:
      @pick(DOGE,BTC,ETH,ETC,XRP); font-size: 4vmax; color: #ececec; transform:
      scale(@rand(.2, .9)); } transition: .5s cubic-bezier(.175, .885, .32,
      1.275); transition-delay: @rand(650ms); transform:
      translateY(calc(var(--s) * 100%)) rotate(calc(var(--s) * 360deg));
    </css-doodle>
    <br />
    <b-container
      fluid
      class="text-light text-center abs"
    >
      <b-row>
        <b-col> </b-col>
        <b-col col lg="5">
          <b-input-group>
            <b-form-select
              v-model="category"
              :options="['title', 'content', 'user_id']"
              :value="null"
            >
            </b-form-select>
            <b-form-input
              style="backgroung-color:#fff;"
              v-model="to_find"
              @keyup.enter="find"
            ></b-form-input>
            <b-input-group-append>
              <b-button text="Button" variant="outline-secondary" @click="find"
                >Find</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <pre></pre>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            style="background-color:#fff;"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"
            @row-clicked="rowClick"
          ></b-table>
        </b-col>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
      <b-row align-h="end">
        <b-col cols="2">
          <b-button
            style="backgroung-color:#fff;"
            variant="outline-secondary"
            @click="writeContent"
            offset-md="4"
            >Write</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { fetchData, findData } from "@/service";

export default {
  name: "Board",
  data() {
    return {
      to_find: "",
      category: "title",
      fields: [
        {
          key: "id",
          label: "글 번호",
          sortable: true,
        },
        {
          key: "user_id",
          label: "글쓴이",
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
      items: [
        { isActive: true, key: "id", label: "글 번호" },
        { isActive: true, key: "user_id", label: "글쓴이" },
        { isActive: true, key: "title", label: "제목" },
        { isActive: true, key: "created_at", label: "작성일" },
      ],
    };
  },
  async created() {
    const resp = await fetchData();
    this.items = resp.data.list;
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    rowClick(item) {
      console.log("params: ", item.id);
      this.$router.push({
        path: `/board/free/detail/${item.id}`,
      });
    },
    writeContent() {
      this.$router.push({
        path: "/board/free/create",
      });
    },
    async find() {
      const resp = await findData(this.category, this.to_find);
      console.log(resp);
      this.items = resp.data.list;
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
</style>
