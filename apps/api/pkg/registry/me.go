package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/merepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewMeController() controller.Me {
	repo := merepository.New(r.client)
	u := usecase.NewMeUsecase(repo)

	return controller.NewMeController(u)
}
