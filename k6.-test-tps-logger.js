import http from "k6/http";
import { check } from "k6";

export default function () {
  const url = "http://localhost:3000/api/v1/nmgw/send-sms";
  const payload = JSON.stringify({
    content: "flag=1,",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
