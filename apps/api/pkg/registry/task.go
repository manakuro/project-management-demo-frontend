package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskController() controller.Task {
	repo := taskrepository.New(r.client)
	u := usecase.NewTaskUsecase(repo)

	return controller.NewTaskController(u)
}
