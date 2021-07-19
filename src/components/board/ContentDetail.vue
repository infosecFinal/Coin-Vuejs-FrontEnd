<template>
  <div>
    <br /><br />
    <b-card
      style="max-width: 1000px; background-color:#e9ecef; border-radius: 50px; border:none; display:block; margin: 0 auto;"
    >
      <br /><br>
      <div>
        <div
          class="content-detail-content-info table"
          style="background-color:#fff; border-radius: 50px; border:none; display:block; margin: 0 auto;"
        >
          <div class="content-detail-content-info-left">
            <div class="content-detail-content-info-left-number">
              {{ $route.query.idx }}
            </div>
            <div class="content-detail-content-info-left-subject">
              {{ data.title }}
            </div>
          </div>
          <div class="content-detail-content-info-right">
            <div class="content-detail-content-info-right-user">
              writer : {{ data.user_id }}
            </div>
            <div class="content-detail-content-info-right-created">
              Created_At : {{ data.created_at }}
            </div>
          </div>
        </div>
        <div
          class="content-detail-content-info table"
          style="background-color:#f1f5f8; border-radius: 50px; border:none; margin: 0 auto; margin-bottom:20px; margin-top:20px;"
        >
          <ul>
            <li v-for="(file, idx) in files" :key="idx" @click="download(file)">
              {{ file.origin_file_Name }}
            </li>
          </ul>
        </div>
        <div
          class="content-detail-content table"
          v-html="data.content"
          style="background-color:#fff; border-radius: 50px; border:none; display:block; margin: 0 auto;"
        >
        </div>
        <br><br><br>
        <div
          class="content-detail-button"
          v-if="user.user_id === data.user_id || getisAdmin"
          style="border:none; float: right;"
        >
          <b-button pill variant="warning" @click="modifyData">수정</b-button>
          &nbsp;
          <b-button pill variant="warning" @click="deleteData">삭제</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { fetchDataById, deleteData, getUserInfo } from "@/service";
import { getFilesInfo, getFile } from "@/service/file/file.js";
import { mapGetters } from "vuex";

export default {
  name: "ContentDetail",
  data() {
    return {
      id: Number(this.$route.params.contentId),
      data: {},
      files: [],
      user: "",
    };
  },
  async created() {
    const data_resp = await fetchDataById(this.id);
    const file_resp = await getFilesInfo(this.id);
    const user_resp = await getUserInfo();
    this.data = data_resp.data.data;
    this.user = user_resp.data.data;
    this.files = file_resp.data.list;
    console.log(this.files);
  },
  computed: {
    ...mapGetters("account", ["getLoginId", "getisAdmin"]),
  },
  methods: {
    async deleteData() {
      await deleteData(this.id);
      this.$router.push("/board/free");
    },
    modifyData() {
      this.$router.push({
        path: `/board/free/create/${this.id}`,
      });
    },
    async download(file) {
      await getFile(file.id);
      const url = `http://localhost:8083/file/download/${file.id}`;
      const link = document.createElement("a");
      // const contentDisposition = resp.headers['content-disposition'];

      // let fileName = 'undefined';
      // if(contentDisposition) {
      //     const [ fileNameMatch ] = contentDisposition.split(';').filter(str=>str.includes('fileName'));
      //     if(fileNameMatch) [, fileName] = fileNameMatch.split('=');
      // }
      // fileName = decodeURI(fileName);
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  },
};
</script>

<style>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}
.content-detail-content-info-left {
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  padding: 1rem;
}
.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 500px;
}
.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

.table {
  max-width: 800px;
  left: 0;
  right: 0;
  margin-left: 10%;
  margin-right: 10%;
  top: 0;
  bottom: 0;
  margin-top: 0%;
  margin-bottom: 0%;
}

.table2 {
  max-width: 700px;
  left: 0;
  right: 0;
  margin-left: 10%;
  margin-right: 10%;
  top: 0;
  bottom: 0;
  margin-top: 0%;
  margin-bottom: 0%;
}

.wrapmid {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.mid {
  min-width: 800px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.mid2 {
  max-width: 600px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
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
}
</style>
