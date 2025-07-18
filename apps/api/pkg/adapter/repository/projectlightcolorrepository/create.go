package projectlightcolorrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectLightColorRepository) Create(ctx context.Context, input model.CreateProjectLightColorInput) (*model.ProjectLightColor, error) {
	res, err := r.client.
		ProjectLightColor.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
