package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/teammaterepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTeammateController() controller.Teammate {
	repo := teammaterepository.New(r.client)
	u := usecase.NewTeammateUsecase(repo)

	return controller.NewTeammateController(u)
}
