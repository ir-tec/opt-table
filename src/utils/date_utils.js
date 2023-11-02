export const utils = {
  get_string_day: (date) =>
    new Date(date).toLocaleDateString("fa-ir", { weekday: "long" }),
  today: (date) => {
    date = date ? date : new Date();
    let t = date
      .toLocaleDateString("fa-IR")
      .replace(/([۰-۹])/g, (token) =>
        String.fromCharCode(token.charCodeAt(0) - 1728)
      );
    t = t.split("/");
    t = `${t[0]}/${t[1] < 10 ? "0" : ""}${t[1]}/${t[2] < 10 ? "0" : ""}${t[2]}`;
    return t;
  },
  get_time: (date) => {
    let st = date ? new Date(date) : new Date();
    return `${st.getHours() < 10 ? "0" : ""}${st.getHours()}:${
      st.getMinutes() < 10 ? "0" : ""
    }${st.getMinutes()}:${st.getSeconds() < 10 ? "0" : ""}${st.getSeconds()}`;
  },
  now: (nd) => {
    nd = nd ? new Date(nd) : new Date();
    let h = nd.getHours();
    let m = nd.getMinutes();
    return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}`;
  },
};
