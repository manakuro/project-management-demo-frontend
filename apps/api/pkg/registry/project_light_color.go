package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projectlightcolorrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectLightColorController() controller.ProjectLightColor {
	repo := projectlightcolorrepository.New(r.client)
	u := usecase.NewProjectLightColorUsecase(repo)

	return controller.NewProjectLightColorController(u)
}
