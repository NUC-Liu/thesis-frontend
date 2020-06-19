<template>
  <div id="app">
     <editor
       api-key="no-api-key"
       :v-model="content"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     />
   </div>
</template>

<script>
 import Editor from '@tinymce/tinymce-vue'
export default {
   name: 'app',
   data () {
     return {
       content: ''
     }
   },
   props: [
     'setEditorValue',
     content
   ],
   components: {
     'editor': Editor
   },
   watch: {
     content: function () {
       deep: true
     }
   }
}
</script>

<style>

</style>