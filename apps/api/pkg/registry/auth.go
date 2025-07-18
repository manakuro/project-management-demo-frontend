package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
)

func (r *registry) NewAuthController() controller.Auth {
	return controller.NewAuthController()
}
