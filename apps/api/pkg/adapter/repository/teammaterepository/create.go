package teammaterepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateRepository) Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error) {
	res, err := r.client.
		Teammate.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
