<template>
  <div>
    <select
      class="form-control"
      :id="id"
      :name="name"
      :disabled="disabled"
      :required="required"
    ></select>
  </div>
</template>

<script>
import $ from "jquery";
import "select2/dist/js/select2.full";
import "select2/dist/css/select2.min.css";

export default {
  name: "Select2ServerSide",
  data() {
    return {
      select2: null,
    };
  },
  //emits: ['update:modelValue'],
  props: {
    modelValue: [String, Array], // previously was `value: String`
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      default: () => {
        "Choose";
      },
    },
  },
  watch: {
    options: {
      handler(val) {
        this.setOption(val);
      },
      deep: true,
    },
    modelValue: {
      handler(val) {
        this.setValue(val);
      },
      deep: true,
    },
  },
  methods: {
    setOption(val = []) {
      this.select2.empty();
      this.select2.select2({
        placeholder: this.placeholder,
        ...this.settings,
        data: val,
      });
      this.setValue(this.modelValue);
    },
    setValue(val) {
      if (val instanceof Array) {
        this.select2.val([...val]);
      } else {
        this.select2.val([val]);
      }
      this.select2.trigger("change");
    },
  },
  mounted() {
    this.select2 = $(this.$el)
      .find("select")
      .select2({
        placeholder: this.placeholder,
        ...this.settings,
        ajax: {
          url: process.env.VUE_APP_API_URL + "/categories-selectable",
          beforeSend: function (request) {
            request.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem("token")
            );
            request.setRequestHeader(
              "Private-Key",
              process.env.VUE_APP_PRIVATE_KEY
            );
          },
          method: "get",
          dataType: "json",
          delay: 550,
          data: function (params) {
            return {
              q: params.term, // search term
              page: params.page,
              type: "public",
            };
          },
          processResults: function (data, params) {
            // parse the results into the format expected by Select2
            // since we are using custom formatting functions we do not need to
            // alter the remote JSON data, except to indicate that infinite
            // scrolling can be used
            params.page = params.page || 1;
            return {
              results: data.data,
              pagination: {
                more: params.page * 30 < data.total_count,
              },
            };
          },
          cache: true,
        },
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 2,
        matcher: function matchStart(params, data) {
          console.log("say Hello here......");
          // If there are no search terms, return all of the data
          if ($.trim(params.term) === "") {
            return data;
          }

          // Skip if there is no 'children' property
          if (typeof data.children === "undefined") {
            return null;
          }

          // `data.children` contains the actual options that we are matching against
          var filteredChildren = [];
          $.each(data.children, function (idx, child) {
            if (
              child.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0
            ) {
              filteredChildren.push(child);
            }
          });

          // If we matched any of the timezone group's children, then set the matched children on the group
          // and return the group object
          if (filteredChildren.length) {
            var modifiedData = $.extend({}, data, true);
            modifiedData.children = filteredChildren;

            // You can return modified objects from here
            // This includes matching the `children` how you want in nested data sets
            return modifiedData;
          }

          // Return `null` if the term should not be displayed
          return null;
        },
      })
      .on("select2:select select2:unselect", (ev) => {
        this.$emit("update:modelValue", this.select2.val());
        this.$emit("select", ev["params"]["data"]);
      });
    this.setValue(this.modelValue);
  },
  beforeUnmount() {
    this.select2.select2("destroy");
  },
};
</script>
