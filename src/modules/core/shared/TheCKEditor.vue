<!-- :content="" use for set default Data
<TheCKEditor @sendContent="setDescription" :content="initialData" />
const setDescription = (value: any) => {
  console.log(value);
};
-->
<template>
  <textarea id="editor1" name="editor1"></textarea>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, watch } from "vue";

declare global {
  interface Window {
    CKEDITOR: any;
  }
}

export default defineComponent({
  name: "TheCkEditor",
  props: ["content"],
  setup(props, { emit }) {
    const content = ref(props.content);
    let ckEditor: any;

    onMounted(() => {
      //initialize ckeditor
      ckEditor = window.CKEDITOR.replace("editor1");
      //setting data
      ckEditor.setData(content.value);
      //on change event
      ckEditor.on("change", () => {
        emit("sendContent", ckEditor.getData());
      });
    });

    /*******
     *  this code use for when set Default Value in CkEditor
     * **** */
    // watch(content, () => {
    //   if (content.value !== ckEditor.getData()) {
    //     ckEditor.setData(content.value);
    //   }
    // });
  },
});
</script>
