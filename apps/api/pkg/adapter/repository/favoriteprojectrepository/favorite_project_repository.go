package favoriteprojectrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type favoriteProjectRepository struct {
	client *ent.Client
}

// New generates favoriteProject repository.
func New(client *ent.Client) ur.FavoriteProject {
	return &favoriteProjectRepository{client: client}
}
