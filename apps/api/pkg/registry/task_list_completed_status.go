package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/tasklistcompletedstatusrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskListCompletedStatusController() controller.TaskListCompletedStatus {
	repo := tasklistcompletedstatusrepository.New(r.client)
	u := usecase.NewTaskListCompletedStatusUsecase(repo)

	return controller.NewTaskListCompletedStatusController(u)
}
