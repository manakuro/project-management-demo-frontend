package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskcollaboratorrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskCollaboratorController() controller.TaskCollaborator {
	repo := taskcollaboratorrepository.New(r.client)
	u := usecase.NewTaskCollaboratorUsecase(repo)

	return controller.NewTaskCollaboratorController(u)
}
