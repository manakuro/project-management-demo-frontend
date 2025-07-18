package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/colorrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewColorController() controller.Color {
	repo := colorrepository.New(r.client)
	u := usecase.NewColorUsecase(repo)

	return controller.NewColorController(u)
}
