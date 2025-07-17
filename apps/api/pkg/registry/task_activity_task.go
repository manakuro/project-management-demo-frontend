package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskacivitytaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskActivityTaskController() controller.TaskActivityTask {
	repo := taskacivitytaskrepository.New(r.client)
	u := usecase.NewTaskActivityTaskUsecase(repo)

	return controller.NewTaskActivityTaskController(u)
}
