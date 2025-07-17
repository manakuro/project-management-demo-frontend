package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/archivedactivityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewArchivedActivityController() controller.ArchivedActivity {
	repo := archivedactivityrepository.New(r.client)
	u := usecase.NewArchivedActivityUsecase(repo)

	return controller.NewArchivedActivityController(u)
}
