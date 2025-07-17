package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskfeedrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskFeedController() controller.TaskFeed {
	repo := taskfeedrepository.New(r.client)
	u := usecase.NewTaskFeedUsecase(repo)

	return controller.NewTaskFeedController(u)
}
