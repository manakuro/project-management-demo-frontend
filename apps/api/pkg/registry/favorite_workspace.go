package registry

import (
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/repository/favoriteworkspacerepository"
	"project-management-demo-backend/pkg/usecase/usecase"
)

func (r *registry) NewFavoriteWorkspaceController() controller.FavoriteWorkspace {
	repo := favoriteworkspacerepository.New(r.client)
	u := usecase.NewFavoriteWorkspaceUsecase(repo)

	return controller.NewFavoriteWorkspaceController(u)
}
