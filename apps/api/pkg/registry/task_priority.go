package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskpriorityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskPriorityController() controller.TaskPriority {
	repo := taskpriorityrepository.New(r.client)
	u := usecase.NewTaskPriorityUsecase(repo)

	return controller.NewTaskPriorityController(u)
}
