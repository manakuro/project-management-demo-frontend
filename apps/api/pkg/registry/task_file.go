package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskfilerepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskFileController() controller.TaskFile {
	repo := taskfilerepository.New(r.client)
	u := usecase.NewTaskFileUsecase(repo)

	return controller.NewTaskFileController(u)
}
