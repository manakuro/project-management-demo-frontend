package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/tasksectionrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskSectionController() controller.TaskSection {
	repo := tasksectionrepository.New(r.client)
	u := usecase.NewTaskSectionUsecase(repo)

	return controller.NewTaskSectionController(u)
}
