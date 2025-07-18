package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/workspaceacivitytaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceActivityTaskController() controller.WorkspaceActivityTask {
	repo := workspaceacivitytaskrepository.New(r.client)
	u := usecase.NewWorkspaceActivityTaskUsecase(repo)

	return controller.NewWorkspaceActivityTaskController(u)
}
