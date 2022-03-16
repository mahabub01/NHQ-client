<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th v-for="th in $attrs.columns" :key="th" class="{{ th.class }}">
            {{ th.text }}
          </th>
        </tr>
        <tr>
          <th></th>
          <th>
            <input
              type="text"
              v-model.lazy="searchTitle"
              class="form-input"
              @input="$emit('update:modelValue', $event.target.value)"
            />
          </th>

          <th>
            <input type="text" class="form-input" />
          </th>
          <th>
            <input type="text" class="form-input" />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="td in $attrs.entries" :key="td">
          <td>{{ td.id }}</td>
          <td>{{ td.title }}</td>
          <td></td>
          <td>{{ td.description }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, ref } from "vue";

const attrs = useAttrs();
const searchTitle = ref("");
</script>

<style scoped></style>
