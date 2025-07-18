package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/teammatetaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskController() controller.TeammateTask {
	repo := teammatetaskrepository.New(r.client)
	u := usecase.NewTeammateTaskUsecase(repo)

	return controller.NewTeammateTaskController(u)
}
