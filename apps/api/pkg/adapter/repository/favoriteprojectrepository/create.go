package favoriteprojectrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *favoriteProjectRepository) Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error) {
	res, err := r.client.
		FavoriteProject.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
