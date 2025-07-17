package teammatetaskcolumnrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskColumnRepository) Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	res, err := r.client.
		TeammateTaskColumn.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
