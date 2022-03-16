<template>
  <div>
    <div class="form-container form-page">
      <h4 class="form-page-title">Project Categories</h4>
      <form @submit.prevent="categorySubmit">
        <div class="row">
          <div class="col-md-4">
            <label class="form-label">Title</label>
            <input
              type="text"
              class="form-page-input"
              placeholder="Title here"
              v-model.lazy="formState.title"
            />
          </div>
        </div>
        <div class="row form-row">
          <div class="col-md-4">
            <label class="form-label">Description</label>
            <textarea
              class="form-page-textarea"
              placeholder="Discription here"
              v-model.lazy="formState.description"
            ></textarea>
          </div>
        </div>
        <div class="row form-row">
          <div class="col-md-12">
            <button type="submit" class="pro-button">
              <i class="far fa-save"></i> Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

let formState = reactive({
  title: null,
  description: null,
});

function categorySubmit() {
  console.log(formState);
}
</script>

<style scoped></style>
