import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Checkbox,
  Message,
  Container,
  Aside,
  Header,
  Main,
  MessageBox,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Pagination,
  Card,
  Upload,
  Radio,
  CheckboxGroup
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(CheckboxGroup)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
