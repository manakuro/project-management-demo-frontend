package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/taskfeedlikerepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskFeedLikeController() controller.TaskFeedLike {
	repo := taskfeedlikerepository.New(r.client)
	u := usecase.NewTaskFeedLikeUsecase(repo)

	return controller.NewTaskFeedLikeController(u)
}
