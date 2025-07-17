package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/archivedworkspaceacivitytaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewArchivedWorkspaceActivityTaskController() controller.ArchivedWorkspaceActivityTask {
	repo := archivedworkspaceacivitytaskrepository.New(r.client)
	u := usecase.NewArchivedWorkspaceActivityTaskUsecase(repo)

	return controller.NewArchivedWorkspaceActivityTaskController(u)
}
