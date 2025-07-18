package main

import (
	"log"
	"os"
	"project-management-demo-backend/config"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/infrastructure/datastore"
	"project-management-demo-backend/pkg/infrastructure/graphql"
	"project-management-demo-backend/pkg/infrastructure/router"
	"project-management-demo-backend/pkg/registry"
)

func main() {
	config.ReadConfig(config.ReadConfigOption{})

	client := newDBClient()
	defer client.Close()

	ctrl := newController(client)
	srv := graphql.NewServer(client, ctrl)

	e := router.New(srv, ctrl, router.Options{
		Auth: true,
	})

	e.Logger.Fatal(e.Start(":" + port()))
}

func newDBClient() *ent.Client {
	client, err := datastore.NewClient(datastore.NewClientOptions{
		Debug: true,
	})
	if err != nil {
		log.Fatalf("failed opening mysql client: %v", err)
	}

	return client
}

func newController(client *ent.Client) controller.Controller {
	r := registry.New(client)
	return r.NewController()
}

func port() string {
	if os.Getenv("PORT") != "" {
		return os.Getenv("PORT")
	}
	return config.C.Server.Address
}
