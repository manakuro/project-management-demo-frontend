# Asana clone app for backend
An Asana clone application for portfolio apps, built with real-time communication with WebSockets and seamless updates with Optimistic UI.

- [View project](https://project-management-demo.manatoworks.me/)
- [GraphQL Playground](https://project-management-demo.ebad78r3fqm9m.ap-northeast-1.cs.amazonlightsail.com/playground)
- [View front-end](https://github.com/manakuro/project-management-demo-frontend)

## Tech Stack
- Go / 1.22.1
- GraphQL
- [ent](https://github.com/ent/ent)
- [gqlgen](https://github.com/99designs/gqlgen)
- WebSockets

## Pre-requisite
Follow the provided documentation to configure the Firebase project.

[docs/setup.md](docs/setup.md)

## Install Go

Install `go@1.22.1`
```
go install golang.org/dl/go1.22.1@latest
go1.22.1 download
```

```
go1.22.1 version

go version go1.22.1 darwin/arm64
```

## Run Docker

```
cd docker
docker compose up
```

## Installation

```
make install
```

## Set up a database

```
make setup_db
```

```
make migrate_schema
```

```
make seed
```

## Start dev server

```
make start
```
