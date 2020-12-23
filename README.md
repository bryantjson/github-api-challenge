# Automated Protection of Master Branch Upon New GitHub Repository 

![Architecture Diagram](./images/architecture-github.jpg)

This repository contains a solution that automates the protection of a new GitHub repository by exploring powerful GitHub APIs, webhook, and a simple NodeJS webservice.

## Features

- Provide a simple NodeJS webservice built with powerful GitHub APIs, GitHub oktokit libraries, and webhook
- Deploy under a Kubernetes platform like Red Hat Openshift to provide the easy deployment and scalability
- Create an issue and notify an user with **@{username}** mechanism
- Create a sample README.md file under **master** branch
- Automatically protect the **master** branch 

## What are in this repo

| File Name | What It Is |
| ------- | ------------ |
| server.js | sss |
| package.json | sss |
| package-lock.json | sss |
| README.md | sss | 

## PreRequisites



## Install

### Install on Red Hat Openshift

These steps provide how to deploy to Red Hat Openshift, which is a powerful enterprise Kubernetes platform. However, the steps should be similar 

1. Login to an Openshift cluster

```sh
oc login ${ocp cluster}
```

2. Create a new project/namespace

```sh
oc new-project ${new project}
```

3. Create a new 

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):

```powershell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

[Homebrew](https://formulae.brew.sh/formula/deno) (Mac):

```sh
brew install deno
```

[Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```powershell
choco install deno
```

Build and install from source using [Cargo](https://crates.io/crates/deno):

```sh
cargo install deno
```

See
[deno_install](https://github.com/denoland/deno_install/blob/master/README.md)
and [releases](https://github.com/denoland/deno/releases) for other options.

### Getting Started

Try running a simple program:

```sh
deno run https://deno.land/std/examples/welcome.ts
```

Or a more complex one:

```ts
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

You can find a more in depth introduction, examples, and environment setup
guides in the [manual](https://deno.land/manual).

More in-depth info can be found in the runtime
[documentation](https://doc.deno.land).

### Contributing

We appreciate your help!

To contribute, please read our
[guidelines](https://github.com/denoland/deno/blob/master/docs/contributing/style_guide.md).

[Build Status - Cirrus]: https://github.com/denoland/deno/workflows/ci/badge.svg?branch=master&event=push
[Build status]: https://github.com/denoland/deno/actions
[Twitter badge]: https://twitter.com/intent/follow?screen_name=deno_land
[Twitter handle]: https://img.shields.io/twitter/follow/deno_land.svg?style=social&label=Follow

## References

https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/configuring-your-server-to-receive-payloads

https://docs.github.com/en/free-pro-team@latest/rest/guides/getting-started-with-the-rest-api

https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/about-webhooks#events

https://docs.github.com/en/free-pro-team@latest/rest/reference/issues#create-an-issue

https://octokit.github.io/rest.js/v18#issues-create

https://github.com/octokit/rest.js/issues/1368

https://github.com/octokit/routes/issues/412