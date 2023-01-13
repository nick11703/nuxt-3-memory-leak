# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install -g pnpm
pnpm install --shamefully-hoist
```

## Production

Build and run the application for production in debug mode:

```bash
pnpm build
pnpm start-debug
```

## Containerizing

Build with docker for node 18.12
```bash
docker build \
  --build-arg SOURCE_INSTALL_IMAGE=node:18.12-slim \
  -t node18-12-slim-test \
  -f Dockerfile .
```
Running the app and exposing metrics
```bash
docker run --rm -p 3000:3000 -p 9091:9091 -p 9229:9229 node18-12-slim-test
```

Build with docker for node 18.13
```bash
docker build \
  --build-arg SOURCE_INSTALL_IMAGE=node:18.13-slim \
  -t node18-13-slim-test \
  -f Dockerfile .
```
Running the app and exposing metrics
```bash
docker run --rm -p 3000:3000 -p 9091:9091 -p 9229:9229 node18-13-slim-test
```

## Performance testing to show memory leaks

Small tests
```bash
ab -n 10000 -c 100 http://127.0.0.1:3000/static/1234
ab -n 10000 -c 100 http://127.0.0.1:3000/local/1234
ab -n 10000 -c 100 http://127.0.0.1:3000/remote/1234
```

Larger tests
```bash
ab -n 100000 -c 500 -H http://127.0.0.1:3000/static/1234
ab -n 100000 -c 500 -H http://127.0.0.1:3000/local/1234
ab -n 100000 -c 500 -H http://127.0.0.1:3000/remote/1234
```

## Steps to reproduce memory leak
1. Build for node 18.13-slim - see above `Setup`
2. Start a local prometheus and grafana server (not included here) that will listed to metric on 9091
3. Start application - see above `Production`
4. Run an Apache Bench test for the static route (data as JSON), the local route (data from local API), then the remote route (data from external API).
5. Notice the large increase in memory for the remote route that doesn't reduce after the test concludes.

These steps can be run for both node 18.12 and node 18.13 with a noticeable difference.
