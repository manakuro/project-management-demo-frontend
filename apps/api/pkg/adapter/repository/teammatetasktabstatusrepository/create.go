package teammatetasktabstatusrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskTabStatusRepository) Create(ctx context.Context, input model.CreateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error) {
	res, err := r.client.
		TeammateTaskTabStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
