package favoriteworkspacerepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type favoriteWorkspaceRepository struct {
	client *ent.Client
}

// New generates favoriteWorkspace repository.
func New(client *ent.Client) ur.FavoriteWorkspace {
	return &favoriteWorkspaceRepository{client: client}
}
