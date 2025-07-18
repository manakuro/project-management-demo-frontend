package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskacivityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskActivityController() controller.TaskActivity {
	repo := taskacivityrepository.New(r.client)
	u := usecase.NewTaskActivityUsecase(repo)

	return controller.NewTaskActivityController(u)
}
