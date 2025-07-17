package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/tasklistsortstatusrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskListSortStatusController() controller.TaskListSortStatus {
	repo := tasklistsortstatusrepository.New(r.client)
	u := usecase.NewTaskListSortStatusUsecase(repo)

	return controller.NewTaskListSortStatusController(u)
}
