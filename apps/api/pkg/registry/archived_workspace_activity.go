package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/archivedworkspaceacivityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewArchivedWorkspaceActivityController() controller.ArchivedWorkspaceActivity {
	repo := archivedworkspaceacivityrepository.New(r.client)
	u := usecase.NewArchivedWorkspaceActivityUsecase(repo)

	return controller.NewArchivedWorkspaceActivityController(u)
}
