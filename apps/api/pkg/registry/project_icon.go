package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projecticonrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectIconController() controller.ProjectIcon {
	repo := projecticonrepository.New(r.client)
	u := usecase.NewProjectIconUsecase(repo)

	return controller.NewProjectIconController(u)
}
