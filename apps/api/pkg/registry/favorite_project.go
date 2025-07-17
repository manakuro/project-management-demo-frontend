package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/favoriteprojectrepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewFavoriteProjectController() controller.FavoriteProject {
	repo := favoriteprojectrepository.New(r.client)
	u := usecase.NewFavoriteProjectUsecase(repo)

	return controller.NewFavoriteProjectController(u)
}
