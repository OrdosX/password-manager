import { createApp } from "vue";
import { Row, Col, Card, Space, Input, Button, Divider } from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Space)
  .use(Input)
  .use(Button)
  .use(Divider)
  .mount("#app");
