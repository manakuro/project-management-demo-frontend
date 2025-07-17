package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/mentionrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewMentionController() controller.Mention {
	repo := mentionrepository.New(r.client)
	u := usecase.NewMentionUsecase(repo)

	return controller.NewMentionController(u)
}
