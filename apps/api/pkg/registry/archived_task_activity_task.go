package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/archivedtaskacivitytaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewArchivedTaskActivityTaskController() controller.ArchivedTaskActivityTask {
	repo := archivedtaskacivitytaskrepository.New(r.client)
	u := usecase.NewArchivedTaskActivityTaskUsecase(repo)

	return controller.NewArchivedTaskActivityTaskController(u)
}
