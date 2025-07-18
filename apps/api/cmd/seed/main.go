package main

import (
	"project-management-demo-backend/cmd/seed/seed"
	"project-management-demo-backend/config"
)

func main() {
	config.ReadConfig(config.ReadConfigOption{})
	seed.Seed()
}
