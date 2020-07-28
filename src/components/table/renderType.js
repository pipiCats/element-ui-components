import moment from "moment";
import { DATE_TIME_FORMAT, DATE_FORMAT } from "./constants";

export default {
  // render datetime
  datetime: (value) => moment(value).format(DATE_TIME_FORMAT),
  // render date
  date: (value) => moment(value).format(DATE_FORMAT),
};
