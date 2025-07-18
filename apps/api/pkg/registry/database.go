package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
)

func (r *registry) NewDatabaseController() controller.Database {
	return controller.NewDatabaseController()
}
