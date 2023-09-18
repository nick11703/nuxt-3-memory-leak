import http from 'http'
import { collectDefaultMetrics, register } from 'prom-client'

export default defineNitroPlugin(() => {
  collectDefaultMetrics({})
  http
    .createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': register.contentType })
      register.metrics().then((metrics) => res.end(metrics))
    })
    .listen(9091, '0.0.0.0')
})

const test = bad.code