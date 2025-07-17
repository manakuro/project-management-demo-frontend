package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/teammatetasksectionrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskSectionController() controller.TeammateTaskSection {
	repo := teammatetasksectionrepository.New(r.client)
	u := usecase.NewTeammateTaskSectionUsecase(repo)

	return controller.NewTeammateTaskSectionController(u)
}
