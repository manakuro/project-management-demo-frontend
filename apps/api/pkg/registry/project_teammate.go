package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projectteammaterepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectTeammateController() controller.ProjectTeammate {
	repo := projectteammaterepository.New(r.client)
	u := usecase.NewProjectTeammateUsecase(repo)

	return controller.NewProjectTeammateController(u)
}
