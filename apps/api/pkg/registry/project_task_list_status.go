package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projecttaskliststatusrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskListStatusController() controller.ProjectTaskListStatus {
	repo := projecttaskliststatusrepository.New(r.client)
	u := usecase.NewProjectTaskListStatusUsecase(repo)

	return controller.NewProjectTaskListStatusController(u)
}
