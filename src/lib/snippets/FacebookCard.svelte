<script lang="ts">
import { facebookData as facebook } from "$lib/store";
</script>

<div class="card-container">
  <div class="img" style="background-image: url({$facebook.imgUrl})" />

  <div class="text-container">
    <span class="domain">{$facebook.domain}</span>
    <span class="title">{$facebook.title}</span>
    <span class="description">{$facebook.description}</span>
  </div>
</div>

<style lang="scss">
.card-container {
  margin: 0;
  width: 500px;

  cursor: pointer;
  position: relative;

  overflow: hidden;
  font-size: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", sans-serif;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.img {
  border: 1px solid #dadde1;
  height: 261px;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.text-container {
  padding: 12px;
  border: 1px solid #dadde1;
  border-top: none;
  color: #1d2129;
  background: #f2f3f5;
}

.domain {
  border-collapse: separate;
  color: #606770;
  direction: ltr;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  height: 11px;
  line-height: 11px;
  overflow-x: hidden;
  overflow-y: hidden;
  text-align: left;
  text-overflow: ellipsis;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  word-wrap: break-word;
}

.title {
  display: block;
  font-size: 16px;
  line-height: 20px;

  margin-top: 5px;
  border-collapse: separate;
  color: #1d2129;
  cursor: pointer;
  direction: ltr;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  height: auto;
  letter-spacing: normal;
  text-align: left;
  text-decoration-color: #1d2129;
  text-decoration-line: none;
  text-decoration-style: solid;
  transition-delay: 0s;
  transition-duration: 0.1s;
  transition-property: color;
  transition-timing-function: ease-in-out;
  user-select: none;
  white-space: normal;
  width: auto;
  word-wrap: break-word;
}

.description {
  border-collapse: separate;
  box-sizing: border-box;
  direction: ltr;
  color: #606770;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  height: 18px;
  line-height: 20px;
  margin-top: 3px;
  max-height: 80px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-word;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  display: block;
}
</style>
