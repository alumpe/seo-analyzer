<script lang="ts">
import { googleSnippetData as google } from "$lib/store";
</script>

<div class="snippet-container">
  <span class="title">{$google.title}</span>
  <span class="url">{$google.imgUrl}</span>
  <span class="description">{$google.description}</span>
</div>

<style lang="scss">
.snippet-container {
  padding: 2rem;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  width: 600px;
}

.title {
  font-size: 18px;
  line-height: 1.2;

  display: block;
  letter-spacing: normal;
  color: #1a0dab;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
}

.description {
  color: #545454;
  font-size: 13px;
  line-height: 1.4;
  word-wrap: break-word;
}

.url {
  display: block;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: normal;
  color: #006621;
}
</style>
