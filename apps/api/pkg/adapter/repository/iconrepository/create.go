package iconrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *iconRepository) Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error) {
	res, err := r.client.
		Icon.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
