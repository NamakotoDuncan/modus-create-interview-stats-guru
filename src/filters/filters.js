import Vue from "vue";
import moment from "moment";
import capstring from "capstring";
import { BASE_API_URL } from "../config";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";

Vue.filter("randomColor", function() {
  const colors = ["primary", "danger", "dark"];

  const random = Math.floor(Math.random() * colors.length);

  return colors[random];
});

Vue.filter("numFormat", numFormat(numeral));

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  return capstring(value, "upper");
});

Vue.filter("title", function(value) {
  if (!value) return "";
  return capstring(value, "title");
});

Vue.filter("truncate", function(value, limit) {
  if (value)
    return `${value.substring(0, limit)}${value.length > limit ? "..." : ""}`;

  return "";
});

Vue.filter("tailing", function(value, tail) {
  return value + tail;
});

Vue.filter("time", function(value, is24HrFormat = false) {
  if (value) {
    const date = new Date(Date.parse(value));
    let hours = date.getHours();
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    if (!is24HrFormat) {
      const time = hours > 12 ? "AM" : "PM";
      hours = hours % 12 || 12;
      return `${hours}:${min} ${time}`;
    }
    return `${hours}:${min}`;
  }
});

Vue.filter("date", function(value, format = "llll") {
  return moment(value).format(format);
});

Vue.filter("month", function(val, showYear = true) {
  val = String(val);

  const regx = /\w+\s(\w+)\s\d+\s(\d+)./;
  if (!showYear) {
    return regx.exec(val)[1];
  } else {
    return `${regx.exec(val)[1]} ${regx.exec(val)[2]}`;
  }
});

Vue.filter("csv", function(value) {
  return value.join(", ");
});

Vue.filter("filter_tags", function(value) {
  return value.replace(/<\/?[^>]+(>|$)/g, "");
});

Vue.filter("k_formatter", function(num) {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
});

Vue.filter("page", function({ docs, total, limit, page }) {
  let start = (page - 1) * limit + 1;

  const end = start + docs.length - 1;

  if (end < start) start = 0;

  return `${start} - ${end} of ${total}`;
});

Vue.filter("fileURL", function({ fileId, authenticate }) {
  return `${BASE_API_URL}/v1/file${authenticate ? "" : "/public"}?fileId=${fileId}`;
});
