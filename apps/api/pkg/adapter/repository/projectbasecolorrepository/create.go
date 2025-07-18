package projectbasecolorrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectBaseColorRepository) Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	res, err := r.client.
		ProjectBaseColor.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
