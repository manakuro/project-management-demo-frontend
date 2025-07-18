package teammatetaskliststatusrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskListStatusRepository) Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	res, err := r.client.
		TeammateTaskListStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
