package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/archivedtaskacivityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewArchivedTaskActivityController() controller.ArchivedTaskActivity {
	repo := archivedtaskacivityrepository.New(r.client)
	u := usecase.NewArchivedTaskActivityUsecase(repo)

	return controller.NewArchivedTaskActivityController(u)
}
