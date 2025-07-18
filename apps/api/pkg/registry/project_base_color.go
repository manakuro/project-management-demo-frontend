package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projectbasecolorrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectBaseColorController() controller.ProjectBaseColor {
	repo := projectbasecolorrepository.New(r.client)
	u := usecase.NewProjectBaseColorUsecase(repo)

	return controller.NewProjectBaseColorController(u)
}
