package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/activityrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewActivityController() controller.Activity {
	repo := activityrepository.New(r.client)
	u := usecase.NewActivityUsecase(repo)

	return controller.NewActivityController(u)
}
