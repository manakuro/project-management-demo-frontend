package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskcolumnrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskColumnController() controller.TaskColumn {
	repo := taskcolumnrepository.New(r.client)
	u := usecase.NewTaskColumnUsecase(repo)

	return controller.NewTaskColumnController(u)
}
