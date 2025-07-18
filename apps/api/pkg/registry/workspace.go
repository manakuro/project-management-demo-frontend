package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/workspacerepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewWorkspaceController() controller.Workspace {
	repo := workspacerepository.New(r.client)
	u := usecase.NewWorkspaceUsecase(repo)

	return controller.NewWorkspaceController(u)
}
