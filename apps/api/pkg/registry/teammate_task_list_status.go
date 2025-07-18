package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/teammatetaskliststatusrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTeammateTaskListStatusController() controller.TeammateTaskListStatus {
	repo := teammatetaskliststatusrepository.New(r.client)
	u := usecase.NewTeammateTaskListStatusUsecase(repo)

	return controller.NewTeammateTaskListStatusController(u)
}
