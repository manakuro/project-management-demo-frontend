package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projecttaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskController() controller.ProjectTask {
	repo := projecttaskrepository.New(r.client)
	u := usecase.NewProjectTaskUsecase(repo)

	return controller.NewProjectTaskController(u)
}
