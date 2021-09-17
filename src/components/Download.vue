<template>
  <vs-button
    class="mb-4"
    icon-pack="feather"
    icon="icon-download"
    @click="download()"
    >Download</vs-button
  >
</template>

<script>
import FileSaver from "file-saver";
import { Parser } from "json2csv";

export default {
  name: "download",
  props: {
    data: {
      required: true,
      type: Array
    },
    filename: {
      required: true,
      type: String
    }
  },
  methods: {
    download() {
      const blob = new Blob([new Parser().parse(this.data)], {
        type: "application/csvcharset=utf-8"
      });

      FileSaver.saveAs(blob, this.filename);
    }
  }
};
</script>

<style></style>
