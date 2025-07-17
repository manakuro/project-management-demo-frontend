package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/filetyperepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewFileTypeController() controller.FileType {
	repo := filetyperepository.New(r.client)
	u := usecase.NewFileTypeUsecase(repo)

	return controller.NewFileTypeController(u)
}
