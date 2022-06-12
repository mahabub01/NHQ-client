<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th
            class="col-serial"
            style="width: 30px !important; text-align: center"
          >
            SL
          </th>
          <th
            class="col-serial"
            style="width: 50px !important; text-align: cente"
          >
            Action
          </th>
          <th style="width: 200px">Project Name</th>
          <th style="width: 80px">Project ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Project Progress</th>
          <th>Status</th>
          <th>Milestone Progress</th>

          <th class="action-field align-center">File</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in $attrs.entries" :key="index">
          <td
            class="col-serial"
            style="width: 30px !important; text-align: center"
          >
            <span>{{ index + 1 }}</span>
          </td>

          <td
            class="col-serial"
            style="width: 50px !important; text-align: cente"
          >
            <div class="btn-group">
              <button
                type="button"
                class="table_icon_btn"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <i class="fas fa-sort-down"></i>
              </button>
              <ul class="dropdown-menu table-dropdown" style="width: 165px">
                <li v-if="getPermission(`display_poc_document`)">
                  <router-link
                    :to="`/pmm/pocs/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> POC
                    Document</router-link
                  >
                </li>
                <li v-if="getPermission(`display_boq`)">
                  <router-link
                    :to="`/pmm/boqs/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> BOQ</router-link
                  >
                </li>

                <li v-if="getPermission(`display_oem_communication`)">
                  <router-link
                    :to="`/pmm/oems/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> OEM
                    Communication</router-link
                  >
                </li>
                <li v-if="getPermission(`display_customer_po`)">
                  <router-link
                    :to="`/pmm/customer-pos/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Customer PO</router-link
                  >
                </li>
                <li v-if="getPermission(`display_disti_order`)">
                  <router-link
                    :to="`/pmm/disti-orders/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Disti Order</router-link
                  >
                </li>
                <li v-if="getPermission(`display_delivery_timeline`)">
                  <router-link
                    :to="`/pmm/delivery-timelines/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Delivery
                    Timeline</router-link
                  >
                </li>

                <li v-if="getPermission(`display_delivery_challan`)">
                  <router-link
                    :to="`/pmm/delivery-challans/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Delivery
                    Challan</router-link
                  >
                </li>
                <li v-if="getPermission(`details_project_list`)">
                  <router-link
                    :to="`/pmm/projects/${item.slug}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Details</router-link
                  >
                </li>
              </ul>
            </div>
          </td>
          <td style="width: 200px !important">
            <router-link
              :to="`/pmm/milestones-by-employee/${route.params.user_id}/${item.id}`"
              >{{ item.project_name }}</router-link
            >
          </td>
          <td style="width: 80px">{{ item.project_ID }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.extended_date }}</td>
          <td>
            <div class="progress" style="height: 14px; position: relative">
              <div
                class="progress-bar bg-info change-bg-color"
                role="progressbar"
                :style="`width: ${item.project_weightage}%; background-color: #017e84 !important`"
                :aria-valuenow="`${item.project_weightage}`"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <span class="progress-bar-text-design"
                >{{ item.project_weightage }}%</span
              >
            </div>
          </td>
          <td>{{ item.status }}</td>
          <td>
            <div class="progress" style="height: 14px; position: relative">
              <div
                class="progress-bar bg-info change-bg-color"
                role="progressbar"
                :style="`width: ${item.progress}%`"
                :aria-valuenow="`${item.progress}`"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <span class="progress-bar-text-design">{{ item.progress }}%</span>
            </div>
          </td>

          <td class="action-field" style="text-align: center">
            <a v-if="item.files != null" :href="`${item.files}`" target="_blank"
              ><i class="fa fa-paperclip action-icon"></i
            ></a>
            <a href="#" onclick="alert('File not uploaded')" v-else
              ><i class="fa fa-paperclip action-icon" style="opacity: 0.6"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, ref, defineEmits, defineProps, defineExpose } from "vue";
import TheSpinner from "@/modules/shared/spinners/TheSpinner.vue";
import Axios from "@/http-common";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

const route = useRoute();

const { getPermission } = usePermission();

const attrs = useAttrs();

const emit = defineEmits(["update:titleSearch"]);

const props = defineProps({
  titleSearch: String,
});
</script>

<style scoped>
.activeStatus {
  color: green;
}
.inactiveStatus {
  color: red;
}

.progress-bar-text-design {
  font-size: 11px;
  font-weight: bold;
  display: block;
  text-align: center;
  width: 100%;
  position: absolute;
  color: white;
}

.change-bg-color {
  background-color: #714b67 !important;
}
.progress {
  background-color: #c2cfe0 !important;
}
</style>
