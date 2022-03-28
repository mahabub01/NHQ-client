<template>
  <div>
    <nav aria-label="...">
      <ul class="pagination" v-if="havePagination != null">
        <li :class="[currentPage == 1 ? 'disabled' : '']" class="page-item">
          <a class="page-link" href="#" tabindex="-1" @click.prevent="tablePrev"
            >Previous</a
          >
        </li>

        <li
          v-for="pagi in allPages"
          class="page-item"
          :key="pagi"
          :class="[pagi == currentPage ? 'active' : '']"
          @click.prevent="tableCurrentPage(pagi)"
        >
          <a class="page-link" href="#">{{ pagi }} </a>
        </li>
        <li
          class="page-item"
          :class="[currentPage == allPages ? 'disabled' : '']"
        >
          <a class="page-link" href="#" @click.prevent="tableNext">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: Number,
  allPages: Number,
  havePagination: null,
});

const emit = defineEmits(["pagiPrev", "pagiNext", "pagiCurrentPage"]);

//Prev function
function tablePrev() {
  emit("pagiPrev");
}

//Next function
function tableNext() {
  emit("pagiNext");
}

//Current function
function tableCurrentPage(page: number) {
  emit("pagiCurrentPage", page);
}
</script>

<style scoped></style>
