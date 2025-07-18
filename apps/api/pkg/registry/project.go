package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projectrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectController() controller.Project {
	repo := projectrepository.New(r.client)
	u := usecase.NewProjectUsecase(repo)

	return controller.NewProjectController(u)
}
