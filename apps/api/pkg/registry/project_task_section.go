package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/projecttasksectionrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewProjectTaskSectionController() controller.ProjectTaskSection {
	repo := projecttasksectionrepository.New(r.client)
	u := usecase.NewProjectTaskSectionUsecase(repo)

	return controller.NewProjectTaskSectionController(u)
}
