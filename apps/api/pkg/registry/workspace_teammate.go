package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/workspaceteammaterepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceTeammateController() controller.WorkspaceTeammate {
	repo := workspaceteammaterepository.New(r.client)
	u := usecase.NewWorkspaceTeammateUsecase(repo)

	return controller.NewWorkspaceTeammateController(u)
}
