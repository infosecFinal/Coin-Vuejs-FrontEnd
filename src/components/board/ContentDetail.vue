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
        <!-- <b-form-input v-model="text" placeholder="Enter Comment" @keyup.enter="postComment"></b-form-input>
        <ul>
        <li v-for="(comment, idx) in comments" :key="idx">
          {{comment.content}}
        </li>
        </ul> -->
        <br><br><br>
        <div
          class="content-detail-button"
          v-if="user.user_id === data.user_id || getisAdmin"
          style="border:none; float: right;"
        >
          <b-button pill variant="warning" @click="modifyData">글 수정</b-button>
          &nbsp;
          <b-button pill variant="warning" @click="deleteData">글 삭제</b-button>
        </div>
      </div>
    </b-card>
    <br><br>

<div>
  <br><br>
  <b-card
      style="max-width: 1000px; background-color:#f1f5f8; border-radius: 50px; border:none; display:block; margin: 0 auto;"
    >
     <!-- style="margin-top:3%; margin-left:3%; margin-right:3%; margin-bottom:3%;" -->
    <div style="margin-top:3%;">
    <b-form-input style=" width:95%; display:block; margin: 0 auto; border-radius: 50px;" v-model="text" placeholder="댓글입력" @keyup.enter="postComment"></b-form-input>
        <br>
        <div>
        <ul>
        <li class="p-1" style=" width:97%; background-color:#e9ecef; display:block; border-radius: 50px; margin-top:6px;" v-for="(comment, idx) in comments" :key="idx">
             &nbsp;&nbsp;&nbsp;{{comment.content}}&nbsp;&nbsp;&nbsp;
        </li>
        </ul>
        </div>
    </div>
  </b-card>
</div>

  </div>
</template>

<script>
import { fetchDataById, deleteData, getUserInfo } from "@/service";
import { getFilesInfo, getFile } from "@/service/file/file.js";
import { insertComment, fetchComment } from "@/service/comment/comment.js";
import { mapGetters } from "vuex";

export default {
  name: "ContentDetail",
  data() {
    return {
      id: Number(this.$route.params.contentId),
      data: {},
      files: [],
      user: "",
      comments: []
    };
  },
  async created() {
    const data_resp = await fetchDataById(this.id);
    const file_resp = await getFilesInfo(this.id);
    const user_resp = await getUserInfo();
    const cmt_resp = await fetchComment(this.id);
    this.comments = cmt_resp.data.list;
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
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    async postComment(e) {
      console.log('insert cmt');
      const resp = await insertComment({
        board_id:this.id,
        content:e.target.value,
        user_id: this.getLoginId
      });
      if(resp.data.code < 1) alert('댓글 입력 실패')
      else {
        e.target.value=''
        const resp = await fetchComment(this.id);
        this.comments = resp.data.list
      }
    }
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
  padding-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 3%;
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
