package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/tasklikerepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewTaskLikeController() controller.TaskLike {
	repo := tasklikerepository.New(r.client)
	u := usecase.NewTaskLikeUsecase(repo)

	return controller.NewTaskLikeController(u)
}
