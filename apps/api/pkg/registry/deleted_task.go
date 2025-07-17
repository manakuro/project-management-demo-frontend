package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/deletedtaskrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewDeletedTaskController() controller.DeletedTask {
	repo := deletedtaskrepository.New(r.client)
	u := usecase.NewDeletedTaskUsecase(repo)

	return controller.NewDeletedTaskController(u)
}
