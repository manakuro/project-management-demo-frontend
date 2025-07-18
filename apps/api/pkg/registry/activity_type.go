package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/activitytyperepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewActivityTypeController() controller.ActivityType {
	repo := activitytyperepository.New(r.client)
	u := usecase.NewActivityTypeUsecase(repo)

	return controller.NewActivityTypeController(u)
}
