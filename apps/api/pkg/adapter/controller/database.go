package controller

import (
	"net/http"
	"project-management-demo-backend/cmd/seed/seed"
)

type databaseController struct{}

// Database is an interface of controller.
type Database interface {
	SeedTable(ctx Context) error
}

// NewDatabaseController generates test databaseController controller.
func NewDatabaseController() Database {
	return &databaseController{}
}

func (c *databaseController) SeedTable(ctx Context) error {
	seed.Seed()
	return ctx.String(http.StatusOK, "ok")
}
