<template>
  <div>
    <div>
      <img src="/static/image/avatar.jpg" alt="" class="am-img-thumbnail" />
    </div>
    <div>
      <div class="am-form-group am-form-file">
        <i class="am-icon-cloud-upload"></i>更换头像
          <input type="file" multiple accept="image/x-png, image/jpeg" @change="uploadImg($event)" />
      </div>
      <P>教师</P>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  methods: {
    uploadImg (event) {
      let tag = event.target
      let file = tag.files[0]
      let param = new FormData()
      param.append('file',file,file.name)
      console.log(param.get('file'))
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }
      axios.post('http://localhost:2001/api/image',param,config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch (function (error){
        console.log(error)
      })
    }
  }
}
</script>


